import { Table } from "@mantine/core";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { serviceHeader } from "Library/Headers";
import { filmTotalAtom } from "Library/Atoms/TotalAtom";
import { filmProcessAtom } from "Library/Atoms/AtomStorage";
import ServiceInput from "./CustomCompontents/ServiceAmount";

const columns: string[] = ["h-14", "text-right h-14", "text-right h-14"];

export function ProcessTable() {
  const [total] = useAtom(filmTotalAtom);
  const [processing, setProcesses] = useAtom(filmProcessAtom);

  return (
    <Table striped withBorder verticalSpacing="xs">
      <HeaderRow
        columns={["text-left ", "", "text-left ", "text-right "]}
        titles={serviceHeader}
      />
      <tbody>
        {processing.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.material + " row " + index}>
            <td>{row.material}</td>
            <td>
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={processing}
                setData={setProcesses}
              />
            </td>
            <td className="text-right">{row.unitPrice.toFixed(2)}</td>
            <td className="text-right" title={row.formula}>
              {row.price.toFixed(2)}
            </td>
          </tr>
        ))}
        <TotalRows
          text={"Total"}
          total={total}
          columns={serviceHeader.length}
          materialRows={processing}
          setMaterialRow={setProcesses}
        />
      </tbody>
    </Table>
  );
}
