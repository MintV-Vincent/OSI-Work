import { Table } from "@mantine/core";
import { dictionaryMap, rowMap } from "Interface/Types";
import { useState } from "react";
import { NumberInput, Select } from "@mantine/core";
import { createData, createRow } from "Functions/GetFunction/Create/MapCreate";
import GetDate from "Functions/GetFunction/GetDate";
import { atom, useAtom } from "jotai";
import { exchangeRateAtom, freightAtom, panelAtom } from "app/MainWebsite";
import { TextInput } from "@mantine/core";
import { panelRow } from "Interface/SelectMap";
import { IconCurrencyDollar } from "@tabler/icons-react";
import SelectLabel from "app/Compontents/SelectLabel";
import GetQuote from "Functions/GetFunction/GetQuote";
import { customer } from "DataBases/Customer";
import JsonToCustomer from "JsonReader/JsonToCustomer";

interface SplitTable {
  left: rowMap;
  right: rowMap;
}

export const customerAtom = atom<string>("");
export const customerRowAtom = atom(JsonToCustomer(customer));
export const codeAtom = atom<string>("");

const rowClassName = "h-14 ";

const rows: string[] = [
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

interface frontTable {
  partNumberInput: string;
  revisionInput: string;
  setPartInput: any;
  setRevisionInput: any;
}

export function FrontTable({
  partNumberInput,
  setPartInput,
  revisionInput,
  setRevisionInput,
}: frontTable) {
  const [freight, setFreight] = useAtom(freightAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  const [layers, setLayers] = useState<string>("1");
  const [technology, setTechnology] = useState<string>("1");
  const [assembly, setAssembly] = useState<string>("1");

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
  const partNumber = createRow(
    "Part Number",
    <TextInput value={partNumberInput} onChange={setPartInput} />
  );
  const revision = createRow(
    "Revision",
    <TextInput value={revisionInput} onChange={setRevisionInput} />
  );
  const numberOfLayers = createRow(
    "# of Layers",
    <Select
      searchable
      defaultValue={"1"}
      searchValue={layers}
      onSearchChange={setLayers}
      data={layersRow}
    />
  );
  const panelSize = createRow(
    "Panel Size",
    <Select
      defaultValue={"1.5"}
      value={panel}
      onChange={setPanel}
      data={panelRow}
    />
  );
  const technologyTable = createRow(
    "Technology",
    <Select
      searchable
      searchValue={technology}
      defaultValue={"1"}
      onSearchChange={setTechnology}
      data={technologyRow}
    />
  );
  const exchangeTable = createRow(
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
  );
  const freightTable = createRow(
    "Freight",
    <NumberInput
      hideControls
      precision={2}
      value={freight}
      onChange={(event: number | "") => {
        setFreight(event);
      }}
    />
  );
  const assymblyTable = createRow(
    "Assembly",
    <Select
      searchable
      searchValue={assembly}
      defaultValue={"1"}
      onSearchChange={setAssembly}
      data={assemblyRow}
    />
  );
  const leftTable: SplitTable[] = [
    {
      right: createRow("Quote Number", <GetQuote />),
      left: createRow("Date", <label>{GetDate()}</label>),
    },
    { left: partNumber, right: numberOfLayers },
    { left: revision, right: panelSize },
    { left: freightTable, right: assymblyTable },
    { left: exchangeTable, right: technologyTable },
  ];

  // This table consist of only two columns. The data points should be of type row map
  return (
    <>
      <Table miw={700} striped withBorder verticalSpacing="md">
        <thead className={"bg-light"}>
          <tr>
            <td colSpan={1}></td>
            <td
              colSpan={11}
              className={"text-xl font-semibold py-2 px-3 text-primary"}
            >
              Front
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}></td>
            <td className={"text font-semibold"} colSpan={1}>
              {"Customer"}
            </td>
            <td colSpan={5}>{customerCode}</td>
            <td colSpan={5}>{selectCustomer}</td>
          </tr>
          {leftTable.map((row: SplitTable, index: number) => (
            <tr className={" text-primary"} key={row.left + " row " + index}>
              <td colSpan={1}></td>
              <td className={rows[index]} colSpan={1}>
                {row.left.label}
              </td>
              <td className={rows[index]} colSpan={3}>
                {row.left.value}
              </td>
              <td colSpan={2}></td>
              <td className={rows[index]} colSpan={1}>
                {row.right.label}
              </td>
              <td className={rows[index]} colSpan={3}>
                {row.right.value}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
