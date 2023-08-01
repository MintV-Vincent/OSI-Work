import { createTable } from "Functions/Create/MapCreate";
import { PrimitiveAtom, atom } from "jotai";

export const materialTableAtom = atom(createTable(9));
export const processTableAtom = atom(createTable(9));
export const checkTableAtom: PrimitiveAtom<string[]> = atom([] as string[]);
export const customCheckTableAtom: PrimitiveAtom<string[]> = atom(
  [] as string[]
);

//Custom Check Table amount inputs
export const photoAtom = atom(0);
export const elecAtom = atom(0);
export const outlineAtom = atom(0);
export const secondaryAtom = atom(0);
export const assyStenAtom = atom(0);
export const assyPallAtom = atom(0);
export const designAtom = atom(0);
export const productAtom = atom(0);
export const haslAtom = atom(0);
