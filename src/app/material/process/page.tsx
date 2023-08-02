"use client";
import { Button } from "@mantine/core";
import { AddModal } from "app/Compontents/AddModal";
import { ProcessTable } from "app/Compontents/Tables/ProcessTable";
import React, { Suspense, lazy, useState } from "react";

const AddMaterialForm = lazy(
  () => import("app/Compontents/Forms/AddMaterialForm")
);

export default function page() {
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      <ProcessTable />
      <div className="p-10">
        <AddModal
          title={"Add Material"}
          form={
            <Suspense>
              <AddMaterialForm handleClick={handleClick} />
            </Suspense>
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
