import { filmAtom, materialAtom } from "DataBases/Database";
import { filmTotalAtom, materialTotalAtom } from "DataBases/TotalDataBase";
import { materialsTitle, processFilmTitle } from "Interface/Headers";
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
    case materialsTitle: {
      const [data, setData] = useAtom(materialAtom);
      const [, setTotal] = useAtom(materialTotalAtom);
      return {
        supplier: data,
        setData: setData,
        setTotal: setTotal,
      };
    }
    case processFilmTitle: {
      const [film, setData] = useAtom(filmAtom);
      const [, setTotal] = useAtom(filmTotalAtom);
      return {
        supplier: film,
        setData: setData,
        setTotal: setTotal,
      };
    }
    default: {
      const [data, setData] = useAtom(materialAtom);
      const [, setTotal] = useAtom(materialTotalAtom);
      return {
        supplier: data,
        setData: setData,
        setTotal: setTotal,
      };
    }
  }
}

export default getAtom;
