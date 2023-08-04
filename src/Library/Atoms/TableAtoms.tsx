import { createTable } from "Functions/Create/MapCreate";
import { PrimitiveAtom, atom } from "jotai";

export const materialTableAtom = atom(createTable(6));
export const processTableAtom = atom(createTable(6));
export const checkTableAtom: PrimitiveAtom<string[]> = atom([] as string[]);
export const customCheckTableAtom: PrimitiveAtom<string[]> = atom(
  [] as string[]
);

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
