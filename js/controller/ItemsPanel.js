import { c } from "../main.js";
import { Sprite } from "../Sprite.js";
export class ItemsPanel {
  constructor({ player, itemsPanel, items }) {
    this.itemsPanel = itemsPanel;
    this.player = player;
    this.items = items;

    this.open = true;

    this.coverBox = {
      x: itemsPanel.position.x + 48,
      y: itemsPanel.position.y + 54,
      w: 45,
      h: 41,
    };

    this.playerItems = [
      {
        type: "healPotion",
        amount: 10,
        box: { ...this.coverBox },
        isUse: false,
      },
      {
        type: "shieldPotion",
        amount: 10,
        box: { ...this.coverBox },
        isUse: false,
      },
      {
        type: "critPotion",
        amount: 1,
        box: { ...this.coverBox },
        isUse: false,
      },
      {
        type: "permitCritPotion",
        amount: 10,
        box: { ...this.coverBox },
        isUse: true,
      },
    ];
  }

  drawItemsInfo() {
    c.font = "bold 11px Arial";
    this.itemsPanel.update();
    this.playerItems.forEach((e, i) => {
      this.items[e.type].offset.x = -50 * i;
      this.items[e.type].update();
      c.fillStyle = "black";
      c.fillText(
        `${e.amount}`,
        this.itemsPanel.position.x + 76 + 50 * i + (e.amount < 10 ? 5 : 0),
        this.itemsPanel.position.y + 63
      );
      c.fillText(
        `${i + 1}`,
        this.itemsPanel.position.x + 50 + 50 * i,
        this.itemsPanel.position.y + 93
      );
      c.fillStyle = "rgba(0,0,0,0.5)";
      if (e.box.h && e.isUse)
        c.fillRect(e.box.x + 49 * i, e.box.y++, e.box.w, e.box.h--);
      else {
        e.box.h = this.coverBox.h;
        e.isUse = false;
      }
    });
  }

  run() {
    if (this.open) this.drawItemsInfo();
  }
}
