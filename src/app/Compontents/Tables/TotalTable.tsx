import { Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { useAtom } from "jotai";
import { titles, totalHeader } from "Library/Headers";
import { CADTotalAtom, USDTotalAtom, totalAtom } from "Library/Atoms/TotalAtom";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
} from "Library/Atoms/AtomStorage";

export function TotalTable() {
  const [total] = useAtom(totalAtom);
  const [USATotal] = useAtom(USDTotalAtom);
  const [CADTotal] = useAtom(CADTotalAtom);
  const [exchange] = useAtom(exchangeRateMaterialAtom);
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table striped withBorder verticalSpacing="xs">
      <HeaderRow
        columns={["", "text-right", "text-right"]}
        titles={totalHeader}
      />
      <tbody>
        {total.map((subTotal: number, index: number) => (
          <tr className={"text-primary"} key={subTotal + "-row-" + index}>
            <td className="">{titles[index]}</td>
            <td className="text-right">{subTotal.toFixed(2)}</td>
            <td className="text-right">
              {index === 1
                ? (subTotal / Number(exchange)).toFixed(2)
                : (subTotal / Number(exchange)).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td className={"font-semibold"}>{"Total"}</td>
          <td className={"font-semibold text-right"}>{CADTotal.toFixed(2)}</td>
          <td className={"font-semibold text-right"}>{USATotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
}
