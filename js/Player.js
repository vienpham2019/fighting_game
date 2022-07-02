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
    damage,
    name,
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
    this.name = name;
    this.last_key = [];
    this.is_jump = false;
    this.platform;
    this.walls = [];
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
    this.gameCurrentX = position.x;
    this.changeScreen = {
      x1: 300,
      x2: 500,
      y1: canvas.height - 300,
      y2: canvas.height - 60,
    };
    this.floorImage = {
      w: 0,
    };
    this.enemys;
    this.health = 100;
    this.maxHealth = 100;

    this.shield = 100;
    this.maxShield = 100;

    this.level = 1;
    this.xp = 0;
    this.maxLevelXp = 100;

    this.temp_point = [0, 0];
    this.points = {
      point: [0, 0],
      health: [0, 40],
      speed: [0, 3],
      shield: [0, 30],
      "attack speed": [0, 19],
      damage: [0, 50],
    };

    this.info = {
      hp: 200,
      speed: moveSpeed.x,
      jump: moveSpeed.y,
      attack_speed: 20,
      crit_damage: 20,
      crit_chance: 10,
      damage,
      shield: 100,
    };

    this.boss = null;
    this.speed = moveSpeed;
    this.useCritPotion = false;
    this.playerItems = [
      {
        type: "shieldPotion",
        amount: 5,
        isUse: false,
        box: {},
        miliSecond: 0,
        second: 1,
        maxSecond: 1,
      },
      {
        type: "healPotion",
        amount: 5,
        isUse: false,
        box: {},
        miliSecond: 0,
        second: 1,
        maxSecond: 1,
      },
    ];
    this.totalCoints = 0;

    this.character_type = "player";
  }

  handleTakeHit(damge) {
    this.get_hit = true;
    this.shield -= damge;
    if (this.shield < 0) {
      this.health -= this.shield * -1;
      this.shield = 0;
    }
    this.updateSprite(this.sprites.takeHit);
  }

  handleHP(xp) {
    this.xp += xp;
    this.damgeEffect({ target: this, text: `+ ${xp} xp`, type: "xp" });
    if (this.xp > this.maxLevelXp) {
      this.level += Math.floor(this.xp / this.maxLevelXp);
      this.points.point[0] += Math.floor(this.xp / this.maxLevelXp);
      this.points.point[1] += Math.floor(this.xp / this.maxLevelXp);
      this.temp_point[0] += Math.floor(this.xp / this.maxLevelXp);
      this.temp_point[1] += Math.floor(this.xp / this.maxLevelXp);
      this.xp = this.xp % this.maxLevelXp;
      this.maxLevelXp += Math.floor(this.level * 100 * 0.3);
      this.damgeEffect({ target: this, text: `LV ${this.level}`, type: "xp" });
    }
  }

  // attack box colition
  rectCollition(enemy) {
    return (
      this.attack_box.position.x + this.attack_box.width >= enemy.position.x &&
      this.attack_box.position.x <= enemy.position.x + enemy.width &&
      this.attack_box.position.y + this.attack_box.height >= enemy.position.y &&
      this.attack_box.position.y <= enemy.position.y + enemy.height
    );
  }

  //   check collition with side of platform
  sideColition(w, camera) {
    let left = this.velocity.x < 0;
    let [x1, x2, _, y2] = getCoordinate(this);

    let [p_x1, p_x2, p_y1, p_y2] = getCoordinate(w);
    let check_go_right = !left && x2 >= p_x1 && x1 < p_x1;
    let check_go_left = left && x1 <= p_x2 && x2 > p_x2;
    let check_y = y2 > p_y1 && y2 < p_y2;
    if ((check_go_left || check_go_right) && check_y) {
      this.velocity.x = 0;
      camera.x = 0;
    }
  }

  //   check collition with floor of platform
  floorColition(platform, camera) {
    if (!platform) return;
    platform.color = "blue";
    let [x1, x2, _, y2] = getCoordinate(this);

    let [cp_x1, cp_x2, cp_y1] = getCoordinate(platform);

    if (
      y2 <= cp_y1 &&
      y2 + this.velocity.y >= cp_y1 &&
      ((cp_x1 <= x1 && cp_x2 >= x2) ||
        (x1 > cp_x1 && x1 < cp_x2) ||
        (x1 < cp_x1 && x2 > cp_x1))
    ) {
      if (this.platform != platform) {
        this.platform = platform;
        camera.offset.y = platform.position.y - camera.y;
        camera.offset.diff = camera.offset.y / camera.offset.delay_frame;
      }
      platform.color = "red";
    }
  }

  move(m, camera) {
    if (this.keys[m.left].pressed && this.last_key[0] === m.left) {
      if (
        this.gameCurrentX >= this.changeScreen.x1 &&
        this.position.x <= this.changeScreen.x1
      ) {
        this.velocity.x = 0;
      } else this.velocity.x = -this.speed.x;
      camera.x = -this.speed.x;

      this.flip = -1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else if (this.keys[m.right].pressed && this.last_key[0] === m.right) {
      if (
        this.gameCurrentX <=
          this.floorImage.x -
            (canvas.width - this.changeScreen.x2 + this.width) &&
        this.position.x >= this.changeScreen.x2
      ) {
        this.velocity.x = 0;
      } else this.velocity.x = this.speed.x;
      camera.x = this.speed.x;

      this.flip = 1;
      if (!this.is_jump) this.updateSprite(this.sprites["run"]);
    } else {
      if (!this.is_jump && !this.get_hit) {
        this.velocity.x = 0;
        camera.x = 0;
        this.updateSprite(this.sprites["idle"]);
      }
    }

    let y_pos = this.position.y + this.height + this.velocity.y;

    if (
      y_pos >= this.platform.position.y &&
      this.position.x + this.width > this.platform.position.x &&
      this.position.x < this.platform.position.x + this.platform.width
    ) {
      this.velocity.y = 0;
      this.is_jump = false;
      this.position.y =
        this.platform.position.y - this.height - this.velocity.y;
    } else {
      this.is_jump = true;
      this.velocity.y += gravity;
    }

    if (this.velocity.y < 0) {
      this.updateSprite(this.sprites["jump"]);
    } else if (this.velocity.y > 0) {
      if (
        this.position.y + this.height + this.velocity.y >
        camera.y + camera.fall_offset.y
      ) {
        camera.offset.y =
          this.position.y + this.height + this.velocity.y - camera.y;
        camera.offset.diff = camera.offset.y / camera.fall_offset.delay_frame;
      }
      this.updateSprite(this.sprites["fall"]);
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
      this.framesHold = Math.ceil((4 * (100 - this.info.attack_speed)) / 100);
      let sprite =
        this.sprites.attack[
          this.sprites.attack.length - this.attack_sprite_count
        ];

      this.updateSprite(sprite);
      this.attack_sprite = true;
      this.enemys.forEach((e) => {
        if (
          !e.get_hit &&
          this.frameCurrent === sprite.hitFrame &&
          this.rectCollition(e)
        ) {
          let damage = this.info.damage;
          if ("heavyAttack" in sprite) {
            damage = Math.floor(damage * sprite["heavyAttack"]);
          }
          let type = "damage";
          if (Math.random() > (100 - this.info.crit_chance) / 100) {
            damage += Math.floor(damage * (this.info.crit_damage / 100));
            type = "crit";
          }
          e.handelTakeHit({ damage, type });
        }

        if (this.frameCurrent === this.framesMax - 1) {
          e.get_hit = false;
        }
      });
      if (this.frameCurrent === this.framesMax - 1) {
        this.attack_sprite = false;
        this.attack_sprite_count--;
      }
    } else {
      this.framesHold = 4;
      this.is_attacking = false;
    }
  }

  jump() {
    if (!this.is_jump) {
      this.velocity.y = -this.speed.y;
      this.is_jump = true;
    }
  }

  update() {
    this.attack_box.offset.x =
      this.flip === -1 ? -(this.attack_box.width - 5) : this.width;

    this.attack_box.position.x = this.position.x + this.attack_box.offset.x;
    this.attack_box.position.y = this.position.y + this.attack_box.offset.y;

    this.handelAttack();
    super.update();
  }
}
