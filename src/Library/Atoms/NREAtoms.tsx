import { atom } from "jotai";

//Custom Check Table amount inputs
export const photoAtom = atom<number>(0);
export const elecAtom = atom<number>(0);
export const outlineAtom = atom<number>(0);
export const secondaryAtom = atom<number>(0);
export const assyStenAtom = atom<number>(0);
export const assyPallAtom = atom<number>(0);
export const designAtom = atom<number>(0);
export const productAtom = atom<number>(0);
export const haslAtom = atom<number>(0);

export const NREAtom = atom((get) => {
  const photo = get(photoAtom);
  const elec = get(elecAtom);
  const outline = get(outlineAtom);
  const secondary = get(secondaryAtom);
  const assySten = get(assyStenAtom);
  const assyPall = get(assyPallAtom);
  const design = get(designAtom);
  const product = get(productAtom);
  const hasl = get(haslAtom);
  return [
    photo,
    elec,
    outline,
    secondary,
    assySten,
    assyPall,
    design,
    product,
    hasl,
  ];
});
