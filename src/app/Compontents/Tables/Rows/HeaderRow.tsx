import React, { memo } from "react";

interface HeaderRowInterface {
  columns: string[];
  titles: string[];
}

const HeaderRow = memo(function HeaderRow({
  columns,
  titles,
}: HeaderRowInterface) {
  return (
    <thead className={"bg-light"}>
      <tr>
        {columns.map((title: string, index: number) => (
          <td
            className={
              columns[index] +
              "text-md font-semibold py-1 px-3 text-primary whitespace-nowrap overflow-hidden "
            }
            key={title + " title" + index}
          >
            {titles[index]}
          </td>
        ))}
      </tr>
    </thead>
  );
});
export default HeaderRow;
