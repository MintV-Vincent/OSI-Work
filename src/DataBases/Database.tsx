import { rowMapPrice } from "Interface/Types";
import { createRowPrice } from "../Functions/GetFunction/Create/MapCreate";
import { atom } from "jotai";
import { isola } from "./JsonIsola";
import { arlon } from "./Arlon";
import { dupont } from "./Dupont";
import { panasonic } from "./Laminate";
import { cover } from "./JsonCover";
import { stiffener } from "./JsonString";
import { dryFilm } from "./JsonString";
import JsonToAtom from "../JsonReader/JsonToAtom";

const isolaAtom = atom(JsonToAtom(isola));
const arlonAtom = atom(JsonToAtom(arlon));
const dupontAtom = atom(JsonToAtom(dupont));
const panasonicAtom = atom(JsonToAtom(panasonic));
const coverAtom = atom(JsonToAtom(cover));
const stiffAtom = atom(JsonToAtom(stiffener));
const addedAtom = atom<rowMapPrice[]>([]);

export const materialAtom = atom(
  (get) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const cover = get(coverAtom);
    const stiff = get(stiffAtom);
    const added = get(addedAtom);
    return [stiff, cover, isola, arlon, dupont, panasonic, added];
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
    const stiff = get(stiffAtom);
    const added = get(addedAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [stiff, cover, isola, dupont, arlon, panasonic, added];
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
