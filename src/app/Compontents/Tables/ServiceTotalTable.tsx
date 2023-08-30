import { Table } from "@mantine/core";
import { useAtom } from "jotai";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";
import {
  materialFilmTotalAtom,
  NRETotalAtom,
  qualityTotalAtom,
  serviceTotalAtom,
} from "Library/Atoms/TotalAtom";
import {
  USDServiceTotalAtom,
  USDTotalNREAtom,
} from "Library/Atoms/TotalAtomUSD";

export default function ServiceTotalTable() {
  const [total] = useAtom(serviceTotalAtom);
  const [exchange] = useAtom(exchangeRateMaterialAtom);

  const [serviceTotal] = useAtom(qualityTotalAtom);
  const [serviceTotalUSD] = useAtom(USDServiceTotalAtom);
  const [nreTotal] = useAtom(NRETotalAtom);
  const [nreTotalUSD] = useAtom(USDTotalNREAtom);
  const headerClass =
    "text-md font-semibold py-1 px-3 text-primary whitespace-nowrap overflow-hidden ";
  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table striped withBorder verticalSpacing={"w-10"}>
      <thead className={"bg-light"}>
        <tr>
          <td className="w-2/12" />
          <td className={headerClass + "w-3/12 text-left"}>
            Non-Recurring Engineering
          </td>
          <td className={headerClass + "w-3/12 text-right"}>CAD ($)</td>
          <td className={headerClass + "w-3/12 text-right"}>USD ($)</td>
          <td className="w-1/12" />
        </tr>
      </thead>
      <tbody>
        <tr className={"text-primary"}>
          <td />
          <td className="px-3 text-left">Quality Services</td>
          <td className="px-3 text-right ">{serviceTotal.toFixed(2)}</td>
          <td className="px-3 text-right ">{serviceTotalUSD.toFixed(2)}</td>
          <td />
        </tr>
        <tr className={"text-primary"}>
          <td />
          <td className="px-3 text-left ">NRE</td>
          <td className="px-3 text-right ">{nreTotal.toFixed(2)}</td>
          <td className="px-3 text-right ">{nreTotalUSD.toFixed(2)}</td>
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
