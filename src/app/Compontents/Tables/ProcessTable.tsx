import { Table } from "@mantine/core";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processFilmTitle, serviceHeader } from "Library/Headers";
import { filmTotalAtom } from "Library/Atoms/TotalAtom";
import { filmProcessAtom } from "Library/Atoms/AtomStorage";
import ServiceInput from "./CustomCompontents/ServiceAmount";
import AddServiceButton from "./CustomCompontents/AddServiceButton";

export function ProcessTable() {
  const [total] = useAtom(filmTotalAtom);
  const [processing, setProcesses] = useAtom(filmProcessAtom);

  return (
    <Table striped withBorder verticalSpacing="w-10">
      <HeaderRow
        columns={["text-left ", "", "text-right ", "text-right "]}
        titles={serviceHeader(processFilmTitle)}
      />
      <tbody>
        {processing.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.material + " row " + index}>
            <td className="px-3 w-60">{row.material}</td>
            <td className="px-3">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={processing}
                setData={setProcesses}
              />
            </td>
            <td className="px-3 w-40 text-right">{row.unitPrice.toFixed(2)}</td>
            <td className="px-3 w-40 text-right" title={row.formula}>
              {row.price.toFixed(2)}
            </td>
          </tr>
        ))}
        <TotalRows
          text={"Total"}
          total={total}
          columns={serviceHeader(processFilmTitle).length}
          button={[
            <AddServiceButton
              title={processFilmTitle}
              dataRow={processing}
              setDataRow={setProcesses}
            />,
          ]}
        />
      </tbody>
    </Table>
  );
}
