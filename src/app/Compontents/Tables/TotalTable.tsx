import { Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { useAtom } from "jotai";
import { totalHeader } from "Library/Headers";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";

interface TotalTableInterface {
  titles: string[];
  total: number[];
}

export function TotalTable({ titles, total }: TotalTableInterface) {
  const CADTotal = total.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
  const [exchange] = useAtom(exchangeRateMaterialAtom);
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table miw={"w-1/3"} striped withBorder verticalSpacing="xs">
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
          <td className={"font-semibold text-right"}>
            {(CADTotal / Number(exchange)).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
