import { c, canvas } from "../main.js";
import { Character } from "../Character.js";
import { getCoordinate } from "../helper.js";

export class Enemy extends Character {
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
      health,
    });
    this.platform = platform;
    this.floor = canvas.height;
    this.speed = moveSpeed;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.is_death = false;
    this.stop_animation_delay = 20;
    this.attack_again = true;
    this.enemy_get_hit = false;
    this.in_attack_range = false;
  }

  drawHealthBar() {
    let health_bar_width =
      this.width * (this.health / this.maxHealth) > 0
        ? this.width * (this.health / this.maxHealth)
        : 0;
    c.fillStyle = "#FF1C1C";

    c.fillRect(
      this.position.x + health_bar_width,
      this.position.y - 10,
      this.width - health_bar_width,
      4
    );
    c.fillStyle = "#1FFF1C";
    c.fillRect(this.position.x, this.position.y - 10, health_bar_width, 4);

    c.strokeStyle = "black";
    c.strokeRect(this.position.x, this.position.y - 10, this.width, 4);
  }

  move() {
    if (this.get_hit) {
      this.velocity.x = 0;
      this.flip = this.enemy.flip * -1;
    }

    let [x1, x2] = getCoordinate(this);

    let [p_x1, p_x2] = getCoordinate(this.platform);

    if (x1 <= p_x1 || x2 >= p_x2) {
      this.velocity.x *= -1;
      this.flip *= -1;
    }
    if (this.velocity.x === 0) {
      if (this.flip === 1) {
        this.velocity.x = this.speed.x;
      } else {
        this.velocity.x = -this.speed.x;
      }
    }
  }

  attackBoxCollition() {
    let [x1, x2, y1, y2] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;
    let b_x2 = this.flip === 1 ? x2 + this.attack_box.width : x1;
    let b_y1 = y1;
    let b_y2 = y2;
    let [e_x1, e_x2, e_y1, e_y2] = getCoordinate(this.enemy);
    let check_x =
      (e_x1 <= b_x1 && e_x2 >= b_x2) ||
      (b_x1 > e_x1 && b_x1 < e_x2) ||
      (b_x1 < e_x1 && b_x2 > e_x1);

    return check_x && b_y2 >= e_y1 && b_y1 <= e_y2;
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
          if (this.sprites.attack[0].hitFrame[this.frameCurrent]) {
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
    if (this.stop_animation) {
      if (--this.stop_animation_delay <= 0) this.is_death = true;
    }
    super.update();
  }
}
