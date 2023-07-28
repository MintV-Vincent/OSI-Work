import { createData } from "Functions/GetFunction/Create/MapCreate";
import { dictionaryMap } from "Interface/Types";

export default function JsonToCustomer(json: any[]): dictionaryMap[] {
  let array: dictionaryMap[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(createData(json[i].name, json[i].code));
  }
  return array;
}
