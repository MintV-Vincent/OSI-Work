import { servicesMap } from "Library/Types";

export function createService(
  id: number,
  amount: number,
  formula: string,
  material: string,
  unitPrice: number,
  price: number = 0
): servicesMap {
  return { id, amount, formula, material, unitPrice, price };
}
