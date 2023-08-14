import React from "react";

interface totalRow {
  text: string;
  total: number;
  columns: number;
  button: any;
}

const TotalRows = function TotalRows({
  text,
  total,
  columns,
  button,
}: totalRow) {
  let array: number[] = [];
  for (let i: number = 3; i < columns; i++) {
    array.push(i);
  }

  const sharedClass: string = "";

  return (
    <tr key={text + " row"}>
      <td className="flex justify-start">{button}</td>
      {array.map((i: number) => (
        <td className={sharedClass} key={"total filler column" + i} />
      ))}
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {text}
      </td>
      <td className={sharedClass + " font-semibold text-right text-xl"}>
        {total.toFixed(2)}
      </td>
    </tr>
  );
};

export default TotalRows;
