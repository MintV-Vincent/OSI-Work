"use client";
import { NumberInput, Textarea } from "@mantine/core";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import React from "react";
import { useAtom } from "jotai";
import {
  currencySelectorAtom,
  noteAtom,
  soldAtom,
  termsAtom,
} from "Library/Atoms/FrontPageAtoms";
import { materialFilmTotalAtom } from "Library/Atoms/TotalAtom";
import { IconCurrencyDollar } from "@tabler/icons-react";

import {
  exchangeRateAtom,
  marginAtom,
  upPanelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import TotalLabel from "app/Compontents/Labels/TotalLabel";
import TotalLabelUSD from "app/Compontents/Labels/TotalLabelUSD";

export default function page() {
  const [materialTotal] = useAtom(materialFilmTotalAtom);
  const [note, setNote] = useAtom(noteAtom);
  const [sold, setSold] = useAtom(soldAtom);
  const [terms, setTerms] = useAtom(termsAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [selector] = useAtom(currencySelectorAtom);

  let [numberOfUnits] = useAtom(upPanelAtom);

  if (numberOfUnits === 0) {
    numberOfUnits = 1;
  }

  const fullTotal =
    selector === "CAD" ? materialTotal : materialTotal / Number(exchangeRate);
  const yeildTotal = fullTotal / yeild;
  const marginTotal = yeildTotal / margin;
  const USDTotal = marginTotal / Number(exchangeRate);
  const unitTotal = USDTotal / numberOfUnits;

  const SoldToText: string =
    "Buyer Name, Customer Name, Address\nCity, State, Country, Phone, #E-mail";

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
          <TotalLabelUSD
            title={"USD Total"}
            total={USDTotal}
            hoverText={"Margin Total/USD"}
          />
          <TotalLabelUSD
            title={"Unit Total"}
            total={unitTotal}
            hoverText={"USD Total/#-Up-Per-Panel"}
          />
        </div>
      </div>
    </div>
  );
}
