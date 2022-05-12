import { c } from "../main.js";
import { getCoordinate } from "../helper.js";

import { Enemy } from "./Enemy.js";

export class Skeleton extends Enemy {
  constructor({
    position = { x: 0, y: 0 },
    velocity,
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
    moveSpeed,
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
      health: 100,
    });
    this.attack_again = true;
    this.enemy_get_hit = false;
    this.in_attack_range = false;
    this.attack_cool_down = 50;
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.updateSprite(this.sprites.attack[0]);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  detect_attack() {
    if (this.enemy.health <= 0) {
      this.enemy.updateSprite(this.enemy.sprites.death);
    }

    if (
      (this.attackBoxCollition() || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.in_attack_range = true;
      this.color = "red";
      this.velocity.x = 0;
      if (this.attack_again) {
        if (this.image === this.sprites.attack[0].image) {
          if (this.frameCurrent === this.sprites.attack[0].hitFrame) {
            this.start_attack = true;

            if (this.enemy_get_hit === false && this.attackBoxCollition()) {
              this.enemy_get_hit = true;
              if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
              this.enemy.get_hit = true;
              this.enemy.health -= this.sprites.attack[0].damge;
              this.damgeEffect(this.enemy, this.sprites.attack[0].damge);
              this.enemy.updateSprite(this.enemy.sprites.takeHit);
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
          this.enemy_get_hit = false;
          this.attack_cool_down = 50;
        }
      }
    } else {
      this.updateSprite(this.sprites.run);
      this.attack_again = true;
      this.move();
      this.color = "green";
      this.in_attack_range = false;
    }
  }

  update() {
    this.drawHealthBar();
    this.detect_attack();
    super.update();
  }
}
