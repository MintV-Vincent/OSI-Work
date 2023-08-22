"use client";
import React from "react";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import NRETable from "app/Compontents/Tables/NRETable";
import ServiceTable from "app/Compontents/Tables/ServiceTable";
import { MaterialTotalTable } from "app/Compontents/Tables/MaterialTotalTable";
import ServiceTotalTable from "app/Compontents/Tables/ServiceTotalTable";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";

export default function page() {
  return (
    <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-13rem)] flex flex-col justify-between">
        <div className="h-[calc(38%)] overflow-auto flex flex-col scrollbar-gutter">
          <div className="pb-3">
            <MaterialTotalTable />
          </div>
          <ServiceTotalTable />
        </div>
        <div className="flex h-[calc(58%)] overflow-auto z-40 scrollbar-gutter">
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

/**
 * 
 *    
 * <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-13rem)] flex flex-col justify-between">
        <div className="h-[calc(38%)] overflow-auto flex flex-col scrollbar-gutter">
          <div className="pb-3">
            <MaterialTotalTable />
          </div>
          <ServiceTotalTable />
        </div>
        <div className="flex h-[calc(58%)] overflow-auto z-40 scrollbar-gutter">
          <PriceTable />
        </div>
      </div>
      <div className="grid-span-1 h-[calc(100vh-13rem)] overflow-auto ml-2 z-50">
        <ProcessTable />
        <ServiceTable />
        <NRETable />
      </div>
    </div>

 */
