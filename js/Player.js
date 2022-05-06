import { c, canvas } from "./main.js";
import { Character } from "./Character.js";

const gravity = 0.7;
export class Player extends Character {
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
    attack_box,
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
    });
    this.last_key = [];
    this.is_jump = false;
    this.keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },

      ArrowLeft: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
    };
    this.speed = {
      x: 5,
      y: 18,
    };
  }

  move(m) {
    if (this.keys[m.left].pressed && this.last_key[0] === m.left) {
      this.velocity.x = -this.speed.x;
      this.flip = -1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else if (this.keys[m.right].pressed && this.last_key[0] === m.right) {
      this.velocity.x = this.speed.x;
      this.flip = 1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else {
      if (!this.is_jump && !this.get_hit) {
        this.velocity.x = 0;
        this.updateSprite(this.sprites["idle"]);
      }
    }

    if (this.velocity.y < 0) {
      this.updateSprite(this.sprites["jump"]);
    } else if (this.velocity.y > 0) {
      this.updateSprite(this.sprites["fall"]);
    }
  }

  jump() {
    if (!this.is_jump) {
      this.velocity.y = -this.speed.y;
      this.is_jump = true;
    }
  }

  update() {
    super.update();

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.is_jump = false;
      this.position.y = canvas.height - this.height - this.velocity.y;
    } else {
      this.is_jump = true;
      this.velocity.y += gravity;
    }
  }
}
