import { dictionaryMap } from "Library/Types";

export function createCode(data: dictionaryMap[]): string {
  const lengthData: number = data.length;
  const numberOfDigits: number = (lengthData + 1).toString().length;
  let customerCode: string = "C";
  customerCode =
    customerCode + "0".repeat(4 - numberOfDigits) + (lengthData + 1);

  return customerCode;
}
