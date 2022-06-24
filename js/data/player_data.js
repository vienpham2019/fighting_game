const swordsman = {
  height: 88,
  width: 52,
  imageSrc: "./img/player_character/swordsman/Idle.png",
  scale: 1.7,
  framesMax: 8,
  framesHold: 4,
  offset: { x: 142, y: 121 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 130,
    height: 25,
    offset: { x: 65, y: 20 },
  },
  damage: 30,
  sprites: {
    idle: {
      imageSrc: "./img/player_character/swordsman/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/player_character/swordsman/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/player_character/swordsman/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/player_character/swordsman/Fall.png",
      framesMax: 2,
    },
    takeHit: {
      imageSrc:
        "./img/player_character/swordsman/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/player_character/swordsman/Death.png",
      framesMax: 6,
    },
    attack: [
      {
        imageSrc: "./img/player_character/swordsman/Attack1.png",
        hitFrame: 5,
        framesMax: 6,
      },
      {
        imageSrc: "./img/player_character/swordsman/Attack2.png",
        hitFrame: 5,
        framesMax: 6,
      },
    ],
  },
};

const warior = {
  height: 88,
  width: 52,
  imageSrc: "./img/player_character/warior/Idle.png",
  scale: 1.9,
  framesMax: 10,
  framesHold: 4,
  offset: { x: 130, y: 104 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  damage: 20,
  sprites: {
    idle: {
      imageSrc: "./img/player_character/warior/Idle.png",
      framesMax: 10,
    },
    run: {
      imageSrc: "./img/player_character/warior/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/player_character/warior/Jump.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "./img/player_character/warior/Fall.png",
      framesMax: 3,
    },
    takeHit: {
      imageSrc: "./img/player_character/warior/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/player_character/warior/Death.png",
      framesMax: 7,
    },
    attack: [
      {
        imageSrc: "./img/player_character/warior/Attack1.png",
        hitFrame: 5,
        framesMax: 7,
      },
      {
        imageSrc: "./img/player_character/warior/Attack2.png",
        hitFrame: 3,
        framesMax: 7,
      },
      {
        imageSrc: "./img/player_character/warior/Attack3.png",
        hitFrame: 5,
        framesMax: 8,
        heavyAttack: 1.4,
      },
    ],
  },
};

export let player_data = { swordsman, warior };
