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
  }

  drawHealthBar() {
    let health_bar_width =
      this.width * (this.health / 100) > 0
        ? this.width * (this.health / 100)
        : 0;
    c.fillStyle = "red";
    c.fillRect(
      this.position.x + health_bar_width,
      this.position.y - 10,
      this.width - health_bar_width,
      4
    );
    c.fillStyle = "green";
    c.fillRect(this.position.x, this.position.y - 10, health_bar_width, 4);
  }

  move() {
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

    if (this.get_hit) {
      this.flip = this.enemy.flip * -1;
    }
  }

  attackBoxCollition() {
    let [x1, x2, y1, y2] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;
    let b_x2 = this.flip === 1 ? x2 + this.attack_box.width : x2;
    let b_y1 = y1;
    let b_y2 = y2;
    let [e_x1, e_x2, e_y1, e_y2] = getCoordinate(this.enemy);
    let check_x =
      (e_x1 <= b_x1 && e_x2 >= b_x2) ||
      (b_x1 > e_x1 && b_x1 <= e_x2) ||
      (b_x1 < e_x1 && b_x2 >= e_x1);

    return check_x && b_y2 >= e_y1 && b_y1 <= e_y2;
  }

  update() {
    if (this.stop_animation) {
      if (--this.stop_animation_delay <= 0) this.is_death = true;
    }
    super.update();
  }
}