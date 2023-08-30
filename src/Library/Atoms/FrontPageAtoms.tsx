import { customer } from "DataBases/Customer";
import JsonToCustomer from "JsonReader/JsonToCustomer";
import { atom } from "jotai";

export const customerAtom = atom<string>("");
export const customerRowAtom = atom(JsonToCustomer(customer));
export const codeAtom = atom<string>("");

export const partsAtom = atom<string>("");
export const noteAtom = atom<string>("");
export const soldAtom = atom<string>("");
const textTermAtom = atom<string>(
  "QUOTATION VALID FOR 90 DAYS \nALL PRICES ARE LISTED IN CAD \nNet 30 days; FOB -- PFC (Canada)"
);
export const termsAtom = atom(
  (get) => {
    return get(textTermAtom);
  },
  (_get, set, newText: string) => set(textTermAtom, newText)
);

export const partsInputAtom = atom<string>("");
export const revAtom = atom<string>("");
export const salesAtom = atom<string>("gus");
export const currencySelectorAtom = atom<string>("CAD");

// Front Table
export const layerAtom = atom<string | "">("");
export const specAtom = atom<string | "">("IPC 6013 Class 2");
export const productAtom = atom<string | "">("");
export const finishAtom = atom<string | "">("");
export const technologyAtom = atom<string | "">("A");
export const assemblyAtom = atom<string | "">("Yes");
export const qualityAtom = atom<string | "">("");
export const qualityPrintAtom = atom((get) => {
  const qualitySplit = get(qualityAtom);
  return qualitySplit.match(/\d+/g);
});
