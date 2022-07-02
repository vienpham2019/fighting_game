import { c } from "../../main.js";
import { getCoordinate, getRandomArbitrary, createItem } from "../../helper.js";

import { Sprite } from "../../Sprite.js";
import { Enemy } from "../Enemy.js";

export class Andras extends Enemy {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
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
    moveSpeed = { x: 1.5, y: 0 },
    platform,
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
      moveSpeed,
      platform,
      health: 3000,
    });
    this.name = "Andras";
    this.maxHealth = 3000;
    this.canStuntWhenAttack = false;
    this.level = 3;

    this.attack_cool_down = [
      { cool_down: 30, max: 30 },
      { cool_down: 30, max: 30 },
    ];

    this.enemy_get_hit = false;

    this.select_attacks = [true, false];
    for (let i = 0; i < 10; i++) {
      this.itemsObj.push(createItem({ type: "coint", position, platform }));
    }

    for (let i = 0; i < 3; i++) {
      this.itemsObj.push(
        createItem({ type: "shieldPotion", position, platform })
      );
      this.itemsObj.push(
        createItem({ type: "healPotion", position, platform })
      );
      this.itemsObj.push(
        createItem({ type: "critPotion", position, platform })
      );
    }
    this.itemsObj.push(
      createItem({ type: "permanetCritPotion", position, platform })
    );

    this.attack_effect = new Sprite({
      position: { x: position.x, y: position.y + 10 },
      ...sprites.attack_effect,
    });
  }

  handleGameMove({ x, y }) {
    super.handleGameMove({ x, y });
    this.attack_effect.position.x += x;
    this.attack_effect.position.y += y;
  }

  enemyGetHit(damage, knock_back) {
    let [x1, x2] = getCoordinate(this.enemy);

    let [p_x1, p_x2] = getCoordinate(this.platform);

    if (p_x1 <= x1 && p_x2 >= x2) {
      this.enemy.position.x += knock_back * this.flip;
    }

    if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
    this.enemy.handleTakeHit(damage);
    this.damgeEffect({ target: this.enemy, text: damage, type: "damage" });
  }

  handleAttack(attack_box, attack_n) {
    if (this.attack_again) {
      let { framesMax, damge } = this.sprites.attack[attack_n];

      if (
        this.attackBoxCollition(attack_box, true) &&
        this.enemy_get_hit === false &&
        this.sprites.attack[attack_n].hitFrame[this.frameCurrent]
      ) {
        this.enemy_get_hit = true;
        this.enemyGetHit(damge, attack_n === 0 ? 10 : 40);
      }
      this.enemy.get_hit = false;

      this.updateSprite(this.sprites.attack[attack_n]);

      if (
        this.frameCurrent >=
          this.sprites.attack_effect.trigger_frame[attack_n] &&
        this.enemy_get_hit
      ) {
        this.attack_effect.update();
      }

      //reset frame
      if (this.frameCurrent === framesMax - 1) {
        this.attack_again = false;
        this.enemy_get_hit = false;
        this.in_attack_range = false;
      }
    } else {
      if (--this.attack_cool_down[attack_n].cool_down < 0) {
        let a = Math.random() > 0.5;
        this.select_attacks = attack_n === 1 ? [!a, a] : [a, !a];
        this.attack_cool_down[attack_n].cool_down =
          this.attack_cool_down[attack_n].max;
        this.attack_again = true;
      }
      this.updateSprite(this.sprites.idle);
    }
  }

  detectAttack() {
    if (this.enemy.health <= 0)
      this.enemy.updateSprite(this.enemy.sprites.death);

    let [x1, x2, y1] = getCoordinate(this);
    let a_x1 =
      this.flip === 1
        ? x1 - this.attack_box.width
        : x2 - this.attack_box.width - this.width;
    let a_w = this.attack_box.width * 2 + this.width;
    let attack_box = {
      x: a_x1,
      y: y1,
      w: a_w,
      h: this.height,
    };

    // detect enemy position
    let range = 200;
    let m_x1 =
      this.flip === 1
        ? x1 - range
        : x2 - this.attack_box.width - this.width - range;
    let m_w = this.attack_box.width + range * 2 + this.width;
    let move_box = {
      x: m_x1,
      y: y1,
      w: m_w,
      h: this.height,
    };

    if (this.attackBoxCollition(move_box, true) && !this.in_attack_range) {
      this.flip = this.position.x - this.enemy.position.x > 0 ? -1 : 1;
      this.velocity.x = 0;
    }

    if (
      (this.attackBoxCollition(attack_box, true) || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      this.in_attack_range = true;
      this.color = "red";
      this.velocity.x = 0;

      if (this.select_attacks[0]) this.handleAttack(attack_box, 0);
      else this.handleAttack(attack_box, 1);
    } else {
      this.updateSprite(this.sprites.run);
      this.in_attack_range = false;
      this.attack_again = false;
      this.move();
      this.color = "green";
    }
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    // this.updateSprite(this.sprites.death);
    // this.updateSprite(this.sprites.run);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  update() {
    this.attack_effect.position = {
      x: this.enemy.position.x,
      y: this.enemy.position.y + 100,
    };

    this.detectAttack();
    super.update();
  }
}
