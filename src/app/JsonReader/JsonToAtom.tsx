import { createRowPrice } from "Functions/Create/MapCreate";

export default function JsonToAtom(json: any) {
  let array: any[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(
      createRowPrice(
        json[i].supplier
          ? json[i].material + json[i].supplier
          : json[i].material,
        json[i].material,
        json[i].price,
        json[i].formula,
        i.toString(),
        json[i].supplier ? json[i].supplier : "-"
      )
    );
  }
  return array;
}
