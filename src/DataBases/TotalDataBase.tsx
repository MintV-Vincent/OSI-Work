import { atom } from "jotai";

//Sales (Materials and Process)
export const materialTotalAtom = atom(0);
export const filmTotalAtom = atom(0);

//Services
export const assyTotalAtom = atom(0);
export const qualityTotalAtom = atom(0);
export const processTotalAtom = atom(0);
export const NRETotalAtom = atom(0);

export const totalAtom = atom((get) => {
  const material = get(materialTotalAtom);
  const film = get(filmTotalAtom);

  const qual = get(qualityTotalAtom);
  const nre = get(NRETotalAtom);
  return [material, film, qual, nre];
});
