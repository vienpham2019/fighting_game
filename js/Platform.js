import { c } from "./main.js";

export class Platform {
  constructor({ position, width, height }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = "blue";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
