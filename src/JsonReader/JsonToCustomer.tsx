import { createData } from "Functions/Create/MapCreate";
import { dictionaryMap } from "Library/Types";

/**
 *
 * @param json The json of the customer and code
 * @returns: dictionaryMap[] -> Returns the customer and code as a dictionary map of label and values. Label is customer, Value is the code. EVERY CODE SHOULD BE UNIQUE
 */
export default function JsonToCustomer(json: any[]): dictionaryMap[] {
  let array: dictionaryMap[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(createData(json[i].name, json[i].code));
  }
  return array;
}
