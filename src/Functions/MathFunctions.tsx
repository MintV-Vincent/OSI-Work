import { materialRowMap } from "Library/Types";

export function addArrayTotal(array: number[]): number {
  // Add the total of an array and returns it as a number
  //
  // array:RowMap[] -> Is an array with its label, and value. Use it's value to calculate total. adds the total of EVERYTHING.
  //
  // Return: sum

  let total: number = 0;
  array.map((row: number) => {
    total += row;
  });

  return total;
}

export function addStringArrayTotal(array: string[]): number {
  // Add the total of an array and returns it as a number
  //
  // array:RowMap[] -> Is an array with its label, and value. Use it's value to calculate total. adds the total of EVERYTHING.
  //
  // Return: sum

  let total: number = 0;
  array.map((row: string) => {
    total += Number(row);
  });

  return total;
}

export function addTableTotal(array: materialRowMap[]): number {
  // Add the total of an array and returns it as a number
  //
  // array:addArrayTotal[] -> Is an array with its label, and value. Use it's value to calculate total. MUST BE materialRowMap TYPE.
  //
  // Return: sum

  let total: number = 0;
  array.map((row: materialRowMap) => {
    total += row.price;
  });

  return total;
}

export function newTotal(total: number, dividor: number | ""): number {
  // Calculate new total after beind divided.
  //
  // total: number -> The total that is being passed into the function
  // dividor: number -> Turn into a float and divid the total. This should be yeild, number of units or margin
  //
  // Return:
  // if dividor is not a number return total
  // else return total/dividor

  return dividor === 0 || dividor === "" ? total : total / dividor;
}
