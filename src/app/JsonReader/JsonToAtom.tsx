import { atom } from "jotai";
import { createRowPrice } from "Functions/Create/MapCreate";

interface materialAtom {
  Material: string;
  Price: string;
}

export const isolaAtom = atom([{ label: "1", value: "1" }]);

export default function JsonToAtom(json: any) {
  let array: any[] = [];
  json.then((a: any) => {
    for (let i: number = 0; i < a.length; i++) {
      array.push(
        createRowPrice(
          a[i].Material,
          a[i].Material,
          a[i].Price,
          a[i].Formula,
          i.toString(),
          a[i].Supplier
        )
      );
    }
  });

  return array;
}
