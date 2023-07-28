import { dictionaryMap } from "Library/Types";
import { Dispatch, SetStateAction } from "react";

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
