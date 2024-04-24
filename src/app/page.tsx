"use client";
import React from "react";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { MaterialTotalTable } from "app/Compontents/Tables/MaterialTotalTable";
import ServiceTotalTable from "app/Compontents/Tables/ServiceTotalTable";
import { AssemblyTable } from "app/Compontents/Tables/AssemblyTable";

export default function page() {
  return (
    <div className="flex flex-col h-screen m-4 py-4 px-8">
      <div className="h-[calc(16%)] overflow-auto z-40 scrollbar-gutter">
        <MaterialTotalTable />
      </div>
      <div className="h-[calc(16%)] overflow-auto flex flex-col scrollbar-gutter">
        <ServiceTotalTable />
      </div>
      <div className="h-[calc(20%)] overflow-auto z-40 scrollbar-gutter">
        <AssemblyTable />
      </div>
      <div className="h-[calc(48%)] overflow-auto z-40 scrollbar-gutter">
        <PriceTable />
      </div>
    </div>
  );
}
