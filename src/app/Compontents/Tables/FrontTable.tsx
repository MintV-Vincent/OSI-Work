import { Table, Tooltip } from "@mantine/core";
import { dictionaryMap, rowMap } from "Interface/Types";
import HeaderRow from "./Rows/HeaderRow";
import { useState } from "react";
import { NumberInput, Select } from "@mantine/core";
import { createData, createRow } from "Functions/Create/MapCreate";
import GetDate from "Functions/GetDate";
import { atom, useAtom } from "jotai";
import { exchangeRateAtom, freightAtom, panelAtom } from "MainWebsite";
import { useInputState } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import { panelRow } from "Interface/SelectMap";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { frontHeader } from "Interface/Headers";
import SelectLabel from "Compontents/SelectLabel";

export const customerAtom = atom<string>("");
export const customerRowAtom = atom([
  createData("Advanced Optical Components", "C0001"),
  createData("Action Manufacturing Company", "C0002"),
  createData("Acumentrics Corporation", "C0003"),
  createData("Adeptron Technologies Corp.", "C0004"),
]);
export const codeAtom = atom<string>("");

const rowClassName = "h-14 ";

const rows: string[] = [
  rowClassName + "text font-semibold ",
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
  rowClassName,
];

function createLoop(number: number) {
  let indents: dictionaryMap[] = [];
  for (let i: number = 1; i < number + 1; i++) {
    indents.push(createData(i.toString(), i.toString()));
  }
  return indents;
}

export function FrontTable() {
  const [freight, setFreight] = useAtom(freightAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  const [layers, setLayers] = useState<string>("1");
  const [technology, setTechnology] = useState<string>("1");
  const [assembly, setAssembly] = useState<string>("1");
  const [partNumberInput, setPartInput] = useInputState<string>("");
  const [revisoinInput, setRevisionInput] = useInputState<string>("");

  const assemblyRow: dictionaryMap[] = [
    createData("Yes", "1"),
    createData("No", "2"),
  ];

  const technologyRow: dictionaryMap[] = [
    createData("A", "1"),
    createData("B", "2"),
    createData("C", "3"),
    createData("D", "4"),
  ];

  const layersRow: dictionaryMap[] = createLoop(20);
  const selectLabel: React.JSX.Element[] = SelectLabel({
    select: customerAtom,
    dataSet: customerRowAtom,
    label: codeAtom,
  });
  const selectCustomer: React.JSX.Element = selectLabel[0];
  const customerCode: React.JSX.Element = selectLabel[1];

  const FrontTableRows = [
    createRow("Customer", selectCustomer),
    createRow(
      "Part Number",
      <TextInput value={partNumberInput} onChange={setPartInput} />
    ),
    createRow(
      "Revision",
      <TextInput value={revisoinInput} onChange={setRevisionInput} />
    ),
    createRow(
      "# of Layers",
      <Select
        searchable
        defaultValue={"1"}
        searchValue={layers}
        onSearchChange={setLayers}
        data={layersRow}
      />
    ),
    createRow(
      "Panel Size",
      <Select
        defaultValue={"1.5"}
        value={panel}
        onChange={setPanel}
        data={panelRow}
      />
    ),
    createRow(
      "Technology",
      <Select
        searchable
        searchValue={technology}
        defaultValue={"1"}
        onSearchChange={setTechnology}
        data={technologyRow}
      />
    ),
    createRow(
      "Exchange Rate",
      <NumberInput
        hideControls
        precision={2}
        value={exchangeRate}
        onChange={(event: number | "") => {
          setExchangeRate(event);
        }}
        rightSection={
          <IconCurrencyDollar
            size={"1.25rem"}
            style={{ display: "block", opacity: 0.5 }}
          />
        }
        rightSectionWidth={36}
      />
    ),
    createRow(
      "Freight",
      <NumberInput
        hideControls
        precision={2}
        value={freight}
        onChange={(event: number | "") => {
          setFreight(event);
        }}
      />
    ),
    createRow(
      "Assembly",
      <Select
        searchable
        searchValue={assembly}
        defaultValue={"1"}
        onSearchChange={setAssembly}
        data={assemblyRow}
      />
    ),
    createRow(
      "Quote Number",
      <Tooltip label={321}>
        <label>321</label>
      </Tooltip>
    ),
    createRow("Date", <label>{GetDate()}</label>),
  ];

  // This table consist of only two columns. The data points should be of type row map
  return (
    <Table miw={700} striped withBorder>
      <HeaderRow
        columns={[
          "text-left h-14 w-1/5",
          "text-left h-14 w-1/5",
          "text-left h-14 w-3/5",
        ]}
        titles={frontHeader}
      />
      <tbody>
        {FrontTableRows.map((row: rowMap, index: number) => (
          <tr className={" text-primary"} key={row.label + " row " + index}>
            <td className={rows[index] + "w-1/5"}>{row.label}</td>
            {row.label === "Customer" ? (
              <td className={rows[index] + "w-1/5 text-center"}>
                {customerCode}
              </td>
            ) : (
              <td></td>
            )}
            <td className={rows[index] + "w-3/5 text-left"}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
