import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { Enemy } from "../Enemy.js";

export class MagicEnemy extends Enemy {
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
    this.enemy_type = "magic";
    this.enemy_get_hit = false;
  }

  handleGameMove(postition) {
    super.handleGameMove(postition);
    this.magic_obj.move.position.x += postition.x;
    this.magic_obj.explosion.position.x += postition.x;
    this.magic_obj.move.position.y += postition.y;
    this.magic_obj.explosion.position.y += postition.y;
  }

  updateMagicObjLocation() {
    this.magic_obj.move.position.x = this.position.x;
    this.magic_obj.move.flip = this.flip;
    if (this.flip === 1) {
      this.magic_obj.move.position.x += this.width;
      this.magic_obj.explosion.position.x += this.width;
    }
    this.magic_obj.explosion.frameCurrent = 0;
  }

  hitCollition() {
    let [x1, x2, y1, y2] = getCoordinate(this.magic_obj.move);
    let [e_x1, e_x2, e_y1, e_y2] = getCoordinate(this.enemy);
    let check_x =
      (e_x1 <= x1 && e_x2 >= x2) ||
      (x1 > e_x1 && x1 <= e_x2) ||
      (x1 < e_x1 && x2 >= e_x1);

    return check_x && y2 >= e_y1 && y1 <= e_y2;
  }

  magicObjExplosion(attack_n = 0) {
    if (
      this.enemy_get_hit === false &&
      this.hitCollition() &&
      this.magic_obj.explosion.frameCurrent === 0
    ) {
      this.enemy_get_hit = true;
      if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
      this.enemy.handleTakeHit(this.damage);
      this.damgeEffect({
        target: this.enemy,
        text: this.damage,
        type: "damage",
      });
    }
    this.enemy.get_hit = false;
    this.magic_obj.explosion.position.x = this.magic_obj.move.position.x;
    this.flip === 1
      ? this.magic_obj.move.position.x +
        this.magic_obj.move.width +
        this.attack_box.width
      : this.magic_obj.move.position.x - this.attack_box.width;

    this.magic_obj.explosion.flip = this.flip;
    this.magic_obj.explosion.update();
  }

  detectMagicObj() {
    if (this.start_attack) {
      if (
        !this.hitCollition() &&
        ((this.flip === -1 &&
          this.magic_obj.move.position.x >
            this.position.x - this.attack_box.width) ||
          (this.flip === 1 &&
            this.magic_obj.move.position.x <
              this.position.x + this.width + this.attack_box.width))
      ) {
        this.magic_obj.move.position.x += this.magicObjSpeed.x * this.flip;
        this.magic_obj.move.update();
      } else {
        if (
          this.magic_obj.explosion.frameCurrent <
          this.magic_obj.explosion.framesMax - 1
        ) {
          this.magicObjExplosion();
        } else {
          if (this.attack_cool_down-- === 0) {
            this.updateMagicObjLocation();
            if (this.enemy_get_hit === true) this.enemy_get_hit = false;
            this.attack_cool_down = this.attack_cool_down_max;
            this.attack_again = true;
            this.start_attack = false;
            this.in_attack_range = false;
          }
        }
      }
    }
  }

  detect_attack() {
    if (this.enemy.health <= 0) {
      this.enemy.updateSprite(this.enemy.sprites.death);
    }

    if (
      (this.attackBoxCollition() || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.color = "red";
      this.in_attack_range = true;
      this.velocity.x = 0;
      if (this.attack_again) {
        if (this.image === this.sprites.attack[0].image) {
          if (this.sprites.attack[0].hitFrame[this.frameCurrent]) {
            this.updateMagicObjLocation();
            this.start_attack = true;
          }
          this.attack_again = this.frameCurrent < this.framesMax - 1;
        }
        this.updateSprite(this.sprites.attack[0]);
      } else {
        this.updateSprite(this.sprites.idle);
      }
      this.detectMagicObj();
    } else {
      this.attack_again = true;
      this.start_attack = false;
      this.move();
      this.color = "green";
    }
  }

  update() {
    super.update();
  }
}
