import { createTable } from "Functions/Create/MapCreate";
import { PrimitiveAtom, atom } from "jotai";

export const materialTableAtom = atom(createTable(6));
export const checkTableAtom: PrimitiveAtom<string[]> = atom([] as string[]);
export const customCheckTableAtom: PrimitiveAtom<string[]> = atom(
  [] as string[]
);

export const quoteTableAtom = atom(["23-0001", "23-0002", "23-0003"]);
