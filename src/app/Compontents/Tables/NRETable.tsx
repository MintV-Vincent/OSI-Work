import { NumberInput, Table } from "@mantine/core";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { servicesMap } from "Library/Types";
import React from "react";
import { useAtom } from "jotai";
import { nreTitle, serviceHeader } from "Library/Headers";
import { NRETotalAtom } from "Library/Atoms/TotalAtom";
import { nreAtom } from "Library/Atoms/ServiceStorage";
import TotalRows from "./Rows/TotalRows";
import ServiceInput from "app/Compontents/Tables/CustomCompontents/ServiceAmount";
import { createFormula } from "Functions/Create/CreateFormula";
import AddServiceButton from "./CustomCompontents/AddServiceButton";

export default function NRETable() {
  const [total] = useAtom(NRETotalAtom);
  const [nre, setNRE] = useAtom(nreAtom);

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
        columns={["text-left", "text-left", "", "text-right "]}
        titles={serviceHeader(nreTitle)}
      />
      <tbody>
        {nre.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.material + " row " + index}>
            <td className="w-60 px-3">{row.material}</td>
            <td className="px-3">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={nre}
                setData={setNRE}
              />
            </td>
            <td className="px-3">
              <NumberInput
                size="xs"
                hideControls
                value={row.unitPrice}
                onChange={(e) => {
                  onPriceChange(index, e, nre, setNRE);
                }}
                precision={2}
              />
            </td>
            <td className="text-right w-40 px-3">{row.price.toFixed(2)}</td>
          </tr>
        ))}
        <TotalRows
          text={"Total"}
          total={total}
          columns={serviceHeader(nreTitle).length}
          button={[
            <AddServiceButton
              title={nreTitle}
              dataRow={nre}
              setDataRow={setNRE}
            />,
          ]}
        />
      </tbody>
    </Table>
  );
}
