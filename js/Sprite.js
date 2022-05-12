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
    width = 50,
    height = 150,
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
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
    c.globalAlpha = 1;
    if (this.stop_animation) c.globalAlpha -= 0.2;
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

  frame_animate() {
    if (this.stop_animation === true) return;
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) this.frameCurrent++;
      else this.frameCurrent = 0;
    }
  }

  update() {
    this.draw();
    this.frame_animate();
  }
}
