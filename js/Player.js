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
    this.walls = [];
    this.floor = canvas.height;
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
    this.gameCurrentX = position.x;
    this.gameVelocity = { x: 0, y: 0 };
    this.changeScreen = { x1: 300, x2: 500, y1: 0, y2: 0 };
    this.floorImage = {
      w: 0,
    };
  }

  //   check collition with side of platform
  sideColition(w) {
    let left = this.velocity.x < 0;
    let [x1, x2, y1, y2] = getCoordinate(this);

    let [p_x1, p_x2, p_y1, p_y2] = getCoordinate(w);
    let check_go_right = !left && x2 >= p_x1 && x1 < p_x1;
    let check_go_left = left && x1 <= p_x2 && x2 > p_x2;
    let check_y = y2 > p_y1 && y2 < p_y2;
    if ((check_go_left || check_go_right) && check_y) {
      this.velocity.x = 0;
      this.gameVelocity.x = 0;
    }
  }

  //   check collition with floor of platform
  floorColition(platform) {
    if (!platform) return;
    let [x1, x2, y1, y2] = getCoordinate(this);

    let [cp_x1, cp_x2, cp_y1, cp_y2] = getCoordinate(platform);

    if (
      y2 <= cp_y1 &&
      y2 + this.velocity.y >= cp_y1 &&
      ((cp_x1 <= x1 && cp_x2 >= x2) ||
        (x1 > cp_x1 && x1 < cp_x2) ||
        (x1 < cp_x1 && x2 > cp_x1))
    ) {
      this.floor = cp_y1;
    }
  }

  move(m) {
    if (this.keys[m.left].pressed && this.last_key[0] === m.left) {
      if (
        this.gameCurrentX >= this.changeScreen.x1 &&
        this.position.x <= this.changeScreen.x1
      ) {
        this.velocity.x = 0;
      } else this.velocity.x = -this.speed.x;

      this.gameVelocity.x = -this.speed.x;

      this.flip = -1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else if (this.keys[m.right].pressed && this.last_key[0] === m.right) {
      if (
        this.gameCurrentX <=
          this.floorImage.x - this.changeScreen.x2 - this.width &&
        this.position.x >= this.changeScreen.x2
      ) {
        this.velocity.x = 0;
      } else this.velocity.x = this.speed.x;

      this.gameVelocity.x = this.speed.x;

      this.flip = 1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else {
      if (!this.is_jump && !this.get_hit) {
        this.velocity.x = 0;
        this.gameVelocity.x = 0;
        this.updateSprite(this.sprites["idle"]);
      }
    }

    if (this.velocity.y < 0) {
      this.updateSprite(this.sprites["jump"]);
    } else if (this.velocity.y > 0) {
      this.updateSprite(this.sprites["fall"]);
    }

    let y_pos = this.position.y + this.height + this.velocity.y;

    if (y_pos >= this.floor) {
      this.velocity.y = 0;
      this.is_jump = false;
      this.position.y = this.floor - this.height - this.velocity.y;
    } else {
      this.is_jump = true;
      this.velocity.y += gravity;
    }
  }

  attack() {
    if (this.attack_sprite_count === 0 && !this.is_attacking) {
      this.is_attacking = true;
      this.attack_sprite_count = this.sprites.attack.length;
    }
  }

  handelAttack() {
    if (this.attack_sprite_count > 0) {
      let sprite =
        this.sprites.attack[
          this.sprites.attack.length - this.attack_sprite_count
        ];

      this.updateSprite(sprite);
      this.attack_sprite = true;
      if (
        !this.enemy.get_hit &&
        this.frameCurrent === sprite.hitFrame &&
        this.rectCollition(this.enemy)
      ) {
        this.enemy.get_hit = true;
        if (this.enemy.health <= 0)
          this.enemy.updateSprite(this.enemy.sprites.death);
        else {
          this.damgeEffect(this.enemy, sprite.damge);
          this.enemy.health -= sprite.damge;
          this.enemy.updateSprite(this.enemy.sprites.takeHit);
        }
      }

      if (this.frameCurrent === this.framesMax - 1) {
        this.attack_sprite = false;
        this.enemy.get_hit = false;
        this.attack_sprite_count--;
      }
    } else this.is_attacking = false;
  }

  jump() {
    if (!this.is_jump) {
      this.velocity.y = -this.speed.y;
      this.is_jump = true;
    }
  }

  update() {
    this.handelAttack();
    super.update();
  }
}
