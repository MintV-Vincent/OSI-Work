import { Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { useAtom } from "jotai";
import { totalHeader } from "Library/Headers";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";

interface TotalTableInterface {
  titles: string[];
  values: string[];
  total: number[];
}

export function TotalTable({ titles, values, total }: TotalTableInterface) {
  const CADTotal = total.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
  const [exchange] = useAtom(exchangeRateMaterialAtom);
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table striped withBorder verticalSpacing={"w-10"}>
      <HeaderRow
        columns={["", "text-right ", "text-right ", ""]}
        titles={titles}
      />
      <tbody>
        {total.map((subTotal: number, index: number) => (
          <tr className={"text-primary"} key={subTotal + "-row-" + index}>
            <td className="px-3 ">{values[index]}</td>
            <td className="text-right px-3 ">{subTotal.toFixed(2)}</td>
            <td className="text-right px-3">
              {index === 1
                ? (subTotal / Number(exchange)).toFixed(2)
                : (subTotal / Number(exchange)).toFixed(2)}
            </td>
            <td />
          </tr>
        ))}
        <tr>
          <td className={"font-semibold px-3 "}>{"Total"}</td>
          <td className={"font-semibold text-right px-3"}>
            {CADTotal.toFixed(2)}
          </td>
          <td className={"font-semibold text-right px-3"}>
            {(CADTotal / Number(exchange)).toFixed(2)}
          </td>
          <td />
        </tr>
      </tbody>
    </Table>
  );
}
