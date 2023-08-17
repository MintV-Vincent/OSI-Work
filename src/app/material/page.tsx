"use client";
import React from "react";
import { TotalTable } from "app/Compontents/Tables/TotalTable";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import NRETable from "app/Compontents/Tables/NRETable";
import ServiceTable from "app/Compontents/Tables/ServiceTable";
import { useAtom } from "jotai";
import {
  materialFilmTotalAtom,
  serviceTotalAtom,
} from "Library/Atoms/TotalAtom";
import { totalTitle, totalTitle2 } from "Library/Headers";

const sharedTotal: string = "text-xl py-1.5 w-1/4 text-left";

export default function page() {
  const [total] = useAtom(materialFilmTotalAtom);
  const [serviceTotal] = useAtom(serviceTotalAtom);
  return (
    <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-13rem)] flex flex-col justify-between">
        <div className="h-[calc(48%)] overflow-auto flex flex-col justify-between scrollbar-gutter">
          <TotalTable titles={totalTitle} total={total} />
          <TotalTable titles={totalTitle2} total={serviceTotal} />
        </div>
        <div className="h-[calc(48%)] overflow-auto z-40 scrollbar-gutter">
          <PriceTable />
        </div>
      </div>
      <div className="grid-span-1 h-[calc(100vh-13rem)] overflow-auto ml-2 z-50">
        <ProcessTable />
        <ServiceTable />
        <NRETable />
      </div>
    </div>
  );
}
