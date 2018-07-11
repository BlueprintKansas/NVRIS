// English Advanced Ballot

export const ABEN = [
  { name: "01_countyName", x1: 581, y1: 290, x2: 858, y2: 333, type: "draw" },
  { name: "01_forStateName", x1: 212, y1: 336, x2: 506, y2: 372, type: "draw" },
  {
    name: "01_forCountyName",
    x1: 661,
    y1: 341,
    x2: 959,
    y2: 372,
    type: "draw"
  },
  {
    name: "02_ksDriversLicenseNumber",
    x1: 1117,
    y1: 536,
    x2: 1585,
    y2: 626,
    type: "draw"
  },
  { name: "03_lastName", x1: 105, y1: 1032, x2: 555, y2: 1077, type: "draw" },
  { name: "03_firstName", x1: 606, y1: 1031, x2: 1056, y2: 1077, type: "draw" },
  {
    name: "03_middleInitial",
    x1: 1102,
    y1: 1030,
    x2: 1156,
    y2: 1077,
    type: "draw"
  },
  { name: "03_dob", x1: 1208, y1: 1027, x2: 1592, y2: 1077, type: "draw" },
  {
    name: "03_residentialAddress",
    x1: 101,
    y1: 1106,
    x2: 744,
    y2: 1144,
    type: "draw"
  },
  { name: "03_city", x1: 801, y1: 1105, x2: 1151, y2: 1144, type: "draw" },
  { name: "03_state", x1: 1201, y1: 1106, x2: 1353, y2: 1144, type: "draw" },
  { name: "03_zipCode", x1: 1402, y1: 1105, x2: 1596, y2: 1144, type: "draw" },
  {
    name: "03_politicalParty_democratic",
    x1: 864,
    y1: 1195,
    x2: 884,
    y2: 1215,
    type: "fill"
  },
  {
    name: "03_politicalParty_republican",
    x1: 1028,
    y1: 1195,
    x2: 1048,
    y2: 1214,
    type: "fill"
  },
  {
    name: "04_mailAddress",
    x1: 104,
    y1: 1299,
    x2: 743,
    y2: 1350,
    type: "draw"
  },
  { name: "04_city", x1: 802, y1: 1298, x2: 1151, y2: 1350, type: "draw" },
  { name: "04_state", x1: 1200, y1: 1298, x2: 1353, y2: 1350, type: "draw" },
  { name: "04_zipCode", x1: 1402, y1: 1298, x2: 1596, y2: 1350, type: "draw" },
  {
    name: "05_actualVotingDate",
    x1: 102,
    y1: 1677,
    x2: 406,
    y2: 1716,
    type: "draw"
  },
  {
    name: "05_signatureDate",
    x1: 808,
    y1: 1758,
    x2: 1176,
    y2: 1832,
    type: "draw"
  },
  {
    name: "05_phoneNumber",
    x1: 1231,
    y1: 1758,
    x2: 1591,
    y2: 1832,
    type: "draw"
  }
];

// Nice Tool : http://nicodjimenez.github.io/boxLabel/annotate.html

// Added x1,x2 and y1,y2 to make available some validation function to resize and fit the rendered text in the box.
// I strongly believe that we need one!

