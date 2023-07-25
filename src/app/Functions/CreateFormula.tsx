import {
  exchangeRateAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "MainWebsite";
import { useAtom } from "jotai";

export function createFormula(formula: string, cost: number): string {
  // Create a string formated formula, replace any varriable name to its number from the program
  //
  // formula: string -> The equation used to calculate the price of the material or process
  // cost: number -> The unit price of each material
  //
  // Return:
  // String of the formula with only numbers and math symbols. The string should be able to be passed to eval()
  try {
    const [exchangeRate] = useAtom(exchangeRateAtom);
    const [freight] = useAtom(freightAtom);
    const [panel] = useAtom(panelAtom);
    const [yeild] = useAtom(yeildAtom);
    const [margin] = useAtom(marginAtom);
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
            equation = equation + panel;
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
        }
      } catch {
        console.log("FORMULA ERROR wrong formula format");
      }
      return equation;
    }
  } catch {
    console.log("String Error, no spaces");
  }
  return "ERROR";
}
