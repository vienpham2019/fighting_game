import { getRandomArbitrary } from "../helper.js";
import { c } from "../main.js";
import { Sprite } from "../Sprite.js";

const gravity = 0.4;
export class Item extends Sprite {
  constructor({
    position,
    imageSrc,
    offset,
    width,
    height,
    amount = 1,
    player,
    type,
    platform,
    velocity,
    text,
  }) {
    super({ position, imageSrc, offset, width, height });
    this.player = player;
    this.amount = amount;
    this.isPickUp = false;
    this.type = type;
    this.text = text;
    this.platform = platform;
    this.velocity = velocity;
    this.itemsPanel;

    this.coolDown = 1000;
  }

  rectCollition() {
    return (
      this.position.x + this.width >= this.player.position.x &&
      this.position.x <= this.player.position.x + this.player.width &&
      this.position.y + this.height >= this.player.position.y &&
      this.position.y <= this.player.position.y + this.player.height
    );
  }

  addPotion({ type }) {
    for (let i = 0; i < this.player.playerItems.length; i++) {
      if (this.player.playerItems[i].type === type) {
        if (this.player.playerItems[i].amount < 15) {
          this.player.playerItems[i].amount++;
          this.isPickUp = true;
          return;
        }
      }
    }

    if (this.player.playerItems.length === 4) return;
    let maxSecond = type === "healPotion" || type === "shieldPotion" ? 1 : 15;
    this.player.playerItems.push({
      type,
      amount: 1,
      isUse: false,
      box: {
        x: this.itemsPanel.position.x + 48,
        y: this.itemsPanel.position.y + 54,
        my: this.itemsPanel.position.y + 54,
        w: 45,
        h: 41,
        mh: 41,
      },
      miliSecond: 0,
      maxSecond,
      second: maxSecond,
    });
    this.isPickUp = true;
  }

  detectColition() {
    if (!this.isPickUp && this.rectCollition()) {
      if (this.type === "coint") {
        this.player.totalCoints += this.amount;
        this.isPickUp = true;
      } else {
        this.addPotion({ type: this.type });
      }

      if (this.isPickUp) {
        this.player.damgeEffect({
          target: this.player,
          text: `+ ${this.amount} ${this.text} ${
            this.type === "coint" ? "$" : ""
          }`,
          type: "item",
        });
      }
    }
  }

  move() {
    if (
      this.position.x + this.width + this.velocity.x >
        this.platform.position.x + this.platform.width ||
      this.position.x + this.velocity.x < this.platform.position.x
    ) {
      this.velocity.x = 0;
    }

    let y_pos = this.position.y + this.height + this.velocity.y;

    if (
      y_pos >= this.platform.position.y &&
      this.position.x + this.width > this.platform.position.x &&
      this.position.x < this.platform.position.x + this.platform.width
    ) {
      this.velocity.y = 0;
      this.velocity.x = 0;
      this.position.y =
        this.platform.position.y - this.height - this.velocity.y;
    } else {
      this.velocity.y += gravity;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  run() {
    super.update();
    this.move();

    this.detectColition();
  }
}
