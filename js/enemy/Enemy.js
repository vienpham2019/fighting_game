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
    this.attack_again = true;
    this.enemy;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  drawAttackRange() {
    c.fillStyle = "green";
    c.fillRect(
      this.attack_box.position.x,
      this.attack_box.position.y,
      this.attack_box.width,
      this.attack_box.height
    );
  }

  drawTrackRange() {
    c.fillStyle = "blue";
    c.fillRect(
      this.attack_box.position.x,
      this.attack_box.position.y,
      this.attack_box.width + 50,
      this.attack_box.height
    );
  }

  move() {
    let [x1, x2, y1, y2] = getCoordinate(this);

    let [p_x1, p_x2, p_y1, p_y2] = getCoordinate(this.platform);

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

  update() {
    super.update();
  }
}
