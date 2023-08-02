import { rowMapPrice } from "Library/Types";
import { createRowPrice } from "../../Functions/Create/MapCreate";
import { isola } from "DataBases/JsonIsola";
import { arlon } from "DataBases/Arlon";
import { dupont } from "DataBases/Dupont";
import { panasonic } from "DataBases/Laminate";
import { cover } from "DataBases/JsonCover";
import { dryFilm } from "DataBases/Processes";
import JsonToAtom from "JsonReader/JsonToAtom";
import { atom } from "jotai";

const isolaAtom = atom(JsonToAtom(isola));
const arlonAtom = atom(JsonToAtom(arlon));
const dupontAtom = atom(JsonToAtom(dupont));
const panasonicAtom = atom(JsonToAtom(panasonic));
const coverAtom = atom(JsonToAtom(cover));
const addedAtom = atom<rowMapPrice[]>([]);

export const materialAtom = atom(
  (get) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const cover = get(coverAtom);
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

export const filmProcessAtom = atom(JsonToAtom(dryFilm));
export const process = atom<string>("");
export const unitPrice = atom<string>("");
export const filmAtom = atom(
  (get) => {
    const film = get(filmProcessAtom);
    return [film];
  },
  (get, set, value: string, label: string, price: number, formula: string) => {
    const film = get(filmProcessAtom);
    set(filmProcessAtom, [
      ...film,
      createRowPrice(label, value, price, formula),
    ]);
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
