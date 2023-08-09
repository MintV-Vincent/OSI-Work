import { atom } from "jotai";
import {
  checkTableAtom,
  customCheckTableAtom,
  materialTableAtom,
  processTableAtom,
} from "./TableAtoms";
import { materialRowMap } from "Library/Types";
import { NREAtom } from "./NREAtoms";
import {
  exchangeRateAtom,
  marginAtom,
  unitAtom,
  yeildAtom,
} from "./AtomStorage";
import { currencySelectorAtom } from "./FrontPageAtoms";

export const totalAtom = atom<number[]>((get) => {
  const material = get(materialTotalAtom);
  const film = get(filmTotalAtom);
  const qual = get(qualityTotalAtom);
  const nre = get(NRETotalAtom);
  return [material, film, qual, nre];
});

//Total atom
export const fullTotalAtom = atom<number>((get) => {
  const selector: string = get(currencySelectorAtom);
  const CADTotal: any = get(CADTotalAtom);
  const USDTotal: any = get(USDTotalAtom);
  if ("CAD" === selector) {
    return CADTotal;
  } else {
    return USDTotal;
  }
});

export const CADTotalAtom = atom<number>((get) => {
  const typeTotalAtom: any = get(totalAtom);
  return typeTotalAtom.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
});

export const USDTotalAtom = atom<number>((get) => {
  const CADTotal: any = get(CADTotalAtom);
  const exchangeRate: any = get(exchangeRateAtom);
  if (isNaN(exchangeRate)) {
    return CADTotal / 1;
  }
  return CADTotal / exchangeRate;
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

export const yeildTotalAtom = atom<number>((get) => {
  const fullTotal = get(fullTotalAtom);
  let yeildPercentage = get(yeildAtom);
  if (yeildPercentage === 0) {
    yeildPercentage = 1;
  }
  return fullTotal / Number(yeildPercentage);
});

export const marginTotalAtom = atom<number>((get) => {
  const yeildTotal = get(yeildTotalAtom);
  let marginPercentage = get(marginAtom);
  if (marginPercentage === 0) {
    marginPercentage = 1;
  }
  return yeildTotal / Number(marginPercentage);
});

export const unitTotalAtom = atom<number>((get) => {
  const marginTotal = get(marginTotalAtom);
  let numberOfUnits = get(unitAtom);
  if (numberOfUnits === 0) {
    numberOfUnits = 1;
  }
  return marginTotal / Number(numberOfUnits);
});
