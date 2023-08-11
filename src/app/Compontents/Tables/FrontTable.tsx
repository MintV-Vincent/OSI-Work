import { SegmentedControl, Table } from "@mantine/core";
import { rowMap } from "Library/Types";
import { NumberInput, Select } from "@mantine/core";
import { createRow } from "Functions/Create/MapCreate";
import GetDate from "Functions/GetFunction/GetDate";
import { useAtom } from "jotai";
import { TextInput } from "@mantine/core";
import { panelRow } from "Library/SelectMap";
import SelectLabel from "app/Compontents/SelectLabel";
import GetQuote from "Functions/GetFunction/GetQuote";
import { freightAtom, panelAtom } from "Library/Atoms/AtomStorage";
import {
  assemblyAtom,
  layerAtom,
  partsInputAtom,
  revAtom,
  technologyAtom,
} from "Library/Atoms/FrontPageAtoms";
import { useEffect, useRef } from "react";
import QuantityInput from "../QuantityInput";
interface SplitTable {
  left: rowMap;
  right: rowMap;
}

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
  const quantity = createRow("Quantities", <QuantityInput />);
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
  const technologyTable = createRow(
    "Technology",
    <SegmentedControl
      size="xs"
      color="blue"
      fullWidth
      value={technology}
      onChange={setTechnology}
      data={["A", "B", "C", "D"]}
    />
  );
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
    { left: quantity, right: assymblyTable },
    { left: revision, right: panelSize },
    { left: freightTable, right: technologyTable },
  ];

  // This table consist of only two columns. The data points should be of type row map
  return (
    <div className="pt-10">
      <Table striped withBorder verticalSpacing="xs">
        <thead className={"bg-light"}>
          <tr>
            <td colSpan={1}></td>
            <td
              colSpan={6}
              className={"h-10 text-xl font-semibold py-2 px-3 text-primary"}
            ></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}></td>
            <td className={"text font-semibold "} colSpan={1}>
              {"Customer"}
            </td>
            <td className={""} colSpan={1}>
              {selectCustomer}
            </td>
            <td colSpan={1}></td>
            <td className={"text font-semibold " + ""} colSpan={2}>
              {customerCode}
            </td>
            <td colSpan={1}></td>
          </tr>
          {leftTable.map((row: SplitTable, index: number) => (
            <tr key={row.left + " row " + index}>
              <td colSpan={1}></td>
              <td className={""} colSpan={1}>
                {row.left.label}
              </td>
              <td className={""} colSpan={1}>
                {row.left.value}
              </td>
              <td colSpan={1}></td>
              <td className={""} colSpan={1}>
                {row.right.label}
              </td>
              <td className={""} colSpan={1}>
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
