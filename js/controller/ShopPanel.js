import { c } from "../main.js";
export class ShopPanel {
  constructor({ player, shopPanel, itemsPanel }) {
    this.shopPanel = shopPanel;
    this.player = player;
    this.itemsPanel = itemsPanel;

    this.open = true;
    this.shopDetails = [
      { type: "healPotion", amount: 1, cost: 30 },
      { type: "shieldPotion", amount: 1, cost: 30 },
    ];
    this.buttons = [
      {
        type: "exit",
        x: shopPanel.position.x + 391,
        y: shopPanel.position.y + 77,
        w: 20,
        h: 20,
      },
      {
        type: "heal_amount_dec",
        x: shopPanel.position.x + 225,
        y: shopPanel.position.y + 86,
        w: 20,
        h: 30,
      },
      {
        type: "heal_amount_inc",
        x: shopPanel.position.x + 275,
        y: shopPanel.position.y + 86,
        w: 20,
        h: 30,
      },
      {
        type: "heal_buy",
        x: shopPanel.position.x + 315,
        y: shopPanel.position.y + 93,
        w: 60,
        h: 20,
      },
      {
        type: "shield_amount_dec",
        x: shopPanel.position.x + 225,
        y: shopPanel.position.y + 165,
        w: 20,
        h: 30,
      },
      {
        type: "shield_amount_inc",
        x: shopPanel.position.x + 275,
        y: shopPanel.position.y + 165,
        w: 20,
        h: 30,
      },
      {
        type: "shield_buy",
        x: shopPanel.position.x + 315,
        y: shopPanel.position.y + 171,
        w: 60,
        h: 20,
      },
    ];
  }

  handleButton(type) {
    switch (type) {
      case "exit":
        this.open = false;
        this.shopDetails[0].amount = 1;
        this.shopDetails[1].amount = 1;
        break;
      case "heal_amount_dec":
        if (this.shopDetails[0].amount == 1) return;
        this.shopDetails[0].amount--;
        break;
      case "heal_amount_inc":
        if (this.shopDetails[0].amount == 10) return;
        this.shopDetails[0].amount++;
        break;
      case "shield_amount_dec":
        if (this.shopDetails[1].amount == 1) return;
        this.shopDetails[1].amount--;
        break;
      case "shield_amount_inc":
        if (this.shopDetails[1].amount == 10) return;
        this.shopDetails[1].amount++;
        break;
      case "heal_buy":
        if (
          this.shopDetails[0].amount * this.shopDetails[0].cost >
          this.player.totalCoints
        )
          return;
        this.handleBuyItems({
          type: "healPotion",
          amount: this.shopDetails[0].amount,
        });

        this.shopDetails[0].amount = 1;
        break;
      case "shield_buy":
        if (
          this.shopDetails[1].amount * this.shopDetails[1].cost >
          this.player.totalCoints
        )
          return;
        this.handleBuyItems({
          type: "shieldPotion",
          amount: this.shopDetails[1].amount,
        });

        this.shopDetails[1].amount = 1;
        break;
    }
  }

  handleBuyItems({ type, amount }) {
    this.player.totalCoints -= amount * 30;
    for (let i = 0; i < this.player.playerItems.length; i++) {
      if (this.player.playerItems[i].type === type) {
        this.player.playerItems[i].amount += amount;
        if (this.player.playerItems[i].amount > 15) {
          amount = this.player.playerItems[i].amount % 15;
          this.player.playerItems[i].amount = 15;

          if (amount === 0) return;
        }
      }
    }

    if (this.player.playerItems.length === 4) return;
    this.player.playerItems.push({
      type,
      amount,
      isUse: false,
      box: {
        x: this.itemsPanel.position.x + 48,
        y: this.itemsPanel.position.y + 54,
        w: 45,
        h: 41,
        mh: 41,
      },
      miliSecond: 0,
      maxSecond: 2,
      second: 2,
    });
  }

  drawShopInfo() {
    this.shopPanel.update();

    // Health
    c.font = "bold 14px Arial";
    c.fillStyle =
      this.shopDetails[0].amount * this.shopDetails[0].cost >
      this.player.totalCoints
        ? "red"
        : "gray";
    c.fillText(
      this.shopDetails[0].cost * this.shopDetails[0].amount,
      this.shopPanel.position.x + 163,
      this.shopPanel.position.y + 95
    );

    c.fillStyle = "gray";
    c.fillText(
      this.shopDetails[0].amount,
      this.shopPanel.position.x +
        255 -
        (this.shopDetails[0].amount >= 10 ? 3 : 0),
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
    c.fillStyle =
      this.shopDetails[1].amount * this.shopDetails[1].cost >
      this.player.totalCoints
        ? "red"
        : "gray";
    c.fillText(
      this.shopDetails[1].cost * this.shopDetails[1].amount,
      this.shopPanel.position.x + 163,
      this.shopPanel.position.y + 175
    );

    c.fillStyle = "gray";
    c.strokeStyle = "gray";
    c.fillText(
      this.shopDetails[1].amount,
      this.shopPanel.position.x +
        255 -
        (this.shopDetails[1].amount >= 10 ? 3 : 0),
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

    c.fillText(
      "Total Coints: " + this.player.totalCoints,
      this.shopPanel.position.x + 293,
      this.shopPanel.position.y + 220
    );
  }

  run() {
    if (this.open) this.drawShopInfo();
  }
}
