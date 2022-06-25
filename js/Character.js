import { getRandomArbitrary } from "./helper.js";
import { c, canvas } from "./main.js";
import { Sprite } from "./Sprite.js";

export class Character extends Sprite {
  constructor({
    position,
    velocity,
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
    health = 100,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesHold,
      offset,
      flip,
    });
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.attack_box = attack_box;
    this.sprites = sprites;
    this.attack_sprite_count = 0;
    this.attack_sprite = false;
    this.get_hit = false;
    this.health = health;
    this.damges = [];

    for (const sprite in sprites) {
      if (Array.isArray(sprites[sprite])) {
        for (let index in sprites[sprite]) {
          sprites[sprite][index].image = new Image();
          sprites[sprite][index].image.src = sprites[sprite][index].imageSrc;
        }
      } else {
        sprites[sprite].image = new Image();
        sprites[sprite].image.src = sprites[sprite].imageSrc;
      }
    }
  }

  hitboxdraw() {
    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = "red";
    c.rect(x, y, this.width, this.height);
    c.stroke();

    // attack box
    if (this.is_attacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attack_box.position.x,
        this.attack_box.position.y,
        this.attack_box.width,
        this.attack_box.height
      );
    }
  }

  damgeEffect({ target, text, type = "crit" }) {
    if (type === "damage" || type === "crit") text = "⚔" + text;
    let metrics = c.measureText(text);
    target.damges.push({
      target,
      width: metrics.width,
      x: target.position.x + target.width / 2 - metrics.width / 2,
      y: target.position.y - 6,
      width: Math.floor(metrics.width),
      height: Math.floor(metrics.height),
      text,
      alpha: 1,
      time: 60,
      type,
    });
  }

  updateSprite(sprite) {
    // override death
    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.sprites.death.framesMax - 1)
        this.stop_animation = true;
      return;
    }

    // override take hit
    if (
      this.sprites.takeHit &&
      this.image === this.sprites.takeHit.image &&
      this.frameCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    //override attack
    if (this.attack_sprite) return;

    if (sprite.image !== this.image) {
      this.image = sprite.image;
      this.framesMax = sprite.framesMax;
      this.frameCurrent = 0;
    }
  }

  drawDamageEffect() {
    this.damges.forEach((d, i) => {
      // Add three color stops
      let gradient_color_1;
      let gradient_color_2;
      let fontSize = "20px";
      switch (d.type) {
        case "damage":
          gradient_color_1 = "255, 255, 255";
          gradient_color_2 = "214, 0, 0";
          fontSize = "20px";
          break;
        case "crit":
          gradient_color_1 = "255, 255, 255";
          gradient_color_2 = "255, 255, 255";
          fontSize = "24px";
          break;
        case "item":
          gradient_color_1 = "255, 255, 255";
          gradient_color_2 = "0, 255, 247";
          fontSize = "16px";
          break;
        case "hp":
          gradient_color_1 = "255, 255, 255";
          gradient_color_2 = "0, 255, 143";
          fontSize = "16px";
          break;
        default:
          break;
      }

      (d.x = d.target.position.x + d.target.width / 2 - d.width / 2),
        (c.font = `bold ${fontSize} Comic Sans MS`);
      c.strokeStyle = "black";
      c.lineWidth = 3;
      c.strokeText(d.text, d.x, d.y);
      let gradient = c.createLinearGradient(
        d.x,
        d.y,
        d.x + d.width * 1.5,
        d.y + d.width / 2
      );

      gradient.addColorStop(1, `rgba(${gradient_color_1}, ` + d.alpha + ")");
      gradient.addColorStop(0, `rgba(${gradient_color_2},` + d.alpha + ")");
      gradient.addColorStop(1, `rgba(${gradient_color_1}, ` + d.alpha + ")");

      c.fillStyle = gradient;
      c.fillText(d.text, d.x, d.y--);
      d.time--;
      d.alpha -= 0.009;
      if (d.time <= 0) {
        this.damges.splice(i, 1);
      }
    });
  }

  update() {
    super.update();

    this.position.y += this.velocity.y;
    if (this.health > 0) this.position.x += this.velocity.x;
  }
}
