import { createTable } from "Functions/Create/MapCreate";
import { PrimitiveAtom, atom } from "jotai";

export const materialTableAtom = atom(createTable(8));
export const processTableAtom = atom(createTable(6));
export const checkTableAtom: PrimitiveAtom<string[]> = atom([] as string[]);
export const customCheckTableAtom: PrimitiveAtom<string[]> = atom(
  [] as string[]
);
