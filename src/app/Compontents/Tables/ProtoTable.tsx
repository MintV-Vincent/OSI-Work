import { Select, Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { protoHeader } from "Library/Headers";
import { useState } from "react";
import { dictionaryMap } from "Library/Types";
import { createData } from "Functions/Create/MapCreate";

export function ProtoTable() {
  // This table consist of only two columns. The data points should be of type row map
  const [technology, setTechnology] = useState<string>("1");
  const technologyRow: dictionaryMap[] = [
    createData("1", "1"),
    createData("2", "2"),
    createData("3", "3"),
    createData("4", "4"),
    createData("5", "5"),
  ];

  return (
    <Table miw={"w-1/3"} striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "w-1/6",
          "text-left w-1/6",
          "text-center w-1/2",
          "text-left w-1/6",
        ]}
        titles={protoHeader}
      />
      <tbody>
        <tr>
          <td className="h-12 text-right  w-1/6">
            <Select
              searchable
              searchValue={technology}
              defaultValue={"1"}
              onSearchChange={setTechnology}
              data={technologyRow}
            />
          </td>
          <td className="h-12 text-right  w-1/6">
            <Select
              searchable
              searchValue={technology}
              defaultValue={"1"}
              onSearchChange={setTechnology}
              data={technologyRow}
            />
          </td>
          <td className="h-12 text-right  w-1/2">
            <Select
              searchable
              searchValue={technology}
              defaultValue={"1"}
              onSearchChange={setTechnology}
              data={technologyRow}
            />
          </td>
          <td className="h-12 text-right  w-1/6">
            <Select
              searchable
              searchValue={technology}
              defaultValue={"1"}
              onSearchChange={setTechnology}
              data={technologyRow}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
