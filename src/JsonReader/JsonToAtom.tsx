import { createRowPrice } from "Functions/GetFunction/Create/MapCreate";
import { jsonMap, rowMapPrice } from "Interface/Types";

export default function JsonToAtom(json: jsonMap[]): rowMapPrice[] {
  let array: rowMapPrice[] = [];
  for (let i: number = 0; i < json.length; i++) {
    const changeToNumber: number = Number(json[i].price);
    array.push(
      createRowPrice(
        json[i].material,
        json[i].material,
        changeToNumber,
        json[i].formula,
        i.toString(),
        json[i].supplier ? json[i].supplier : "-"
      )
    );
  }
  return array;
}
