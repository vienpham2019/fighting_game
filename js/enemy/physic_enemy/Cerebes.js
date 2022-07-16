import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { PhysicEnemy } from "./PhysicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class Cerebes extends PhysicEnemy {
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
    moveSpeed = { x: 1.3, y: 0 },
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
      health: 400,
    });
    this.attack_cool_down = 10;
    this.attack_cool_down_max = 10;

    this.damage = 35;

    this.maxHealth = 400;
    this.xp = 320;
    this.name = "Cerebes";

    this.updateLevel = {
      xp: {
        1: 1,
        2: 1.2,
        3: 1.6,
        4: 1.9,
        5: 2.1,
        6: 2.3,
        7: 2.6,
        8: 2.9,
        9: 3.1,
        10: 3.3,
      },
      damage: {
        1: 1,
        2: 1.2,
        3: 1.5,
        4: 1.7,
        5: 1.9,
        6: 2.1,
        7: 2.4,
        8: 2.8,
        9: 3.1,
        10: 3.4,
      },
      health: {
        1: 1,
        2: 1.2,
        3: 1.4,
        4: 1.6,
        5: 1.8,
        6: 2.3,
        7: 2.5,
        8: 2.8,
        9: 3.1,
        10: 3.4,
      },
    };

    this.attack_effects = [];
    for (let a of sprites.attack_effect) {
      this.attack_effects.push(
        new Sprite({
          position: { x: position.x, y: position.y + 10 },
          ...a,
        })
      );
    }
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    this.attack_effects[0].update();

    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(
      this.attack_effects[0].position.x,
      this.attack_effects[0].position.y,
      this.attack_effects[0].width,
      this.attack_effects[0].height
    );
    c.stroke();

    let b_x1 =
      this.flip === 1
        ? x2 - this.attack_box.offset.x
        : x1 - this.attack_box.width + this.attack_box.offset.x;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.updateSprite(this.sprites.takeHit);
    c.fillStyle = "green";
    // c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  update() {
    if (this.image === this.sprites.death.image) {
      this.offset.y = 52;
    }
    // this.drawHitBox();
    this.drawHealthBar();
    this.detect_attack();
    this.deteckAttackEffect();
    super.update();
  }
}
