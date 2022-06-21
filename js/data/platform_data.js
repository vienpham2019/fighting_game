const canvas_width = 1024;
const canvas_height = 576;

const platforms_1 = [
  { x: 0, width: 95, offset: { x: 0, y: -272 } },
  { x: 0, width: 195, offset: { x: 0, y: 661 } },
  {
    x: 10,
    width: 891,
    offset: { x: 0, y: 951 },
    portal: true,
    portalFlip: true,
  },
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
  { x: 3180, width: 190, offset: { x: 0, y: 943 } },
  { x: 3370, width: 1373, offset: { x: 0, y: 1015 } },
  { x: 4740, width: 80, offset: { x: 0, y: 932 } },
  { x: 4820, width: 202, offset: { x: 0, y: 860 } },
  { x: 5020, width: 215, offset: { x: 0, y: 788 } },
  { x: 5235, width: 1980, offset: { x: 0, y: 861 } },
  { x: 7215, width: 600, offset: { x: 0, y: 934 } }, //
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
  { x: 11190, width: 1030, offset: { x: 0, y: 61 } }, //
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

const platforms_2 = [
  { x: 0, width: 3100, offset: { x: 0, y: -302 }, portal: true, boss: true },
];

const walls_2 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  { x: 3100, height: canvas_height * 5, offset: { x: 0, y: -1526 } },
];

