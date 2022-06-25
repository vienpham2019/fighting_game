import { c, canvas } from "../main.js";
import { Character } from "../Character.js";
import { getCoordinate, getRandomArbitrary, createItem } from "../helper.js";

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
    this.in_attack_range = false;
    this.character_type = "enemy";
    this.addHp = false;

    this.itemsObj = [];

    this.dropItems = false;

    this.palseMoveCoolDown = 0;
    this.setPalseMoveCoolDown = false;

    this.continueMoveCoolDown = getRandomArbitrary(100, 500);
    this.setContinueMoveCoolDown = false;

    this.level = 1;
    this.updateFlip = false;

    let random = getRandomArbitrary(2, 6);
    for (let i = 0; i < random; i++) {
      this.itemsObj.push(createItem({ type: "coint", position, platform }));
    }

    if (Math.random() > 0.7) {
      this.itemsObj.push(
        createItem({ type: "healPotion", position, platform })
      );
    }
    if (Math.random() > 0.7) {
      this.itemsObj.push(
        createItem({ type: "shieldPotion", position, platform })
      );
    }
    if (Math.random() > 0.98) {
      this.itemsObj.push(
        createItem({ type: "critPotion", position, platform })
      );
    }
  }

  handleGameMove(move_postition) {
    this.position.x += move_postition.x;
    this.position.y += move_postition.y;
  }

  handelTakeHit({ damage, type }) {
    this.get_hit = true;

    if (this.health > 0) {
      this.damgeEffect({
        target: this,
        text: `${type === "crit" ? "✷" : ""} ${damage}`,
        type,
      });
      this.health -= damage;
    }
    if (this.health <= 0) {
      this.updateSprite(this.sprites.death);
      if (!this.addHp) {
        this.enemy.handleHP(this.hp);
        this.addHp = true;
      }
    } else if (this.in_attack_range === false) {
      this.updateSprite(this.sprites.takeHit);
      this.flip = this.enemy.flip * -1;
    }
  }

  drawHealthBar() {
    let health_bar_width =
      this.width * (this.health / this.maxHealth) > 0
        ? this.width * (this.health / this.maxHealth)
        : 0;
    c.fillStyle = "#FF1C1C";
    c.lineWidth = 2;

    c.font = "10px Arial";
    c.fillStyle = "white";
    c.fillText(
      `${this.name} (${this.level})`,
      this.position.x,
      this.position.y - 13
    );

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
    this.updateFlip = false;
    let [x1, x2] = getCoordinate(this);

    let [p_x1, p_x2] = getCoordinate(this.platform);

    if (x1 <= p_x1 || x2 >= p_x2) {
      this.velocity.x *= -1;
      this.flip *= -1;
      this.updateFlip = true;
    }

    if (this.continueMoveCoolDown-- > 0) {
      this.updateSprite(this.sprites.run);

      this.velocity.x = this.speed.x * this.flip;
    } else {
      this.velocity.x = 0;
      this.updateSprite(this.sprites.idle);

      if (this.setPalseMoveCoolDown === false) {
        this.setPalseMoveCoolDown = true;
        this.setContinueMoveCoolDown = false;
        this.palseMoveCoolDown = getRandomArbitrary(100, 300);
      }

      if (this.palseMoveCoolDown > 0) {
        if (
          --this.palseMoveCoolDown <= 0 &&
          this.setContinueMoveCoolDown === false
        ) {
          if (
            Math.random() > 0.5 &&
            x1 + this.velocity.x > p_x1 + Math.floor(this.width) &&
            x2 + this.velocity.x < p_x2 - Math.floor(this.width) &&
            this.updateFlip === false
          ) {
            this.velocity.x *= -1;
            this.flip *= -1;
          }

          this.setPalseMoveCoolDown = false;
          this.setContinueMoveCoolDown = true;
          this.continueMoveCoolDown = getRandomArbitrary(100, 500);
        }
      }
    }
  }

  attackBoxCollition(attack_box = this.attack_box, fix_attack_box = false) {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1, b_x2, b_y1, b_y2;
    if (fix_attack_box) {
      b_x1 = attack_box.x;
      b_x2 = attack_box.x + attack_box.w;
      b_y1 = attack_box.y;
      b_y2 = attack_box.y + attack_box.h;
    } else {
      b_x1 = this.flip === 1 ? x2 : x1 - attack_box.width;
      b_x2 = this.flip === 1 ? x2 + attack_box.width : x1;
      b_y1 = y1;
      b_y2 = y1 + attack_box.height;
    }

    let [e_x1, e_x2, e_y1, e_y2] = getCoordinate(this.enemy);
    let check_x =
      (e_x1 <= b_x1 && e_x2 >= b_x2) ||
      (b_x1 > e_x1 && b_x1 < e_x2) ||
      (b_x1 < e_x1 && b_x2 > e_x1);

    return check_x && b_y2 >= e_y1 && b_y1 <= e_y2;
  }

  update() {
    if (this.stop_animation) {
      this.velocity.x = 0;
      if (--this.stop_animation_delay <= 0) this.is_death = true;
    }
    super.update();
  }
}
