import { createService } from "Functions/Create/MapCreate";
import { servicesMap } from "Library/Types";

/**
 *
 * @param json
 * @returns: servicesMap[] -> Returns a service map that will be used for the right side of the sales page.
 */
export default function JsonToService(json: any[]): servicesMap[] {
  let array: servicesMap[] = [];
  for (let i: number = 0; i < json.length; i++) {
    array.push(
      createService(i, 0, json[i].formula, json[i].service, json[i].price, 0)
    );
  }
  return array;
}
