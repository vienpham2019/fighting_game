import { getCoordinate, getRandomArbitrary } from "../../helper.js";

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
    this.attack_index = 0;
    this.set_attack_index = false;
  }

  detect_attack(last_index = 0) {
    if (this.enemy.health <= 0) {
      this.enemy.updateSprite(this.enemy.sprites.death);
    }

    if ("offset" in this.sprites.attack[this.attack_index]) {
      this.offset = this.sprites.attack[this.attack_index].offset[0];
    }

    if (
      (this.attackBoxCollition() || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.in_attack_range = true;
      if ("offset" in this.sprites.attack[this.attack_index]) {
        this.offset = this.sprites.attack[this.attack_index].offset[1];
      }

      this.color = "red";
      this.velocity.x = 0;
      if (this.attack_again) {
        if (this.image === this.sprites.attack[this.attack_index].image) {
          if (
            this.sprites.attack[this.attack_index].hitFrame[this.frameCurrent]
          ) {
            this.start_attack = true;

            if (
              this.enemy_get_hit[this.frameCurrent] === false &&
              this.attackBoxCollition()
            ) {
              this.enemy_get_hit[this.frameCurrent] = true;
              if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
              this.enemy.handleTakeHit(this.damage);
              if ("knockBack" in this.sprites.attack[this.attack_index]) {
                this.enemy.position.x -=
                  this.sprites.attack[this.attack_index].knockBack *
                  this.enemy.flip;
              }
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
        this.updateSprite(this.sprites.attack[this.attack_index]);
      } else {
        if (this.set_attack_index === false) {
          this.attack_index = getRandomArbitrary(0, last_index + 1);
          this.set_attack_index = true;
        }
        this.updateSprite(this.sprites.idle);

        if (this.attack_cool_down-- <= 0) {
          this.attack_again = true;
          this.set_attack_index = false;
          this.attack_cool_down = this.attack_cool_down_max;
          for (let hf in this.sprites.attack[this.attack_index].hitFrame) {
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
          this.attack_effects[i].position = {
            x: this.enemy.position.x + offset.x2,
            y: y1 + 10,
          };
          if (
            this.frameCurrent === this.sprites.attack_effect[i].trigger_frame &&
            this.attackBoxCollition()
          ) {
            this.attack_effects[i].update();
          }
        }
      }
    }
  }

  update() {
    super.update();
  }
}
