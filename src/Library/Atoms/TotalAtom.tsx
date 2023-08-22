import { atom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialRowMap, servicesMap } from "Library/Types";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
  filmProcessAtom,
  marginAtom,
  upPanelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { currencySelectorAtom } from "Library/Atoms/FrontPageAtoms";
import {
  USDQualityTotalAtom,
  USDTotalFrontAtom,
  USDTotalNREAtom,
} from "Library/Atoms/TotalAtomUSD";
import { assemblyDataAtom } from "./ServiceStorage";

export const materialFilmTotalAtom = atom<number>((get) => {
  const material = get(materialTotalAtom);
  const film = get(filmTotalAtom);
  const assmbly = get(assemblyTotalAtom);

  return film + material + assmbly;
});

export const serviceTotalAtom = atom<number>((get) => {
  const qual = get(qualityTotalAtom);
  const nre = get(NRETotalAtom);
  return qual + nre;
});

//Total atom
export const fullTotalAtom = atom<number>((get) => {
  const selector: string = get(currencySelectorAtom);
  const CADTotal: any = get(materialFilmTotalAtom);
  const exchangeRate: any = get(exchangeRateAtom);
  if ("CAD" === selector) {
    return CADTotal;
  } else {
    return CADTotal / exchangeRate;
  }
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
  const typeFilmAtom: any = get(filmProcessAtom);
  return typeFilmAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + currentValue.price,
    0
  );
});

export const assemblyTotalAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(assemblyDataAtom);
  return typeRowsAtom.reduce(
    (previousScore: number, currentScore: servicesMap) =>
      previousScore + currentScore.price,
    0
  );
});

export const qualityTotalAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(USDQualityTotalAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return typeRowsAtom * exchangeRate;
});

export const NRETotalAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(USDTotalNREAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return typeRowsAtom * exchangeRate;
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
  const unitTotal = get(USDTotalFrontAtom);
  let numberOfUnits = get(upPanelAtom);
  if (numberOfUnits === 0) {
    numberOfUnits = 1;
  }
  return unitTotal / Number(numberOfUnits);
});
