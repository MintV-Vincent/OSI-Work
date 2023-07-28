import { createData } from "Functions/Create/MapCreate";
import { dictionaryMap } from "Library/Types";

export default function JsonToCustomer(json: any[]): dictionaryMap[] {
  let array: dictionaryMap[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(createData(json[i].name, json[i].code));
  }
  return array;
}
