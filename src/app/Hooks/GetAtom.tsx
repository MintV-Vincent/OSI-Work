import {
  coverCoatAtom,
  filmAtom,
  laminateAtom,
  stiffenerAtom,
} from "DataBases/Database";
import {
  coverTotalAtom,
  filmTotalAtom,
  laminateTotalAtom,
  mechanicalTotalAtom,
  stiffenerTotalAtom,
  tapeTotalAtom,
} from "DataBases/TotalDataBase";
import {
  coverTitle,
  filmTitle,
  laminateTitle,
  mechanicalTitle,
  stiffenerTitle,
  tapeTitle,
} from "Interface/Headers";
import { rowMapPrice } from "Interface/Types";
import { useAtom } from "jotai";

interface useUpdateTotal {
  title: string;
}

interface returnAtom {
  supplier: rowMapPrice[][];
  setData: any;
  setTotal: any;
}

function getAtom({ title }: useUpdateTotal): returnAtom {
  switch (title) {
    case laminateTitle: {
      const [data, setData] = useAtom(laminateAtom);
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
