import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
export class EndGame extends Sprite {
  constructor({ player }) {
    super({
      position: { x: 0, y: 0 },
      imageSrc: "../../img/background/EndGame.png",
      offset: { x: 0, y: 0 },
      width: 1424,
      height: 676,
    });
    this.isEndGame = false;
    this.player = player;
    this.buttons = [
      { type: "yes", x: 540, y: 328, w: 115, h: 45 },
      { type: "no", x: 770, y: 332, w: 115, h: 45 },
    ];
    this.opacity = 0;
    this.openEndGame = false;
    this.coolDown = 50;
  }

  handleClickButton() {
    if (this.coolDown-- <= 0) {
      c.fillStyle = `rgba(0,0,0,${(this.opacity += 0.01)})`;
      c.fillRect(0, 0, this.width, this.height);
      if (this.opacity >= 1) {
        this.openEndGame = true;
      }
    }
  }

  run() {
    if (this.openEndGame) super.update();
    else this.handleClickButton();
  }
}
