import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { MagicEnemy } from "./MagicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class IceDrake extends MagicEnemy {
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
      health: 200,
    });

    this.magic_obj = {
      move: new Sprite({
        position: { x: position.x, y: position.y },
        ...sprites.magic_obj.move,
      }),
      explosion: new Sprite({
        position: { x: position.x, y: position.y },
        ...sprites.magic_obj.explosion,
      }),
    };

    this.magicObjSpeed = { x: 15, y: 0 };

    this.attack_cool_down = 50;
    this.attack_cool_down_max = 50;
    this.maxHealth = 200;

    this.hp = 220;
  }

  drawHitBox() {
    let [x1, x2, y1] = getCoordinate(this);
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.updateSprite(this.sprites.attack[0]);
    // this.updateSprite(this.sprites.run);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.attack_box.height);
  }

  update() {
    this.drawHealthBar();
    this.detect_attack();
    super.update();
  }
}
