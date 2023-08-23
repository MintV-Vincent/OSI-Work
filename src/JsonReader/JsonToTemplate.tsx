import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateMaterialAtom,
  filmProcessAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { nreAtom, servicesAtom } from "Library/Atoms/ServiceStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { servicesMap, template } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import { json } from "stream/consumers";

export default function JsonToTemplate(json: template[]) {
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);
  const [nre, setNRE] = useAtom(nreAtom);
  const [materialRows, setMaterialRow] = useAtom(materialTableAtom);
  const [processing, setProcesses] = useAtom(filmProcessAtom);
  const [service, setService] = useAtom(servicesAtom);

  for (let i: number = 0; i < json.length; i++) {
    const { id, table, material, supplier, amount } = json[i];
    setService(
      service.map((row: servicesMap) => {
        if (row.service != material) {
          return row;
        }
        let price = eval(
          createFormula(
            row.formula,
            amount,
            row.unitPrice,
            exchangeRate,
            panel,
            yeild,
            margin
          )
        );
        return {
          ...row,
          amount: amount,
          price: price,
        };
      })
    );
  }
}
