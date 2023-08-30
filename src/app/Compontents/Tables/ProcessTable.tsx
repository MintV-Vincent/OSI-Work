import { Table } from "@mantine/core";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processFilmTitle, serviceHeader } from "Library/Headers";
import { filmTotalAtom } from "Library/Atoms/TotalAtom";
import ServiceInput from "./CustomCompontents/ServiceInput";
import AddServiceButton from "./CustomCompontents/AddServiceButton";
import { processAtom } from "Library/Atoms/ServiceStorage";

export function ProcessTable() {
  // This is used because of nextjs hydration seems to have different text causing error on first render
  // Error has to do with processes table.
  // app-index.js:32  Warning: Text content did not match. Server: "Double Sided etch/button 18x24 panel" Client: "Double Sided etch/button 18 x 24 panel"
  // const [hydrated, setHydrated] = React.useState(false);
  // React.useEffect(() => {
  //   setHydrated(true);
  // }, []);

  const [total] = useAtom(filmTotalAtom);
  const [processing, setProcesses] = useAtom(processAtom);

  return (
    <Table striped withBorder verticalSpacing="w-10">
      <HeaderRow
        columns={["text-left ", "", "text-right ", "text-right "]}
        titles={serviceHeader(processFilmTitle)}
      />
      <tbody>
        {processing.map((row: servicesMap, index: number) => (
          <tr className={"text-primary"} key={row.service + " row " + index}>
            <td className="px-3 w-4/12">{row.service}</td>
            <td className="px-3 w-2/12">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={processing}
                setData={setProcesses}
              />
            </td>
            <td className="px-3 w-3/12 text-right">
              {row.unitPrice.toFixed(2)}
            </td>
            <td className="px-3 w-3/12 text-right" title={row.formula}>
              {row.price.toFixed(2)}
            </td>
          </tr>
        ))}
        <TotalRows
          text={"CAD Total"}
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
