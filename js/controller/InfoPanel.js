import { c } from "../main.js";
export class InfoPanel {
  constructor({ player, infoPanel }) {
    this.infoPanel = infoPanel;
    this.player = player;
    this.open = true;
  }

  drawInfo() {
    let {
      hp,
      speed,
      jump,
      attack_speed,
      crit_damage,
      crit_chance,
      damage,
      shield,
    } = this.player.info;
    this.infoPanel.update();
    c.fillStyle = "black";
    c.font = "bold 11px Arial";
    // Health
    c.fillText(
      "Hp",
      this.infoPanel.position.x + 89,
      this.infoPanel.position.y + 57
    );
    c.fillText(
      `${hp}`,
      this.infoPanel.position.x + 100,
      this.infoPanel.position.y + 72
    );

    // speed
    c.fillText(
      "Speed",
      this.infoPanel.position.x + 88,
      this.infoPanel.position.y + 95
    );
    c.fillText(
      `${speed}`,
      this.infoPanel.position.x + 100,
      this.infoPanel.position.y + 109
    );

    // jump
    c.fillText(
      "Jump",
      this.infoPanel.position.x + 87,
      this.infoPanel.position.y + 132
    );
    c.fillText(
      `${jump}`,
      this.infoPanel.position.x + 100,
      this.infoPanel.position.y + 147
    );

    // attack speed
    c.fillText(
      "Attack Speed",
      this.infoPanel.position.x + 210,
      this.infoPanel.position.y + 57
    );
    c.fillText(
      `${attack_speed}%`,
      this.infoPanel.position.x + 220,
      this.infoPanel.position.y + 72
    );

    // crit damage
    c.fillText(
      "Crit Damage",
      this.infoPanel.position.x + 210,
      this.infoPanel.position.y + 95
    );
    c.fillStyle = this.player.useCritPotion ? "green" : "black";
    c.fillText(
      `${crit_damage}%`,
      this.infoPanel.position.x + 217,
      this.infoPanel.position.y + 109
    );

    c.fillStyle = "black";
    // crit chance
    c.fillText(
      "Crit Chance",
      this.infoPanel.position.x + 208,
      this.infoPanel.position.y + 133
    );

    c.fillStyle = this.player.useCritPotion ? "green" : "black";
    c.fillText(
      `${crit_chance}%`,
      this.infoPanel.position.x + 215,
      this.infoPanel.position.y + 149
    );

    c.fillStyle = "black";
    // shield
    c.fillText(
      "Shield",
      this.infoPanel.position.x + 328,
      this.infoPanel.position.y + 59
    );
    c.fillText(
      `${shield}`,
      this.infoPanel.position.x + 338,
      this.infoPanel.position.y + 73
    );

    // damage
    c.fillText(
      "Damage",
      this.infoPanel.position.x + 328,
      this.infoPanel.position.y + 96
    );
    c.fillText(
      `${damage}`,
      this.infoPanel.position.x + 338,
      this.infoPanel.position.y + 110
    );
  }

  run() {
    if (this.open) this.drawInfo();
  }
}
