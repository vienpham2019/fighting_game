const worm = {
  height: 58,
  width: 105,
  imageSrc: "./img/bot/Worm/Idle.png",
  scale: 2,
  framesMax: 9,
  framesHold: 4,
  offset: { x: 40, y: 60 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 200,
    height: 20,
    offset: { x: 0, y: 10 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Worm/Idle.png",
      framesMax: 9,
    },
    run: {
      imageSrc: "./img/bot/Worm/Walk.png",
      framesMax: 9,
    },
    takeHit: {
      imageSrc: "./img/bot/Worm/Get Hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/bot/Worm/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/Worm/Attack.png",
        framesMax: 16,
        hitFrame: { [10]: true },
        damge: 12,
      },
    ],
    magic_obj: {
      move: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/Worm/Move.png",
        framesMax: 6,
        framesHold: 4,
        offset: { x: 20, y: 25 },
        scale: 1.3,
      },
      explosion: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/Worm/Explosion.png",
        framesMax: 7,
        framesHold: 4,
        offset: { x: 20, y: 25 },
        scale: 1.3,
      },
    },
  },
};

const skeleton = {
  height: 90,
  width: 50,
  imageSrc: "./img/bot/Skeleton/Idle.png",
  scale: 1.7,
  framesMax: 4,
  framesHold: 6,
  offset: { x: 105, y: 82 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 85,
    height: 90,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Skeleton/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/bot/Skeleton/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/Skeleton/Take Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/bot/Skeleton/Death.png",
      framesMax: 4,
    },
    attack: [
      {
        imageSrc: "./img/bot/Skeleton/Attack.png",
        framesMax: 8,
        hitFrame: { [7]: true },
        damge: 10,
      },
    ],
  },
};

const mushroom = {
  height: 70,
  width: 50,
  imageSrc: "./img/bot/Mushroom/Idle.png",
  scale: 1.7,
  framesMax: 4,
  framesHold: 6,
  offset: { x: 105, y: 102 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 20,
    height: 50,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Mushroom/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/bot/Mushroom/Run.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/bot/Mushroom/Take Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/bot/Mushroom/Death.png",
      framesMax: 4,
    },
    attack: [
      {
        imageSrc: "./img/bot/Mushroom/Attack.png",
        framesMax: 8,
        hitFrame: { [7]: true },
        damge: 7,
      },
    ],
  },
};

const goblin = {
  height: 60,
  width: 50,
  imageSrc: "./img/bot/Goblin/Idle.png",
  scale: 1.6,
  framesMax: 4,
  framesHold: 5,
  offset: { x: 100, y: 102 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 33,
    height: 60,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Goblin/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/bot/Goblin/Run.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/bot/Goblin/Take Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/bot/Goblin/Death.png",
      framesMax: 4,
    },
    attack: [
      {
        imageSrc: "./img/bot/Goblin/Attack.png",
        framesMax: 8,
        hitFrame: { [7]: true },
        damge: 5,
      },
    ],
  },
};

const flying_eye = {
  height: 40,
  width: 25,
  imageSrc: "./img/bot/Flying eye/Flight.png",
  scale: 1.6,
  framesMax: 8,
  framesHold: 6,
  offset: { x: 100, y: 102 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: -33,
    height: 25,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Flying eye/Flight.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/bot/Flying eye/Flight.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/bot/Flying eye/Take Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/bot/Flying eye/Death.png",
      framesMax: 4,
    },
    attack: [
      {
        imageSrc: "./img/bot/Flying eye/Attack.png",
        framesMax: 8,
        hitFrame: { [7]: true },
        damge: 5,
      },
    ],
  },
};

const jungle_wolf = {
  height: 100,
  width: 100,
  imageSrc: "./img/bot/JungleWolf/Idle.png",
  scale: 1,
  framesMax: 3,
  framesHold: 10,
  offset: { x: 60, y: 90 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 30,
    height: 100,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/JungleWolf/Idle.png",
      framesMax: 3,
    },
    run: {
      imageSrc: "./img/bot/JungleWolf/Run.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/JungleWolf/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/JungleWolf/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/JungleWolf/Attack.png",
        framesMax: 10,
        hitFrame: { [7]: true },
        damge: 15,
      },
    ],
    attack_effect: [
      {
        height: 10,
        width: 10,
        imageSrc: "./img/bot/JungleWolf/Attack effect.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 70, y: 5 },
        scale: 0.3,
        trigger_frame: 7,
      },
    ],
  },
};

