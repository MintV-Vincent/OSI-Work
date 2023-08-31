import { Table } from "@mantine/core";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import {
  assemblyHeader,
  assemblyTitle,
  processFilmTitle,
  serviceHeader,
} from "Library/Headers";
import { assemblyTotalAtom } from "Library/Atoms/TotalAtom";
import AddServiceButton from "./CustomCompontents/AddServiceButton";
import { assemblyDataAtom } from "Library/Atoms/ServiceStorage";
import ServiceInput from "./CustomCompontents/ServiceInput";
import { exchangeRateAssemblyAtom } from "Library/Atoms/AtomStorage";
import { USDAssemblyTotalAtom } from "Library/Atoms/TotalAtomUSD";

export function AssemblyTable() {
  const [total] = useAtom(assemblyTotalAtom);
  const [USDTotal] = useAtom(USDAssemblyTotalAtom);
  const [exchangeRate] = useAtom(exchangeRateAssemblyAtom);
  const [assembly, setAssembly] = useAtom(assemblyDataAtom);

  return (
    <Table striped withBorder verticalSpacing="w-10">
      <HeaderRow
        columns={[
          "text-left ",
          "",
          "text-right ",
          "text-right ",
          "text-right ",
        ]}
        titles={assemblyHeader}
      />
      <tbody>
        {assembly.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.service + " row " + index}>
            <td className="px-3 w-4/12">{row.service}</td>
            <td className="px-3 w-2/12">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={assembly}
                setData={setAssembly}
              />
            </td>
            <td className="px-3 w-2/12 text-right">
              {row.unitPrice.toFixed(2)}
            </td>
            <td className="px-3 w-2/12 text-right" title={row.formula}>
              {row.price.toFixed(2)}
            </td>
            <td className="px-3 w-2/12 text-right">
              {(row.price / Number(exchangeRate)).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr key={"CAD Total" + " row"}>
          <td key={"button"}>
            <div className="pl-3 flex justify-start">
              {
                <AddServiceButton
                  title={processFilmTitle}
                  dataRow={assembly}
                  setDataRow={setAssembly}
                />
              }
            </div>
          </td>
          <td />
          <td className={" px-3 font-semibold text-right text-xl"}>
            {"Total"}
          </td>
          <td className={" px-3 font-semibold text-right text-xl"}>
            {total.toFixed(2)}
          </td>
          <td className={" px-3 font-semibold text-right text-xl"}>
            {USDTotal.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
