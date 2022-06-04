const canvas_width = 1024;
const canvas_height = 576;

const platforms_1 = [
  { x: 0, width: 95, offset: { x: 0, y: -272 } },
  { x: 0, width: 195, offset: { x: 0, y: 661 } },
  { x: 0, width: 901, offset: { x: 0, y: 951 } },
  { x: 95, width: 185, offset: { x: 0, y: -200 } },
  { x: 150, width: 75, offset: { x: 0, y: -368 } },
  { x: 195, width: 910, offset: { x: 0, y: 734 } },
  { x: 225, width: 250, offset: { x: 0, y: -472 } },
  { x: 280, width: 1095, offset: { x: 0, y: -128 } },
  { x: 475, width: 230, offset: { x: 0, y: -542 } },
  { x: 705, width: 200, offset: { x: 0, y: -614 } },
  { x: 785, width: 60, offset: { x: 0, y: -699 } },
  { x: 845, width: 210, offset: { x: 0, y: -769 } },
  { x: 931, width: 200, offset: { x: 0, y: 956 } },
  { x: 1020, width: 1010, offset: { x: 0, y: 876 } },
  { x: 1055, width: 930, offset: { x: 0, y: -698 } },
  { x: 1058, width: 70, offset: { x: 0, y: 635 } },
  { x: 1115, width: 290, offset: { x: 0, y: -899 } },
  { x: 1128, width: 215, offset: { x: 0, y: 546 } },
  { x: 1375, width: 75, offset: { x: 0, y: -56 } },
  { x: 1415, width: 290, offset: { x: 0, y: -952 } },
  { x: 1428, width: 215, offset: { x: 0, y: 486 } },
  { x: 1538, width: 284, offset: { x: 0, y: 20 } },
  { x: 1720, width: 375, offset: { x: 0, y: 428 } },
  { x: 1825, width: 370, offset: { x: 0, y: -1085 } },
  { x: 1965, width: 284, offset: { x: 0, y: 93 } },
  { x: 1985, width: 1435, offset: { x: 0, y: -554 } },
  { x: 2090, width: 200, offset: { x: 0, y: 836 } },
  { x: 2092, width: 82, offset: { x: 0, y: 344 } },
  { x: 2170, width: 208, offset: { x: 0, y: 271 } },
  { x: 2195, width: 70, offset: { x: 0, y: -1170 } },
  { x: 2265, width: 210, offset: { x: 0, y: -1241 } },
  { x: 2340, width: 65, offset: { x: 0, y: 870 } },
  { x: 2405, width: 220, offset: { x: 0, y: 800 } },
  { x: 2375, width: 215, offset: { x: 0, y: 201 } },
  { x: 2475, width: 210, offset: { x: 0, y: -1312 } },
  { x: 2590, width: 576, offset: { x: 0, y: 274 } },
  { x: 2625, width: 555, offset: { x: 0, y: 873 } },
  { x: 2685, width: 580, offset: { x: 0, y: -1240 } },
  { x: 3265, width: 190, offset: { x: 0, y: -1169 } },
  { x: 3420, width: 60, offset: { x: 0, y: -482 } },
  { x: 3455, width: 1090, offset: { x: 0, y: -1098 } },
  { x: 3584, width: 300, offset: { x: 0, y: -470 } },
  { x: 3975, width: 420, offset: { x: 0, y: -365 } },
  { x: 4395, width: 480, offset: { x: 0, y: -435 } },
  { x: 4545, width: 70, offset: { x: 0, y: -1025 } },
  { x: 4680, width: 214, offset: { x: 0, y: -1017 } },
  { x: 4860, width: 214, offset: { x: 0, y: -923 } },
  { x: 4930, width: 67, offset: { x: 0, y: -507 } },
  { x: 4997, width: 340, offset: { x: 0, y: -579 } },
  { x: 5070, width: 214, offset: { x: 0, y: -830 } },
  { x: 5260, width: 1110, offset: { x: 0, y: -725 } },
  { x: 6370, width: 1090, offset: { x: 0, y: -652 } },
  { x: 6582, width: 730, offset: { x: 0, y: -1292 } },
  { x: 7312, width: 1030, offset: { x: 0, y: -1220 } },
  { x: 7460, width: 70, offset: { x: 0, y: -582 } },
  { x: 7590, width: 280, offset: { x: 0, y: -642 } },
  { x: 7990, width: 70, offset: { x: 0, y: -718 } },
  { x: 8058, width: 1410, offset: { x: 0, y: -787 } },
  { x: 8372, width: 210, offset: { x: 0, y: -1174 } },
  { x: 8592, width: 67, offset: { x: 0, y: -1120 } },
  { x: 8622, width: 214, offset: { x: 0, y: -1062 } },
  { x: 8859, width: 67, offset: { x: 0, y: -1018 } },
  { x: 8949, width: 210, offset: { x: 0, y: -966 } },
  { x: 9167, width: 67, offset: { x: 0, y: -903 } },
  { x: 9273, width: 67, offset: { x: 0, y: -866 } },
  { x: 9468, width: 290, offset: { x: 0, y: -715 } },
  { x: 9762, width: 370, offset: { x: 0, y: -828 } },
  { x: 10182, width: 290, offset: { x: 0, y: -923 } },
  { x: 10472, width: 440, offset: { x: 0, y: -996 } },
  { x: 10912, width: 730, offset: { x: 0, y: -1068 } },
  { x: 3165, width: 1090, offset: { x: 0, y: 346 } },
  { x: 3475, width: 215, offset: { x: 0, y: 246 } },
  { x: 3658, width: 215, offset: { x: 0, y: 176 } },
  { x: 3880, width: 215, offset: { x: 0, y: 105 } },
  { x: 4120, width: 360, offset: { x: 0, y: 78 } },
  { x: 4255, width: 73, offset: { x: 0, y: 417 } },
  { x: 4415, width: 290, offset: { x: 0, y: 493 } },
  { x: 4680, width: 215, offset: { x: 0, y: 598 } },
  { x: 4850, width: 215, offset: { x: 0, y: 698 } },
  { x: 3180, width: 190, offset: { x: 0, y: 943 } }, //
  { x: 3370, width: 1373, offset: { x: 0, y: 1015 } }, //
  { x: 4740, width: 80, offset: { x: 0, y: 932 } }, //
  { x: 4820, width: 202, offset: { x: 0, y: 860 } }, //
  { x: 5020, width: 215, offset: { x: 0, y: 788 } },
  { x: 5235, width: 1980, offset: { x: 0, y: 861 } },
  { x: 7215, width: 600, offset: { x: 0, y: 934 } },
  { x: 4480, width: 85, offset: { x: 0, y: -7 } },
  { x: 4560, width: 210, offset: { x: 0, y: -78 } },
  { x: 4770, width: 210, offset: { x: 0, y: -150 } },
  { x: 4980, width: 1000, offset: { x: 0, y: -78 } },
  { x: 5900, width: 1330, offset: { x: 0, y: 66 } },
  { x: 7230, width: 936, offset: { x: 0, y: 212 } },
  { x: 7662, width: 213, offset: { x: 0, y: 110 } },
  { x: 7880, width: 213, offset: { x: 0, y: 26 } },
  { x: 8110, width: 590, offset: { x: 0, y: -44 } },
  { x: 8165, width: 190, offset: { x: 0, y: 285 } },
  { x: 8355, width: 1080, offset: { x: 0, y: 358 } },
  { x: 8700, width: 490, offset: { x: 0, y: -115 } },
  { x: 9167, width: 67, offset: { x: 0, y: -903 } },
  { x: 9210, width: 350, offset: { x: 0, y: -3 } },
  { x: 9435, width: 80, offset: { x: 0, y: 430 } },
  { x: 9560, width: 290, offset: { x: 0, y: -117 } },
  { x: 9565, width: 65, offset: { x: 0, y: 423 } },
  { x: 9760, width: 67, offset: { x: 0, y: -215 } },
  { x: 9695, width: 210, offset: { x: 0, y: 403 } },
  { x: 9820, width: 530, offset: { x: 0, y: -308 } },
  { x: 9995, width: 210, offset: { x: 0, y: 350 } },
  { x: 10220, width: 67, offset: { x: 0, y: 275 } },
  { x: 10350, width: 434, offset: { x: 0, y: -380 } },
  { x: 10330, width: 360, offset: { x: 0, y: 215 } },
  { x: 10690, width: 86, offset: { x: 0, y: 130 } },
  { x: 10976, width: 214, offset: { x: 0, y: -12 } },
  { x: 10720, width: 213, offset: { x: 0, y: -480 } },
  { x: 10776, width: 200, offset: { x: 0, y: 59 } },
  { x: 11010, width: 300, offset: { x: 0, y: -544 } },
  { x: 11310, width: 230, offset: { x: 0, y: -472 } },
  { x: 11190, width: 210, offset: { x: 0, y: -613 } },
  { x: 11190, width: 1040, offset: { x: 0, y: 61 } },
  { x: 11316, width: 67, offset: { x: 0, y: -678 } },
  { x: 11389, width: 67, offset: { x: 0, y: -748 } },
  { x: 11465, width: 210, offset: { x: 0, y: -824 } },
  { x: 11601, width: 67, offset: { x: 0, y: -902 } },
  { x: 11692, width: 230, offset: { x: 0, y: -956 } },
  { x: 11922, width: 300, offset: { x: 0, y: -1026 } },
];

