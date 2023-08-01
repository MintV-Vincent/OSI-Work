"use client";
import { processFilmTitle } from "Library/Headers";
import ProcessTab from "app/Tabs/SalesTables/ProcessTable";
import React from "react";

export default function page() {
  return <ProcessTab custom={""} title={processFilmTitle} />;
}
