import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
interface TextInputInterface {
  form: UseFormReturnType<any>;
}

export default function ModalForm({ form }: TextInputInterface) {
  return (
    <div>
      <TextInput
        className="py-2"
        required
        label={"Formula"}
        placeholder={"Formula"}
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
