"use client";
import React from "react";
import { TotalTable } from "app/Compontents/Tables/TotalTable";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import NRETable from "app/Compontents/Tables/NRETable";
import ServiceTable from "app/Compontents/Tables/ServiceTable";

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
