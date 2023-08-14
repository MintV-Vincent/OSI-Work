import { Table } from "@mantine/core";
import { servicesAtom } from "Library/Atoms/ServiceStorage";
import { qualityTotalAtom } from "Library/Atoms/TotalAtom";
import { serviceHeader } from "Library/Headers";
import { servicesMap } from "Library/Types";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import TotalRows from "./Rows/TotalRows";
import { useAtom } from "jotai";
import React from "react";
import ServiceInput from "./CustomCompontents/ServiceAmount";
import AddServiceButton from "./CustomCompontents/AddServiceButton";

export default function ServiceTable() {
  const [total] = useAtom(qualityTotalAtom);
  const [service, setService] = useAtom(servicesAtom);

  return (
    <Table striped withBorder verticalSpacing="xs">
      <HeaderRow
        columns={["text-left", "", "text-left ", "text-right "]}
        titles={serviceHeader}
      />
      <tbody>
        {service.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.material + " row " + index}>
            <td>{row.material}</td>
            <td>
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={service}
                setData={setService}
              />
            </td>
            <td className="text-right">{row.unitPrice.toFixed(2)}</td>
            <td className="text-right">{row.price.toFixed(2)}</td>
          </tr>
        ))}
        <TotalRows
          text={"Total"}
          total={total}
          columns={serviceHeader.length}
          button={
            <AddServiceButton dataRow={service} setDataRow={setService} />
          }
        />
      </tbody>
    </Table>
  );
}
