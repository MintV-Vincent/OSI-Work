import { atom } from "jotai";
import { materialTableAtom } from "./TableAtoms";
import { materialRowMap, servicesMap } from "Library/Types";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
  filmProcessAtom,
  marginAtom,
  unitAtom,
  yeildAtom,
} from "./AtomStorage";
import { currencySelectorAtom } from "./FrontPageAtoms";
import { nreAtom, servicesAtom } from "./ServiceStorage";

export const totalAtom = atom<number[]>((get) => {
  const material = get(materialTotalAtomCAD);
  const film = get(filmTotalAtom);
  const qual = get(qualityTotalAtom);
  const nre = get(NRETotalAtom);
  return [material, film, qual, nre];
});

//Total atom
export const fullTotalAtom = atom<number>((get) => {
  const selector: string = get(currencySelectorAtom);
  const CADTotal: any = get(CADTotalAtom);
  const exchangeRate: any = get(exchangeRateAtom);
  if ("CAD" === selector) {
    return CADTotal;
  } else {
    return CADTotal / exchangeRate;
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
  const exchangeRate: any = get(exchangeRateMaterialAtom);
  if (isNaN(exchangeRate) || exchangeRate === 0) {
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

export const materialTotalAtomCAD = atom<number>((get) => {
  const typeRowsAtom: any = get(materialTableAtom);
  const exchangeRate: any = get(exchangeRateMaterialAtom);
  return (
    typeRowsAtom.reduce(
      (previousScore: number, currentScore: materialRowMap) =>
        previousScore + currentScore.price,
      0
    ) * exchangeRate
  );
});

export const filmTotalAtom = atom<number>((get) => {
  const typeFilmAtom: any = get(filmProcessAtom);
  return typeFilmAtom.reduce(
    (accumulator: number, currentValue: materialRowMap) =>
      accumulator + currentValue.price,
    0
  );
});

export const qualityTotalAtom = atom<number>((get) => {
  const typeQualAtom: any = get(servicesAtom);
  return typeQualAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
});
export const NRETotalAtom = atom<number>((get) => {
  const typeNREAtom: any = get(nreAtom);
  return typeNREAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
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