const white_wolf = {
  height: 90,
  width: 80,
  imageSrc: "./img/bot/WhiteWolf/Idle.png",
  scale: 1,
  framesMax: 3,
  framesHold: 7,
  offset: { x: 60, y: 100 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 30,
    height: 90,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/WhiteWolf/Idle.png",
      framesMax: 3,
    },
    run: {
      imageSrc: "./img/bot/WhiteWolf/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/WhiteWolf/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/WhiteWolf/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/WhiteWolf/Attack.png",
        framesMax: 12,
        hitFrame: { [5]: true, [9]: true },
        damge: 8,
      },
    ],
    attack_effect: [
      {
        height: 10,
        width: 10,
        imageSrc: "./img/bot/WhiteWolf/Attack effect1.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 130 },
        scale: 1,
        trigger_frame: 5,
      },
      {
        height: 10,
        width: 10,
        imageSrc: "./img/bot/WhiteWolf/Attack effect2.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 130 },
        scale: 1,
        trigger_frame: 9,
      },
    ],
  },
};

const green_cornian = {
  height: 90,
  width: 80,
  imageSrc: "./img/bot/GreenCornian/Idle.png",
  scale: 1.3,
  framesMax: 6,
  framesHold: 10,
  offset: { x: 90, y: 157 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 30,
    height: 80,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/GreenCornian/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/bot/GreenCornian/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/GreenCornian/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/GreenCornian/Death.png",
      framesMax: 5,
    },
    attack: [
      {
        imageSrc: "./img/bot/GreenCornian/Attack1.png",
        framesMax: 6,
        hitFrame: { [3]: true },
        damge: 8,
      },
    ],
    attack_effect: [
      {
        height: 10,
        width: 10,
        imageSrc: "./img/bot/GreenCornian/Attack Effect1.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 130 },
        scale: 1,
        trigger_frame: 3,
      },
    ],
  },
};

const dark_cornian = {
  height: 90,
  width: 80,
  imageSrc: "./img/bot/DarkCornian/Idle.png",
  scale: 1.3,
  framesMax: 6,
  framesHold: 10,
  offset: { x: 90, y: 150 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 30,
    height: 80,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/DarkCornian/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/bot/DarkCornian/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/DarkCornian/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/DarkCornian/Death.png",
      framesMax: 5,
    },
    attack: [
      {
        imageSrc: "./img/bot/DarkCornian/Attack.png",
        framesMax: 13,
        hitFrame: { [10]: true },
        damge: 15,
      },
    ],
    attack_effect: [
      {
        height: 10,
        width: 10,
        imageSrc: "./img/bot/DarkCornian/Attack Effect.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 122 },
        scale: 1,
        trigger_frame: 10,
      },
    ],
  },
};

const dark_drake = {
  height: 60,
  width: 80,
  imageSrc: "./img/bot/DarkDrake/Idle.png",
  scale: 1.3,
  framesMax: 5,
  framesHold: 7,
  offset: { x: 90, y: 184 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 150,
    height: 60,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/DarkDrake/Idle.png",
      framesMax: 5,
    },
    run: {
      imageSrc: "./img/bot/DarkDrake/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/DarkDrake/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/DarkDrake/Death.png",
      framesMax: 6,
    },
    attack: [
      {
        imageSrc: "./img/bot/DarkDrake/Attack.png",
        framesMax: 13,
        hitFrame: { [10]: true },
        damge: 15,
      },
    ],
    magic_obj: {
      move: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/DarkDrake/ElectricBall.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 190 },
        scale: 1.3,
      },
      explosion: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/DarkDrake/Attack Effect.png",
        framesMax: 7,
        framesHold: 4,
        offset: { x: 130, y: 190 },
        scale: 1.3,
      },
    },
  },
};

const ice_drake = {
  height: 60,
  width: 80,
  imageSrc: "./img/bot/IceDrake/Idle.png",
  scale: 1.4,
  framesMax: 5,
  framesHold: 7,
  offset: { x: 100, y: 196 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 150,
    height: 60,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/IceDrake/Idle.png",
      framesMax: 5,
    },
    run: {
      imageSrc: "./img/bot/IceDrake/Walk.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./img/bot/IceDrake/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/IceDrake/Death.png",
      framesMax: 6,
    },
    attack: [
      {
        imageSrc: "./img/bot/IceDrake/Attack.png",
        framesMax: 14,
        hitFrame: { [11]: true },
        damge: 18,
      },
    ],
    magic_obj: {
      move: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/IceDrake/Ice.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 130, y: 190 },
        scale: 1.3,
      },
      explosion: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/iceDrake/Explosion.png",
        framesMax: 5,
        framesHold: 4,
        offset: { x: 130, y: 190 },
        scale: 1.3,
      },
    },
  },
};

const bain = {
  height: 80,
  width: 100,
  imageSrc: "./img/bot/Bain/Idle.png",
  scale: 1,
  framesMax: 4,
  framesHold: 7,
  offset: { x: 50, y: 72 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 170,
    height: 80,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Bain/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/bot/Bain/Walk.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/bot/Bain/Take hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/Bain/Death.png",
      framesMax: 5,
    },
    attack: [
      {
        imageSrc: "./img/bot/Bain/Attack.png",
        framesMax: 16,
        hitFrame: { [6]: true },
        damge: 30,
      },
    ],
    magic_obj: {
      move: {
        height: 30,
        width: 30,
        imageSrc: "./img/bot/Bain/Fire ball.png",
        framesMax: 2,
        framesHold: 4,
        offset: { x: 110, y: 70 },
        scale: 1,
      },
      explosion: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/Bain/Explosion.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 90, y: 90 },
        scale: 1,
      },
    },
  },
};