const platforms_3 = [
  { x: 0, width: 1207, offset: { x: 0, y: -277 } },
  { x: 1207, width: 60, offset: { x: 0, y: -203 } },
  { x: 1347, width: 215, offset: { x: 0, y: -206 } },
  { x: 1657, width: 70, offset: { x: 0, y: -206 } },
  { x: 1827, width: 70, offset: { x: 0, y: -246 } },
  { x: 2005, width: 215, offset: { x: 0, y: -269 } },
  { x: 2269, width: 215, offset: { x: 0, y: -311 } },
  { x: 2539, width: 70, offset: { x: 0, y: -316 } },
  { x: 2609, width: 1410, offset: { x: 0, y: -385 } },
  { x: 4019, width: 450, offset: { x: 0, y: -312 } },
  { x: 4469, width: 1085, offset: { x: 0, y: -240 } },
  { x: 5564, width: 70, offset: { x: 0, y: -342 } },
  { x: 5554, width: 70, offset: { x: 0, y: -168 } },
  { x: 5684, width: 215, offset: { x: 0, y: -102 } },
  { x: 5904, width: 70, offset: { x: 0, y: -16 } },
  { x: 5944, width: 215, offset: { x: 0, y: 75 } },
  { x: 6093, width: 215, offset: { x: 0, y: 165 } },
  { x: 6243, width: 215, offset: { x: 0, y: 240 } },
  { x: 6463, width: 70, offset: { x: 0, y: 304 } },
  { x: 5737, width: 215, offset: { x: 0, y: -372 } },
  { x: 6000, width: 595, offset: { x: 0, y: -342 } },
  { x: 6595, width: 1835, offset: { x: 0, y: -415 } },
  { x: 8430, width: 450, offset: { x: 0, y: -342 } },
  { x: 8880, width: 1080, offset: { x: 0, y: -270 } },
  { x: 9960, width: 70, offset: { x: 0, y: -199 } },
  { x: 10100, width: 215, offset: { x: 0, y: -156 } },
  { x: 10325, width: 70, offset: { x: 0, y: -85 } },
  { x: 10375, width: 215, offset: { x: 0, y: -10 } },
  { x: 10555, width: 215, offset: { x: 0, y: 75 } },
  { x: 10695, width: 215, offset: { x: 0, y: 185 } },
  { x: 10930, width: 70, offset: { x: 0, y: 243 } },
  //
  { x: 520, width: 70, offset: { x: 0, y: -1059 } },
  { x: 590, width: 1170, offset: { x: 0, y: -1129 } },
  { x: 1760, width: 500, offset: { x: 0, y: -1201 } },
  { x: 2113, width: 215, offset: { x: 0, y: -1278 } },
  { x: 2345, width: 70, offset: { x: 0, y: -1176 } },
  { x: 2435, width: 215, offset: { x: 0, y: -1123 } },
  { x: 2670, width: 70, offset: { x: 0, y: -1043 } },
  { x: 2765, width: 215, offset: { x: 0, y: -978 } },
  { x: 2973, width: 215, offset: { x: 0, y: -889 } },
  { x: 3180, width: 215, offset: { x: 0, y: -789 } },
  { x: 3385, width: 70, offset: { x: 0, y: -712 } },
  { x: 3479, width: 70, offset: { x: 0, y: -598 } },
  { x: 3549, width: 215, offset: { x: 0, y: -502 } },
  { x: 3807, width: 70, offset: { x: 0, y: -445 } },
  { x: 2385, width: 215, offset: { x: 0, y: -1316 } },
  { x: 2600, width: 215, offset: { x: 0, y: -1386 } },
  { x: 2905, width: 70, offset: { x: 0, y: -1390 } },
  { x: 3060, width: 215, offset: { x: 0, y: -1393 } },
  { x: 3315, width: 70, offset: { x: 0, y: -1346 } },
  { x: 3445, width: 730, offset: { x: 0, y: -1319 } },
  { x: 4175, width: 540, offset: { x: 0, y: -1247 } },
  { x: 4715, width: 440, offset: { x: 0, y: -1320 } },
  { x: 5155, width: 1895, offset: { x: 0, y: -1393 } },
  { x: 7050, width: 470, offset: { x: 0, y: -1321 } },
  { x: 7520, width: 589, offset: { x: 0, y: -1248 } },
  { x: 8154, width: 215, offset: { x: 0, y: -1248 } },
  { x: 8404, width: 215, offset: { x: 0, y: -1208 } },
  { x: 8604, width: 605, offset: { x: 0, y: -1272 } },
  { x: 9209, width: 1740, offset: { x: 0, y: -1343 } },
  { x: 10949, width: 1290, offset: { x: 0, y: -1416 }, portal: true },
  { x: 8316, width: 70, offset: { x: 0, y: -1130 } },
  { x: 8071, width: 215, offset: { x: 0, y: -1058 } },
  { x: 7840, width: 215, offset: { x: 0, y: -937 } },
  { x: 7750, width: 70, offset: { x: 0, y: -832 } },
  { x: 7695, width: 70, offset: { x: 0, y: -752 } },
  { x: 7510, width: 215, offset: { x: 0, y: -667 } },
  { x: 7335, width: 215, offset: { x: 0, y: -587 } },
  { x: 7105, width: 215, offset: { x: 0, y: -497 } },
  //
  { x: 0, width: 2030, offset: { x: 0, y: 1130 } },
  { x: 2030, width: 1745, offset: { x: 0, y: 1200 } },
  { x: 3775, width: 610, offset: { x: 0, y: 1272 } },
  { x: 635, width: 70, offset: { x: 0, y: 1070 } },
  { x: 750, width: 70, offset: { x: 0, y: 1018 } },
  { x: 855, width: 215, offset: { x: 0, y: 953 } },
  { x: 1100, width: 235, offset: { x: 0, y: 880 } },
  { x: 1335, width: 512, offset: { x: 0, y: 809 } },
  { x: 1847, width: 312, offset: { x: 0, y: 737 } },
  { x: 2290, width: 70, offset: { x: 0, y: 684 } },
  { x: 2490, width: 790, offset: { x: 0, y: 648 } },
  { x: 3280, width: 300, offset: { x: 0, y: 576 } },
  { x: 3650, width: 70, offset: { x: 0, y: 573 } },
  { x: 3800, width: 70, offset: { x: 0, y: 555 } },
  { x: 3930, width: 600, offset: { x: 0, y: 549 } },
  { x: 4530, width: 500, offset: { x: 0, y: 477 } },
  { x: 5130, width: 610, offset: { x: 0, y: 467 } },
  { x: 5740, width: 1745, offset: { x: 0, y: 397 } },
  { x: 7485, width: 3700, offset: { x: 0, y: 323 } },
  { x: 11185, width: 1055, offset: { x: 0, y: 397 }, portal: true }, //
];