const walls_1 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  { x: 95, height: 75, offset: { x: 0, y: -272 } },
  { x: 195, height: 77, offset: { x: 0, y: 661 } },
  { x: 225, height: 110, offset: { x: 0, y: -472 } },
  { x: 280, height: 75, offset: { x: 0, y: -200 } },
  { x: 475, height: 75, offset: { x: 0, y: -542 } },
  { x: 705, height: 75, offset: { x: 0, y: -612 } },
  { x: 845, height: 75, offset: { x: 0, y: -771 } },
  { x: 1055, height: 75, offset: { x: 0, y: -769 } },
  { x: 1128, height: 50, offset: { x: 0, y: 546 } },
  { x: 1343, height: 50, offset: { x: 0, y: 546 } },
  { x: 1375, height: 73, offset: { x: 0, y: -128 } },
  { x: 1428, height: 50, offset: { x: 0, y: 486 } },
  { x: 1450, height: 150, offset: { x: 0, y: -56 } },
  { x: 1643, height: 50, offset: { x: 0, y: 486 } },
  { x: 1720, height: 50, offset: { x: 0, y: 428 } },
  { x: 1985, height: 148, offset: { x: 0, y: -698 } },
  { x: 2092, height: 86, offset: { x: 0, y: 344 } },
  { x: 2170, height: 75, offset: { x: 0, y: 271 } },
  { x: 2195, height: 85, offset: { x: 0, y: -1166 } },
  { x: 2265, height: 75, offset: { x: 0, y: -1241 } },
  { x: 2375, height: 75, offset: { x: 0, y: 201 } },
  { x: 2405, height: 75, offset: { x: 0, y: 800 } },
  { x: 2475, height: 75, offset: { x: 0, y: -1312 } },
  { x: 2590, height: 76, offset: { x: 0, y: 201 } },
  { x: 2625, height: 75, offset: { x: 0, y: 800 } },
  { x: 2685, height: 75, offset: { x: 0, y: -1312 } },
  { x: 3165, height: 75, offset: { x: 0, y: 274 } },
  { x: 3180, height: 75, offset: { x: 0, y: 874 } }, //
  { x: 3265, height: 75, offset: { x: 0, y: -1240 } },
  { x: 3370, height: 75, offset: { x: 0, y: 943 } }, //
  { x: 3420, height: 75, offset: { x: 0, y: -554 } },
  { x: 3455, height: 75, offset: { x: 0, y: -1169 } },
  { x: 4255, height: 75, offset: { x: 0, y: 346 } },
  { x: 4328, height: 75, offset: { x: 0, y: 417 } },
  { x: 4395, height: 75, offset: { x: 0, y: -435 } },
  { x: 4480, height: 87, offset: { x: 0, y: -7 } },
  { x: 4560, height: 75, offset: { x: 0, y: -78 } },
  { x: 4545, height: 75, offset: { x: 0, y: -1098 } },
  { x: 4740, height: 85, offset: { x: 0, y: 932 } }, //
  { x: 4770, height: 75, offset: { x: 0, y: -150 } },
  { x: 4820, height: 75, offset: { x: 0, y: 860 } }, //
  { x: 4980, height: 75, offset: { x: 0, y: -150 } },
  { x: 4997, height: 75, offset: { x: 0, y: -579 } },
  { x: 5020, height: 75, offset: { x: 0, y: 788 } },
  { x: 5235, height: 75, offset: { x: 0, y: 788 } },
  { x: 5900, height: 75, offset: { x: 0, y: -6 } },
  { x: 6370, height: 75, offset: { x: 0, y: -725 } },
  { x: 7215, height: 75, offset: { x: 0, y: 861 } },
  { x: 7230, height: 150, offset: { x: 0, y: 66 } },
  { x: 7312, height: 75, offset: { x: 0, y: -1292 } },
  { x: 7460, height: 75, offset: { x: 0, y: -650 } },
  { x: 7815, height: 200, offset: { x: 0, y: 737 } },
  { x: 8058, height: 75, offset: { x: 0, y: -787 } },
  { x: 8165, height: 75, offset: { x: 0, y: 212 } },
  { x: 8355, height: 75, offset: { x: 0, y: 285 } },
  { x: 8700, height: 75, offset: { x: 0, y: -115 } },
  { x: 9435, height: 75, offset: { x: 0, y: 358 } },
  { x: 9468, height: 75, offset: { x: 0, y: -787 } },
  { x: 10350, height: 75, offset: { x: 0, y: -380 } },
  { x: 10472, height: 75, offset: { x: 0, y: -996 } },
  { x: 10690, height: 87, offset: { x: 0, y: 130 } },
  { x: 10776, height: 75, offset: { x: 0, y: 59 } },
  { x: 10912, height: 75, offset: { x: 0, y: -1068 } },
  { x: 10976, height: 75, offset: { x: 0, y: -12 } },
  { x: 11190, height: 75, offset: { x: 0, y: -12 } },
  { x: 11310, height: 75, offset: { x: 0, y: -544 } },
  { x: 11922, height: 75, offset: { x: 0, y: -1026 } },
  { x: 12222, height: canvas_height * 5, offset: { x: 0, y: -1526 } },
];

export let platform = { platforms_1, walls_1 };
