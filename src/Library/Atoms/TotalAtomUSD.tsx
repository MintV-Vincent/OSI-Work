import { materialRowMap, servicesMap } from "Library/Types";
import {
  exchangeRateAssemblyAtom,
  exchangeRateAtom,
  exchangeRateMaterialAtom,
} from "Library/Atoms/AtomStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { atom } from "jotai";
import {
  assemblyTotalAtom,
  materialFilmTotalAtom,
} from "Library/Atoms/TotalAtom";
import {
  processAtom,
  nreAtom,
  servicesAtom,
} from "Library/Atoms/ServiceStorage";

export const materialTotalUSDAtom = atom(async (get) => {
  const typeRowsAtom: any = await get(materialTableAtom);
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

export const USDFilmTotalAtom = atom(async (get) => {
  const typeFilmAtom: any = await get(processAtom);
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

export const USDAssemblyTotalAtom = atom(async (get) => {
  const typeFilmAtom: any = await get(assemblyTotalAtom);
  const exchangeRate: any = get(exchangeRateAssemblyAtom);
  if (isNaN(exchangeRate) || exchangeRate === 0) {
    return typeFilmAtom / 1;
  }
  return typeFilmAtom / exchangeRate;
});

export const USDServiceTotalAtom = atom(async (get) => {
  const typeQualAtom: any = await get(servicesAtom);
  return typeQualAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
});

export const USDTotalNREAtom = atom(async (get) => {
  const typeNREAtom: any = await get(nreAtom);
  return typeNREAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + Number(currentValue.price),
    0
  );
});

export const USDTotalSalesAtom = atom(async (get) => {
  const CADTotal: any = await get(materialFilmTotalAtom);
  const exchangeRate: any = get(exchangeRateMaterialAtom);
  if (isNaN(exchangeRate) || exchangeRate === 0) {
    return CADTotal / 1;
  }
  return CADTotal / exchangeRate;
});
