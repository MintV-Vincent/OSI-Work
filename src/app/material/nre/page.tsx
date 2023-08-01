"use client";
import { NRETitle } from "Library/Headers";
import { CustomCheckTable } from "app/Compontents/Tables/CustomCheckTable";
import React from "react";

export default function page() {
  return <CustomCheckTable titles={NRETitle} />;
}
