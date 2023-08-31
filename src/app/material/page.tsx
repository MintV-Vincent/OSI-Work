"use client";
import React from "react";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import ServiceTable from "app/Compontents/Tables/ServiceTable";
import { MaterialTotalTable } from "app/Compontents/Tables/MaterialTotalTable";
import ServiceTotalTable from "app/Compontents/Tables/ServiceTotalTable";
import { AssemblyTable } from "app/Compontents/Tables/AssemblyTable";
import NRETable from "app/Compontents/Tables/NRETable";

export default function page() {
  return (
    <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-12rem)] flex flex-col justify-between">
        <div className="h-[calc(32%)] overflow-auto flex flex-col scrollbar-gutter">
          <MaterialTotalTable />
          <ServiceTotalTable />
        </div>
        <div className="h-[calc(20%)] overflow-auto z-40 scrollbar-gutter">
          <AssemblyTable />
        </div>
        <div className="h-[calc(48%)] overflow-auto z-40 scrollbar-gutter">
          <PriceTable />
        </div>
      </div>
      <div className="grid-span-1 h-[calc(100vh-12rem)] overflow-auto ml-2 z-50">
        <ProcessTable />
        <NRETable />
      </div>
    </div>
  );
}
