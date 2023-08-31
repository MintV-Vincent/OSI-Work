export const assembly = [
  {
    id: 1,
    service: "Assembly Manual (units per hour)",
    price: 26,
    amount: 0,
    formula: "price * amount * 1.19 / 60 / 0.425 / exchange",
  },
  {
    id: 2,
    service: "Assembly SMT (units per hour)",
    price: 250,
    amount: 0,
    formula: "price / amount * 1.19 / exchange",
  },
];
