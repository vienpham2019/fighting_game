import { c } from "../main.js";
export class ItemsPanel {
  constructor({ player, itemsPanel, items, itemsPanelDetails }) {
    this.itemsPanel = itemsPanel;
    this.player = player;
    this.items = items;
    this.itemsPanelDetails = itemsPanelDetails;

    this.open = true;

    this.coverBox = {
      x: itemsPanel.position.x + 48,
      y: itemsPanel.position.y + 54,
      my: itemsPanel.position.y + 54,
      w: 45,
      h: 41,
      mh: 41,
    };

    this.itemsPanelDetailsImage = new Image();
    this.itemsPanelDetailsImage.src = "../img/items/crit potion.png";

    this.itemDetails = {
      healPotion: {
        name: "Heal Potion",
        offset: { x: -5, y: 0 },
        details: ["Regenerate 20% of total hp"],
        image_url: "../img/items/heal potion.png",
      },
      shieldPotion: {
        name: "Shield Potion",
        offset: { x: -5, y: 0 },
        details: ["Regenerate 20% of total shield"],
        image_url: "../img/items/shield potion.png",
      },
      critPotion: {
        name: "Crit Potion",
        offset: { x: -10, y: 0 },
        details: [
          "Increase 20% crit damage and",
          "10% crit chance in 15 second",
        ],
        image_url: "../img/items/crit potion.png",
      },
      permanentCritPotion: {
        name: "Permanet Crit Potion",
        offset: { x: -13, y: 2 },
        details: ["Permanet increase 10% crit", "damage and 15% crit chance."],
        image_url: "../img/items/permanent crit potion.png",
      },
    };

    player.playerItems.forEach(
      (_, i) => (player.playerItems[i]["box"] = { ...this.coverBox })
    );

    this.itemInfoType = "healPotion";
    this.openItemInfo = false;
  }

  handleUseItems(order) {
    if (order > this.player.playerItems.length) return;
    if (this.player.playerItems[order - 1].isUse) return;
    this.player.playerItems[order - 1].isUse = true;
    this.player.playerItems[order - 1].amount--;
    let text;
    switch (this.player.playerItems[order - 1].type) {
      case "healPotion":
        this.player.health += this.player.maxHealth * 0.2;
        if (this.player.health > this.player.maxHealth) {
          this.player.health = this.player.maxHealth;
        }
        text = `+ ${this.player.maxHealth * 0.2} hp`;
        break;
      case "shieldPotion":
        this.player.shield += this.player.maxShield * 0.2;
        if (this.player.shield > this.player.maxShield) {
          this.player.shield = this.player.maxShield;
        }
        text = `+ ${this.player.maxShield * 0.2} shield`;
        break;
      case "critPotion":
        this.player.info.crit_damage += 20;
        this.player.info.crit_chance += 10;
        this.player.useCritPotion = true;
        text = `+ 20% crit damage and 10% crit chance`;
        break;
      case "permanetCritPotion":
        this.player.info.crit_damage += 10;
        this.player.info.crit_chance += 15;
        text = `+ 10% crit damage and 15% crit chance`;
        break;

      default:
        break;
    }

    this.player.damgeEffect({
      target: this.player,
      text,
      type: "item",
    });

    this.player.playerItems[order - 1].second =
      this.player.playerItems[order - 1].maxSecond;
    this.player.playerItems[order - 1].maxSecond =
      this.player.playerItems[order - 1].maxSecond;
    this.player.playerItems[order - 1].miliSecond = 0;

    this.player.playerItems[order - 1].box = {
      x: this.itemsPanel.position.x + 48,
      y: this.itemsPanel.position.y + 54,
      my: this.itemsPanel.position.y + 54,
      w: 45,
      h: 41,
      mh: 41,
    };
  }

  drawItemsDetailsInfo() {
    this.itemsPanelDetails.update();

    this.itemsPanelDetailsImage.src =
      this.itemDetails[this.itemInfoType].image_url;
    c.drawImage(
      this.itemsPanelDetailsImage,
      this.itemsPanelDetails.position.x +
        30 +
        this.itemDetails[this.itemInfoType].offset.x,
      this.itemsPanelDetails.position.y +
        30 +
        this.itemDetails[this.itemInfoType].offset.y,
      this.itemsPanelDetailsImage.width,
      this.itemsPanelDetailsImage.height
    );
    c.font = "11px Arial";
    c.fillStyle = "black";
    c.fillText(
      this.itemDetails[this.itemInfoType].name,
      this.itemsPanelDetails.position.x + 83,
      this.itemsPanelDetails.position.y + 63
    );
    c.font = "10px Arial";
    this.itemDetails[this.itemInfoType].details.forEach((t, i) => {
      c.fillText(
        t,
        this.itemsPanelDetails.position.x + 91,
        this.itemsPanelDetails.position.y + 75 + 9 * i
      );
    });
  }

  drawItemsInfo() {
    c.font = "bold 11px Arial";
    this.itemsPanel.update();
    this.player.playerItems.forEach((e, i) => {
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
      if (e.box.h && e.isUse && e.second) {
        e.box.y += e.box.mh / e.maxSecond / 100;
        e.box.h -= e.box.mh / e.maxSecond / 100;
        if (e.miliSecond++ === 100) {
          e.miliSecond = 0;
          e.second--;
        }
        c.fillRect(e.box.x + 49 * i, e.box.y, e.box.w, e.box.h);

        e.isUse = e.box.h > 0;
        if (e.isUse === false && e.type === "critPotion") {
          this.player.info.crit_damage -= 20;
          this.player.info.crit_chance -= 10;
          this.player.useCritPotion = false;
        }
      }

      if (e.amount == 0 && e.box.h <= 0) {
        this.player.playerItems.splice(i, 1);
      }
    });
  }

  run() {
    if (this.openItemInfo) this.drawItemsDetailsInfo();
    if (this.open) this.drawItemsInfo();
  }
}
