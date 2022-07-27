import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { PhysicEnemy } from "./PhysicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class Buffoon extends PhysicEnemy {
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
    moveSpeed = { x: 1.1, y: 0 },
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
      health: 450,
    });
    this.attack_cool_down = 60;
    this.attack_cool_down_max = 60;

    this.damage = 40;

    this.maxHealth = 450;
    this.xp = 320;

    this.name = "Buffoon";

    this.updateLevel = {
      xp: {
        1: 1,
        2: 1.5,
        3: 1.9,
        4: 2.3,
        5: 2.5,
        6: 2.9,
        7: 3.3,
        8: 3.7,
        9: 4.2,
        10: 4.5,
      },
      damage: {
        1: 1,
        2: 1.4,
        3: 1.9,
        4: 2.4,
        5: 2.9,
        6: 3.4,
        7: 3.8,
        8: 4.3,
        9: 4.7,
        10: 5.1,
      },
      health: {
        1: 1,
        2: 1.4,
        3: 1.7,
        4: 2.1,
        5: 2.5,
        6: 2.9,
        7: 3.4,
        8: 3.8,
        9: 4.3,
        10: 4.9,
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
    let b_x1 =
      this.flip === 1
        ? x2 - this.attack_box.offset.x
        : x1 - this.attack_box.width + this.attack_box.offset.x;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

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

    // this.updateSprite(this.sprites.attack[0]);
    this.updateSprite(this.sprites.attack[0]);
    // this.offset = this.sprites.attack[this.attack_index].offset[0];
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  update() {
    // this.drawHitBox();
    this.drawHealthBar();
    this.detect_attack();
    this.deteckAttackEffect({ x1: 0, x2: 0 });
    super.update();
  }
}
