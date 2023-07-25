import React, { memo } from "react";

interface HeaderRowInterface {
  columns: string[];
  titles: string[];
}

const HeaderRow = memo(function HeaderRow({
  columns,
  titles,
}: HeaderRowInterface) {
  console.log(columns);
  return (
    <thead className={"bg-light"}>
      <tr>
        {titles.map((title: string, index: number) => (
          <td
            className={
              columns[index] + " text-xl font-semibold py-2 px-3 text-primary"
            }
            key={title + " title" + index}
          >
            {title}
          </td>
        ))}
      </tr>
    </thead>
  );
});
export default HeaderRow;
