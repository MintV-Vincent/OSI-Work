import { Table } from "@mantine/core";
import { dictionaryMap, rowMap } from "Library/Types";
import { NumberInput, Select } from "@mantine/core";
import { createData, createRow } from "Functions/Create/MapCreate";
import GetDate from "Functions/GetFunction/GetDate";
import { atom, useAtom } from "jotai";
import { TextInput } from "@mantine/core";
import { panelRow } from "Library/SelectMap";
import { IconCurrencyDollar } from "@tabler/icons-react";
import SelectLabel from "app/Compontents/SelectLabel";
import GetQuote from "Functions/GetFunction/GetQuote";
import {
  exchangeRateAtom,
  freightAtom,
  panelAtom,
} from "Library/Atoms/AtomStorage";
import {
  assemblyAtom,
  layerAtom,
  partsInputAtom,
  revAtom,
  technologyAtom,
} from "Library/Atoms/FrontPageAtoms";
interface SplitTable {
  left: rowMap;
  right: rowMap;
}

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
  let indents: string[] = [];
  for (let i: number = 1; i < number + 1; i++) {
    indents.push("‎" + i.toString());
  }
  return indents;
}

export function FrontTable({}) {
  const [freight, setFreight] = useAtom(freightAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  const [layers, setLayers] = useAtom(layerAtom);
  const [technology, setTechnology] = useAtom(technologyAtom);
  const [assembly, setAssembly] = useAtom(assemblyAtom);
  const [partNumberInput, setPartInput] = useAtom(partsInputAtom);
  const [revisionInput, setRevisionInput] = useAtom(revAtom);
  const selectLabel: React.JSX.Element[] = SelectLabel();
  const selectCustomer: React.JSX.Element = selectLabel[0];
  const customerCode: React.JSX.Element = selectLabel[1];

  const partNumber = createRow(
    "Part Number",
    <TextInput
      value={partNumberInput}
      onChange={(event) => setPartInput(event.currentTarget.value)}
    />
  );
  const revision = createRow(
    "Revision",
    <TextInput
      value={revisionInput}
      onChange={(event) => setRevisionInput(event.currentTarget.value)}
    />
  );
  const numberOfLayers = createRow(
    "# of Layers",
    <Select
      searchable
      clearable
      searchValue={layers}
      onSearchChange={(e) => {
        console.log(e);
        if (e != "") {
          setLayers(e);
        }
      }}
      data={createLoop(20)}
    />
  );
  const panelSize = createRow(
    "Panel Size",
    <Select value={panel} onChange={setPanel} data={panelRow} />
  );
  const technologyTable = createRow(
    "Technology",
    <Select
      value={technology}
      onChange={setTechnology}
      data={["A", "B", "C", "D"]}
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
      nothingFound="No options"
      value={assembly}
      onChange={setAssembly}
      data={["Yes", "No"]}
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
