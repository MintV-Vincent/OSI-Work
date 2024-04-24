"use client";
import React from "react";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import NRETable from "app/Compontents/Tables/NRETable";

export default function page() {
  return (
    <div className="grid grid-cols-2 h-full pt-5">
      <div className="grid-span-1 mr-2 h-[calc(100vh-12rem)] flex flex-col justify-between">
        <NRETable />
      </div>
      <div className="grid-span-1 h-[calc(100vh-12rem)] overflow-auto ml-2 z-50">
        <ProcessTable />
      </div>
    </div>
  );
}
