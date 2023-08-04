import { atom } from "jotai";
import {
  checkTableAtom,
  customCheckTableAtom,
  materialTableAtom,
  processTableAtom,
} from "./TableAtoms";
import { materialRowMap } from "Library/Types";
import { NREAtom } from "./NREAtoms";

export const totalAtom = atom<number[]>((get) => {
  const material = get(materialTotalAtom);
  const film = get(filmTotalAtom);
  const qual = get(qualityTotalAtom);
  const nre = get(NRETotalAtom);
  return [material, film, qual, nre];
});

//Total atom
export const fullTotalAtom = atom<number>((get) => {
  const typeTotalAtom: any = get(totalAtom);
  return typeTotalAtom.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
});

export const materialTotalAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(materialTableAtom);
  return typeRowsAtom.reduce(
    (previousScore: number, currentScore: materialRowMap) =>
      previousScore + currentScore.price,
    0
  );
});

export const filmTotalAtom = atom<number>((get) => {
  const typeFilmAtom: any = get(processTableAtom);
  return typeFilmAtom.reduce(
    (accumulator: number, currentValue: materialRowMap) =>
      accumulator + currentValue.price,
    0
  );
});

export const qualityTotalAtom = atom<number>((get) => {
  const typeQualAtom: any = get(checkTableAtom);
  return typeQualAtom.reduce(
    (accumulator: number, currentValue: string) =>
      accumulator + Number(currentValue),
    0
  );
});
export const NRETotalAtom = atom<number>((get) => {
  const typeNREAtom: any = get(NREAtom);
  const value: any = get(customCheckTableAtom);
  let accumulator: number = 0;
  value.map((row: string) => {
    accumulator += typeNREAtom[Number(row)];
  });
  return accumulator;
});
