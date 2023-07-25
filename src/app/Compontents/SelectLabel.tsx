import { ActionIcon, Select } from "@mantine/core";
import { createData } from "Functions/Create/MapCreate";
import React, { useEffect, useState } from "react";
import { AddModal } from "./AddModal";
import { createCode } from "Functions/SelectCodeCreate";
import { getCode } from "Functions/GetFunction/GetCode";
import { PrimitiveAtom, useAtom } from "jotai";
import SortArray, { addItem } from "Functions/SortArray";
import { upperCaseString } from "Functions/StringFunction";
import { dictionaryMap } from "Interface/Types";
import AddCustomerForm from "./Forms/AddCustomer";
import { IconPlus } from "@tabler/icons-react";

interface SelectLabelInterface {
  select: PrimitiveAtom<string>;
  label: PrimitiveAtom<string>;
  dataSet: PrimitiveAtom<dictionaryMap[]>;
}

export default function SelectLabel({
  select,
  label,
  dataSet,
}: SelectLabelInterface) {
  useEffect(() => {
    //Use effect should be up here, it should only sort on load, not every render.
    //When inserting a new element, selectCodeCreate should be sorting. Moving this down will cause multiple useless sorts.
    SortArray(dataRow, setDataRow);
  }, []);

  const [selector, setSelector] = useAtom(select);
  const [dataRow, setDataRow] = useAtom(dataSet);
  const [text, setText] = useAtom(label);
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return [
    <Select
      allowDeselect
      searchValue={selector}
      onSearchChange={(e) => {
        setSelector(e);
        getCode(selector, dataRow, setText);
      }}
      data={dataRow}
      searchable
      clearable
      creatable
      rightSection={
        <AddModal
          title={"Add Customer"}
          form={<AddCustomerForm handleClick={handleClick} />}
          button={
            <ActionIcon
              title="Add Customer"
              variant="filled"
              radius="xl"
              color="blue"
              onClick={() => handleClick()}
            >
              <IconPlus />
            </ActionIcon>
          }
          status={status}
          handleClick={handleClick}
        />
      }
      getCreateLabel={(query: string) => `+ Create ${query}`}
      onCreate={(query: string) => {
        const newCode: string = createCode(dataRow);
        addItem(dataRow, createData(upperCaseString(query), newCode));
        setText(text);
        getCode(selector, dataRow, setText);

        return newCode;
      }}
    />,
    <label>{text}</label>,
  ];
}
