import { c } from "../../main.js";
import { getCoordinate } from "../../helper.js";

import { MagicEnemy } from "../magic_enemy/MagicEnemy.js";
import { Sprite } from "../../Sprite.js";

export class Sygnus extends MagicEnemy {
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
      health: 1000,
    });

    // this.magic_obj = {
    //   move: new Sprite({
    //     position: { x: position.x, y: position.y },
    //     ...sprites.magic_obj.move,
    //   }),
    //   explosion: new Sprite({
    //     position: { x: position.x, y: position.y },
    //     ...sprites.magic_obj.explosion,
    //   }),
    // };

    this.attack_effects = [];
    for (let a of sprites.attack_effect) {
      this.attack_effects.push(
        new Sprite({
          position: { x: position.x, y: position.y },
          ...a,
        })
      );
    }

    this.magicObjSpeed = { x: 15, y: 0 };

    this.attack_cool_down = 50;
    this.attack_cool_down_max = 50;
    this.maxHealth = 1000;
    this.canStuntWhenAttack = false;
    this.level = 3;

    this.sprites_offset = {
      idle: {
        [-1]: { x: 0, y: 5 },
        [1]: { x: 0, y: 5 },
      },
      run: {
        [-1]: { x: 0, y: 5 },
        [1]: { x: 0, y: 5 },
      },
      death: {
        [-1]: { x: 10, y: 19 },
        [1]: { x: 40, y: 19 },
      },
      takeHit: {
        [-1]: { x: 10, y: 6 },
        [1]: { x: 10, y: 6 },
      },
      attack: [
        {
          [-1]: { x: 50, y: 55 },
          [1]: { x: 50, y: 55 },
        },
        {
          [-1]: { x: 170, y: 100 },
          [1]: { x: 120, y: 100 },
        },
        {
          [-1]: { x: 0, y: 50 },
          [1]: { x: 0, y: 50 },
        },
      ],
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

    this.offset = this.sprites_offset.attack[2][this.flip];
    this.updateSprite(this.sprites.attack[2]);
    this.attack_effects[1].update();
    // this.updateSprite(this.sprites.run);
    c.fillStyle = "green";
    c.fillRect(b_x1, y1, this.attack_box.width, this.attack_box.height);
  }

  update() {
    // this.drawHealthBar();
    // this.detect_attack();
    this.drawHitBox();
    super.update();
  }
}