const walls_3 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  {
    x: 1207,
    height: 70,
    offset: { x: 0, y: -272 },
  },
  {
    x: 2609,
    height: 70,
    offset: { x: 0, y: -384 },
  },
  {
    x: 4019,
    height: 70,
    offset: { x: 0, y: -382 },
  },
  {
    x: 4469,
    height: 70,
    offset: { x: 0, y: -310 },
  },
  {
    x: 5554,
    height: 70,
    offset: { x: 0, y: -238 },
  },
  {
    x: 6595,
    height: 70,
    offset: { x: 0, y: -410 },
  },
  {
    x: 8430,
    height: 70,
    offset: { x: 0, y: -411 },
  },
  {
    x: 8880,
    height: 72,
    offset: { x: 0, y: -340 },
  },
  {
    x: 9960,
    height: 72,
    offset: { x: 0, y: -266 },
  },
  //
  {
    x: 590,
    height: 72,
    offset: { x: 0, y: -1128 },
  },
  {
    x: 1760,
    height: 72,
    offset: { x: 0, y: -1198 },
  },
  {
    x: 4175,
    height: 72,
    offset: { x: 0, y: -1317 },
  },
  {
    x: 4715,
    height: 72,
    offset: { x: 0, y: -1317 },
  },
  {
    x: 5155,
    height: 72,
    offset: { x: 0, y: -1389 },
  },
  {
    x: 7050,
    height: 72,
    offset: { x: 0, y: -1389 },
  },
  {
    x: 7520,
    height: 72,
    offset: { x: 0, y: -1318 },
  },
  {
    x: 9209,
    height: 72,
    offset: { x: 0, y: -1340 },
  },
  {
    x: 10949,
    height: 72,
    offset: { x: 0, y: -1412 },
  },
  //
  {
    x: 2030,
    height: 72,
    offset: { x: 0, y: 1132 },
  },
  {
    x: 3775,
    height: 72,
    offset: { x: 0, y: 1206 },
  },
  {
    x: 1335,
    height: 72,
    offset: { x: 0, y: 812 },
  },
  {
    x: 1847,
    height: 72,
    offset: { x: 0, y: 739 },
  },
  {
    x: 3280,
    height: 72,
    offset: { x: 0, y: 578 },
  },
  {
    x: 4530,
    height: 72,
    offset: { x: 0, y: 479 },
  },
  {
    x: 5740,
    height: 72,
    offset: { x: 0, y: 397 },
  },
  {
    x: 7485,
    height: 72,
    offset: { x: 0, y: 328 },
  },
  {
    x: 11185,
    height: 72,
    offset: { x: 0, y: 328 },
  },
  //
  {
    x: 12239,
    height: canvas_height * 5,
    offset: { x: 0, y: -1916 },
  },
];

const platforms_4 = [
  { x: 10, width: 70, offset: { x: 0, y: -235 } },
  { x: 80, width: 1827, offset: { x: 0, y: -303 } },
  { x: 1907, width: 1090, offset: { x: 0, y: -230 }, portal: true, boss: true },
  { x: 2997, width: 70, offset: { x: 0, y: -160 } },
];
const walls_4 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  { x: 80, height: 70, offset: { x: 0, y: -301 } },
  { x: 1907, height: 70, offset: { x: 0, y: -298 } },
  { x: 2997, height: 70, offset: { x: 0, y: -228 } },
];

