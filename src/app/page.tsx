"use client";
import { useHydrateAtoms } from "jotai/utils";
import {
  yeildAtom,
  marginAtom,
  exchangeRateAtom,
  freightAtom,
  panelAtom,
} from "Library/Atoms/AtomStorage";
import { Button, Radio, Textarea } from "@mantine/core";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import { useReactToPrint } from "react-to-print";
import React, { useRef, lazy, Suspense } from "react";
import { useAtom } from "jotai";
import { IconPrinter } from "@tabler/icons-react";
import {
  currencySelectorAtom,
  noteAtom,
  partsAtom,
  salesAtom,
  soldAtom,
} from "Library/Atoms/FrontPageAtoms";
import { fullTotalAtom } from "Library/Atoms/TotalAtom";

const FrontPagePrint = lazy(
  () => import("app/Compontents/PrintingElement/FrontPagePrint")
);

const gus: string = "Gus Tarkas";
const chris: string = "Chris Keirstead";
const micheal: string = "Micheal Mordando";

export default function page() {
  const [fullTotal] = useAtom(fullTotalAtom);
  const [note, setNote] = useAtom(noteAtom);
  const [part, setPart] = useAtom(partsAtom);
  const [sold, setSold] = useAtom(soldAtom);
  const [sales, setSales] = useAtom(salesAtom);
  const [selector, setSelector] = useAtom(currencySelectorAtom);

  let componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col mx-12 px-4">
      <FrontTable />
      <div className="flex justify-start pt-10">
        <div className="flex flex-col w-1/2">
          <Textarea
            autosize
            className={"w-full py-1.5"}
            placeholder="Enter Extra Notes"
            label={"Notes: "}
            value={note}
            onChange={(e: any) => setNote(e.currentTarget.value)}
            minRows={3}
          />
          <Textarea
            autosize
            className={"w-full py-1.5"}
            placeholder="Enter Part Attributes"
            label={"Part Attribute: "}
            value={part}
            onChange={(e: any) => setPart(e.currentTarget.value)}
            minRows={3}
          />
          <Textarea
            autosize
            className={"w-full py-1.5"}
            placeholder="Enter Sold To"
            label={"Sold To: "}
            value={sold}
            onChange={(e: any) => setSold(e.currentTarget.value)}
            minRows={3}
          />
        </div>
        <div className="flex flex-col mx-20">
          <Radio.Group
            className="text-xl"
            value={sales}
            onChange={setSales}
            name="sales"
            label="Select Sales Person"
            size="lg"
          >
            <Radio className={"py-6"} value="gus" label={gus} />
            <Radio className={"py-6"} value="chris" label={chris} />
            <Radio className={"py-6"} value="micheal" label={micheal} />
          </Radio.Group>
          <div className="pt-5 flex-grow">
            <Button onClick={handlePrint} rightIcon={<IconPrinter />}>
              Print
            </Button>
            <div className="hidden">
              <Suspense>
                <FrontPagePrint ref={componentRef} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-20">
          <label className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl text-primary text-center">
            Total: ${fullTotal.toFixed(2) + " " + selector}
          </label>
          <Radio.Group
            className="text-xl"
            value={selector}
            onChange={setSelector}
            name="USDCADEXCHANGE"
            size="lg"
          >
            <div className="flex justify-between">
              <Radio className={"py-6"} value="CAD" label={"CAD$"} />
              <Radio className={"py-6"} value="USD" label={"USD$"} />
            </div>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}
