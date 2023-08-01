"use client";
import { useHydrateAtoms } from "jotai/utils";
import {
  yeildAtom,
  marginAtom,
  exchangeRateAtom,
  freightAtom,
  panelAtom,
} from "Library/Atoms/AtomStorage";
import { Button, Radio } from "@mantine/core";
//import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { useAtom } from "jotai";
import { IconPrinter } from "@tabler/icons-react";
import TextInputLabel from "app/Compontents/TextAreaLabel";
import {
  customerAtom,
  noteAtom,
  partsAtom,
  partsInputAtom,
  revAtom,
  salesAtom,
  soldAtom,
} from "Library/Atoms/FrontPageAtoms";

const gus: string = "Gus Tarkas, ";
const chris: string = "Chris Keirstead, ";
const micheal: string = "Micheal Mordando, ";

function chooseSales(value: string): string {
  switch (value) {
    case "gus":
      return gus + "VP\ngtrakas@pfcflex.com";
    case "chris":
      return chris + "Sales Manager\nckeirstead@pfcflex.com";
    case "micheal":
      return micheal + "Director of sales\nmmorando@pfcflex.com";
  }
  return "";
}

export default function page() {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [margin] = useAtom(marginAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [note, setNote] = useAtom(noteAtom);
  const [part, setPart] = useAtom(partsAtom);
  const [sold, setSold] = useAtom(soldAtom);
  const [sales, setSales] = useAtom(salesAtom);

  useHydrateAtoms([
    [exchangeRateAtom, exchangeRate],
    [freightAtom, freight],
    [marginAtom, margin],
    [panelAtom, panel],
    [yeildAtom, yeild],
  ]);

  let componentRef: any = useRef();

  return (
    <div className="mx-8">
      <div className="flex pt-10">
        <FrontTable />
      </div>
      <div className="flex py-10 justify-between">
        <Radio.Group
          className="text-xl"
          value={sales}
          onChange={setSales}
          name="sales"
          label="Select Sales Manager"
          size="md"
        >
          <Radio className={"py-0.5"} value="gus" label={gus} />
          <Radio className={"py-0.5"} value="chris" label={chris} />
          <Radio className={"py-0.5"} value="micheal" label={micheal} />
        </Radio.Group>
        <TextInputLabel label={"Notes: "} state={note} setState={setNote} />
        <TextInputLabel
          label={"Part Attribute: "}
          state={part}
          setState={setPart}
        />
        <TextInputLabel label={"Sold To: "} state={sold} setState={setSold} />
      </div>
      <div>
        <ReactToPrint
          trigger={() => <Button rightIcon={<IconPrinter />}>Print</Button>}
          content={() => componentRef.current}
        />
        <div className="hidden">
          <FrontPagePrint />
        </div>
      </div>
    </div>
  );
}
