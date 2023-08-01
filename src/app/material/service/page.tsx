"use client";
import { qualityTotalAtom } from "Library/Atoms/AtomStorage";
import { checkValuesTable } from "Library/CheckValues";
import { checkTableTitle } from "Library/Headers";
import { CheckTable } from "app/Compontents/Tables/CheckTable";
import { useAtom } from "jotai";
import React from "react";

export default function page() {
  const [, setQual] = useAtom(qualityTotalAtom);
  return (
    <CheckTable
      titles={checkTableTitle}
      values={checkValuesTable}
      setAtom={setQual}
    />
  );
}
