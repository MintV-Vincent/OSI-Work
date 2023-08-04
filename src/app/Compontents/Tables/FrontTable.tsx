import { SegmentedControl, Table } from "@mantine/core";
import { rowMap } from "Library/Types";
import { NumberInput, Select } from "@mantine/core";
import { createRow } from "Functions/Create/MapCreate";
import GetDate from "Functions/GetFunction/GetDate";
import { useAtom } from "jotai";
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
import { useEffect, useRef } from "react";
interface SplitTable {
  left: rowMap;
  right: rowMap;
}

const rowClassName: string = "h-14";

function createLoop(number: number) {
  let indents: string[] = [];
  for (let i: number = 1; i < number + 1; i++) {
    indents.push(i.toString());
  }
  return indents;
}

export function FrontTable({}) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
        if (isMounted.current == true) {
          setLayers(e);
        }
      }}
      data={createLoop(20)}
    />
  );
  const panelSize = createRow(
    "Panel Size",
    <SegmentedControl
      color="blue"
      fullWidth
      value={panel}
      onChange={setPanel}
      data={panelRow}
    />
  );
  const technologyTable = createRow(
    "Technology",
    <SegmentedControl
      color="blue"
      fullWidth
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
      precision={4}
      value={freight}
      onChange={(event: number | "") => {
        setFreight(event);
      }}
    />
  );
  const assymblyTable = createRow(
    "Assembly",
    <SegmentedControl
      color="blue"
      fullWidth
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
    <div className="pt-10">
      <Table miw={700} striped withBorder verticalSpacing="md">
        <thead className={"bg-light"}>
          <tr>
            <td colSpan={1}></td>
            <td
              colSpan={6}
              className={"text-xl font-semibold py-2 px-3 text-primary"}
            >
              Front
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}></td>
            <td className={"text font-semibold " + rowClassName} colSpan={1}>
              {"Customer"}
            </td>
            <td className={rowClassName} colSpan={1}>
              {selectCustomer}
            </td>
            <td colSpan={1}></td>
            <td className={"text font-semibold " + rowClassName} colSpan={2}>
              {customerCode}
            </td>
            <td colSpan={1}></td>
          </tr>
          {leftTable.map((row: SplitTable, index: number) => (
            <tr key={row.left + " row " + index}>
              <td colSpan={1}></td>
              <td className={rowClassName} colSpan={1}>
                {row.left.label}
              </td>
              <td className={rowClassName} colSpan={1}>
                {row.left.value}
              </td>
              <td colSpan={1}></td>
              <td className={rowClassName} colSpan={1}>
                {row.right.label}
              </td>
              <td className={rowClassName} colSpan={1}>
                {row.right.value}
              </td>
              <td colSpan={1}></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
