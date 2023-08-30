import { jsonMap, rowMapPrice } from "Library/Types";
import { createRowPrice } from "Functions/Create/MapCreate";
import JsonToAtom from "JsonReader/JsonToAtom";
import { atom } from "jotai";
import { readData } from "Directus SDK/directus";

const materialListAtom = atom(
  readData("Materials", 400).then((v) => JsonToAtom(v))
);
const addedAtom = atom<rowMapPrice[]>([]);

export const materialAtom = atom(
  async (get) => {
    const materials = await get(materialListAtom);
    const added = get(addedAtom);
    return [materials, added];
  },
  (
    get,
    set,
    value: string,
    label: string,
    price: number,
    formula: string,
    custom: string,
    supplier: string = "Added"
  ) => {
    const materials = get(materialListAtom);
    const added = get(addedAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, formula, custom, supplier, Number(price)),
    ]);
    return [materials, added];
  }
);

//These atoms are cause a lot of re-renders on calculation need to do something about it !
export const exchangeRateAtom = atom<number | "">(1);
export const exchangeRateMaterialAtom = atom<number | "">(1);
export const freightAtom = atom<number | "">(1);
export const yeildAtom = atom<number>(1);
export const marginAtom = atom<number>(1);
export const unitAtom = atom<number>(1);
export const upPanelAtom = atom<number>(1);
export const panelAtom = atom<string | "">("1.5");
export const quoteAtom = atom<string | "">("23-0001");
