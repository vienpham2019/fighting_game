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
    this.damage = 18;
    this.hp = 250;
    this.name = "Ice Drake";

    this.updateLevel = {
      xp: {
        1: 1,
        2: 1.2,
        3: 1.6,
        4: 1.9,
        5: 2.1,
        6: 2.5,
        7: 2.9,
        8: 3.4,
        9: 3.8,
        10: 4.3,
      },
      damage: {
        1: 1,
        2: 1.2,
        3: 1.5,
        4: 1.7,
        5: 1.9,
        6: 2.3,
        7: 2.7,
        8: 3.4,
        9: 3.8,
        10: 4.3,
      },
      health: {
        1: 1,
        2: 1.4,
        3: 1.9,
        4: 2.3,
        5: 2.8,
        6: 3.2,
        7: 3.8,
        8: 4.1,
        9: 4.5,
        10: 4.9,
      },
    };
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