const platforms_5 = [
  { x: 0, width: 1080, offset: { x: 0, y: -210 } },
  { x: 1080, width: 490, offset: { x: 0, y: -280 } },
  { x: 1630, width: 210, offset: { x: 0, y: -208 } },
  { x: 1800, width: 210, offset: { x: 0, y: -95 } },
  { x: 1980, width: 210, offset: { x: 0, y: 45 } },
  { x: 2200, width: 500, offset: { x: 0, y: 157 } },
  { x: 2700, width: 810, offset: { x: 0, y: 230 } },
  { x: 3510, width: 510, offset: { x: 0, y: 158 } },
  { x: 4020, width: 310, offset: { x: 0, y: 85 } },
  { x: 4370, width: 70, offset: { x: 0, y: 120 } },
  { x: 4425, width: 210, offset: { x: 0, y: 186 } },
  { x: 4595, width: 210, offset: { x: 0, y: 270 } },
  { x: 4815, width: 70, offset: { x: 0, y: 353 } },
  { x: 4900, width: 70, offset: { x: 0, y: 423 } },
  { x: 5010, width: 210, offset: { x: 0, y: 497 } },
  { x: 4815, width: 210, offset: { x: 0, y: 635 } },
  { x: 4970, width: 1400, offset: { x: 0, y: 730 } },
  { x: 6370, width: 450, offset: { x: 0, y: 805 } },
  { x: 6820, width: 1080, offset: { x: 0, y: 877 } },
  { x: 7900, width: 70, offset: { x: 0, y: 951 } },
  { x: 7800, width: 210, offset: { x: 0, y: 761 } },
  { x: 7990, width: 70, offset: { x: 0, y: 641 } },
  { x: 8040, width: 210, offset: { x: 0, y: 510 } },
  { x: 8280, width: 210, offset: { x: 0, y: 395 } },
  { x: 8430, width: 70, offset: { x: 0, y: 520 } },
  { x: 8500, width: 1090, offset: { x: 0, y: 446 } },
  { x: 9590, width: 445, offset: { x: 0, y: 374 } },
  { x: 10035, width: 1835, offset: { x: 0, y: 302 } },
  { x: 11870, width: 370, offset: { x: 0, y: 372 }, portal: true }, //
  //
  { x: 1215, width: 210, offset: { x: 0, y: -385 } },
  { x: 1470, width: 210, offset: { x: 0, y: -505 } },
  { x: 1705, width: 70, offset: { x: 0, y: -600 } },
  { x: 1895, width: 70, offset: { x: 0, y: -655 } },
  { x: 2100, width: 210, offset: { x: 0, y: -705 } },
  { x: 2280, width: 730, offset: { x: 0, y: -625 } },
  { x: 3010, width: 550, offset: { x: 0, y: -553 } },
  { x: 3560, width: 440, offset: { x: 0, y: -627 } },
  { x: 4000, width: 1885, offset: { x: 0, y: -698 } },
  { x: 5885, width: 775, offset: { x: 0, y: -626 } },
  { x: 6660, width: 1745, offset: { x: 0, y: -698 } },
  { x: 8405, width: 2025, offset: { x: 0, y: -770 } },
  { x: 10530, width: 210, offset: { x: 0, y: -660 } },
  { x: 10710, width: 70, offset: { x: 0, y: -583 } },
  { x: 10760, width: 210, offset: { x: 0, y: -500 } },
  { x: 11000, width: 70, offset: { x: 0, y: -370 } },
  { x: 11080, width: 70, offset: { x: 0, y: -250 } },
  { x: 11150, width: 210, offset: { x: 0, y: -120 } },
  { x: 11320, width: 210, offset: { x: 0, y: -2 } },
  { x: 11520, width: 70, offset: { x: 0, y: 105 } },
  { x: 11580, width: 210, offset: { x: 0, y: 210 } },
  { x: 10220, width: 70, offset: { x: 0, y: -847 } },
  { x: 10280, width: 210, offset: { x: 0, y: -940 } },
  { x: 10490, width: 70, offset: { x: 0, y: -1005 } },
  { x: 10540, width: 210, offset: { x: 0, y: -1070 } },
  { x: 10820, width: 600, offset: { x: 0, y: -1120 } },
  { x: 11420, width: 500, offset: { x: 0, y: -1192 }, portal: true }, //
  //
  { x: 420, width: 75, offset: { x: 0, y: -1185 } },
  { x: 495, width: 1905, offset: { x: 0, y: -1257 } },
  { x: 2400, width: 70, offset: { x: 0, y: -1185 } },
  { x: 2490, width: 70, offset: { x: 0, y: -1145 } },
  { x: 2570, width: 210, offset: { x: 0, y: -1070 } },
  { x: 2840, width: 210, offset: { x: 0, y: -1135 } },
  { x: 3125, width: 70, offset: { x: 0, y: -1142 } },
  { x: 3275, width: 70, offset: { x: 0, y: -1136 } },
  { x: 3345, width: 1090, offset: { x: 0, y: -1207 } },
  { x: 4435, width: 445, offset: { x: 0, y: -1279 } },
  { x: 4880, width: 2425, offset: { x: 0, y: -1350 } },
  { x: 7305, width: 495, offset: { x: 0, y: -1421 } },
  { x: 7855, width: 210, offset: { x: 0, y: -1361 } },
  { x: 8075, width: 70, offset: { x: 0, y: -1296 } },
  { x: 8155, width: 210, offset: { x: 0, y: -1230 } },
  { x: 8415, width: 70, offset: { x: 0, y: -1130 } },
  { x: 8535, width: 70, offset: { x: 0, y: -1065 } },
  { x: 8640, width: 210, offset: { x: 0, y: -975 } },
  { x: 8850, width: 210, offset: { x: 0, y: -870 } },
  { x: 2760, width: 210, offset: { x: 0, y: -963 } },
  { x: 2980, width: 70, offset: { x: 0, y: -888 } },
  { x: 3070, width: 70, offset: { x: 0, y: -815 } },
  { x: 3155, width: 210, offset: { x: 0, y: -755 } },
  { x: 3405, width: 70, offset: { x: 0, y: -690 } },
  //
  {
    x: 305,
    width: 560,
    offset: { x: 0, y: 1125 },
    portal: true,
    portalFlip: true,
  },
  { x: 865, width: 3410, offset: { x: 0, y: 1053 } },
  { x: 4275, width: 70, offset: { x: 0, y: 1127 } },
  { x: 4210, width: 210, offset: { x: 0, y: 952 } },
  { x: 4420, width: 70, offset: { x: 0, y: 872 } },
  { x: 4505, width: 210, offset: { x: 0, y: 799 } },
  { x: 4707, width: 70, offset: { x: 0, y: 710 } },
  { x: 4900, width: 65, offset: { x: 0, y: 803 } },
];

