import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { Enemy } from "../Enemy.js";

export class Boomer extends Enemy {
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
      position: { ...position, y: position.y },
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
      health: 10,
    });

    this.maxHealth = 10;
    this.canStuntWhenAttack = false;
    this.level = 1;
    this.damage = 20;
    this.enemy_get_hit = false;
  }

  enemyGetHit(damage) {
    if (!this.enemy.is_attacking) this.enemy.flip = this.flip * -1;
    this.enemy.get_hit = true;
    this.enemy.health -= damage;
    this.damgeEffect(this.enemy, damage);
    this.enemy.updateSprite(this.enemy.sprites.takeHit);
  }

  detect_attack() {
    if (this.enemy.health <= 0)
      this.enemy.updateSprite(this.enemy.sprites.death);
    let [x1, x2, y1] = getCoordinate(this);
    let [ex1] = getCoordinate(this.enemy);
    let a_x1 = x1 - this.attack_box.width;
    let a_x2 = x2 + this.attack_box.width;

    let attack_box = {
      x: a_x1,
      y: y1,
      w: a_x2 - a_x1,
      h: this.attack_box.height,
    };

    if (
      (this.attackBoxCollition(attack_box, true) || this.in_attack_range) &&
      this.enemy.health > 0
    ) {
      if (ex1 - x1 < 0) this.flip = -1;
      this.in_attack_range = true;
      this.velocity.x = 0;
      this.updateSprite(this.sprites.death);
      if (
        this.enemy_get_hit === false &&
        this.frameCurrent === 5 &&
        this.attackBoxCollition(attack_box, true)
      ) {
        this.enemyGetHit(this.damage);
        this.enemy_get_hit = true;
      }

      this.enemy.get_hit = false;
    } else {
      this.updateSprite(this.sprites.run);
      this.enemy_get_hit = false;
      this.move();
    }
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = x1 - this.attack_box.width;
    let b_x2 = x2 + this.attack_box.width;
    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.updateSprite(this.sprites.run);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, b_x2 - b_x1, this.attack_box.height);
  }

  update() {
    this.drawHealthBar();
    this.detect_attack();
    super.update();
  }
}
