import React, { useState } from "react";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import { AddModal } from "app/Compontents/AddModal";
import { Button } from "@mantine/core";
import AddSupplierForm from "app/Compontents/Forms/AddSupplierForm";
import getAtom from "Functions/GetFunction/GetAtom";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";

interface QuoteTableInterface {
  title: string;
  code: string;
}

export default function QuoteTable({ title, code }: QuoteTableInterface) {
  const [status, setState] = useState(false);
  const { supplier: database, setData, setTotal } = getAtom({ title });
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      <PriceTable customString={code} database={database} setTotal={setTotal} />
      <div className="p-10">
        <AddModal
          title={"Add Material"}
          form={
            <AddSupplierForm setMaterial={setData} handleClick={handleClick} />
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
