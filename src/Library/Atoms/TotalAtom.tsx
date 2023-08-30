import { atom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialRowMap, servicesMap } from "Library/Types";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";
import {
  USDServiceTotalAtom,
  USDTotalNREAtom,
} from "Library/Atoms/TotalAtomUSD";
import { assemblyDataAtom, processAtom } from "Library/Atoms/ServiceStorage";

export const materialFilmTotalAtom = atom(async (get) => {
  const material = await get(materialTotalAtom);
  const film = await get(filmTotalAtom);
  const assembly = await get(assemblyTotalAtom);

  return film + material + assembly;
});

export const serviceTotalAtom = atom(async (get) => {
  const qual = await get(qualityTotalAtom);
  const nre = await get(NRETotalAtom);
  return qual + nre;
});

export const materialTotalAtom = atom<number>((get) => {
  const typeRowsAtom: any = get(materialTableAtom);
  return typeRowsAtom.reduce(
    (previousScore: number, currentScore: materialRowMap) =>
      previousScore + currentScore.price,
    0
  );
});

export const filmTotalAtom = atom(async (get) => {
  const typeFilmAtom: any = await get(processAtom);
  return typeFilmAtom.reduce(
    (accumulator: number, currentValue: servicesMap) =>
      accumulator + currentValue.price,
    0
  );
});

export const assemblyTotalAtom = atom(async (get) => {
  const typeRowsAtom: any = await get(assemblyDataAtom);
  return typeRowsAtom.reduce(
    (previousScore: number, currentScore: servicesMap) =>
      previousScore + currentScore.price,
    0
  );
});

export const qualityTotalAtom = atom(async (get) => {
  const typeRowsAtom: any = await get(USDServiceTotalAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return typeRowsAtom * exchangeRate;
});

export const NRETotalAtom = atom(async (get) => {
  const typeRowsAtom: any = await get(USDTotalNREAtom);
  let exchangeRate: any = get(exchangeRateMaterialAtom);
  if (exchangeRate === 0 || isNaN(exchangeRate)) {
    exchangeRate = 1;
  }
  return typeRowsAtom * exchangeRate;
});
