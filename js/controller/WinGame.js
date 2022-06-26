import { getRandomArbitrary } from "../helper.js";
import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
export class WinGame extends Sprite {
  constructor({ player }) {
    super({
      position: { x: 0, y: 0 },
      imageSrc: "../../img/platforms/win platform.png",
      offset: { x: 0, y: 0 },
      width: 1424,
      height: 676,
    });
    this.isWinGame = false;
    this.player = player;
    this.goldChest = new Sprite({
      position: { x: 570, y: 388 },
      imageSrc: "../../img/gameObj/Chest.png",
      scale: 1,
      framesMax: 8,
      offset: { x: 20, y: 17 },
      framesHold: 4,
      width: 60,
      height: 39,
    });

    this.golds = [
      new Sprite({
        position: { x: 570, y: 358 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 4,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 550, y: 370 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        flip: -1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 6,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 590, y: 368 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 9,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 460, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 3,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 580, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        flip: -1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 4,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 530, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        flip: -1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 4,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 620, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 6,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 670, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 5,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 490, y: 393 },
        imageSrc: "../../img/gameObj/Gold.png",
        scale: 1,
        flip: -1,
        framesMax: 6,
        offset: { x: 20, y: 17 },
        framesHold: 4,
        width: 60,
        height: 39,
      }),
    ];

    this.campFires = [
      new Sprite({
        position: { x: 270, y: 388 },
        imageSrc: "../../img/gameObj/camp fire.png",
        scale: 1,
        framesMax: 6,
        offset: { x: 10, y: 30 },
        framesHold: 7,
        width: 60,
        height: 39,
      }),
      new Sprite({
        position: { x: 970, y: 388 },
        imageSrc: "../../img/gameObj/camp fire.png",
        scale: 1,
        framesMax: 6,
        flip: -1,
        offset: { x: 10, y: 30 },
        framesHold: 8,
        width: 60,
        height: 39,
      }),
    ];

    this.flag1 = new Sprite({
      position: { x: 1120, y: 328 },
      imageSrc: "../../img/gameObj/flag 1.png",
      scale: 1,
      framesMax: 6,
      offset: { x: 10, y: 30 },
      framesHold: 7,
      width: 60,
      height: 39,
    });

    this.flag2 = new Sprite({
      position: { x: 500, y: 319 },
      imageSrc: "../../img/gameObj/flag 2.png",
      scale: 1,
      framesMax: 6,
      offset: { x: 10, y: 30 },
      framesHold: 8,
      width: 60,
      height: 39,
    });

    this.waterFountain = new Sprite({
      position: { x: 790, y: 374 },
      imageSrc: "../../img/gameObj/water fountain.png",
      scale: 1,
      framesMax: 6,
      offset: { x: 10, y: 30 },
      framesHold: 5,
      width: 60,
      height: 39,
    });
  }

  handleDraw() {
    this.flag2.update();
    this.golds.forEach((g) => {
      if (g.frameCurrent >= g.framesMax - 1) {
        g.framesHold = getRandomArbitrary(5, 10);
      }
      g.update();
    });

    this.goldChest.frameCurrent = 0;
    this.goldChest.update();

    this.campFires.forEach((c) => c.update());
    this.flag1.update();
    this.waterFountain.update();
  }

  run() {
    super.update();
    this.handleDraw();
  }
}
