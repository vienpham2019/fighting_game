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
    height: 40,
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
        hitFrame: 11,
        damge: 12,
      },
    ],
    fire_ball: {
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
    height: 0,
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
    height: 0,
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
    height: 0,
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
    height: 0,
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
    height: 0,
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
    height: 0,
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
    height: 0,
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

export let enemy_data = {
  worm,
  skeleton,
  mushroom,
  goblin,
  flying_eye,
  jungle_wolf,
  white_wolf,
  green_cornian,
};
