import { Enemy } from "./Enemy.js";
import { Sprite } from "../Sprite.js";
import { c } from "../main.js";
import { getCoordinate } from "../helper.js";

export class Worm extends Enemy {
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
      health: 1000,
      moveSpeed,
      platform,
    });
    this.fire_ball = {
      move: new Sprite({
        position: { x: position.x, y: position.y + 10 },
        ...sprites.fire_ball.move,
      }),
      explosion: new Sprite({
        position: { x: position.x, y: position.y + 10 },
        ...sprites.fire_ball.explosion,
      }),
    };
    this.fireBallSpeed = 8;
    this.start_attack = false;
  }

  updateFireBallLocation() {
    this.fire_ball.move.position.x = this.position.x;
    this.fire_ball.move.flip = this.flip;
    if (this.flip === 1) {
      this.fire_ball.move.position.x += this.width;
      this.fire_ball.explosion.position.x += this.width;
    }
    this.fire_ball.explosion.frameCurrent = 0;
  }

  hitCollition() {
    let [x1, x2, y1, y2] = getCoordinate(this.fire_ball.move);
    let [e_x1, e_x2, e_y1, e_y2] = getCoordinate(this.enemy);
    return x2 >= e_x1 && x1 <= e_x2 && y2 >= e_y1 && y1 <= e_y2;
  }

  fireballMove() {
    if (this.start_attack) {
      if (
        !this.hitCollition() &&
        ((this.flip === -1 &&
          this.fire_ball.move.position.x >
            this.position.x - this.attack_box.width) ||
          (this.flip === 1 &&
            this.fire_ball.move.position.x <
              this.position.x + this.width + this.attack_box.width))
      ) {
        this.fire_ball.move.position.x += this.fireBallSpeed * this.flip;
        this.fire_ball.move.update();
      } else {
        if (
          this.fire_ball.explosion.frameCurrent <
          this.fire_ball.explosion.framesMax - 1
        ) {
          if (
            !this.enemy.get_hit &&
            this.hitCollition() &&
            this.fire_ball.explosion.frameCurrent === 0
          ) {
            this.enemy.get_hit = true;
            if (this.enemy.health <= 0)
              this.enemy.updateSprite(this.enemy.sprites.death);
            else {
              this.enemy.health -= this.sprites.attack[0].damge;
              this.enemy.updateSprite(this.enemy.sprites.takeHit);
            }
          }
          this.enemy.get_hit = false;
          this.fire_ball.explosion.position.x = this.fire_ball.move.position.x;
          this.flip === 1
            ? this.fire_ball.move.position.x +
              this.fire_ball.move.width +
              this.attack_box.width
            : this.fire_ball.move.position.x - this.attack_box.width;

          this.fire_ball.explosion.flip = this.flip;
          this.fire_ball.explosion.update();
        } else {
          this.updateFireBallLocation();
          this.attack_again = true;
          this.start_attack = false;
        }
      }
    }
  }

  detect_attack() {
    if (this.rectCollition(this.enemy)) {
      this.velocity.x = 0;
      if (this.attack_again) {
        if (this.image === this.sprites.attack[0].image) {
          if (this.frameCurrent === this.sprites.attack[0].hitFrame) {
            this.updateFireBallLocation();
            this.start_attack = true;
          }
          this.attack_again = this.frameCurrent < this.framesMax - 1;
        }
        this.updateSprite(this.sprites.attack[0]);
      } else {
        this.updateSprite(this.sprites.idle);
      }
      this.fireballMove();
    } else {
      this.updateSprite(this.sprites.run);
      this.attack_again = true;
      this.start_attack = false;
      this.move();
    }
  }

  update() {
    this.detect_attack();
    super.update();
  }
}
