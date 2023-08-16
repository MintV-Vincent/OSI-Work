import { jsonMap, rowMapPrice } from "Library/Types";
import { createRowPrice } from "../../Functions/Create/MapCreate";
import JsonToAtom from "JsonReader/JsonToAtom";
import { atom } from "jotai";
import { cover } from "DataBases/JsonCover";
import { panasonic } from "DataBases/Laminate";
import { dupont } from "DataBases/Dupont";
import { arlon } from "DataBases/Arlon";
import { isola } from "DataBases/JsonIsola";
import { dryFilm } from "DataBases/Processes";
import { tapes } from "DataBases/Tapes";
import { Mtapes } from "DataBases/3MTapes";
import { arwisa } from "DataBases/Arwisa";
import JsonToService from "JsonReader/JsonToService";

const isolaAtom = atom(JsonToAtom(isola));
const arlonAtom = atom(JsonToAtom(arlon));
const dupontAtom = atom(JsonToAtom(dupont));
const panasonicAtom = atom(JsonToAtom(panasonic));
const coverAtom = atom(JsonToAtom(cover));
const tapesAtom = atom(JsonToAtom(tapes));
const MAtom = atom(JsonToAtom(Mtapes));
const arwisaAtom = atom(JsonToAtom(arwisa));
const addedAtom = atom<rowMapPrice[]>([]);

export const materialAtom = atom(
  (get) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const cover = get(coverAtom);
    const tapes = get(tapesAtom);
    const mtapes = get(MAtom);
    const arwisa = get(arwisaAtom);
    const added = get(addedAtom);
    return [
      cover,
      isola,
      arlon,
      dupont,
      panasonic,
      tapes,
      mtapes,
      arwisa,
      added,
    ];
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
    const tapes = get(tapesAtom);
    const mtapes = get(MAtom);
    const arwisa = get(arwisaAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [
      cover,
      isola,
      arlon,
      dupont,
      panasonic,
      tapes,
      mtapes,
      arwisa,
      added,
    ];
  }
);

export const filmProcessAtom = atom(JsonToService(dryFilm));
// export const filmAtom = atom(
//   (get) => {
//     const film = get(filmProcessAtom);
//     return film;
//   }
// (get, set, value: string, label: string, price: number, formula: string) => {
//   const film = get(filmProcessAtom);
//   set(filmProcessAtom, [
//     ...film,
//     createRowPrice(label, value, price, formula),
//   ]);
//   return film;
// }
//);

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
