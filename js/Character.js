import { c, canvas } from "./main.js";
import { Sprite } from "./Sprite.js";
const gravity = 0.7;
export class Character extends Sprite {
  constructor({
    position,
    velocity,
    offset,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesHold = 1,
  }) {
    super({ position, imageSrc, scale, framesMax, framesHold });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.last_key;
    this.is_jump = false;
    this.attack_box = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    };
    this.is_attacking = false;
  }

  // draw() {
  //   let { x, y } = this.position;
  //   c.fillStyle = "red";
  //   c.fillRect(x, y, this.width, this.height);

  //   // attack box
  //   if (this.is_attacking) {
  //     c.fillStyle = "green";
  //     c.fillRect(
  //       this.attack_box.position.x,
  //       this.attack_box.position.y,
  //       this.attack_box.width,
  //       this.attack_box.height
  //     );
  //   }
  // }

  update() {
    super.draw();
    this.attack_box.position.x = this.position.x + this.attack_box.offset.x;
    this.attack_box.position.y = this.position.y + this.attack_box.offset.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
      this.velocity.y = 0;
      this.is_jump = false;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.is_attacking = true;
    setTimeout(() => {
      this.is_attacking = false;
    }, 100);
  }
}
