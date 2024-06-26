import { assembly } from "DataBases/Assembly";
import JsonToService from "JsonReader/JsonToService";
import { PrimitiveAtom, atom } from "jotai";
import { readData } from "Directus SDK/directus";
import { servicesMap } from "Library/Types";
import { dryFilm } from "DataBases/Processes";
import { NREDatabase } from "DataBases/NRE";

export const processAtom = atom(JsonToService(dryFilm));
// export const processAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
//   readData("Process").then((v) => JsonToService(v))
// );

export const nreAtom = atom(JsonToService(NREDatabase));
// export const nreAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
//   readData("NRE").then((v) => JsonToService(v))
// );

export const assemblyDataAtom = atom(JsonToService(assembly));
// export const nreAtom = atom<Promise<servicesMap[]> | servicesMap[]>(
//   readData("Assembly").then((v) => JsonToService(v))
// );
