"use client";
import React from "react";
import { NumberInput } from "@mantine/core";
import { useAtom } from "jotai";
import { TotalTable } from "app/Compontents/Tables/TotalTable";
import { IconPercentage, IconHash } from "@tabler/icons-react";
import {
  exchangeRateAtom,
  marginAtom,
  unitAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import {
  fullTotalAtom,
  marginTotalAtom,
  unitTotalAtom,
  yeildTotalAtom,
} from "Library/Atoms/TotalAtom";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import NRETable from "app/Compontents/Tables/NRETable";
import ServiceTable from "app/Compontents/Tables/ServiceTable";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";

const sharedTotal: string = "text-xl py-1.5 w-1/4 text-left";

export default function page() {
  return (
    <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-13rem)]">
        <div className="h-[calc(37%)]">
          <TotalTable />
        </div>
        <div className="h-[calc(63%)] overflow-auto no-scrollbar">
          <PriceTable customString={"Code"} />
        </div>
      </div>
      <div className="grid-span-1 h-[calc(100vh-13rem)] overflow-auto ml-2 no-scrollbar">
        <ProcessTable />
        <ServiceTable />
        <NRETable />
      </div>
    </div>
  );
}

{
  /* <div className="grid grid-cols-2 h-full pt-5">
<div className="grid-span-1 mr-2 h-[calc(100vh-13rem)]">
  <div className="h-[calc(37%)]">
    <TotalTable />
  </div>
  <div className="h-[calc(63%)] overflow-auto no-scrollbar">
    <PriceTable customString={"Code"} />
  </div>
</div>
<div className="grid-span-1 h-[calc(100vh-13rem)] overflow-auto ml-2 no-scrollbar">
  <ProcessTable />
  <ServiceTable />
  <NRETable />
</div>
</div> */
}

/*

  const [exchange] = useAtom(exchangeRateAtom);
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [units, setUnit] = useAtom(unitAtom);
  const [fullTotal] = useAtom(fullTotalAtom);
  const [yeildTotal] = useAtom(yeildTotalAtom);
  const [marginTotal] = useAtom(marginTotalAtom);
  const [unitTotal] = useAtom(unitTotalAtom);

      <div className="flex justify-between pt-10">
        <label className={sharedTotal}>Yeild: </label>
        <label className={sharedTotal}>Margin: </label>
        <label className={sharedTotal}>Number Of Units: </label>
      </div>

      <div className="flex justify-between">
        <NumberInput
          className="pb-1.5 w-1/4"
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

        <NumberInput
          className="pb-1.5 w-1/4"
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

        <NumberInput
          className="pb-1.5 w-1/4"
          hideControls
          value={units}
          onChange={(event: number) => setUnit(event)}
          rightSection={
            <IconHash
              size={"1.25rem"}
              style={{ display: "block", opacity: 0.5 }}
            />
          }
          rightSectionWidth={36}
        />
      </div>
      <div className="flex justify-between">
        <label className={sharedTotal}>
          Yeild Total: ${yeildTotal.toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Margin Total: ${marginTotal.toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Cost Per Unit: ${unitTotal.toFixed(2)}
        </label>
      </div>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl text-primary">
        CAD Total: ${Number(fullTotal).toFixed(2)}
      </h2>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl text-primary">
        USD Total: ${(Number(fullTotal) / Number(exchange)).toFixed(2)}
      </h2>
      
*/
