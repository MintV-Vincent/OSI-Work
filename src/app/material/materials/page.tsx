"use client";
import { materialsTitle } from "Library/Headers";
import QuoteTable from "app/Tabs/SalesTables/QuoteTab";
import React from "react";

export default function page() {
  return <QuoteTable title={materialsTitle} code={"Code"} />;
}
