import { rowMapPrice } from "Interface/Types";
import { createRowPrice } from "../Functions/Create/MapCreate";
import JsonToAtom from "JsonReader/JsonToAtom";
import { atom } from "jotai";
import {
  getArlon,
  getDupont,
  getIsola,
  getPanasonic,
} from "Query/LaminateQuery";
import { getStiffener } from "Query/StiffenerQuery";
import { getFilm } from "Query/FilmQuery";
import { getCoverCoat } from "Query/CoverCoatQuery";

const isolaAtom = atom(JsonToAtom(getIsola()));
const arlonAtom = atom(JsonToAtom(getArlon()));
const dupontAtom = atom(JsonToAtom(getDupont()));
const panasonicAtom = atom(JsonToAtom(getPanasonic()));
export const laminateAtom = atom(
  async (get) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const added = get(addedAtom);
    return [isola, arlon, dupont, panasonic, added];
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
    const added = get(addedAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [isola, dupont, arlon, panasonic, added];
  }
);

const addedAtom = atom<rowMapPrice[]>([]);

const coverAtom = atom(JsonToAtom(getCoverCoat()));
const addedAtom3 = atom<rowMapPrice[]>([]);
export const coverCoatAtom = atom(
  async (get) => {
    const cover = get(coverAtom);
    const added = get(addedAtom3);
    return [cover, added];
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
    const cover = get(coverAtom);
    const added = get(addedAtom3);
    set(addedAtom3, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [cover, added];
  }
);

const stiffAtom = atom(JsonToAtom(getStiffener()));
const addedAtom2 = atom<rowMapPrice[]>([]);
export const stiffenerAtom = atom(
  async (get) => {
    const stiff = get(stiffAtom);
    const added = get(addedAtom2);
    return [stiff, added];
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
    const stiff = get(stiffAtom);
    const added = get(addedAtom2);
    set(addedAtom2, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [stiff, added];
  }
);

export const filmProcessAtom = atom(JsonToAtom(getFilm()));
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
