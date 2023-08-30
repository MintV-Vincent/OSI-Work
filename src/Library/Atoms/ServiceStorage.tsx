import { assembly } from "DataBases/Assembly";
import JsonToService from "JsonReader/JsonToService";
import { PrimitiveAtom, atom } from "jotai";
import { readData } from "Directus SDK/directus";
import { servicesMap } from "Library/Types";

export const processAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
  readData("Process").then((v) => JsonToService(v))
);

export const servicesAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
  readData("Service").then((v) => JsonToService(v))
);
export const nreAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
  readData("NRE").then((v) => JsonToService(v))
);
export const assemblyDataAtom = atom(JsonToService(assembly));
