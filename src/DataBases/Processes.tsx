import { jsonMap } from "Library/Types";

export const dryFilm = [
  {
    id: 1,
    price: 0.25,
    service: "DRY FILM",
    formula: "price * amount * exchange * 1.2 * size",
    amount: 0,
  },
  {
    id: 2,
    price: 0.86,
    service: "DRY FILM GOLD",
    formula: "price * amount * exchange * 1.2 * size",
    amount: 0,
  },
  {
    id: 3,
    price: 0.56,
    service: "S/M Film",
    formula: "price * amount * exchange * 1.2 * size * 1.06",
    amount: 0,
  },
  {
    id: 4,
    price: 4.71,
    service: "PRESS",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 5,
    price: 10,
    service: "DRILL",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 6,
    price: 100,
    service: "LASER DRILL",
    formula: "price * amount * 1.19",
    amount: 0,
  },
  {
    id: 7,
    price: 12.4,
    service: "PTH",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 8,
    price: 8.86,
    service: "ETCH",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 9,
    price: 12.98,
    service: "Single Sided Etch 12 x 18 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 10,
    price: 15.4,
    service: "Single Sided Etch 18 x 24 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 101,
    price: 15.52,
    service: "Double sided etch 12 x 18 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 11,
    price: 20.18,
    service: "Double sided etch 18 x 24 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 12,
    price: 21.62,
    service: "Double Sided etch/button 12 x 18 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 13,
    price: 30.03,
    service: "Double Sided etch/button 18x24 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 14,
    price: 33.09,
    service: "Three layer etch/button 12 x 18 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 15,
    price: 45.43,
    service: "Three layer etch/button 18x24 panel",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 16,
    price: 7.93,
    service: "Soldermask developing",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 17,
    price: 8.25,
    service: "PLASMA",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 18,
    price: 0.51,
    service: "SOLDERMASK",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 19,
    price: 2.5,
    service: "SILKSCREEN",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 20,
    price: 10,
    service: "ROUTE 10",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 21,
    price: 0.64,
    service: "SILVER SHIELD",
    formula: "price * amount * exchange * 1.2 * size",
    amount: 0,
  },
  {
    id: 22,
    price: 1.24,
    service: "SILVER",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 23,
    price: 3,
    service: "AgCl",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 24,
    price: 17.65,
    service: "HASL (Hot air solder leveling)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 25,
    price: 70,
    service: "HARD GOLD",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 26,
    price: 17,
    service: "ENIG (Electroless nickel immersion gold )",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 27,
    price: 85,
    service: "ENEPIG (nickel/electroless palladium/gold ) - 12x18",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 28,
    price: 12,
    service: "TEST (12)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 29,
    price: 5,
    service: "SILVER LABOUR",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 30,
    price: 45,
    service: "VIA FILL - 12x18",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 31,
    price: 80,
    service: "VIA FILL - 18x24",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 32,
    price: 25,
    service: "SCORE (25)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 33,
    price: 40,
    service: "LABOUR (40)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 34,
    price: 25,
    service: "DRILL STIFFENER",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 35,
    price: 10,
    service: "PTH STIFFENER",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 36,
    price: 100,
    service: "LASER STIFFENER (PI)",
    formula: "price / 60 * amount * 1.19",
    amount: 0,
  },
  {
    id: 37,
    price: 25,
    service: "ROUTE STIFFENER (FR4)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 38,
    price: 25,
    service: "ROUTE (Mandatory for rigid flex)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 39,
    price: 40,
    service: "SCORE (Mandatory for rigid flex)",
    formula: "price * amount",
    amount: 0,
  },
  {
    id: 40,
    price: 100,
    service: "LASER TOP COVERLAY",
    formula: "price / 60 * amount * 1.19",
    amount: 0,
  },
  {
    id: 41,
    price: 100,
    service: "LASER BOTTOM COVERLAY",
    formula: "price / 60 * amount * 1.19",
    amount: 0,
  },
  {
    id: 42,
    price: 100,
    service: "LASER MINIPANEL",
    formula: "price / 60 * amount * 1.19",
    amount: 0,
  },
  {
    id: 43,
    price: 100,
    service: "LASER FLEX OUTLINE",
    formula: "price / 60 * amount * 1.19",
    amount: 0,
  },
];
