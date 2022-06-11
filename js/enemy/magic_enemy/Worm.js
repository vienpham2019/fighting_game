import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { MagicEnemy } from "./MagicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class Worm extends MagicEnemy {
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
    moveSpeed = { x: 1, y: 0 },
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
      health: 100,
    });
    this.magic_obj = {
      move: new Sprite({
        position: { x: position.x, y: position.y + 10 },
        ...sprites.magic_obj.move,
      }),
      explosion: new Sprite({
        position: { x: position.x, y: position.y + 10 },
        ...sprites.magic_obj.explosion,
      }),
    };
    this.magicObjSpeed = { x: 8, y: 0 };

    this.attack_cool_down = 70;
    this.attack_cool_down_max = 70;
    this.color = "green";

    this.maxHealth = 100;

    this.damage = 15;

    this.hp = 120;
    this.name = "Worm";
  }

  drawHitBox() {
    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();
  }

  update() {
    this.detect_attack();
    this.drawHealthBar();
    super.update();
  }
}
