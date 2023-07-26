import React, { useState } from "react";
import { createTable } from "Functions/Create/MapCreate";
import { materialRowMap } from "Interface/Types";
import { ProcessTable } from "Compontents/Tables/ProcessTable";
import getAtom from "Hooks/GetAtom";
import { AddModal } from "Compontents/AddModal";
import AddMaterialForm from "Compontents/Forms/AddMaterialForm";
import { Button } from "@mantine/core";

interface QuoteTableInterface {
  custom: string;
  title: string;
}

export default function FilmTable({ custom, title }: QuoteTableInterface) {
  const [rowsAtom, useRowsAtom] = useState<materialRowMap[]>(createTable(6));
  const { supplier, setTotal } = getAtom({ title });
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      {" "}
      <ProcessTable
        data={rowsAtom}
        custom={custom}
        rowsAtom={rowsAtom}
        useRowsAtom={useRowsAtom}
        setTotal={setTotal}
        title={title}
      />
      <div className="p-10">
        <AddModal
          title={"Add Material"}
          form={
            <AddMaterialForm
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