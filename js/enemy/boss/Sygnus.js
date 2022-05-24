import { c } from "../../main.js";
import { getCoordinate, getRandomArbitrary } from "../../helper.js";

import { MagicEnemy } from "../magic_enemy/MagicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class Sygnus extends MagicEnemy {
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
      health: 1000,
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
    this.maxHealth = 1000;
    this.canStuntWhenAttack = false;
    this.level = 3;

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
      ],
    };

    this.attack_cool_down = [
      { cool_down: 200, max: 200 },
      { cool_down: 100, max: 100 },
      { cool_down: 200, max: 200 },
      { cool_down: 100, max: 100 },
    ];

    this.select_attacks = [false, false];

    this.obj = [];
    this.attackEffect1 = [];

    this.switchAttack = false;

    this.setAttackEffect1 = false;
    this.currentAttackIndex = 2;

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
  }

  selectAttack() {
    if (this.switchAttack === false) {
      this.switchAttack = true;
      // this.currentAttackIndex = getRandomArbitrary(
      //   0,
      //   this.select_attacks.length
      // );
      this.currentAttackIndex = 2;
      this.select_attacks = [false, false];
      this.select_attacks[this.currentAttackIndex] = true;
    }
  }

  enemyGetHit(damage) {
    if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
    this.enemy.get_hit = true;
    this.enemy.health -= damage;
    this.damgeEffect(this.enemy, damage);
    this.enemy.updateSprite(this.enemy.sprites.takeHit);
  }

  setAttackEffect({ attack_effect_n, amount, attack_box }) {
    // Set Attack Effect 1
    if (this.setAttackEffect1 === false) {
      this.setAttackEffect1 = true;
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
              y: this.position.y,
            },
            ...this.sprites.attack_effect[attack_effect_n],
          }),
          hitFrame: { ...this.sprites.attack_effect[attack_effect_n].hitFrame },
          coolDown: getRandomArbitrary(0, 100),
        });
      }
      this.obj = [...this.attackEffect1.filter((a) => a.af)];
    }
  }

  triggerAttackEffect({ attack_effect_n }) {
    if (
      this.frameCurrent >=
      this.sprites.attack_effect[attack_effect_n].trigger_frame
    ) {
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

  handleAttack1(attack_box) {
    let { framesMax } = this.sprites.attack[0];

    this.offset = this.sprites_offset.attack[0][this.flip];
    this.updateSprite(this.sprites.attack[0]);

    //set attack effect
    this.setAttackEffect({ attack_effect_n: 0, amount: [3, 6], attack_box });

    // trigger attack effect
    this.triggerAttackEffect({ attack_effect_n: 0 });

    //reset frame
    if (this.frameCurrent === framesMax - 1) {
      this.attack_again = false;
      this.enemy_get_hit = false;
      this.in_attack_range = false;
      this.setAttackEffect1 = false;
      this.switchAttack = false;
      this.attackEffect1 = [];
      this.obj = [];
    }
  }

  handleAttack2(attack_box) {
    this.offset = this.sprites_offset.attack[1][this.flip];
    this.updateSprite(this.sprites.attack[1]);
    let { hitFrame, damge, framesMax } = this.sprites.attack[1];

    if (
      this.attackBoxCollition(attack_box, true) &&
      hitFrame[this.frameCurrent] === true
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
    this.offset = this.sprites_offset.attack[2][this.flip];
    this.updateSprite(this.sprites.attack[2]);
    let { hitFrame, damge, framesMax } = this.sprites.attack[2];
  }

  detectAttack() {
    if (this.enemy.health <= 0)
      this.enemy.updateSprite(this.enemy.sprites.death);

    let [x1, x2, y1] = getCoordinate(this);
    let a_x1 =
      this.flip === 1
        ? x2
        : x1 - this.sprites.attack[this.currentAttackIndex].width;
    let attack_box = {
      x: a_x1,
      y: y1,
      w: this.sprites.attack[this.currentAttackIndex].width,
      h: this.height,
    };

    c.fillStyle = "green";
    c.fillRect(attack_box.x, attack_box.y, attack_box.w, attack_box.h);

    if (
      (this.attackBoxCollition(attack_box, true) || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.in_attack_range = true;
      this.color = "red";
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
        }
      } else {
        if (--this.attack_cool_down[this.currentAttackIndex].cool_down < 0) {
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
      this.color = "green";
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

    // this.offset = this.sprites_offset.attack[0][this.flip];
    // this.updateSprite(this.sprites.attack[0]);
    // this.attack_effects[0].update();
    // this.updateSprite(this.sprites.run);
    // c.fillStyle = "green";
    // c.fillRect(b_x1, y1, this.attack_box.width, this.attack_box.height);
  }

  update() {
    // this.drawHealthBar();
    this.detectAttack();
    this.drawHitBox();
    super.update();
  }
}
