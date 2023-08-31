import { NumberInput, Table } from "@mantine/core";
import { servicesAtom } from "Library/Atoms/ServiceStorage";
import { serviceHeader, serviceTitle } from "Library/Headers";
import { servicesMap } from "Library/Types";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import TotalRows from "./Rows/TotalRows";
import { useAtom } from "jotai";
import React from "react";
import ServiceInput from "./CustomCompontents/ServiceInput";
import AddServiceButton from "./CustomCompontents/AddServiceButton";
import { USDServiceTotalAtom } from "Library/Atoms/TotalAtomUSD";
import { createFormula } from "Functions/Create/CreateFormula";

export default function ServiceTable() {
  const [total] = useAtom(USDServiceTotalAtom);
  const [service, setService] = useAtom(servicesAtom);

  /**
   *
   * @param id Number, the index of the row being changed
   * @param value The amount being changed to for the material
   * @param unitPrice The sub total of the materials cost in CAD dollars
   * @param data the data being changed
   * @param setData the set state functoin to change the data of the current row
   * @returns material row map for the table with updated amount and price
   */
  function onPriceChange(
    id: number,
    value: number | "",
    data: servicesMap[],
    setData: any
  ): servicesMap {
    return setData(
      data.map((row: servicesMap) => {
        if (row.id != id) {
          return row;
        }
        if (value === "") {
          return { ...row, price: 0 };
        }

        let price = eval(createFormula(row.formula, row.amount, value));
        return {
          ...row,
          unitPrice: value,
          price: price,
        };
      })
    );
  }

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
              <td className="w-3/12 px-3">
                <NumberInput
                  size="xs"
                  hideControls
                  value={row.unitPrice}
                  onChange={(e) => {
                    onPriceChange(index, e, service, setService);
                  }}
                  precision={2}
                />
              </td>
            </td>
            <td className="text-right px-3 w-3/12 ">
              <label title={row.formula}>{row.price.toFixed(2)}</label>
            </td>
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
