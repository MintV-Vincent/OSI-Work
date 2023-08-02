import { customer } from "DataBases/Customer";
import JsonToCustomer from "JsonReader/JsonToCustomer";
import { atom } from "jotai";

export const customerAtom = atom<string>("");
export const customerRowAtom = atom(JsonToCustomer(customer));
export const codeAtom = atom<string>("");

export const partsAtom = atom<string>("");
export const noteAtom = atom<string>("");
export const soldAtom = atom<string>("");
export const partsInputAtom = atom<string>("");
export const revAtom = atom<string>("");
export const salesAtom = atom<string>("gus");
export const currencySelectorAtom = atom<string>("CAD");

// Front Table
export const layerAtom = atom<string | " ">(" ");
export const technologyAtom = atom<string | "">("A");
export const assemblyAtom = atom<string | "">("Yes");
