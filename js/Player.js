import { c, canvas } from "./main.js";
import { Character } from "./Character.js";
import { getCoordinate } from "./helper.js";

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
    this.platform;
    this.floor;
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
      y: 19,
    };
  }

  //   check collition with side of platform
  sideColition() {
    let left = this.velocity.x < 0;
    let { x1, x2, y1, y2, p_x1, p_x2, p_y1, p_y2 } = getCoordinate(
      this,
      this.platform
    );

    let check_go_right = !left && x2 >= p_x1 && x1 < p_x1;
    let check_go_left = left && x1 <= p_x2 && x2 > p_x2;

    let check_y = (y1 < p_y1 && y2 > p_y2) || (y2 > p_y1 && y2 < p_y2);

    if ((check_go_left || check_go_right) && check_y) {
      this.velocity.x = 0;
    }
  }

  //   check collition with floor of platform
  floorColition() {
    let { x1, x2, y1, y2, p_x1, p_x2, p_y1 } = getCoordinate(
      this,
      this.platform
    );

    if (y2 <= p_y1 && y1 < p_y1 && x2 > p_x1 && x1 < p_x2) {
      this.floor = p_y1;
    } else {
      this.floor = canvas.height;
    }
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

    let y_pos = this.position.y + this.height + this.velocity.y;

    this.floorColition();

    if (y_pos >= this.floor) {
      this.velocity.y = 0;
      this.is_jump = false;
      this.position.y = this.floor - this.height - this.velocity.y;
    } else {
      this.is_jump = true;
      this.velocity.y += gravity;
    }

    this.sideColition();
  }

  jump() {
    if (!this.is_jump) {
      this.velocity.y = -this.speed.y;
      this.is_jump = true;
    }
  }

  update() {
    super.update();
  }
}
