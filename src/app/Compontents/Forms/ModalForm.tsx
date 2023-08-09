import { Button, Group, NumberInput, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconBackspaceFilled } from "@tabler/icons-react";
import React, { useState } from "react";

interface TextInputInterface {
  form: UseFormReturnType<any>;
}

function formulaError(formula: string[]) {
  if (formula.length < 1) {
    return "Formula is required";
  } else if (formula.length % 2 === 0) {
    return "Can not end in an operation";
  }
  return false;
}

export default function ModalForm({ form }: TextInputInterface) {
  const [value, setValue] = useState<number | "">(0);
  const [disabled, setDisabled] = useState(false);

  let currentFormula = "";
  for (let i: number = 0; i < form.values.formula.length; i++) {
    currentFormula += form.values.formula[i] + " ";
  }

  const operation = ["- ", "+ ", "/ ", "* "];
  const constantButton = ["exchange rate", "yeild", "freight"];

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <Textarea
          value={currentFormula}
          readOnly
          autosize
          error={formulaError(form.values.formula)}
        />
        <div className="flex justify-between pt-3">
          {operation.map((row: string, index: number) => (
            <Button
              disabled={disabled}
              key={row + index}
              onClick={(e) => {
                setDisabled(!disabled);
                form.insertListItem("formula", row);
              }}
            >
              {row}
            </Button>
          ))}
          <Button
            onClick={(e) => {
              if (form.values.formula.length > 3) {
                setDisabled(!disabled);
                form.removeListItem("formula", form.values.formula.length - 1);
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
                form.insertListItem("formula", row);
              }}
            >
              {row}
            </Button>
          ))}
        </div>
        <div className="flex justify-between pt-3">
          <label className="m-auto">Value: </label>
          <NumberInput
            hideControls
            precision={4}
            value={value}
            onChange={setValue}
          />
          <Button
            disabled={!disabled}
            onClick={(e) => {
              if (
                form.values.formula[form.values.formula.length - 1] === "/ " &&
                value === 0
              ) {
              } else {
                form.insertListItem("formula", value);
                setDisabled(!disabled);
              }
            }}
          >
            Enter
          </Button>
        </div>
      </div>
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
        label="Price ($CAD)"
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