const cerebes = {
  height: 90,
  width: 120,
  imageSrc: "./img/bot/Cerebes/Idle.png",
  scale: 1.2,
  framesMax: 4,
  framesHold: 7,
  offset: { x: 30, y: 45 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 90,
    height: 90,
    offset: { x: 80, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Cerebes/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/bot/Cerebes/Walk.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/bot/Cerebes/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/Cerebes/Death.png",
      framesMax: 5,
    },
    attack: [
      {
        imageSrc: "./img/bot/Cerebes/Attack.png",
        framesMax: 11,
        hitFrame: { [8]: true },
        damge: 35,
        knockBack: 35,
        offset: [
          { x: 30, y: 45 },
          { x: 35, y: 52 },
        ],
      },
    ],
    attack_effect: [
      {
        height: 40,
        width: 40,
        imageSrc: "./img/bot/Cerebes/Attack Effect.png",
        framesMax: 2,
        framesHold: 4,
        offset: { x: 45, y: 45 },
        scale: 0.8,
        trigger_frame: 8,
      },
    ],
  },
};

const turtle = {
  height: 110,
  width: 130,
  imageSrc: "./img/bot/Turtle/Idle.png",
  scale: 1,
  framesMax: 6,
  framesHold: 7,
  offset: { x: 40, y: 75 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 130,
    height: 90,
    offset: { x: 100, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Turtle/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/bot/Turtle/Walk.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/bot/Turtle/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/Turtle/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/Turtle/Attack 1.png",
        framesMax: 9,
        hitFrame: { [5]: true },
        damge: 35,
        knockBack: 40,
      },
      {
        imageSrc: "./img/bot/Turtle/Attack 2.png",
        framesMax: 11,
        hitFrame: { [5]: true, [7]: true },
        damge: 35,
        knockBack: 5,
      },
    ],
    attack_effect: [
      {
        height: 60,
        width: 65,
        imageSrc: "./img/bot/Turtle/Attack Effect.png",
        framesMax: 3,
        framesHold: 4,
        offset: { x: 60, y: 90 },
        scale: 0.8,
        trigger_frame: 5,
      },
    ],
  },
};

const king_blue_goblin = {
  height: 110,
  width: 110,
  imageSrc: "./img/bot/KingBlueGoblin/Idle.png",
  scale: 1,
  framesMax: 6,
  framesHold: 7,
  offset: { x: 120, y: 79 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 170,
    height: 90,
    offset: { x: 80, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/KingBlueGoblin/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/bot/KingBlueGoblin/Run.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/bot/KingBlueGoblin/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/KingBlueGoblin/Death.png",
      framesMax: 12,
    },
    attack: [
      {
        imageSrc: "./img/bot/KingBlueGoblin/Attack 1.png",
        framesMax: 12,
        hitFrame: { [6]: true },
        damge: 40,
        // knockBack: 40,
      },
    ],
    attack_effect: [
      {
        height: 60,
        width: 65,
        imageSrc: "./img/bot/KingBlueGoblin/Attack Effect.png",
        framesMax: 3,
        framesHold: 8,
        offset: { x: 120, y: 55 },
        scale: 0.8,
        trigger_frame: 6,
      },
    ],
  },
};

const buffoon = {
  height: 110,
  width: 110,
  imageSrc: "./img/bot/Buffoon/Idle.png",
  scale: 1,
  framesMax: 6,
  framesHold: 7,
  offset: { x: 50, y: 95 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 120,
    height: 90,
    offset: { x: 90, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Buffoon/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/bot/Buffoon/Run.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/bot/Buffoon/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/bot/Buffoon/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/Buffoon/Attack 1.png",
        framesMax: 9,
        hitFrame: { [6]: true },
        damge: 30,
      },
    ],
    attack_effect: [
      {
        height: 60,
        width: 60,
        imageSrc: "./img/bot/Buffoon/Attack Effect.png",
        framesMax: 3,
        framesHold: 8,
        offset: { x: 60, y: 55 },
        scale: 0.8,
        trigger_frame: 6,
      },
    ],
  },
};

export let enemy_data = {
  worm,
  skeleton,
  mushroom,
  goblin,
  flying_eye,
  jungle_wolf,
  white_wolf,
  green_cornian,
  dark_cornian,
  dark_drake,
  ice_drake,
  bain,
  cerebes,
  turtle,
  king_blue_goblin,
  buffoon,
};
