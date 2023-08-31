import { SegmentedControl } from "@mantine/core";
import { readDisplay } from "Directus SDK/directus";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateMaterialAtom,
  marginAtom,
  materialAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { technologyAtom } from "Library/Atoms/FrontPageAtoms";
import {
  assemblyDataAtom,
  nreAtom,
  processAtom,
  servicesAtom,
} from "Library/Atoms/ServiceStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { useAtom } from "jotai";
import React from "react";

interface order {
  id: string;
  Process_id: number;
}

function customIncludes(array: any[], id: number) {
  for (let i: number = 0; i < array.length; i++) {
    if (array[i].process_id === id) {
      return [true, array[i].amount];
    }
  }
  return [false, 0];
}

export default function TemplateButton() {
  const [material, setMaterial] = useAtom(materialTableAtom);
  const [materialList, setMaterialList] = useAtom(materialAtom);
  const [processing, setProcesses] = useAtom(processAtom);
  const [assembly, setAssembly] = useAtom(assemblyDataAtom);
  const [service, setService] = useAtom(servicesAtom);
  const [nre, setNRE] = useAtom(nreAtom);
  const [technology, setTechnology] = useAtom(technologyAtom);

  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  /**
   *
   * @param setData Set the atom table
   * @param data The data from certain atom table
   * @param id The id of all elements from the template
   * @param value The amount constant for every id
   * @returns Returns the new atom with the amount set to value based on the id array
   */
  function setTemplate(setData: any, data: any, id: any[]) {
    return setData(
      data.map((row: any) => {
        const checkId = customIncludes(id, row.id);
        const checkIdValue = checkId[0];
        const amount = checkId[1];
        if (checkIdValue) {
          let newPrice = eval(
            createFormula(
              row.formula,
              amount,
              Number(row.unitPrice),
              exchangeRate,
              panel,
              yeild,
              margin
            )
          );
          return {
            ...row,
            amount: amount,
            price: newPrice,
          };
        }
        return row;
      })
    );
  }

  return (
    <SegmentedControl
      size="xs"
      color="blue"
      fullWidth
      value={technology}
      onChange={(e) => {
        setTechnology(e);
        readDisplay("Template_A").then(
          (result) => {
            let idArray: any[] = [];
            result.map((row: any) => {
              for (let i: number = 0; i < row.process_id.length; i++) {
                idArray.push({
                  process_id: row.process_id[i].Process_id,
                  amount: row.amount,
                });
              }
            });
            setTemplate(setProcesses, processing, idArray);
            // setTemplate(setAssembly, assembly, row.assembly_id, row.amount);
            // setTemplate(setService, service, row.service_id, row.amount);
            // setTemplate(setNRE, nre, row.nre_id, row.amount);
          },
          (error) => {}
        );
      }}
      data={[
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
      ]}
    />
  );
}
