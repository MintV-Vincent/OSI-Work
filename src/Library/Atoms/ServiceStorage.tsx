import { NREDatabase } from "DataBases/NRE";
import { services } from "DataBases/Service";
import JsonToService from "JsonReader/JsonToService";
import { atom } from "jotai";

export const servicesAtom = atom(JsonToService(services));
export const nreAtom = atom(JsonToService(NREDatabase));
