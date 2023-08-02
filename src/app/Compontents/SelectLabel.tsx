import { ActionIcon, Select } from "@mantine/core";
import { createData } from "Functions/Create/MapCreate";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { AddModal } from "./AddModal";
import { createCode } from "Functions/SelectCodeCreate";
import { getCode } from "Functions/GetFunction/GetCode";
import { useAtom } from "jotai";
import SortArray, { addItem } from "Functions/SortArray";
import { upperCaseString } from "Functions/StringFunction";
import { IconPlus } from "@tabler/icons-react";
import {
  codeAtom,
  customerAtom,
  customerRowAtom,
} from "Library/Atoms/FrontPageAtoms";

const AddCustomerForm = lazy(() => import("app/Compontents/Forms/AddCustomer"));

export default function SelectLabel() {
  useEffect(() => {
    //Use effect should be up here, it should only sort on load, not every render.
    //When inserting a new element, selectCodeCreate should be sorting. Moving this down will cause multiple useless sorts.
    SortArray(dataRow, setDataRow);
  }, []);

  const [selector, setSelector] = useAtom(customerAtom);
  const [dataRow, setDataRow] = useAtom(customerRowAtom);
  const [text, setText] = useAtom(codeAtom);

  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return [
    <Select
      allowDeselect
      searchValue={selector}
      onSearchChange={(e) => {
        if (e != "") {
          setSelector(e);
          getCode(selector, dataRow, setText);
        }
      }}
      data={dataRow}
      searchable
      clearable
      creatable
      rightSection={
        <AddModal
          title={"Add Customer"}
          form={
            <Suspense>
              <AddCustomerForm handleClick={handleClick} />
            </Suspense>
          }
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
