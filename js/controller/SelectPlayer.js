import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
export class SelectPlayer extends Sprite {
  constructor({
    position = { x: 502, y: 236 },
    imageSrc,
    width = 420,
    height = 200,
    scale = 2,
    player,
  }) {
    super({ position, imageSrc, width, height, scale });
    this.player = player;
    this.open = false;
    this.buttons = [
      {
        x: 506,
        y: 254,
        w: 132,
        h: 163,
        name: "swordsman",
        title: "Swords Man",
        sprite: new Sprite({
          position: { x: 546, y: 314 },
          offset: { x: 142, y: 121 },
          imageSrc: "../../img/player_character/swordsman/Idle.png",
          framesMax: 8,
          framesHold: 4,
          height: 88,
          width: 52,
          scale: 1.7,
        }),
      },
      {
        x: 646,
        y: 254,
        w: 132,
        h: 163,
        name: "warior",
        title: "Warior",
        sprite: new Sprite({
          position: { x: 686, y: 314 },
          offset: { x: 130, y: 104 },
          imageSrc: "../../img/player_character/warior/Idle.png",
          height: 88,
          framesMax: 10,
          framesHold: 4,
          width: 52,
          scale: 1.9,
        }),
      },
      {
        x: 786,
        y: 254,
        w: 132,
        h: 163,
        name: "warior",
        title: "Warior",
        sprite: new Sprite({
          position: { x: 826, y: 314 },
          offset: { x: 130, y: 104 },
          imageSrc: "../../img/player_character/warior/Idle.png",
          height: 88,
          framesMax: 10,
          framesHold: 4,
          width: 52,
          scale: 1.9,
        }),
      },
    ];
  }

  run() {
    c.fillStyle = "rgba(0,0,0,0.8)";
    c.fillRect(0, 0, 1424, 676);

    c.fillStyle = "white";
    c.font = "30px Comic Sans MS";
    c.fillText("Select Character", 572, 216);

    super.update();
    this.buttons.forEach((b) => {
      c.fillStyle = "black";
      c.font = "12px Comic Sans MS";
      let metrics = c.measureText(b.title);
      c.fillText(b.title, b.x + (b.w - metrics.width) / 2, b.y + 30);
      b.sprite.update();
      //   c.beginPath();
      //   c.strokeStyle = "red";
      //   c.rect(b.x, b.y, b.w, b.h);
      //   c.stroke();
    });
  }
}
