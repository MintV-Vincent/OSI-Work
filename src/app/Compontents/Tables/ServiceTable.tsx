import { Table } from "@mantine/core";
import { servicesAtom } from "Library/Atoms/ServiceStorage";
import { serviceHeader, serviceTitle } from "Library/Headers";
import { servicesMap } from "Library/Types";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import TotalRows from "./Rows/TotalRows";
import { useAtom } from "jotai";
import React from "react";
import ServiceInput from "./CustomCompontents/ServiceAmount";
import AddServiceButton from "./CustomCompontents/AddServiceButton";
import { USDQualityTotalAtom } from "Library/Atoms/TotalAtomUSD";

export default function ServiceTable() {
  const [total] = useAtom(USDQualityTotalAtom);
  const [service, setService] = useAtom(servicesAtom);
  return (
    <Table striped withBorder verticalSpacing="w-10">
      <HeaderRow
        columns={["text-left ", "", "text-right ", "text-right "]}
        titles={serviceHeader(serviceTitle)}
      />
      <tbody>
        {service.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.service + " row " + index}>
            <td className="w-4/12 px-3">{row.service}</td>
            <td className="w-2/12 px-3">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={service}
                setData={setService}
              />
            </td>
            <td className="text-right px-3 w-3/12 ">
              {row.unitPrice.toFixed(2)}
            </td>
            <td className="text-right px-3 w-3/12 ">{row.price.toFixed(2)}</td>
          </tr>
        ))}
        <TotalRows
          text={"USD Total"}
          total={total}
          columns={serviceHeader(serviceTitle).length}
          button={[
            <AddServiceButton
              title={serviceTitle}
              dataRow={service}
              setDataRow={setService}
            />,
          ]}
        />
      </tbody>
    </Table>
  );
}