/*


{name: "citizen_yes", x1: 408, x3: 220, y1: 435, y2: 248},
{name: "citizen_no", x1: 483, x3: 221, y1: 509, y2: 246},
{name: "18_yes", x1: 1068, x3: 220, y1: 1093, y2: 246},
{name: "18_no", x1: 1140, x3: 221, y1: 1165, y2: 246},
{name: "01_prefix_mr", x1: 138, x3: 373, y1: 181, y2: 417},
{name: "01_prefix_mrs", x1: 191, x3: 372, y1: 237, y2: 418},
{name: "01_prefix_miss", x1: 247, x3: 373, y1: 295, y2: 418},
{name: "01_prefix_ms", x1: 310, x3: 372, y1: 354, y2: 417},
{name: "01_lastName", x1: 374, x3: 373, y1: 701, y2: 423},
{name: "01_firstName", x1: 714, x3: 374, y1: 1034, y2: 423},
{name: "01_middleName", x1: 1043, x3: 375, y1: 1355, y2: 425},
{name: "01_suffix_jr", x1: 1363, x3: 379, y1: 1390, y2: 414},
{name: "01_suffix_sr", x1: 1411, x3: 378, y1: 1443, y2: 414},
{name: "01_suffix_II", x1: 1463, x3: 379, y1: 1493, y2: 414},
{name: "01_suffix_III", x1: 1508, x3: 379, y1: 1543, y2: 414},
{name: "01_suffix_iv", x1: 1556, x3: 378, y1: 1593, y2: 414},
{name: "02_homeAddress", x1: 138, x3: 456, y1: 703, y2: 492},
{name: "02_apt", x1: 713, x3: 456, y1: 901, y2: 492},
{name: "02_city", x1: 909, x3: 456, y1: 1223, y2: 491},
{name: "02_state", x1: 1232, x3: 454, y1: 1426, y2: 491},
{name: "02_zipcode", x1: 1436, x3: 455, y1: 1590, y2: 490},
{name: "03_mailingAddress", x1: 138, x3: 523, y1: 899, y2: 560},
{name: "03_city", x1: 909, x3: 524, y1: 1223, y2: 562},
{name: "03_state", x1: 1233, x3: 525, y1: 1427, y2: 561},
{name: "03_zip", x1: 1436, x3: 525, y1: 1590, y2: 562},
{name: "04_dob", x1: 246, x3: 601, y1: 481, y2: 633},
{name: "05_telephone", x1: 549, x3: 597, y1: 900, y2: 664},
{name: "06_idNumber", x1: 964, x3: 619, y1: 1578, y2: 714},
{name: "07_party", x1: 215, x3: 720, y1: 493, y2: 765},
{name: "08_race", x1: 610, x3: 721, y1: 898, y2: 766},
{name: "09_signature", x1: 993, x3: 795, y1: 1455, y2: 869},
{name: "09_month", x1: 1017, x3: 928, y1: 1113, y2: 963},
{name: "09_day", x1: 1162, x3: 927, y1: 1277, y2: 964},
{name: "09_year", x1: 1318, x3: 930, y1: 1450, y2: 961},
{name: "a_prefix", x1: 210, x3: 1274, y1: 292, y2: 1356},
{name: "a_lastName", x1: 304, x3: 1296, y1: 673, y2: 1356},
{name: "a_firstName", x1: 686, x3: 1297, y1: 1048, y2: 1357},
{name: "a_middleName", x1: 1062, x3: 1299, y1: 1398, y2: 1358},
{name: "a_suffix_jr", x1: 1410, x3: 1332, y1: 1432, y2: 1357},
{name: "a_suffix_sr", x1: 1449, x3: 1332, y1: 1476, y2: 1358},
{name: "a_suffix_II", x1: 1489, x3: 1332, y1: 1513, y2: 1357},
{name: "a_suffix_III", x1: 1525, x3: 1332, y1: 1551, y2: 1357},
{name: "a_suffix_IV", x1: 1563, x3: 1332, y1: 1591, y2: 1358},
{name: "b_street", x1: 139, x3: 1465, y1: 673, y2: 1503},
{name: "b_apt", x1: 684, x3: 1468, y1: 857, y2: 1505},
{name: "b_city", x1: 867, x3: 1471, y1: 1215, y2: 1505},
{name: "b_state", x1: 1224, x3: 1473, y1: 1431, y2: 1505},
{name: "b_zip", x1: 1439, x3: 1474, y1: 1591, y2: 1505},
{name: "d_helper", x1: 134, x3: 1983, y1: 1593, y2: 2048},



*/
