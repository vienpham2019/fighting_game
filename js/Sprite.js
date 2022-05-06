import { c, canvas } from "./main.js";
export class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesHold = 1,
    offset = { x: 0, y: 0 },
    flip = 1,
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
    this.flip = flip;
    this.stop_animation = false;
  }

  draw() {
    c.save();
    c.scale(this.flip, 1);
    c.drawImage(
      this.image,
      // crop image
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      // crop image
      (this.position.x - this.offset.x) * this.flip,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale * this.flip,
      this.image.height * this.scale
    );
    c.restore();
  }

  update() {
    this.draw();
    if (this.stop_animation === true) return;
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) this.frameCurrent++;
      else this.frameCurrent = 0;
    }
  }
}
