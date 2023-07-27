import React, { memo } from "react";

interface totalRow {
  text: string;
  total: number;
  columns: number;
}

const TotalRows = memo(function TotalRows({ text, total, columns }: totalRow) {
  let array: number[] = [];
  for (let i: number = 2; i < columns; i++) {
    array.push(i);
  }

  const sharedClass = "h-16";

  return (
    <tr key={text + " row"}>
      {array.map((i: number) => (
        <td className={sharedClass} key={"total filler column" + i}></td>
      ))}
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {text}
      </td>
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {Number(total).toFixed(2)}
      </td>
    </tr>
  );
});

export default TotalRows;
