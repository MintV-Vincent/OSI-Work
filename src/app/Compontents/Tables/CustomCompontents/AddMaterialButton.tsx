import { Button } from "@mantine/core";
import { AddModal } from "app/Compontents/AddModal";
import React, { Suspense, lazy, useState } from "react";

const AddSupplierForm = lazy(
  () => import("app/Compontents/Forms/AddSupplierForm")
);

export function AddMaterialButton({}) {
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <AddModal
      title={"Add Material"}
      form={
        <Suspense>
          <AddSupplierForm handleClick={handleClick} />
        </Suspense>
      }
      button={
        <Button size="xs" onClick={() => handleClick()} className="z-50 w-28">
          Add Material
        </Button>
      }
      status={status}
      handleClick={handleClick}
    />
  );
}
