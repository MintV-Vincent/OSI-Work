import { Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { useAtom } from "jotai";
import { fullTotalAtom } from "MainWebsite";
import { titles, totalHeader } from "Interface/Headers";
import { totalAtom } from "DataBases/TotalDataBase";

export function TotalTable() {
  const [total] = useAtom(totalAtom);
  const [fullTotal] = useAtom(fullTotalAtom);
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "h-12 w-40",
          "text-left h-12 w-100",
          "text-right h-12 w-100",
          "text-right h-12 w-40",
        ]}
        titles={totalHeader}
      />
      <tbody>
        {total.map((subTotal: any, index: number) => (
          <tr className={"text-primary"} key={subTotal + "-row-" + index}>
            <td className="h-12 w-1/8" />
            <td className="h-12 w-1/3 z-50">{titles[index]}</td>
            <td className="h-12 text-right  w-1/3">
              {typeof subTotal === "number" ? subTotal.toFixed(2) : subTotal}
            </td>
            <td className="h-12 w-5/24" />
          </tr>
        ))}
        <tr>
          <td className="h-12 w-1/8" />
          <td className={"h-12 w-1/3 font-semibold"}>{"Total"}</td>
          <td className={"h-12 w-1/3 font-semibold text-right"}>
            {Number(fullTotal).toFixed(2)}
          </td>
          <td className="h-12 w-5/24"></td>
        </tr>
      </tbody>
    </Table>
  );
}
