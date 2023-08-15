import { Button } from "@mantine/core";
import { servicesMap } from "Library/Types";
import { AddModal } from "app/Compontents/AddModal";
import React, { Suspense, lazy, useState } from "react";

const AddServiceForm = lazy(
  () => import("app/Compontents/Forms/AddServiceForm")
);

interface addService {
  dataRow: servicesMap[];
  setDataRow: any;
  title: string;
}

export default function AddServiceButton({
  setDataRow,
  dataRow,
  title,
}: addService) {
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <AddModal
      title={title}
      form={
        <Suspense>
          <AddServiceForm
            handleClick={handleClick}
            setData={setDataRow}
            data={dataRow}
          />
        </Suspense>
      }
      button={
        <Button onClick={() => handleClick()} className="z-50" size="xs">
          Add Row
        </Button>
      }
      status={status}
      handleClick={handleClick}
    />
  );
}
