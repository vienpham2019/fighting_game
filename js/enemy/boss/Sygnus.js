import { c } from "../../main.js";
import {
  getCoordinate,
  getRandomArbitrary,
  createEnemy,
} from "../../helper.js";

import { Enemy } from "../Enemy.js";
import { Sprite } from "../../Sprite.js";

export class Sygnus extends Enemy {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    width = 60,
    height = 150,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesHold = 1,
    offset = { x: 0, y: 0 },
    sprites,
    flip = 1,
    attack_box,
    moveSpeed = { x: 1.5, y: 0 },
    platform,
  }) {
    super({
      position: { ...position, y: position.y },
      velocity,
      width,
      height,
      imageSrc,
      scale,
      framesMax,
      framesHold,
      offset,
      sprites,
      flip,
      attack_box,
      moveSpeed,
      platform,
      health: 12000,
    });

    // this.magic_obj = {
    //   move: new Sprite({
    //     position: { x: position.x, y: position.y },
    //     ...sprites.magic_obj.move,
    //   }),
    //   explosion: new Sprite({
    //     position: { x: position.x, y: position.y },
    //     ...sprites.magic_obj.explosion,
    //   }),
    // };

    this.attack_effects = [];
    for (let a of sprites.attack_effect) {
      this.attack_effects.push(
        new Sprite({
          position: { x: position.x, y: position.y },
          ...a,
        })
      );
    }

    this.magicObjSpeed = { x: 15, y: 0 };

    this.attack_cool_down = 50;
    this.attack_cool_down_max = 50;
    this.maxHealth = 12000;
    this.canStuntWhenAttack = false;
    this.level = 3;
    this.name = "Sygnus";

    this.sprites_offset = {
      idle: {
        [-1]: { x: 0, y: 5 },
        [1]: { x: 0, y: 5 },
      },
      run: {
        [-1]: { x: 0, y: 5 },
        [1]: { x: 0, y: 5 },
      },
      death: {
        [-1]: { x: 40, y: 85 },
        [1]: { x: 50, y: 85 },
      },
      takeHit: {
        [-1]: { x: 10, y: 6 },
        [1]: { x: 10, y: 6 },
      },
      attack: [
        {
          [-1]: { x: 50, y: 55 },
          [1]: { x: 50, y: 55 },
        },
        {
          [-1]: { x: 170, y: 100 },
          [1]: { x: 120, y: 100 },
        },
        {
          [-1]: { x: 0, y: 50 },
          [1]: { x: 0, y: 50 },
        },
        {
          [-1]: { x: 100, y: 210 },
          [1]: { x: 70, y: 210 },
        },
        {
          [-1]: { x: 85, y: 30 },
          [1]: { x: 55, y: 30 },
        },
        {
          [-1]: { x: 85, y: 30 },
          [1]: { x: 55, y: 30 },
        },
      ],
    };

    this.attack_cool_down = [
      { cool_down: 200, max: 200 },
      { cool_down: 100, max: 100 },
      { cool_down: 200, max: 200 },
      { cool_down: 100, max: 100 },
      { cool_down: 100, max: 100 },
    ];

    this.continue_attack = false;

    this.obj = [];
    this.attackEffect1 = [];

    this.switchAttack = false;

    this.setAttackEffectAction = false;
    this.currentAttackIndex = 4;

    // Attack 2
    this.magic_obj = {
      move: new Sprite({
        position: { x: position.x, y: position.y },
        ...sprites.magic_obj.move,
      }),
      explosion: new Sprite({
        position: { x: position.x, y: position.y },
        ...sprites.magic_obj.explosion,
      }),
    };

    this.magicObjSpeed = { x: 15, y: 0 };

    // Attack 3
    this.finish_attack_action = false;

    // Attack 5
    this.bots = [];
    this.summons = [];
    this.setBots = false;
    this.attack_5_continue = false;
  }

  handleGameMove({ x, y }) {
    super.handleGameMove({ x, y });
    this.obj.forEach((e) => {
      e.af.position.x += x;
      e.af.position.y += y;
    });

    this.summons.forEach((s) => {
      s.position.x += x;
      s.position.y += y;
    });
  }

  selectAttack() {
    if (this.switchAttack === false) {
      this.switchAttack = true;
      this.currentAttackIndex = getRandomArbitrary(0, 5);
      if (this.bots.length > 2 && this.currentAttackIndex === 4) {
        this.currentAttackIndex = getRandomArbitrary(0, 4);
      }
    }
  }

  enemyGetHit(damage) {
    if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
    this.enemy.handleTakeHit(damage);
    this.damgeEffect({ target: this.enemy, text: damage, type: "damage" });
  }

  setAttackEffect({
    attack_effect_n,
    amount = [1, 1],
    attack_box,
    coolDown = [0, 0],
  }) {
    // Set Attack Effect 1
    if (this.setAttackEffectAction === false) {
      this.setAttackEffectAction = true;
      let n = getRandomArbitrary(...amount);
      let w_range = attack_box.w / n;
      for (let i = 0; i < n; i++) {
        this.attackEffect1.push({
          af: new Sprite({
            position: {
              x: getRandomArbitrary(
                attack_box.x + w_range * i,
                attack_box.x +
                  w_range * i +
                  w_range -
                  this.sprites.attack_effect[attack_effect_n].width
              ),
              y:
                this.platform.position.y -
                this.sprites.attack_effect[attack_effect_n].height,
            },
            ...this.sprites.attack_effect[attack_effect_n],
          }),
          hitFrame: { ...this.sprites.attack_effect[attack_effect_n].hitFrame },
          coolDown: getRandomArbitrary(...coolDown),
        });
      }
      this.obj = [...this.attackEffect1.filter((a) => a.af)];
    }
  }

  triggerAttackEffect({ attack_effect_n }) {
    if (
      this.frameCurrent >=
        this.sprites.attack_effect[attack_effect_n].trigger_frame ||
      this.continue_attack
    ) {
      this.continue_attack = true;
      this.attackEffect1.forEach((a) => {
        if (a.coolDown <= 0) {
          if (
            a.af.frameCurrent <
            this.sprites.attack_effect[attack_effect_n].framesMax - 1
          ) {
            a.af.update();
            if (
              this.attackBoxCollition(
                {
                  x: a.af.position.x,
                  y: a.af.position.y,
                  w: a.af.width,
                  h: a.af.height,
                },
                true
              ) &&
              a.hitFrame[a.af.frameCurrent] === true
            ) {
              a.hitFrame[a.af.frameCurrent] = false;
              this.enemyGetHit(this.sprites.attack[attack_effect_n].damge);
            }
            this.enemy.get_hit = false;
          }
        } else a.coolDown--;
      });
    }
  }

  resetFrame() {
    this.attack_again = false;
    this.enemy_get_hit = false;
    this.in_attack_range = false;
    this.setAttackEffectAction = false;
    this.switchAttack = false;
    this.continue_attack = false;
    this.attackEffect1 = [];
    this.obj = [];
    this.finish_attack_action = false;
    this.setBots = false;
  }

  handleAttack1(attack_box) {
    let { framesMax } = this.sprites.attack[0];

    this.offset = this.sprites_offset.attack[0][this.flip];
    this.updateSprite(this.sprites.attack[0]);

    //set attack effect
    this.setAttackEffect({
      attack_effect_n: 0,
      amount: [5, 8],
      attack_box,
      coolDown: [0, 100],
    });

    // trigger attack effect
    this.triggerAttackEffect({ attack_effect_n: 0 });

    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.resetFrame();
    }
  }

  handleAttack2(attack_box) {
    this.offset = this.sprites_offset.attack[1][this.flip];
    this.updateSprite(this.sprites.attack[1]);
    let { hitFrame, damge, framesMax } = this.sprites.attack[1];

    if (
      this.attackBoxCollition(attack_box, true) &&
      hitFrame[this.frameCurrent] === true &&
      ((this.flip === 1 &&
        this.position.x + this.width <= this.enemy.position.x) ||
        (this.flip === -1 &&
          this.position.x >= this.enemy.position.x + this.enemy.width))
    ) {
      hitFrame[this.frameCurrent] = false;
      this.enemyGetHit(damge);
    }
    this.enemy.get_hit = false;

    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.attack_again = false;
      this.enemy_get_hit = false;
      this.in_attack_range = false;
      this.switchAttack = false;
      for (let f in hitFrame) {
        hitFrame[f] = true;
      }
    }
  }

  handleAttack3(attack_box) {
    if (this.finish_attack_action === false) {
      this.offset = this.sprites_offset.attack[2][this.flip];
      this.updateSprite(this.sprites.attack[2]);
    }

    let { framesMax } = this.sprites.attack[2];

    //set attack effect
    this.setAttackEffect({
      attack_effect_n: 1,
      amount: [3, 4],
      attack_box,
    });

    // trigger attack effect
    this.triggerAttackEffect({ attack_effect_n: 1 });

    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.finish_attack_action = true;

      this.offset = this.sprites_offset.idle[this.flip];
      this.updateSprite(this.sprites.idle);
    }

    if (
      this.attackEffect1.every(
        (e) => e.af.frameCurrent === this.sprites.attack_effect[1].framesMax - 1
      )
    ) {
      this.resetFrame();
    }
  }

  handleAttack4(attack_box) {
    if (this.finish_attack_action === false) {
      this.offset = this.sprites_offset.attack[3][this.flip];
      this.updateSprite(this.sprites.attack[3]);
    }

    let { framesMax } = this.sprites.attack[3];

    // set attack effect
    this.setAttackEffect({
      attack_effect_n: 2,
      amount: [4, 4],
      coolDown: [0, 50],
      attack_box,
    });

    // trigger attack effect
    this.triggerAttackEffect({ attack_effect_n: 2 });

    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.finish_attack_action = true;

      this.offset = this.sprites_offset.idle[this.flip];
      this.updateSprite(this.sprites.idle);
    }

    if (
      this.attackEffect1.every(
        (e) => e.af.frameCurrent === this.sprites.attack_effect[2].framesMax - 1
      )
    ) {
      this.resetFrame();
    }
  }

  handleAttack5() {
    if (this.finish_attack_action === false) {
      this.offset = this.sprites_offset.attack[4][this.flip];
      this.updateSprite(this.sprites.attack[4]);
    }
    let { framesMax, trigger_frame } = this.sprites.attack[4];
    if (
      this.image === this.sprites.attack[4].image &&
      this.frameCurrent >= trigger_frame
    ) {
      this.attack_5_continue = true;
      if (this.setBots === false) {
        this.setBots = true;
        if (this.bots.length < 11) {
          let amount = getRandomArbitrary(2, 11 - this.bots.length);
          let enemy_names = [
            "jungle_wolf",
            "white_wolf",
            "green_cornian",
            "dark_cornian",
            "dark_drake",
            "ice_drake",
          ];
          while (amount-- > 0) {
            let bot = createEnemy({
              platform: this.platform,
              enemy_name:
                enemy_names[getRandomArbitrary(0, enemy_names.length)],
            });

            let summon_pos = {
              x:
                bot.position.x -
                Math.floor((this.sprites.summon.width - bot.width) / 2),
              y: this.platform.position.y - this.sprites.summon.height,
            };
            this.summons.push(
              new Sprite({
                position: summon_pos,
                ...this.sprites.summon,
              })
            );
            bot.enemy = this.enemy;
            bot.palseMoveCoolDown = getRandomArbitrary(20, 50);
            bot.setPalseMoveCoolDown = true;

            bot.continueMoveCoolDown = 0;
            bot.setContinueMoveCoolDown = false;

            this.enemy.enemys.push(bot);
            this.bots.push(bot);
          }
        }
      }
    }
    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.resetFrame();
      this.finish_attack_action = false;
    }
  }

  calculateAttackBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let width = Math.min(
      this.sprites.attack[this.currentAttackIndex].width,
      x1 - this.platform.position.x
    );
    let a_x1 = x1 - width;

    let attack_box = {
      x: a_x1,
      y: y1,
      w:
        width +
        this.width +
        Math.min(
          this.sprites.attack[this.currentAttackIndex].width,
          this.platform.position.x + this.platform.width - x2
        ),
      h: this.height,
    };
    // c.beginPath();
    // c.strokeStyle = "red";
    // c.rect(attack_box.x, attack_box.y, attack_box.w, attack_box.h);
    // c.stroke();
    return attack_box;
  }

  detectAttack() {
    if (this.enemy.health <= 0)
      this.enemy.updateSprite(this.enemy.sprites.death);

    if (
      (this.attackBoxCollition(this.calculateAttackBox(), true) ||
        this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      let attack_box = this.calculateAttackBox();
      this.in_attack_range = true;
      this.velocity.x = 0;
      if (this.attack_again) {
        switch (this.currentAttackIndex) {
          case 0:
            this.handleAttack1(attack_box);
            break;
          case 1:
            this.handleAttack2(attack_box);
            break;
          case 2:
            this.handleAttack3(attack_box);
            break;
          case 3:
            this.handleAttack4(attack_box);
            break;
          case 4:
            this.handleAttack5();
            break;
        }
      } else {
        if (--this.attack_cool_down[this.currentAttackIndex].cool_down < 0) {
          this.flip = this.position.x - this.enemy.position.x > 0 ? -1 : 1;

          this.selectAttack();
          this.attack_cool_down[this.currentAttackIndex].cool_down =
            this.attack_cool_down[this.currentAttackIndex].max;
          this.attack_again = true;
        }
        this.offset = this.sprites_offset.idle[this.flip];
        this.updateSprite(this.sprites.idle);
      }
    } else {
      this.offset = this.sprites_offset.run[this.flip];
      this.updateSprite(this.sprites.run);
      this.in_attack_range = false;
      this.attack_again = false;
      this.move();
    }
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.offset = this.sprites_offset.death[this.flip];
    this.updateSprite(this.sprites.death);
    // this.attack_effects[0].update();
    // this.updateSprite(this.sprites.run);
    // c.fillStyle = "green";
    // c.fillRect(b_x1, y1, this.attack_box.width, this.attack_box.height);
  }

  handleSummon() {
    if (this.summons.length > 0) {
      this.summons.forEach((s) => {
        s.update();
      });
      this.summons = this.summons.filter(
        (s) => s.frameCurrent < s.framesMax - 1
      );
    }
  }

  update() {
    this.bots = this.bots.filter((b) => !b.is_death);
    this.detectAttack();
    if (this.health <= 0) {
      this.offset = this.sprites_offset.death[this.flip];
    }
    super.update();
  }
}
