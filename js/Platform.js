import { c } from "./main.js";

export class Platform {
  constructor({
    position,
    width,
    height,
    offset,
    portalFlip = 1,
    portalPlatform = false,
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.color = "blue";
    this.portalPlatform = portalPlatform;
    this.portalFlip = portalFlip;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "white";
    c.fillText(
      `w: ${this.width} - y: ${this.offset.y}`,
      this.position.x,
      this.position.y
    );
  }
}
