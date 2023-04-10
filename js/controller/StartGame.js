import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
import { SelectPlayer } from "./SelectPlayer.js";
export class StartGame extends Sprite {
  constructor({ player }) {
    super({
      position: { x: 0, y: 0 },
      imageSrc: "../../img/background/start game cover.png",
      offset: { x: 0, y: 0 },
      width: 1424,
      height: 676,
    });
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

    this.portal = new Sprite({
      position: {
        x: 1354,
        y: 340,
      },
      offset: { x: 80, y: 30 },
      width: 100,
      height: 200,
      scale: 0.4,
      framesMax: 9,
      framesHold: 7,
      flip: 1,
      imageSrc: "../img/gameObj/portal.png",
    });

    this.openPortal = false;
    this.opacity = 0;
  }

  handleStartGame() {
    this.player.velocity.x = 3;
    this.player.updateSprite(this.player.sprites["walk"]);
    this.openPortal = true;
  }

  handleStartGameAnimation() {
    if (this.player.position.x >= this.portal.position.x) {
      this.player.velocity.x = 0;
      this.player.gameCurrentX = 0;
      this.player.updateSprite(this.player.sprites["idle"]);

      if (this.opacity >= 1) {
        this.player.position = { x: 0, y: 0 };
        this.isStartGame = true;
      }
      c.fillStyle = `rgba(0,0,0,${(this.opacity += 0.01)})`;
      c.fillRect(0, 0, this.width, this.height);
    }
  }

  run() {
    super.update();
    // this.player.updateSprite(this.player.sprites["walk"]);
    if (this.openPortal) {
      this.portal.update();
    }

    this.player.update();
    this.handleStartGameAnimation();
    if (this.selectPlayer.open === true && !this.openPortal) {
      this.selectPlayer.run();
    }
  }
}
