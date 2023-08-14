import { Button } from "@mantine/core";
import React from "react";

interface addService {
  createRow: any;
  dataRow: any;
  setDataRow: any;
}

export default function AddMaterialButton({
  createRow,
  dataRow,
  setDataRow,
}: addService) {
  return (
    <Button
      size="xs"
      onClick={(e) => {
        const newRow = createRow(dataRow.length);
        setDataRow([...dataRow, newRow]);
      }}
    >
      Add Row
    </Button>
  );
}
