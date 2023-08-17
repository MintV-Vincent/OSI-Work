import React from "react";

interface totalRow {
  text: string;
  total: number;
  columns: number;
  button: JSX.Element[];
}

const TotalRows = function TotalRows({
  text,
  total,
  columns,
  button,
}: totalRow) {
  let array: number[] = [];
  for (let i: number = 2 + button.length; i < columns; i++) {
    array.push(i);
  }

  const sharedClass: string = "";

  return (
    <tr key={text + " row"}>
      {button.map((newButton: JSX.Element, i: number) => (
        <td key={"button" + i}>
          <div className="pl-3 flex justify-start">{newButton}</div>
        </td>
      ))}
      {array.map((i: number) => (
        <td className={sharedClass} key={"total filler column" + i} />
      ))}
      <td className={sharedClass + " px-3 font-semibold text-right text-xl"}>
        {text}
      </td>
      <td className={sharedClass + " px-3 font-semibold text-right text-xl"}>
        {total.toFixed(2)}
      </td>
    </tr>
  );
};

export default TotalRows;
