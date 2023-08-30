/**
 * Create a string formated formula, replace any varriable name to its number from the program. This function is passed atoms
 * As useAtom hook can not be called in non functional compontents
 * @param formula :string -> The equation used to calculate the price of the material or process
 * @param amount :number -> The amount of materials or processes
 * @param unitPrice :number -> The unit price
 * @param exchangeRate :number -> exchange rate
 * @param size :number -> Size of the panel
 * @param yeild :number -> Yeild percentage
 * @param margin :number -> Margin percentage
 * @returns String of the formula with only numbers and math symbols. The string should be able to be passed to eval()
 *          return -1 to return a failed formula
 */

export function createFormula(
  formula: string,
  amount: number,
  unitPrice: number,
  exchangeRate: number | "" = 1,
  size: string = "1",
  yeild: number | "" = 1,
  margin: number | "" = 1
): string {
  let equation = formula.toLowerCase();

  equation = equation.replaceAll("exchange", exchangeRate.toString());
  equation = equation.replaceAll("exchange rate", exchangeRate.toString());
  equation = equation.replaceAll("amount", amount.toString());
  equation = equation.replaceAll("price", unitPrice.toString());
  equation = equation.replaceAll("size", size.toString());
  equation = equation.replaceAll("yeild", yeild.toString());
  equation = equation.replaceAll("margin", margin.toString());
  equation = equation.replaceAll("freight", "1");
  const removeDangerous = equation.replace(/[^\[0-9-*+/. ]/, "");
  return removeDangerous;
}

/**
 * Create a string formated formula, replace any varriable name to its number from the program. This function is passed atoms
 * As useAtom hook can not be called in non functional compontents
 * @param formula :string -> The equation used to calculate the price of the material or process
 * @param amount :number -> The amount of materials or processes
 * @param unitPrice :number -> The unit price
 * @param exchangeRate :number -> exchange rate
 * @param size :number -> Size of the panel
 * @param yeild :number -> Yeild percentage
 * @param margin :number -> Margin percentage
 * @returns Return a boolean if it passes the regex or not
 */

export function testCreateFormula(formula: string): boolean {
  let equation = formula.toLowerCase();

  equation = equation.replaceAll("exchange", "1");
  equation = equation.replaceAll("exchange rate", "1");
  equation = equation.replaceAll("amount", "1");
  equation = equation.replaceAll("price", "1");
  equation = equation.replaceAll("size", "1");
  equation = equation.replaceAll("freight", "1");
  const newname = /(\d+(\.\d*)?)\s*([+*/-]\s*\d+(\.\d*)?\s*)*/;
  console.log(equation);
  console.log(newname.test(equation));
  return newname.test(equation);
}
