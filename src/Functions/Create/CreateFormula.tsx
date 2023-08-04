export function createFormula(
  formula: string,
  cost: number,
  exchangeRate: number | "" = 1,
  freight: number | "" = 1,
  size: string = "1",
  yeild: number | "" = 1,
  margin: number | "" = 1
): string {
  // Create a string formated formula, replace any varriable name to its number from the program
  //
  // formula: string -> The equation used to calculate the price of the material or process
  // cost: number -> The unit price of each material
  //
  // Return:
  // String of the formula with only numbers and math symbols. The string should be able to be passed to eval()

  if (exchangeRate === "") {
    exchangeRate = 1;
  }

  if (formula.indexOf(" ") > 0) {
    const arrayFormula: string[] = formula.split(" ");
    let equation: string = "";
    for (let i: number = 0; i < arrayFormula.length; i++) {
      try {
        switch (arrayFormula[i]) {
          case "cost":
            equation = equation + cost;
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
          default:
            equation = equation + arrayFormula[i].toString();
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
