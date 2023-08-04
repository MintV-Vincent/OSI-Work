import { jsonMap, rowMapPrice } from "Library/Types";
import { createRowPrice } from "../../Functions/Create/MapCreate";
import JsonToAtom from "JsonReader/JsonToAtom";
import { atom } from "jotai";
import { createDirectus, readItems, rest } from "@directus/sdk";
interface DatabaseInterface {
  dataBase: jsonMap[];
}

const client = createDirectus<DatabaseInterface>("http://localhost:8055").with(
  rest()
);
async function readData(dataBase: any) {
  const result = await client.request(
    readItems(dataBase, {
      fields: ["*"],
    })
  );
  return result;
}

const isolaAtom = atom(readData("Isola").then((v) => JsonToAtom(v)));
const arlonAtom = atom(readData("Arlon").then((v) => JsonToAtom(v)));
const dupontAtom = atom(readData("Dupont").then((v) => JsonToAtom(v)));
const panasonicAtom = atom(readData("Panasonic").then((v) => JsonToAtom(v)));
const coverAtom = atom(readData("cover").then((v) => JsonToAtom(v)));
const addedAtom = atom<rowMapPrice[]>([]);

export const materialAtom = atom(
  async (get) => {
    const isola = await get(isolaAtom);
    const arlon = await get(arlonAtom);
    const dupont = await get(dupontAtom);
    const panasonic = await get(panasonicAtom);
    const cover = await get(coverAtom);
    const added = get(addedAtom);
    return [cover, isola, arlon, dupont, panasonic, added];
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
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const cover = get(coverAtom);
    const added = get(addedAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [cover, isola, dupont, arlon, panasonic, added];
  }
);

const filmProcessAtom = atom(readData("Panasonic").then((v) => JsonToAtom(v)));
const addedAtom2 = atom<rowMapPrice[]>([]);
export const filmAtom = atom(
  async (get) => {
    const film = await get(filmProcessAtom);
    return film;
  },
  (get, set, value: string, label: string, price: number, formula: string) => {
    const film = get(filmProcessAtom);
    const added = get(addedAtom2);
    set(addedAtom2, [...added, createRowPrice(label, value, price, formula)]);
    return [film];
  }
);

//These atoms are cause a lot of re-renders on calculation need to do something about it !
export const exchangeRateAtom = atom<number | "">(1);
export const freightAtom = atom<number | "">(1);
export const yeildAtom = atom<number | "">(1);
export const marginAtom = atom<number | "">(1);
export const unitAtom = atom<number>(1);
export const panelAtom = atom<string | "">("1.5");
