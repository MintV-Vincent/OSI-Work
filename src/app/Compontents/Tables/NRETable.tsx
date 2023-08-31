import { NumberInput, Table } from "@mantine/core";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { servicesMap } from "Library/Types";
import React from "react";
import { useAtom } from "jotai";
import { nreTitle, serviceHeader } from "Library/Headers";
import { nreAtom } from "Library/Atoms/ServiceStorage";
import TotalRows from "./Rows/TotalRows";
import ServiceInput from "./CustomCompontents/ServiceInput";
import { createFormula } from "Functions/Create/CreateFormula";
import AddServiceButton from "./CustomCompontents/AddServiceButton";
import { USDTotalNREAtom } from "Library/Atoms/TotalAtomUSD";

export default function NRETable() {
  const [total] = useAtom(USDTotalNREAtom);
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
        columns={["text-left", "text-left", "text-right ", "text-right "]}
        titles={serviceHeader(nreTitle)}
      />
      <tbody>
        {nre.map((row: servicesMap, index: number) => (
          <tr className={" text-primary"} key={row.service + " row " + index}>
            <td className="w-4/12 px-3">{row.service}</td>
            <td className="w-2/12 px-3">
              <ServiceInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                data={nre}
                setData={setNRE}
              />
            </td>
            <td className="w-3/12 px-3">
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
            <td className="w-3/12 text-right px-3">{row.price.toFixed(2)}</td>
          </tr>
        ))}
        <TotalRows
          text={"USD Total"}
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
