import { Button } from "@mantine/core";
import { createMaterialRow } from "Functions/Create/MapCreate";
import React, { memo } from "react";

interface totalRow {
  text: string;
  total: number;
  columns: number;
  materialRows: any;
  setMaterialRow: any;
}

const TotalRows = memo(function TotalRows({
  text,
  total,
  columns,
  materialRows,
  setMaterialRow,
}: totalRow) {
  let array: number[] = [];
  for (let i: number = 3; i < columns; i++) {
    array.push(i);
  }

  const sharedClass: string = "";

  return (
    <tr key={text + " row"}>
      <td>
        <Button
          size="xs"
          onClick={(e) => {
            const newRow = createMaterialRow(materialRows.length);
            setMaterialRow([...materialRows, newRow]);
          }}
        >
          Add Row
        </Button>
      </td>
      {array.map((i: number) => (
        <td className={sharedClass} key={"total filler column" + i}></td>
      ))}
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {text}
      </td>
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {total.toFixed(2)}
      </td>
    </tr>
  );
});

export default TotalRows;
