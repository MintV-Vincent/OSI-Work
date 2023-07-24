import { coverCoatAtom, filmAtom, stiffenerAtom } from "DataBases/Database";
import {
  coverTotalAtom,
  filmTotalAtom,
  laminateTotalAtom,
  mechanicalTotalAtom,
  stiffenerTotalAtom,
  tapeTotalAtom,
} from "DataBases/TotalDataBase";
import { createRowPrice } from "Functions/Create/MapCreate";
import {
  coverTitle,
  filmTitle,
  laminateTitle,
  mechanicalTitle,
  stiffenerTitle,
  tapeTitle,
} from "Interface/Headers";
import { rowMapPrice } from "Interface/Types";
import JsonToAtom from "JsonReader/JsonToAtom";
import { getArlon, getDupont, getIsola, getPanasonic } from "Query/query";
import { atom, useAtom } from "jotai";

interface useUpdateTotal {
  title: string;
}

interface returnAtom {
  supplier: rowMapPrice[][];
  setData: any;
  setTotal: any;
}

const isolaAtom = atom(JsonToAtom(getIsola()));
const arlonAtom = atom(JsonToAtom(getArlon()));
const dupontAtom = atom(JsonToAtom(getDupont()));
const panasonicAtom = atom(JsonToAtom(getPanasonic()));
export const laminateAtom = atom(
  async (get) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const added = get(addedAtom);
    return [isola, arlon, dupont, panasonic, added];
  },
  (
    get,
    set,
    value: string,
    label: string,
    price: number,
    formula: string,
    custom: string,
    supplier: string = "Added"
  ) => {
    const isola = get(isolaAtom);
    const arlon = get(arlonAtom);
    const dupont = get(dupontAtom);
    const panasonic = get(panasonicAtom);
    const added = get(addedAtom);
    set(addedAtom, [
      ...added,
      createRowPrice(value, label, price, formula, custom, supplier),
    ]);
    return [isola, dupont, arlon, panasonic, added];
  }
);

const addedAtom = atom<rowMapPrice[]>([]);

function getAtom({ title }: useUpdateTotal): returnAtom {
  switch (title) {
    case laminateTitle: {
      const [data, setData] = useAtom(coverCoatAtom);
      const [, setTotal] = useAtom(laminateTotalAtom);
      return {
        supplier: data,
        setData: setData,
        setTotal: setTotal,
      };
    }
    case coverTitle: {
      const [data, setData] = useAtom(coverCoatAtom);
      const [, setTotal] = useAtom(coverTotalAtom);
      return {
        supplier: data,
        setData: setData,
        setTotal: setTotal,
      };
    }
    case stiffenerTitle: {
      const [stiff, setData] = useAtom(stiffenerAtom);
      const [, setLaminate] = useAtom(stiffenerTotalAtom);
      return {
        supplier: stiff,
        setData: setData,
        setTotal: setLaminate,
      };
    }
    case tapeTitle: {
      const [cover, setData] = useAtom(coverCoatAtom);
      const [, setCoverTotal] = useAtom(tapeTotalAtom);
      return {
        supplier: cover,
        setData: setData,
        setTotal: setCoverTotal,
      };
    }
    case filmTitle: {
      const [film, setData] = useAtom(filmAtom);
      const [, setTotal] = useAtom(filmTotalAtom);
      return {
        supplier: film,
        setData: setData,
        setTotal: setTotal,
      };
    }
    case mechanicalTitle: {
      const [film, setData] = useAtom(filmAtom);
      const [, setTotal] = useAtom(mechanicalTotalAtom);
      return {
        supplier: film,
        setData: setData,
        setTotal: setTotal,
      };
    }
    default: {
      const [film, setData] = useAtom(filmAtom);
      const [, setTotal] = useAtom(mechanicalTotalAtom);
      return {
        supplier: film,
        setData: setData,
        setTotal: setTotal,
      };
    }
  }
}

export default getAtom;
