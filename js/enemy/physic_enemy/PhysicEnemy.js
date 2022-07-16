import { getCoordinate } from "../../helper.js";

import { Enemy } from "../Enemy.js";

export class PhysicEnemy extends Enemy {
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
    health,
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
      health,
    });
    this.enemy_type = "physic";
    this.enemy_get_hit = {};
    for (let hf in sprites.attack[0].hitFrame) {
      this.enemy_get_hit[hf] = false;
    }
  }

  detect_attack() {
    if (this.enemy.health <= 0) {
      this.enemy.updateSprite(this.enemy.sprites.death);
    }

    if ("offset" in this.sprites.attack[0]) {
      this.offset = this.sprites.attack[0].offset[0];
    }

    if (
      (this.attackBoxCollition() || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.in_attack_range = true;
      if ("offset" in this.sprites.attack[0]) {
        this.offset = this.sprites.attack[0].offset[1];
      }

      this.color = "red";
      this.velocity.x = 0;
      if (this.attack_again) {
        if (this.image === this.sprites.attack[0].image) {
          if (this.sprites.attack[0].hitFrame[this.frameCurrent]) {
            this.start_attack = true;

            if (
              this.enemy_get_hit[this.frameCurrent] === false &&
              this.attackBoxCollition()
            ) {
              this.enemy_get_hit[this.frameCurrent] = true;
              if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
              this.enemy.handleTakeHit(this.damage);
              this.damgeEffect({
                target: this.enemy,
                text: this.damage,
                type: "damage",
              });
            } else {
              this.in_attack_range = false;
            }
            this.enemy.get_hit = false;
          }
          this.attack_again = this.frameCurrent < this.framesMax - 1;
        }
        this.updateSprite(this.sprites.attack[0]);
      } else {
        this.updateSprite(this.sprites.idle);
        if (this.attack_cool_down-- <= 0) {
          this.attack_again = true;
          this.attack_cool_down = this.attack_cool_down_max;
          for (let hf in this.sprites.attack[0].hitFrame) {
            this.enemy_get_hit[hf] = false;
          }
        }
      }
    } else {
      this.attack_again = true;
      this.move();
      this.color = "green";
      this.in_attack_range = false;
    }
  }

  deteckAttackEffect(offset = { x1: 0, x2: 50 }) {
    for (let a of this.sprites.attack) {
      if (this.image === a.image) {
        let [x1, x2, y1] = getCoordinate(this);
        for (let i = 0; i < this.attack_effects.length; i++) {
          this.attack_effects[i].flip = this.flip * -1;
          let x = this.flip === 1 ? x2 + offset.x2 : x1 + offset.x1;
          this.attack_effects[i].position = {
            x,
            y: y1 + 10,
          };
          if (this.frameCurrent === this.sprites.attack_effect[i].trigger_frame)
            this.attack_effects[i].update();
        }
      }
    }
  }

  update() {
    super.update();
  }
}
