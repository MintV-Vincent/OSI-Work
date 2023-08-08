import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useState } from "react";
interface TextInputInterface {
  form: UseFormReturnType<any>;
}

export default function ModalForm({ form }: TextInputInterface) {
  const [data, setData] = useState([
    { value: "exchange", label: "Exchange Rate" },
    { value: "freight", label: "Freight" },
  ]);

  return (
    <div>
      <MultiSelect
        label="Formula"
        data={data}
        description={
          "Multiply selected values, (Price * Amount) already included."
        }
        placeholder="Select items"
        searchable
        creatable
        getCreateLabel={(query: any) => `+ Create ${query}`}
        onCreate={(query: any) => {
          if (!isNaN(query)) {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }
        }}
        {...form.getInputProps("Formula".toLocaleLowerCase())}
      />
      <TextInput
        className="py-2"
        required
        label="Material"
        placeholder="Material"
        {...form.getInputProps("material")}
      />
      <NumberInput
        className="py-2"
        required
        hideControls
        label="Price"
        placeholder="Price"
        {...form.getInputProps("price")}
      />
      <Group position="right" mt="md">
        <Button type="submit" className="">
          Submit
        </Button>
      </Group>
    </div>
  );
}
