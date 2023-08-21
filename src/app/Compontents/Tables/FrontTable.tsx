import { HoverCard, SegmentedControl, Table } from "@mantine/core";
import { rowMap } from "Library/Types";
import { NumberInput, Select } from "@mantine/core";
import { createRow } from "Functions/Create/MapCreate";
import GetDate from "Functions/GetFunction/GetDate";
import { useAtom } from "jotai";
import { TextInput } from "@mantine/core";
import SelectLabel from "app/Compontents/SelectLabel";
import { freightAtom, panelAtom } from "Library/Atoms/AtomStorage";
import {
  assemblyAtom,
  currencySelectorAtom,
  layerAtom,
  partsInputAtom,
  qualityAtom,
  revAtom,
  salesAtom,
} from "Library/Atoms/FrontPageAtoms";
import { useEffect, useRef } from "react";
import { panelRow } from "Library/ConstantValues";
import WarningForm from "../Forms/WarningForm";
import QuoteSelect from "./CustomCompontents/QuoteSelect";
import { IconInfoSquareFilled } from "@tabler/icons-react";
interface SplitTable {
  left: [rowMap, JSX.Element | null];
  right: [rowMap, JSX.Element | null];
}

function createLoop(number: number) {
  let indents: string[] = [];
  for (let i: number = 1; i < number + 1; i++) {
    indents.push(i.toString());
  }
  return indents;
}

export function FrontTable() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [freight, setFreight] = useAtom(freightAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  const [layers, setLayers] = useAtom(layerAtom);
  const [assembly, setAssembly] = useAtom(assemblyAtom);
  const [partNumberInput, setPartInput] = useAtom(partsInputAtom);
  const [revisionInput, setRevisionInput] = useAtom(revAtom);
  const [sales, setSales] = useAtom(salesAtom);
  const [selector, setSelector] = useAtom(currencySelectorAtom);
  const [value, setValue] = useAtom(qualityAtom);

  const selectLabel: React.JSX.Element[] = SelectLabel();
  const selectCustomer: React.JSX.Element = selectLabel[0];
  const customerCode: React.JSX.Element = selectLabel[1];

  const partNumber = createRow(
    "Part Number",
    <TextInput
      size="xs"
      value={partNumberInput}
      onChange={(event) => setPartInput(event.currentTarget.value)}
    />
  );
  const revision = createRow(
    "Revision",
    <TextInput
      size="xs"
      value={revisionInput}
      onChange={(event) => setRevisionInput(event.currentTarget.value)}
    />
  );
  const quantity = createRow(
    "Quantities",
    <TextInput
      size="xs"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
  const numberOfLayers = createRow(
    "# of Layers",
    <Select
      size="xs"
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
      size="xs"
      color="blue"
      fullWidth
      value={panel}
      onChange={setPanel}
      data={panelRow}
    />
  );
  const technologyTable = createRow("Technology", <WarningForm />);
  const freightTable = createRow(
    "Freight",
    <NumberInput
      size="xs"
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
      size="xs"
      color="blue"
      fullWidth
      value={assembly}
      onChange={(e) => {
        setAssembly(e);
      }}
      data={["Yes", "No"]}
    />
  );

  const salesTable = createRow(
    "Sales Person",
    <SegmentedControl
      color="blue"
      value={sales}
      fullWidth
      onChange={setSales}
      name="sales"
      size="xs"
      data={[
        { label: "Gus", value: "gus" },
        { label: "Chris", value: "chris" },
        { label: "Micheal", value: "micheal" },
        { label: "Deb", value: "deb" },
      ]}
    />
  );

  const selectorExchange = createRow(
    "Currency",
    <SegmentedControl
      color="blue"
      value={selector}
      fullWidth
      onChange={setSelector}
      name="sales"
      size="xs"
      data={[
        { label: "CAD$", value: "CAD" },
        { label: "USD$", value: "USD" },
      ]}
    />
  );
  const leftTable: SplitTable[] = [
    {
      left: [createRow("Quote Number", <QuoteSelect />), null],
      right: [createRow("Date", <label>{GetDate()}</label>), null],
    },
    { left: [partNumber, null], right: [panelSize, null] },
    { left: [quantity, null], right: [assymblyTable, null] },
    { left: [revision, null], right: [selectorExchange, null] },
    { left: [freightTable, null], right: [salesTable, null] },
    {
      left: [numberOfLayers, null],
      right: [
        technologyTable,
        <HoverCard position="left" withArrow>
          <HoverCard.Target>
            <IconInfoSquareFilled className="p-0 m-0" />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <label className="text-left break-words whitespace-pre-wrap">
              {
                "A: Single sided flex \nB: Double sided flex\nC: Multi-layer flex\nD: Multi-layer flex and rigid"
              }
            </label>
          </HoverCard.Dropdown>
        </HoverCard>,
      ],
    },
  ];

  // This table consist of only two columns. The data points should be of type row map
  return (
    <>
      <Table striped withBorder verticalSpacing="5px">
        <thead className={"bg-light"}>
          <tr>
            <td colSpan={1} />
            <td
              colSpan={6}
              className={"h-10 text-xl font-semibold py-2 px-3 text-primary"}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1} />
            <td className={"text font-semibold "} colSpan={1}>
              {"Customer"}
            </td>
            <td className={""} colSpan={1}>
              {selectCustomer}
            </td>
            <td colSpan={1} />
            <td className={"text font-semibold " + ""} colSpan={2}>
              {customerCode}
            </td>
            <td colSpan={1} />
          </tr>
          {leftTable.map((row: SplitTable, index: number) => (
            <tr key={row.left[0].label + " row " + index}>
              <td colSpan={1} />
              <td className={""} colSpan={1}>
                {row.left[0].label}
              </td>
              <td className={""} colSpan={1}>
                {row.left[0].value}
              </td>
              <td colSpan={1} className={"w-10"}>
                {row.left[1]}
              </td>
              <td className={""} colSpan={1}>
                {row.right[0].label}
              </td>
              <td className={""} colSpan={1}>
                {row.right[0].value}
              </td>
              <td colSpan={1} className="w-10">
                {row.right[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
