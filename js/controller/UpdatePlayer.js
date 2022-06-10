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
        type: "exit",
        x: playerInfo.position.x + 790,
        y: playerInfo.position.y + 76,
        w: 33,
        h: 29,
      },
    ];

    // clone player points
    this.points = JSON.parse(JSON.stringify(player.points));
    this.player_info = JSON.parse(JSON.stringify(player.info));

    this.open = false;
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
      this.points["health"][0] < this.points["health"][1]
        ? `Next Level:  ${this.player_info.hp + 110}`
        : "Full upgraded",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 122
    );

    // Speed
    c.fillText(
      "Increase your movement speed point to 1",
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
      this.points["speed"][0] < this.points["speed"][1]
        ? `Next Level:  ${this.player_info.speed + 1}`
        : "Full upgraded",
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
      this.points["shield"][0] < this.points["shield"][1]
        ? `Next Level:  ${this.player_info.shield + 110}`
        : "Full upgraded",
      this.playerInfo.position.x + 150,
      this.playerInfo.position.y + 226
    );

    // Attack Speed
    c.fillText(
      "Increase your attack speed point to 3%",
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
      this.points["attack speed"][0] < this.points["attack speed"][1]
        ? `Next Level:  ${this.player_info.attack_speed + 3}%`
        : "Full upgraded",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 123
    );

    // Attack Damage
    c.fillText(
      "Increase your attack damage point to 10",
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
      this.points["damage"][0] < this.points["damage"][1]
        ? `Next Level:  ${this.player_info.damage + 10}`
        : "Full upgraded",
      this.playerInfo.position.x + 526,
      this.playerInfo.position.y + 177
    );

    // upgrate button
    c.font = "bold 13px Arial";
    c.fillText(
      `Point: ${this.player.temp_point[0]} / ${this.player.temp_point[1]}`,
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
    if (type === "upgrate") {
      this.player.points = JSON.parse(JSON.stringify(this.points));
      this.player.temp_point[1] = this.player.temp_point[0];
      this.player.points["point"] = [...this.player.temp_point];

      this.player.health += this.player_info["hp"] - this.player.maxHealth;
      this.player.maxHealth = this.player_info["hp"];

      this.player.shield += this.player_info["shield"] - this.player.maxShield;
      this.player.maxShield = this.player_info["shield"];

      this.player.speed.x = this.player_info["speed"];

      this.player.info = JSON.parse(JSON.stringify(this.player_info));
      this.open = false;
      return;
    }

    if (type == "exit") {
      this.points = JSON.parse(JSON.stringify(this.player.points));
      this.player_info = JSON.parse(JSON.stringify(this.player.info));
      this.player.temp_point = [...this.player.points["point"]];
      this.open = false;
      return;
    }

    if (this.player.temp_point[0] === 0) return;
    if (type != "upgrate" && this.points[type][0] === this.points[type][1])
      return;

    switch (type) {
      case "health":
        this.points["health"][0]++;
        this.player_info.hp += 110;
        break;
      case "speed":
        this.points["speed"][0]++;
        this.player_info.speed++;
        break;
      case "shield":
        this.points["shield"][0]++;
        this.player_info.shield += 110;
        break;
      case "attack speed":
        this.points["attack speed"][0]++;
        this.player_info.attack_speed += 3;
        break;
      case "damage":
        this.points["damage"][0]++;
        this.player_info.damage += 20;
        break;

      default:
        break;
    }

    this.player.temp_point[0]--;
  }

  run() {
    if (this.open) this.drawPlayerInfo();
  }
}
