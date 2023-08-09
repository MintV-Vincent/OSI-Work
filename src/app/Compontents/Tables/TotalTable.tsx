import { Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { useAtom } from "jotai";
import { titles, totalHeader } from "Library/Headers";
import { CADTotalAtom, USDTotalAtom, totalAtom } from "Library/Atoms/TotalAtom";
import { exchangeRateAtom } from "Library/Atoms/AtomStorage";

export function TotalTable() {
  const [total] = useAtom(totalAtom);
  const [USATotal] = useAtom(USDTotalAtom);
  const [CADTotal] = useAtom(CADTotalAtom);
  const [exchange] = useAtom(exchangeRateAtom);
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "",
          "h-14",
          "text-right h-14 w-100",
          "text-right h-14 w-100",
          "text-right h-14 w-40",
        ]}
        titles={totalHeader}
      />
      <tbody>
        {total.map((subTotal: number, index: number) => (
          <tr className={"text-primary"} key={subTotal + "-row-" + index}>
            <td className="h-14" />
            <td className="h-14 w-1/3 z-50">{titles[index]}</td>
            <td className="h-14 text-right  w-1/3">{subTotal.toFixed(2)}</td>
            <td className="h-14 text-right  w-1/3">
              {Number(subTotal / Number(exchange)).toFixed(2)}
            </td>
            <td className="h-14" />
          </tr>
        ))}
        <tr>
          <td className="h-14" />
          <td className={"h-14 w-1/3 font-semibold"}>{"Total"}</td>
          <td className={"h-14 w-1/3 font-semibold text-right"}>
            {CADTotal.toFixed(2)}
          </td>
          <td className={"h-14 w-1/3 font-semibold text-right"}>
            {USATotal.toFixed(2)}
          </td>
          <td className="h-14"></td>
        </tr>
      </tbody>
    </Table>
  );
}
