import { Table } from "@mantine/core";
import { useAtom } from "jotai";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";
import {
  assemblyTotalAtom,
  filmTotalAtom,
  materialFilmTotalAtom,
  materialTotalAtom,
} from "Library/Atoms/TotalAtom";
import {
  materialTotalUSDAtom,
  USDAssemblyTotalAtom,
  USDFilmTotalAtom,
} from "Library/Atoms/TotalAtomUSD";

export function MaterialTotalTable() {
  const [total] = useAtom(materialFilmTotalAtom);
  const [exchange] = useAtom(exchangeRateMaterialAtom);

  const [materialTotal] = useAtom(materialTotalAtom);
  const [materialTotalUSD] = useAtom(materialTotalUSDAtom);
  const [filmTotal] = useAtom(filmTotalAtom);
  const [filmTotalUSD] = useAtom(USDFilmTotalAtom);
  const [assemblyTotal] = useAtom(assemblyTotalAtom);
  const [assemblyTotalUSD] = useAtom(USDAssemblyTotalAtom);
  const headerClass =
    "text-md font-semibold py-1 px-3 text-primary whitespace-nowrap overflow-hidden ";
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table striped withBorder verticalSpacing={"w-10"}>
      <thead className={"bg-light"}>
        <tr>
          <td className="w-2/12 " />
          <td className={headerClass + "w-3/12 text-left"}>Material</td>
          <td className={headerClass + "w-3/12 text-right"}>CAD ($)</td>
          <td className={headerClass + "w-3/12 text-right"}>USD ($)</td>
          <td className="w-1/12 " />
        </tr>
      </thead>
      <tbody>
        <tr className={"text-primary"}>
          <td />
          <td className="px-3 text-left">Materials</td>
          <td className="px-3 text-right ">{materialTotal.toFixed(2)}</td>
          <td className="px-3 text-right ">{materialTotalUSD.toFixed(2)}</td>
          <td />
        </tr>
        <tr className={"text-primary"}>
          <td />
          <td className="px-3 text-left ">Process</td>
          <td className="px-3 text-right ">{filmTotal.toFixed(2)}</td>
          <td className="px-3 text-right ">{filmTotalUSD.toFixed(2)}</td>
          <td />
        </tr>
        <tr className={"text-primary"}>
          <td />
          <td className="px-3 text-left ">Bare Flex</td>
          <td className="px-3 text-right ">{assemblyTotal.toFixed(2)}</td>
          <td className="px-3 text-right ">{assemblyTotalUSD.toFixed(2)}</td>
          <td />
        </tr>
        <tr>
          <td />
          <td className={"font-semibold px-3 "}>{"Total"}</td>
          <td className={"font-semibold text-right px-3"}>
            {total.toFixed(2)}
          </td>
          <td className={"font-semibold text-right px-3"}>
            {(total / Number(exchange)).toFixed(2)}
          </td>
          <td />
        </tr>
      </tbody>
    </Table>
  );
}
