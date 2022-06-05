import { c } from "../main.js";
export class InfoPanel {
  constructor({ player, infoPanel }) {
    this.infoPanel = infoPanel;
    this.player = player;
    this.open = true;
  }

  drawInfo() {
    let { hp, speed, jump, attack_speed, crit, damage, shield } =
      this.player.info;
    this.infoPanel.update();
    c.fillStyle = "black";
    c.font = "bold 9px Arial";
    // Health
    c.fillText(
      "Hp",
      this.infoPanel.position.x + 65,
      this.infoPanel.position.y + 42
    );
    c.fillText(
      `${hp}`,
      this.infoPanel.position.x + 70,
      this.infoPanel.position.y + 52
    );

    // speed
    c.fillText(
      "Speed",
      this.infoPanel.position.x + 65,
      this.infoPanel.position.y + 67
    );
    c.fillText(
      `${speed}`,
      this.infoPanel.position.x + 70,
      this.infoPanel.position.y + 79
    );

    // jump
    c.fillText(
      "Jump",
      this.infoPanel.position.x + 65,
      this.infoPanel.position.y + 95
    );
    c.fillText(
      `${jump}`,
      this.infoPanel.position.x + 70,
      this.infoPanel.position.y + 106
    );

    // attack speed
    c.fillText(
      "Attack Speed",
      this.infoPanel.position.x + 150,
      this.infoPanel.position.y + 41
    );
    c.fillText(
      `${attack_speed}%`,
      this.infoPanel.position.x + 160,
      this.infoPanel.position.y + 52
    );

    // crit
    c.fillText(
      "Crit",
      this.infoPanel.position.x + 150,
      this.infoPanel.position.y + 68
    );
    c.fillText(
      `${crit}%`,
      this.infoPanel.position.x + 160,
      this.infoPanel.position.y + 79
    );

    // damage
    c.fillText(
      "Damage",
      this.infoPanel.position.x + 150,
      this.infoPanel.position.y + 97
    );
    c.fillText(
      `${damage}`,
      this.infoPanel.position.x + 160,
      this.infoPanel.position.y + 108
    );

    // shield
    c.fillText(
      "Shield",
      this.infoPanel.position.x + 233,
      this.infoPanel.position.y + 42
    );
    c.fillText(
      `${shield}`,
      this.infoPanel.position.x + 240,
      this.infoPanel.position.y + 53
    );
  }

  run() {
    if (this.open) this.drawInfo();
  }
}
