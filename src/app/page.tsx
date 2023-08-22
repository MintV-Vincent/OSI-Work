"use client";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { Button, NumberInput, Textarea } from "@mantine/core";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import { useReactToPrint } from "react-to-print";
import React, { useRef, lazy, Suspense } from "react";
import { useAtom } from "jotai";
import { IconPrinter } from "@tabler/icons-react";
import {
  noteAtom,
  partsAtom,
  soldAtom,
  termsAtom,
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
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import TotalLabel from "./Compontents/TotalLabel";
import { USDTotalFrontAtom } from "Library/Atoms/TotalAtomUSD";

const FrontPagePrint = lazy(
  () => import("app/Compontents/PrintingElement/FrontPagePrint")
);

export default function page() {
  const [fullTotal] = useAtom(fullTotalAtom);
  const [note, setNote] = useAtom(noteAtom);
  const [part, setPart] = useAtom(partsAtom);
  const [sold, setSold] = useAtom(soldAtom);
  const [terms, setTerms] = useAtom(termsAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [yeildTotal] = useAtom(yeildTotalAtom);
  const [marginTotal] = useAtom(marginTotalAtom);
  const [USDTotal] = useAtom(USDTotalFrontAtom);
  const [unitTotal] = useAtom(unitTotalAtom);
  const SoldToText: string =
    "Buyer Name, Customer Name, Address\nCity, State, Country, Phone, #E-mail";

  let componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col h-screen m-4 py-4 px-8">
      <FrontTable />
      <div className="py-10 grid grid-cols-2 auto-rows-auto gap-x-10">
        <div className="col-span-1 row-span-3 grid grid-rows-4">
          <Textarea
            label={"Notes:"}
            autosize
            placeholder="Enter Extra Notes"
            value={note}
            onChange={(e: any) => setNote(e.currentTarget.value)}
            minRows={3}
          />
          <Textarea
            autosize
            label={"Sold To:"}
            placeholder={SoldToText}
            value={sold}
            onChange={(e: any) => setSold(e.currentTarget.value)}
            minRows={3}
          />
          <Textarea
            autosize
            label={"Terms:"}
            placeholder="Enter Terms"
            value={terms}
            onChange={(e: any) => {
              setTerms(e.currentTarget.value);
            }}
            minRows={3}
          />
        </div>
        <div className="col-span-1 row-span-1">
          <div className="flex pb-5">
            <Button
              className={"w-1/3 m-auto"}
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
          <div className="flex justify-between">
            <label className="w-1/4 text-left">1 CAD to USD:</label>
            <label className="w-1/4 text-left">Yield: </label>
            <label className="w-1/4 text-left">Margin: </label>
          </div>
          <div className="flex justify-between">
            <NumberInput
              className="w-1/4"
              hideControls
              precision={percision}
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
            <NumberInput
              className="w-1/4"
              hideControls
              precision={percision}
              value={yeild}
              onChange={(event: number) => setYeild(event)}
            />
            <NumberInput
              className="w-1/4"
              hideControls
              precision={percision}
              value={margin}
              onChange={(event: number) => setMargin(event)}
            />
          </div>
        </div>
        <div className="grid row-span-2">
          <TotalLabel title={"Total"} total={fullTotal} hoverText={"Total"} />
          <TotalLabel
            title={"Yeild Total"}
            total={yeildTotal}
            hoverText={"Total/Yeild"}
          />
          <TotalLabel
            title={"Margin Total"}
            total={marginTotal}
            hoverText={"Yeild Total/Margin"}
          />
          <TotalLabel
            title={"USD Total"}
            total={USDTotal}
            hoverText={"Margin Total/USD"}
            USDSelector={"USD"}
          />
          <TotalLabel
            title={"Unit Total"}
            total={unitTotal}
            hoverText={"USD Total/#-Up-Per-Panel"}
            USDSelector={"USD"}
          />
        </div>
      </div>
    </div>
  );
}
