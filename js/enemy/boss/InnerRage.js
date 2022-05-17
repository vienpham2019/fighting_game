import { c } from "../../main.js";
import { getCoordinate, RectCircleColliding } from "../../helper.js";

import { Enemy } from "../Enemy.js";
import { Sprite } from "../../Sprite.js";

export class InnerRage extends Enemy {
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
      position,
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
    this.attack_cool_down = 60;
    this.attack_cool_down_max = 60;

    this.maxHealth = 1000;
    this.canStuntWhenAttack = false;
    this.level = 3;

    this.sprites_offset = {
      idle: {
        [-1]: { x: 10, y: 6 },
        [1]: { x: 10, y: 6 },
      },
      run: {
        [-1]: { x: 10, y: 6 },
        [1]: { x: 10, y: 6 },
      },
      death: {
        [-1]: { x: 10, y: 19 },
        [1]: { x: 40, y: 19 },
      },
      takeHit: {
        [-1]: { x: 10, y: 6 },
        [1]: { x: 10, y: 6 },
      },
      attack: [
        {
          [-1]: { x: 240, y: 55 },
          [1]: { x: 100, y: 55 },
        },
        {
          [-1]: { x: 235, y: 260 },
          [1]: { x: 260, y: 260 },
        },
      ],
    };
    this.arc_r = 40;
    this.arc_r_max = 40;
    this.enemy_get_hit = false;
    this.attack_again = true;
    this.attack_cool_down = [
      { cool_down: 200, max: 200 },
      { cool_down: 200, max: 200 },
    ];

    this.attack_effects = [];
    for (let a of sprites.attack_effect) {
      this.attack_effects.push(
        new Sprite({
          position: { x: position.x, y: position.y + 10 },
          ...a,
        })
      );
    }
    this.attack_effect2_deal_damge_cool_down = 30;
    this.attack_effect2_deal_damge_cool_down_max = 30;

    this.enemy_get_hit1 = {};
    for (let hf in sprites.attack[0].hitFrame) {
      this.enemy_get_hit1[hf] = false;
    }
  }

  getAttackDimention(attack_n) {
    let [x1, x2, y1, y2] = getCoordinate(this);
    let dimentions = [
      {},
      { x: (x2 - x1) / 2 + x1, y: y1 - 20, r_m: this.attack_box.width + 30 },
    ];
    return dimentions[attack_n];
  }

  enemyGetHit(damage) {
    if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
    this.enemy.get_hit = true;
    this.enemy.health -= damage;
    this.damgeEffect(this.enemy, damage);
    this.enemy.updateSprite(this.enemy.sprites.takeHit);
  }

  handleAttack1() {
    if (this.attack_again) {
      let [x1, x2, y1] = getCoordinate(this);
      let b_x1 = this.flip === 1 ? x1 : x2 - this.attack_box.width;

      let { framesMax, damge } = this.sprites.attack[0];

      let attack_box = {
        x: b_x1,
        y: y1 - 40,
        w: this.attack_box.width + 20,
        h: this.height + 70,
      };

      if (
        this.attackBoxCollition(attack_box, true) &&
        this.enemy_get_hit1[this.frameCurrent] === false
      ) {
        this.enemy_get_hit1[this.frameCurrent] = true;
        this.enemyGetHit(damge);
      }
      this.enemy.get_hit = false;
      this.attack_effects[0].update();
      this.offset = this.sprites_offset.attack[0][this.flip];
      this.updateSprite(this.sprites.attack[0]);

      //reset frame
      if (this.frameCurrent === framesMax - 1) {
        this.attack_again = false;
        for (let hf in this.sprites.attack[0].hitFrame) {
          this.enemy_get_hit1[hf] = false;
        }
      }
    } else {
      if (--this.attack_cool_down[0].cool_down < 0) {
        this.attack_cool_down[0].cool_down = this.attack_cool_down[0].max;
        this.attack_again = true;
      }
      this.offset = this.sprites_offset.idle[this.flip];
      this.updateSprite(this.sprites.idle);
    }
  }

  handleAttack2() {
    let [ex1, _, ey1] = getCoordinate(this.enemy);
    if (this.attack_again) {
      this.offset = this.sprites_offset.attack[1][this.flip];
      this.updateSprite(this.sprites.attack[1]);
      let d = this.getAttackDimention(1);
      let { framesMax, start_arc_frame, end_arc_frame, damge } =
        this.sprites.attack[1];

      let arc_collition =
        this.frameCurrent >= start_arc_frame &&
        this.frameCurrent <= end_arc_frame &&
        RectCircleColliding(
          { ...d, r: this.arc_r },
          {
            x: ex1,
            y: ey1,
            w: this.enemy.width,
            h: this.enemy.height,
          }
        );

      if (arc_collition && this.enemy_get_hit === false) {
        this.enemy_get_hit = true;
        this.enemyGetHit(damge);
      }
      this.enemy.get_hit = false;
      // attack effect
      if (
        this.enemy_get_hit &&
        this.attack_effects[1].frameCurrent <
          this.sprites.attack_effect[1].framesMax
      ) {
        this.attack_effects[1].update();
        if (this.attack_effect2_deal_damge_cool_down-- === 0) {
          this.enemyGetHit(5);
          this.attack_effect2_deal_damge_cool_down =
            this.attack_effect2_deal_damge_cool_down_max;
        }
      } else {
        this.attack_effects[1].frameCurrent = 0;
      }

      //reset frame
      if (this.frameCurrent === framesMax - 1) {
        this.arc_r = this.arc_r_max;
        this.attack_again = false;
        this.enemy_get_hit = false;
      } else if (this.frameCurrent >= start_arc_frame) {
        this.arc_r =
          this.arc_r >= d.r_m
            ? d.r_m
            : this.arc_r + d.r_m / (framesMax - 1 - start_arc_frame);
      }
    } else {
      if (--this.attack_cool_down[1].cool_down < 0) {
        this.attack_cool_down[1].cool_down = this.attack_cool_down[1].max;
        this.attack_again = true;
      }
      this.offset = this.sprites_offset.idle[this.flip];
      this.updateSprite(this.sprites.idle);
    }
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x1 : x2 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    // this.updateSprite(this.sprites.run);
    // this.attack_effects[0].update();
    c.fillStyle = "green";
    c.fillRect(b_x1, y1 - 40, this.attack_box.width + 20, this.height + 70);
  }

  update() {
    this.attack_effects[1].position = {
      x: this.enemy.position.x,
      y: this.enemy.position.y + 40,
    };

    this.attack_effects[0].position = {
      x: this.enemy.position.x,
      y: this.enemy.position.y + 100,
    };

    // this.handleAttack2();
    this.handleAttack1();

    // this.drawHealthBar();
    // this.detect_attack();
    super.update();
  }
}
