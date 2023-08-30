import { Box, LoadingOverlay, SegmentedControl } from "@mantine/core";
import { readData, readDisplay } from "Directus SDK/directus";
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
import React, { useState } from "react";

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
  function setTemplate(setData: any, data: any, id: number[], value: number) {
    return setData(
      data.map((row: any) => {
        if (id === row.id) {
          let newPrice = eval(
            createFormula(
              row.formula,
              value,
              Number(row.unitPrice),
              exchangeRate,
              panel,
              yeild,
              margin
            )
          );
          return {
            ...row,
            amount: value,
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
            console.log(result);
            result.map((row: any) => {
              setTemplate(setProcesses, processing, row.Process_id, row.amount);
              // setTemplate(setAssembly, assembly, row.assembly_id, row.amount);
              // setTemplate(setService, service, row.service_id, row.amount);
              // setTemplate(setNRE, nre, row.nre_id, row.amount);
            });
          },
          (error) => {}
        );
        readDisplay("Template_A_Process").then(
          (result) => {
            console.log(result);
            result.map((row: any) => {
              setTemplate(setProcesses, processing, row.Process_id, row.amount);
            });
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
