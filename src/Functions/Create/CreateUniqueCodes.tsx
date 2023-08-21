import { dictionaryMap } from "Library/Types";

/**
 *
 * @param data: dictionaryMap[] -> The dictionary map of the customers as the label and value which is the code
 * @returns: string -> Retures the code as C####
 */
export function createCode(data: dictionaryMap[]): string {
  return "C" + createUniqueFours(data);
}

/**
 *
 * @param quote string[] -> This is the list with all the quote numbers
 * @param setQuote () => void -> This will create a new quote
 */
export default function createQuote(quote: string[], setQuote: any) {
  const showdate: Date = new Date();
  const lastTwoDigitsYear: number = showdate.getFullYear() - 2000;

  const quoteNumber: string =
    lastTwoDigitsYear + "-" + createUniqueFours(quote);
  if (quote?.length > 0) {
    setQuote([...quote, quoteNumber]);
  }
}

export function createUniqueFours(data: any[]): string {
  const lengthData: number = data.length;
  const numberOfDigits: number = (lengthData + 1).toString().length;

  return "0".repeat(4 - numberOfDigits) + (lengthData + 1);
}
