import { Button, NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import SubmitHover from "./HoverInfo/SubmitHover";

interface TextInputInterface {
  form: UseFormReturnType<any>;
  currency: string;
}

export default function ModalForm({ form, currency }: TextInputInterface) {
  return (
    <div className="w-full">
      <TextInput
        className="py-2"
        required
        label="Material"
        placeholder="Material"
        {...form.getInputProps("material")}
      />
      <NumberInput
        className="py-2"
        precision={2}
        required
        hideControls
        label={"Price (" + { currency } + "$)"}
        placeholder="Price"
        {...form.getInputProps("price")}
      />
      <div className="flex flex-col w-full">
        <TextInput
          required
          label="Formula"
          {...form.getInputProps("formula")}
        />
      </div>
      <div className="pt-3 flex justify-end">
        <SubmitHover />
        <Button type="submit" className="">
          Submit
        </Button>
      </div>
    </div>
  );
}
