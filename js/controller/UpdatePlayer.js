import { c } from "../main.js";
export class UpdatePlayer {
  constructor({ player, playerInfo }) {
    this.playerInfo = playerInfo;
    this.player = player;
    this.buttons = [
      {
        type: "health",
        x: playerInfo.position.x + 119,
        y: playerInfo.position.y + 87,
        w: 20,
        h: 20,
      },
      {
        type: "speed",
        x: playerInfo.position.x + 119,
        y: playerInfo.position.y + 141,
        w: 20,
        h: 20,
      },
      {
        type: "shield",
        x: playerInfo.position.x + 116,
        y: playerInfo.position.y + 194,
        w: 20,
        h: 20,
      },
      {
        type: "attack speed",
        x: playerInfo.position.x + 499,
        y: playerInfo.position.y + 92,
        w: 20,
        h: 20,
      },
      {
        type: "damage",
        x: playerInfo.position.x + 499,
        y: playerInfo.position.y + 149,
        w: 20,
        h: 20,
      },
      {
        type: "upgrate",
        x: playerInfo.position.x + 767,
        y: playerInfo.position.y + 193,
        w: 33,
        h: 27,
      },
      {
        type: "exis",
        x: playerInfo.position.x + 790,
        y: playerInfo.position.y + 76,
        w: 33,
        h: 29,
      },
    ];

    this.points = {
      point: [5, 5],
      health: [8, 10],
      speed: [4, 10],
      shield: [2, 10],
      "attack speed": [4, 10],
      damage: [4, 10],
    };
  }

  drawPlayerInfo() {
    this.playerInfo.update();
    c.fillStyle = "black";
    c.font = "bold 11px Arial";
    // Health
    c.fillText(
      "Increase your life point to 110",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 86
    );

    c.fillRect(
      this.playerInfo.position.x + 154,
      this.playerInfo.position.y + 94,
      210 * (this.points["health"][0] / this.points["health"][1]),
      12
    );

    c.fillText(
      "Next Level:  310rp",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 122
    );

    // Speed
    c.fillText(
      "Increase your movement speed point to 2",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 141
    );

    c.fillRect(
      this.playerInfo.position.x + 154,
      this.playerInfo.position.y + 147,
      210 * (this.points["speed"][0] / this.points["speed"][1]),
      12
    );

    c.fillText(
      "Next Level:  32rp",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 173
    );

    // Shield
    c.fillText(
      "Increase your shield point to 110",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 194
    );

    c.fillRect(
      this.playerInfo.position.x + 154,
      this.playerInfo.position.y + 200,
      210 * (this.points["shield"][0] / this.points["shield"][1]),
      12
    );

    c.fillText(
      "Full upgraded",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 226
    );

    // Attack Speed
    c.fillText(
      "Increase your attack speed point to 110",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 86
    );

    c.fillRect(
      this.playerInfo.position.x + 532,
      this.playerInfo.position.y + 96,
      210 * (this.points["attack speed"][0] / this.points["attack speed"][1]),
      12
    );

    c.fillText(
      "Full upgraded",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 123
    );

    // Attack Damage
    c.fillText(
      "Increase your attack damage point to 110",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 145
    );

    c.fillRect(
      this.playerInfo.position.x + 532,
      this.playerInfo.position.y + 152,
      210 * (this.points["damage"][0] / this.points["damage"][1]),
      12
    );

    c.fillText(
      "Full upgraded",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 177
    );

    // upgrate button
    c.font = "bold 13px Arial";
    c.fillText(
      `Point: ${this.points["point"][0]} / ${this.points["point"][1]}`,
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 215
    );
    c.fillText(
      "Upgrate",
      this.playerInfo.position.x + 713,
      this.playerInfo.position.y + 215
    );
  }

  handleUpdatePlayerInfo(type) {
    if (this.points["point"][0] === 0) return;
    if (this.points[type][0] === this.points[type][1]) return;

    switch (type) {
      case "health":
        this.points["health"][0]++;
        break;
      case "speed":
        this.points["speed"][0]++;

        break;
      case "shield":
        this.points["shield"][0]++;

        break;
      case "attack speed":
        this.points["attack speed"][0]++;

        break;
      case "damage":
        this.points["damage"][0]++;

        break;
      default:
        break;
    }
    this.points["point"][0]--;
  }

  run() {
    this.drawPlayerInfo();
  }
}