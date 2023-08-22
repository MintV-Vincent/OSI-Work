import { materialRowMap, servicesMap } from "Library/Types";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
  filmProcessAtom,
} from "Library/Atoms/AtomStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { atom } from "jotai";
import { nreAtom, servicesAtom } from "./ServiceStorage";
import { fullTotalAtom, materialFilmTotalAtom } from "./TotalAtom";

export const materialTotalUSDAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(materialTableAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return (
    typeRowsAtom.reduce(
      (previousScore: number, currentScore: materialRowMap) =>
        previousScore + currentScore.price,
      0
    ) / exchangeRate
  );
});

export const USDFilmTotalAtom = atom<number>((get) => {
  const typeFilmAtom: any = get(filmProcessAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return (
    typeFilmAtom.reduce(
      (previousScore: number, currentScore: materialRowMap) =>
        previousScore + currentScore.price,
      0
    ) / exchangeRate
  );
});

export const USDQualityTotalAtom = atom<number>((get) => {
  const typeQualAtom: any = get(servicesAtom);
  return typeQualAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
});

export const USDTotalNREAtom = atom<number>((get) => {
  const typeNREAtom: any = get(nreAtom);
  return typeNREAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
});

export const USDTotalSalesAtom = atom<number>((get) => {
  const CADTotal: any = get(materialFilmTotalAtom);
  const exchangeRate: any = get(exchangeRateMaterialAtom);
  if (isNaN(exchangeRate) || exchangeRate === 0) {
    return CADTotal / 1;
  }
  return CADTotal / exchangeRate;
});

export const USDTotalFrontAtom = atom<number>((get) => {
  const CADTotal: any = get(materialFilmTotalAtom);
  const exchangeRate: any = get(exchangeRateAtom);
  if (isNaN(exchangeRate) || exchangeRate === 0) {
    return CADTotal / 1;
  }
  return CADTotal / exchangeRate;
});