const walls_5 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  { x: 1080, height: 72, offset: { x: 0, y: -279 } },
  { x: 2700, height: 72, offset: { x: 0, y: 159 } },
  { x: 3510, height: 72, offset: { x: 0, y: 161 } },
  { x: 4020, height: 72, offset: { x: 0, y: 90 } },
  { x: 6370, height: 72, offset: { x: 0, y: 736 } },
  { x: 6820, height: 72, offset: { x: 0, y: 808 } },
  { x: 7900, height: 72, offset: { x: 0, y: 881 } },
  { x: 8500, height: 72, offset: { x: 0, y: 452 } },
  { x: 9590, height: 72, offset: { x: 0, y: 378 } },
  { x: 10035, height: 72, offset: { x: 0, y: 306 } },
  { x: 11870, height: 72, offset: { x: 0, y: 304 } },
  //
  { x: 3010, height: 72, offset: { x: 0, y: -622 } },
  { x: 3560, height: 72, offset: { x: 0, y: -621 } },
  { x: 4000, height: 72, offset: { x: 0, y: -696 } },
  { x: 5885, height: 72, offset: { x: 0, y: -696 } },
  { x: 6660, height: 72, offset: { x: 0, y: -695 } },
  { x: 8405, height: 72, offset: { x: 0, y: -767 } },
  { x: 11420, height: 72, offset: { x: 0, y: -1188 } },
  //
  { x: 495, height: 72, offset: { x: 0, y: -1254 } },
  { x: 2400, height: 72, offset: { x: 0, y: -1255 } },
  { x: 3345, height: 72, offset: { x: 0, y: -1205 } },
  { x: 4435, height: 72, offset: { x: 0, y: -1275 } },
  { x: 4880, height: 72, offset: { x: 0, y: -1347 } },
  { x: 7305, height: 72, offset: { x: 0, y: -1417 } },
  //
  { x: 305, height: 200, offset: { x: 0, y: 928 } },
  { x: 865, height: 72, offset: { x: 0, y: 1056 } },
  { x: 4275, height: 75, offset: { x: 0, y: 1055 } },
  { x: 4965, height: 72, offset: { x: 0, y: 734 } },
  {
    x: 12239,
    height: canvas_height * 5,
    offset: { x: 0, y: -1916 },
  },
];

