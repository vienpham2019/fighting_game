import { c } from "../main.js";
export class ShopPanel {
  constructor({ player, shopPanel }) {
    this.shopPanel = shopPanel;
    this.player = player;

    this.open = true;
  }

  drawShopInfo() {
    this.shopPanel.update();
    c.fillStyle = "gray";
    // Health
    c.font = "bold 14px Arial";
    c.fillText(
      "30",
      this.shopPanel.position.x + 163,
      this.shopPanel.position.y + 95
    );

    c.fillText(
      "1",
      this.shopPanel.position.x + 255,
      this.shopPanel.position.y + 106
    );

    c.fillText(
      "BUY",
      this.shopPanel.position.x + 330,
      this.shopPanel.position.y + 108
    );

    c.beginPath();
    c.strokeStyle = "gray";
    c.rect(
      this.shopPanel.position.x + 315,
      this.shopPanel.position.y + 93,
      60,
      20
    );
    c.stroke();

    c.font = "13px Arial";

    c.fillText(
      "Heal Potion",
      this.shopPanel.position.x + 133,
      this.shopPanel.position.y + 120
    );

    // Shield
    c.font = "bold 14px Arial";
    c.fillText(
      "30",
      this.shopPanel.position.x + 163,
      this.shopPanel.position.y + 175
    );

    c.fillText(
      "1",
      this.shopPanel.position.x + 255,
      this.shopPanel.position.y + 186
    );

    c.fillText(
      "BUY",
      this.shopPanel.position.x + 330,
      this.shopPanel.position.y + 186
    );

    c.beginPath();
    c.strokeStyle = "gray";
    c.rect(
      this.shopPanel.position.x + 315,
      this.shopPanel.position.y + 171,
      60,
      20
    );
    c.stroke();

    c.font = "13px Arial";

    c.fillText(
      "Shield Potion",
      this.shopPanel.position.x + 133,
      this.shopPanel.position.y + 205
    );
  }

  run() {
    if (this.open) this.drawShopInfo();
  }
}
