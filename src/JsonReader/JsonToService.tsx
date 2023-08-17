import { createService } from "Functions/Create/MapCreate";
import { servicesMap } from "Library/Types";

export default function JsonToService(json: any[]): servicesMap[] {
  let array: servicesMap[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(
      createService(
        i,
        json[i].amount,
        json[i].formula,
        json[i].material,
        json[i].price,
        0
      )
    );
  }
  return array;
}
