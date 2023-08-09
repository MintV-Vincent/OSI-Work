"use client";
import { Button } from "@mantine/core";
import { AddModal } from "app/Compontents/AddModal";
import { PriceTable } from "app/Compontents/Tables/PriceTable";
import React, { Suspense, lazy, useState } from "react";

const AddSupplierForm = lazy(
  () => import("app/Compontents/Forms/AddSupplierForm")
);

export default function page() {
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      <PriceTable customString={"Code"} />
      <div className="p-10">
        <AddModal
          title={"Add Material"}
          form={
            <Suspense>
              <AddSupplierForm handleClick={handleClick} />
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
