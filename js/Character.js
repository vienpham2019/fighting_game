import { c, canvas } from "./main.js";
import { Sprite } from "./Sprite.js";
const gravity = 0.7;
export class Character extends Sprite {
  constructor({
    position,
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
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesHold,
      offset,
      flip,
    });
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.last_key = [];
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
    this.sprites = sprites;

    for (const sprite in sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  hitboxdraw() {
    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = "red";
    c.rect(x, y, this.width, this.height);
    c.stroke();

    // attack box
    if (this.is_attacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attack_box.position.x,
        this.attack_box.position.y,
        this.attack_box.width,
        this.attack_box.height
      );
    }
  }

  updateSprite(s) {
    let sprite = this.sprites[s];

    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    if (sprite.image !== this.image) {
      this.image = sprite.image;
      this.framesMax = sprite.framesMax;
      this.frameCurrent = 0;
    }
  }

  update() {
    super.update();
    this.hitboxdraw();

    this.attack_box.position.x = this.position.x + this.attack_box.offset.x;
    this.attack_box.position.y = this.position.y + this.attack_box.offset.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
      this.velocity.y = 0;
      this.is_jump = false;
      this.position.y = canvas.height - 97 - this.height - this.velocity.y;
    } else {
      this.is_jump = true;
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.updateSprite("attack1");
    this.is_attacking = true;
    setTimeout(() => {
      this.is_attacking = false;
    }, 100);
  }
}
