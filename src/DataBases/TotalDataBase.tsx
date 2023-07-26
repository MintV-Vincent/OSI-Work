import { atom } from "jotai";

//Sales (Materials and Process)
export const laminateTotalAtom = atom(0);
export const coverTotalAtom = atom(0);
export const stiffenerTotalAtom = atom(0);
export const tapeTotalAtom = atom(0);
export const filmTotalAtom = atom(0);
export const mechanicalTotalAtom = atom(0);

//Services
export const assyTotalAtom = atom(0);
export const qualityTotalAtom = atom(0);
export const processTotalAtom = atom(0);
export const NRETotalAtom = atom(0);

export const totalAtom = atom((get) => {
  const laminate = get(laminateTotalAtom);
  const cover = get(coverTotalAtom);
  const stiffiner = get(stiffenerTotalAtom);
  const tape = get(tapeTotalAtom);
  const film = get(filmTotalAtom);
  const mech = get(mechanicalTotalAtom);

  const assy = get(assyTotalAtom);
  const qual = get(qualityTotalAtom);
  const proc = get(processTotalAtom);
  const nre = get(NRETotalAtom);
  return [laminate, cover, stiffiner, tape, film, mech, assy, qual, proc, nre];
});
