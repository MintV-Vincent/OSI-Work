"use client";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { Button, NumberInput, Radio, Textarea } from "@mantine/core";
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
import {
  fullTotalAtom,
  marginTotalAtom,
  unitTotalAtom,
  yeildTotalAtom,
} from "Library/Atoms/TotalAtom";

import {
  exchangeRateAtom,
  marginAtom,
  unitAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { IconPercentage } from "@tabler/icons-react";

const FrontPagePrint = lazy(
  () => import("app/Compontents/PrintingElement/FrontPagePrint")
);

const totalClassName =
  "mx-1mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-primary text-center";

export default function page() {
  const [fullTotal] = useAtom(fullTotalAtom);
  const [selector] = useAtom(currencySelectorAtom);
  const [note, setNote] = useAtom(noteAtom);
  const [part, setPart] = useAtom(partsAtom);
  const [sold, setSold] = useAtom(soldAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [units, setUnit] = useAtom(unitAtom);
  const [yeildTotal] = useAtom(yeildTotalAtom);
  const [marginTotal] = useAtom(marginTotalAtom);
  const [unitTotal] = useAtom(unitTotalAtom);

  let componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] m-4 py-4 px-8">
      <FrontTable />
      <div className="py-14 grid grid-cols-2 grid-rows-3 gap-x-5">
        <div className="col-span-1 row-span-3">
          <label className="row-span-1">Notes: </label>
          <Textarea
            autosize
            placeholder="Enter Extra Notes"
            value={note}
            onChange={(e: any) => setNote(e.currentTarget.value)}
            minRows={3}
          />
          <label className="">Part Attribute:</label>
          <Textarea
            autosize
            placeholder="Enter Part Attributes"
            value={part}
            onChange={(e: any) => setPart(e.currentTarget.value)}
            minRows={3}
          />
          <label className="">Sold To: </label>
          <Textarea
            autosize
            placeholder="Enter Sold To"
            value={sold}
            onChange={(e: any) => setSold(e.currentTarget.value)}
            minRows={3}
          />
        </div>

        <div className="col-span-1 row-span-1">
          <div className="flex justify-between">
            <div>
              <label>Exchange Rate 1 USD to CAD:</label>
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
            </div>
            <div>
              <label>Yeild: </label>
              <NumberInput
                hideControls
                precision={2}
                value={yeild}
                onChange={(event: number) => setYeild(event)}
                rightSection={
                  <IconPercentage
                    size={"1.25rem"}
                    style={{ display: "block", opacity: 0.5 }}
                  />
                }
                rightSectionWidth={36}
              />
            </div>

            <div>
              <label>Margin: </label>
              <NumberInput
                hideControls
                precision={2}
                value={margin}
                onChange={(event: number) => setMargin(event)}
                rightSection={
                  <IconPercentage
                    size={"1.25rem"}
                    style={{ display: "block", opacity: 0.5 }}
                  />
                }
                rightSectionWidth={36}
              />
            </div>
          </div>
        </div>
        <div className="grid row-span-2">
          <label className={totalClassName}>
            Total: ${fullTotal.toFixed(2) + " " + selector}
          </label>
          <label className={totalClassName}>
            Yeild Total: ${yeildTotal.toFixed(2) + " " + selector}
          </label>
          <label className={totalClassName}>
            Margin Total: ${marginTotal.toFixed(2) + " " + selector}
          </label>
        </div>
      </div>
      <Button
        className={"w-1/2 mx-auto"}
        onClick={handlePrint}
        rightIcon={<IconPrinter />}
      >
        Print
      </Button>
      <div className="hidden">
        <Suspense>
          <FrontPagePrint ref={componentRef} />
        </Suspense>
      </div>
    </div>
  );
}
