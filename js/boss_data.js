const inner_rage = {
  height: 80,
  width: 50,
  imageSrc: "./img/boss/InnerRage/Idle.png",
  scale: 0.5,
  framesMax: 8,
  framesHold: 7,
  offset: { x: 10, y: 6 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 210,
    height: 60,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/boss/InnerRage/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/boss/InnerRage/Move.png",
      framesMax: 8,
    },
    takeHit: {
      imageSrc: "./img/boss/InnerRage/Take Hit.png",
      framesMax: 1,
    },
    death: {
      imageSrc: "./img/boss/InnerRage/Death.png",
      framesMax: 16,
    },
    attack: [
      {
        imageSrc: "./img/boss/InnerRage/Attack1.png",
        framesMax: 30,
        hitFrame: { [9]: true, [10]: true, [14]: true },
        damge: 30,
      },
      {
        imageSrc: "./img/boss/InnerRage/Attack2.png",
        framesMax: 31,
        hitFrame: { [11]: true },
        damge: 20,
        start_arc_frame: 15,
        end_arc_frame: 20,
        start_deal_damage_frame: 6,
      },
    ],
    attack_effect: [
      {
        height: 10,
        width: 10,
        imageSrc: "./img/boss/InnerRage/Attack1 Effect.png",
        framesMax: 11,
        framesHold: 4,
        trigger_frame: 9,
        offset: { x: 130, y: 122 },
        scale: 0.5,
      },
      {
        height: 10,
        width: 10,
        imageSrc: "./img/boss/InnerRage/Attack2 Effect.png",
        framesMax: 3,
        framesHold: 5,
        offset: { x: 0, y: 0 },
        scale: 0.5,
      },
    ],
  },
};

const andras = {
  height: 110,
  width: 110,
  imageSrc: "./img/boss/Andras/Idle.png",
  scale: 1.4,
  framesMax: 4,
  framesHold: 7,
  offset: { x: 150, y: 154 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 30,
    height: 100,
    offset: { x: 0, y: 0 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/boss/Andras/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/boss/Andras/Run.png",
      framesMax: 5,
    },
    takeHit: {
      imageSrc: "./img/boss/Andras/Take Hit.png",
      framesMax: 5,
    },
    death: {
      imageSrc: "./img/boss/Andras/Death.png",
      framesMax: 9,
    },
    attack: [
      {
        imageSrc: "./img/boss/Andras/Attack 1.png",
        framesMax: 9,
        hitFrame: { [6]: true },
        damge: 25,
      },
      {
        imageSrc: "./img/boss/Andras/Attack 2.png",
        framesMax: 14,
        hitFrame: { [10]: true },
        damge: 40,
      },
    ],
    attack_effect: {
      height: 10,
      width: 10,
      imageSrc: "./img/boss/Andras/Attack Effect.png",
      framesMax: 5,
      framesHold: 4,
      offset: { x: 110, y: 200 },
      scale: 1,
      trigger_frame: [6, 10],
    },
  },
};

export let boss_data = { inner_rage, andras };