const platforms_6 = [
  { x: 0, width: 610, offset: { x: 0, y: -260 }, portal: true },
  { x: 610, width: 490, offset: { x: 0, y: -332 } },
  { x: 1120, width: 210, offset: { x: 0, y: -210 } },
  { x: 1290, width: 210, offset: { x: 0, y: -90 } },
  { x: 1500, width: 70, offset: { x: 0, y: -5 } },
  { x: 1580, width: 70, offset: { x: 0, y: 75 } },
  { x: 1625, width: 210, offset: { x: 0, y: 165 } },
  { x: 1805, width: 210, offset: { x: 0, y: 265 } },
  { x: 2015, width: 70, offset: { x: 0, y: 365 } },
  { x: 2090, width: 70, offset: { x: 0, y: 445 } },
  { x: 200, width: 60, offset: { x: 0, y: 735 } },
  { x: 260, width: 2940, offset: { x: 0, y: 664 } },
  { x: 3200, width: 60, offset: { x: 0, y: 736 } },
  //
  { x: 1000, width: 210, offset: { x: 0, y: -422 } },
  { x: 935, width: 70, offset: { x: 0, y: -510 } },
  { x: 845, width: 70, offset: { x: 0, y: -590 } },
  { x: 670, width: 210, offset: { x: 0, y: -730 } },
  { x: 825, width: 70, offset: { x: 0, y: -820 } },
  { x: 895, width: 70, offset: { x: 0, y: -920 } },
  { x: 990, width: 210, offset: { x: 0, y: -985 } },
  { x: 1250, width: 70, offset: { x: 0, y: -1040 } },
  { x: 1320, width: 1895, offset: { x: 0, y: -1115 } },
  { x: 3215, width: 70, offset: { x: 0, y: -1043 } },
];

const walls_6 = [
  {
    x: -1,
    height: canvas_height * 5,
    offset: { x: 0, y: -(canvas_height * 2) },
  },
  { x: 610, height: 72, offset: { x: 0, y: -330 } },
  { x: 260, height: 72, offset: { x: 0, y: 666 } },
  { x: 3200, height: 72, offset: { x: 0, y: 666 } },
  { x: 1320, height: 72, offset: { x: 0, y: -1110 } },
  { x: 3215, height: 72, offset: { x: 0, y: -1113 } },
];

export let platform = {
  platforms_1,
  walls_1,
  platforms_2,
  walls_2,
  platforms_3,
  walls_3,
  platforms_4,
  walls_4,
  platforms_5,
  walls_5,
  platforms_6,
  walls_6,
};
