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
    moveSpeed,
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
    this.platforms = [];
    this.currentPlatformIndex = 1;
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
    this.speed = moveSpeed;
  }

  //   check collition with side of platform
  sideColition() {
    let left = this.velocity.x < 0;
    let [x1, x2, y1, y2] = getCoordinate(this);
    let p_left = getCoordinate(this.platforms[this.currentPlatformIndex - 1]);

    let p_right = getCoordinate(this.platforms[this.currentPlatformIndex + 1]);

    if (!p_left || !p_right)
      console.log(p_left, p_right, this.currentPlatformIndex);
    let [lp_x1, lp_x2, lp_y1, lp_y2] = p_left;

    let [rp_x1, rp_x2, rp_y1, rp_y2] = p_right;

    let check_go_right = !left && x2 >= rp_x1 && x1 < rp_x1;
    let check_go_left = left && x1 <= lp_x2 && x2 > lp_x2;

    let check_y_left = (y1 < lp_y1 && y2 > lp_y2) || (y2 > lp_y1 && y2 < lp_y2);
    let check_y_right =
      (y1 < rp_y1 && y2 > rp_y2) || (y2 > rp_y1 && y2 < rp_y2);

    if ((check_go_left && check_y_left) || (check_go_right && check_y_right)) {
      this.velocity.x = 0;
    }
  }

  //   check collition with floor of platform
  floorColition() {
    let curr_p = this.platforms[this.currentPlatformIndex];
    let [x1, x2, y1, y2] = getCoordinate(this);

    let [cp_x1, cp_x2, cp_y1] = getCoordinate(curr_p);
    this.platforms[this.currentPlatformIndex].color = "blue";

    if (y2 <= cp_y1 && y1 < cp_y1 && x2 > cp_x1 && x1 < cp_x2) {
      this.floor = cp_y1;
    } else {
      if (this.velocity.x > 0) {
        this.floor = this.platforms[this.currentPlatformIndex].position.y;
        if (this.currentPlatformIndex + 1 < this.platforms.length)
          this.currentPlatformIndex++;
      }
      if (this.velocity.x < 0) {
        this.floor = this.platforms[this.currentPlatformIndex].position.y;
        if (this.currentPlatformIndex - 1 > 0) this.currentPlatformIndex--;
      }
    }

    this.platforms[this.currentPlatformIndex].color = "red";
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
