import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
import { SelectPlayer } from "./SelectPlayer.js";
export class StartGame extends Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imageSrc,
    offset = { x: 0, y: 0 },
    width = 1424,
    height = 676,
    player,
  }) {
    super({ position, imageSrc, offset, width, height });
    this.player = player;
    this.isStartGame = false;
    this.buttons = [
      { type: "start", x: 1150, y: 385, w: 100, h: 28 },
      { type: "options", x: 1150, y: 425, w: 100, h: 28 },
    ];
    this.selectPlayer = new SelectPlayer({
      imageSrc: "../../img/gameObj/select player.png",
      player,
    });
  }

  run() {
    super.update();
    this.player.position.y = 395;
    this.player.position.x = 600;
    this.player.update();
    if (this.selectPlayer.open === true) {
      this.selectPlayer.run();
    }
  }
}
