import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { PhysicEnemy } from "./PhysicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class WhiteWolf extends PhysicEnemy {
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
      health: 250,
    });
    this.attack_cool_down = 60;
    this.attack_cool_down_max = 60;

    this.maxHealth = 250;
    this.canStuntWhenAttack = false;
    this.level = 3;
    this.hp = 200;

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
    let b_x1 = this.flip === 1 ? x2 : x1 - this.attack_box.width;

    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = this.color;
    c.rect(x, y, this.width, this.height);
    c.stroke();

    this.updateSprite(this.sprites.attack[0]);
    // this.updateSprite(this.sprites.run);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  update() {
    this.drawHealthBar();
    this.detect_attack();
    this.deteckAttackEffect();
    super.update();
  }
}
