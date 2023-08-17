import { createRowPrice } from "Functions/Create/MapCreate";
import { rowMapPrice } from "Library/Types";

export default function JsonToAtom(json: any[]): rowMapPrice[] {
  let array: rowMapPrice[] = [];
  for (let i: number = 0; i < json.length; i++) {
    const changeToNumber: number = Number(json[i].price);
    array.push(
      createRowPrice(
        json[i].material,
        json[i].material,
        json[i].formula,
        i.toString(),
        json[i].supplier ? json[i].supplier : "-",
        changeToNumber
      )
    );
  }
  return array;
}
