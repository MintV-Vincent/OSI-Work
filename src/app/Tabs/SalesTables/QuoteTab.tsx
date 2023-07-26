import React, { useState } from "react";
import { PriceTable } from "Compontents/Tables/PriceTable";
import { createTable } from "Functions/Create/MapCreate";
import { materialRowMap } from "Interface/Types";
import { AddModal } from "Compontents/AddModal";
import { Button } from "@mantine/core";
import AddSupplierForm from "Compontents/Forms/AddSupplierForm";
import getAtom from "Hooks/GetAtom";

interface QuoteTableInterface {
  title: string;
  code: string;
}

export default function QuoteTable({ title, code }: QuoteTableInterface) {
  const [rowsAtom, useRowsAtom] = useState<materialRowMap[]>(createTable(6));
  const [status, setState] = useState(false);
  const { supplier: database, setData, setTotal } = getAtom({ title });
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      <PriceTable
        customString={code}
        rowsAtom={rowsAtom}
        useRowsAtom={useRowsAtom}
        database={database}
        setTotal={setTotal}
      />
      <div className="p-10">
        <AddModal
          title={"Add Material"}
          form={
            <AddSupplierForm
              setMaterial={setData}
              handleClick={handleClick}
              data={rowsAtom}
              setData={useRowsAtom}
            />
          }
          button={
            <Button onClick={() => handleClick()} className="z-50">
              Add Material
            </Button>
          }
          status={status}
          handleClick={handleClick}
        />
      </div>
    </>
  );
}