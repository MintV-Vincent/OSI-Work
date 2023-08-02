import {
  filmAtom,
  materialAtom,
  filmTotalAtom,
  materialTotalAtom,
} from "Library/Atoms/AtomStorage";
import { materialsTitle, processFilmTitle } from "Library/Headers";
import { rowMapPrice } from "Library/Types";
import { useAtom } from "jotai";
interface returnAtom {
  setTotal: any;
}

function getAtom(title: string): returnAtom {
  switch (title) {
    case materialsTitle: {
      const [, setTotal] = useAtom(materialTotalAtom);
      return {
        setTotal: setTotal,
      };
    }
    case processFilmTitle: {
      const [, setTotal] = useAtom(filmTotalAtom);
      return {
        setTotal: setTotal,
      };
    }
    default: {
      const [, setTotal] = useAtom(materialTotalAtom);
      return {
        setTotal: setTotal,
      };
    }
  }
}

export default getAtom;
