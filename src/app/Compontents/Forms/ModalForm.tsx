import { Button, Group, NumberInput, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconBackspaceFilled } from "@tabler/icons-react";
import React, { useState } from "react";

interface TextInputInterface {
  form: UseFormReturnType<any>;
}

export default function ModalForm({ form }: TextInputInterface) {
  const [value, setValue] = useState<number | "">(0);
  const [disabled, setDisabled] = useState(false);

  const operation = ["- ", "+ ", "/ ", "* "];
  const constantButton = ["exchange ", "yeild ", "freight "];

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
        label="Price (CAD$)"
        placeholder="Price"
        {...form.getInputProps("price")}
      />
      <div className="flex flex-col w-full">
        <Textarea
          required
          label="Formula"
          readOnly
          autosize
          {...form.getInputProps("formula")}
        />
        <div className="flex justify-between pt-3">
          {operation.map((row: string, index: number) => (
            <Button
              disabled={disabled}
              key={row + index}
              onClick={(e) => {
                setDisabled(!disabled);
                form.setFieldValue("formula", form.values.formula + row);
              }}
            >
              {row}
            </Button>
          ))}
          <Button
            onClick={(e) => {
              if (form.values.formula.split(" ").length > 4) {
                const formulaArray = form.values.formula.split(" ");
                const newString = formulaArray.slice(
                  0,
                  formulaArray.length - 2
                );
                const returnString = newString.join(" ");
                setDisabled(!disabled);
                form.setFieldValue("formula", returnString + " ");
              }
            }}
            rightIcon={<IconBackspaceFilled />}
          >
            Del
          </Button>
        </div>
        <div className="flex justify-between pt-3">
          {constantButton.map((row: string, index: number) => (
            <Button
              disabled={!disabled}
              key={row + index}
              onClick={(e) => {
                setDisabled(!disabled);
                form.setFieldValue("formula", form.values.formula + row);
              }}
            >
              {row}
            </Button>
          ))}
        </div>
        <div className="flex justify-between pt-3">
          <label className="m-auto">Value: </label>
          <NumberInput
            className="px-5"
            hideControls
            precision={4}
            value={value}
            onChange={setValue}
          />
          <Button
            disabled={!disabled}
            onClick={(e) => {
              const formulaArray = form.values.formula.split(" ");
              if (
                formulaArray[formulaArray.length - 2] === "/" &&
                value === 0
              ) {
              } else {
                setDisabled(!disabled);
                form.setFieldValue(
                  "formula",
                  form.values.formula + value + " "
                );
              }
            }}
          >
            Enter
          </Button>
        </div>
      </div>
      <Group position="right" mt="md">
        <Button type="submit" className="">
          Submit
        </Button>
      </Group>
    </div>
  );
}
