/**
 * Create a string formated formula, replace any varriable name to its number from the program. This function is passed atoms
 * As useAtom hook can not be called in non functional compontents
 * @param formula :string -> The equation used to calculate the price of the material or process
 * @param amount :number -> The amount of materials or processes
 * @param unitPrice :number -> The unit price
 * @param exchangeRate :number -> exchange rate
 * @param freight :number -> global freight
 * @param size :number -> Size of the panel
 * @param yeild :number -> Yeild percentage
 * @param margin :number -> Margin percentage
 * @returns String of the formula with only numbers and math symbols. The string should be able to be passed to eval()
 */

export function createFormula(
  formula: string,
  amount: number,
  unitPrice: number,
  exchangeRate: number | "" = 1,
  freight: number | "" = 1,
  size: string = "1",
  yeild: number | "" = 1,
  margin: number | "" = 1
): string {
  if (formula.indexOf(" ") > 0) {
    const arrayFormula: string[] = formula.split(" ");
    let equation: string = "";
    for (let i: number = 0; i < arrayFormula.length; i++) {
      try {
        switch (arrayFormula[i]) {
          case "amount":
            equation = equation + amount;
            break;
          case "price":
            equation = equation + unitPrice;
            break;
          case "exchange":
            equation = equation + exchangeRate;
            break;
          case "size":
            equation = equation + "1";
            break;
          case "freight":
            equation = equation + freight;
            break;
          case "yeild":
            equation = equation + yeild;
            break;
          case "margin":
            equation = equation + margin;
            break;
          case "*":
            equation = equation + "*";
            break;
          case "/":
            equation = equation + "/";
            break;
          case "-":
            equation = equation + "-";
            break;
          case "+":
            equation = equation + "+";
            break;
          case "":
            equation = equation;
            break;
          default:
            equation = equation + arrayFormula[i];
            break;
        }
      } catch {
        console.log("FORMULA ERROR wrong formula format");
      }
    }
    return equation;
  }
  return "0";
}
