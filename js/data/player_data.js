const swordsman = {
  name: "swordsman",
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
  name: "warior",
  height: 110,
  width: 70,
  imageSrc: "./img/player_character/warior/Idle.png",
  scale: 1,
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
      framesMax: 6,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
    }},
    run: {
      imageSrc: "./img/player_character/warior/Run.png",
      framesMax: 8,
      framesHold: 7,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    walk: {
      imageSrc: "./img/player_character/warior/Walk.png",
      framesMax: 8,
      framesHold: 7,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    jump: {
      imageSrc: "./img/player_character/warior/Jump.png",
      framesMax: 3,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    fall: {
      imageSrc: "./img/player_character/warior/Fall.png",
      framesMax: 3,
      framesHold: 7,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    takeHit: {
      imageSrc: "./img/player_character/warior/Take hit.png",
      framesMax: 4,
      framesHold: 3,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    death: {
      imageSrc: "./img/player_character/warior/Death.png",
      framesMax: 8,
      framesHold: 14,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    skill1: {
      imageSrc: "./img/player_character/warior/Attack Skill 1.png",
      framesMax: 45,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      },
      hitFrames: [
        [4,5], 
        [13,14], 
        [24,25], 
        [33,34], 
        [36,45]
      ], 
      attack_box: [
        {
          width: 176,
          height: 100,
          offset: { x: -70, y: 0 },
        },
        {
          width: 249,
          height: 100,
          offset: { x: -130, y: 0 },
        },
        {
          width: 138,
          height: 183,
          offset: { x: 0, y: -45 },
        },
        {
          width: 198,
          height: 103,
          offset: { x: -105, y: 0 },
        },
        {
          width: 156,
          height: 33,
          offset: { x: -25, y: 30 },
        }
      ]
    }, 
    skill2: {
      imageSrc: "./img/player_character/warior/Attack Skill 2.png",
      framesMax: 16,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    }, 
    skill3: {
      imageSrc: "./img/player_character/warior/Attack Skill 3.png",
      framesMax: 61,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
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
