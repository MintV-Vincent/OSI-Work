import { dictionaryMap } from "Library/Types";
import { Dispatch, SetStateAction } from "react";

/**
 *
 * @param customer: string -> The customer selected
 * @param array: dictionaryMap[] -> The array with customers and the code
 * @param setCode: Dispatch<SetStateAction<string>> -> Set the code via the array value
 */
export function getCode(
  customer: string,
  array: dictionaryMap[],
  setCode: Dispatch<SetStateAction<string>>
): void {
  const newCode = array.filter((label) => label.label === customer);
  if (newCode.length > 0) {
    setCode(newCode[0].value);
  } else {
    setCode("");
  }
}
