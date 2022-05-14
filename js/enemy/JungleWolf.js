import { c } from "../main.js";
import { getCoordinate } from "../helper.js";

import { Enemy } from "./Enemy.js";
import { Sprite } from "../Sprite.js";

export class JungleWolf extends Enemy {
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
      health: 300,
    });
    this.attack_cool_down = 10;
    this.maxHealth = 300;
    this.canStuntWhenAttack = false;
    this.level = 3;

    this.attack_effect = new Sprite({
      position: { x: position.x, y: position.y + 10 },
      ...sprites.attack_effect,
    });
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
    // this.updateSprite(this.sprites.death);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.height);
  }

  deteckAttackEffect() {
    if (
      this.image === this.sprites.attack[0].image &&
      this.frameCurrent === this.sprites.attack_effect.trigger_frame
    ) {
      let [x1, x2, y1] = getCoordinate(this);
      this.attack_effect.flip = this.flip * -1;
      let x = this.flip === 1 ? x2 + 50 : x1;
      this.attack_effect.position = {
        x,
        y: y1 + 10,
      };
      this.attack_effect.update();
    }
  }

  update() {
    // this.drawHitBox();
    this.drawHealthBar();
    this.detect_attack();
    this.deteckAttackEffect();
    super.update();
  }
}
