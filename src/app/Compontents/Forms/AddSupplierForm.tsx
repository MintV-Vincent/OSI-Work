import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { materialRowMap } from "Library/Types";
import { createMaterialRow } from "Functions/Create/MapCreate";
import TextInputForm from "./TextInputForm";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";

interface AddButtonInterface {
  setMaterial: any;
  handleClick: any;
}

export default function AddSupplierForm({
  setMaterial,
  handleClick,
}: AddButtonInterface) {
  const [data, setData] = useAtom(materialTableAtom);
  const form = useForm<{
    custom: string;
    formula: string;
    material: string;
    price: number | undefined;
  }>({
    initialValues: {
      custom: "",
      formula: "",
      material: "",
      price: undefined,
    },
    validate: (values) => ({
      custom: values.custom === "" ? "Code is required" : null,
      formula: values.formula === "" ? "Formula is required" : null,
      material: values.material.length < 1 ? "Invalid Material" : null,
      price:
        values.price === undefined
          ? "Price is required"
          : values.price < 0
          ? "Positive Numbers Only"
          : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          if (
            form &&
            values.custom != "" &&
            values.formula != "" &&
            values.material != "" &&
            values.price != undefined
          ) {
            setMaterial(
              values.material.toString(),
              values.material.toString(),
              values.price,
              values.formula.toString(),
              values.custom.toString()
            );
            const newRow = createMaterialRow(data.length);
            setData([...data, newRow]);

            values.custom = "";
            values.material = "";
            values.formula = "";
            values.price = undefined;
            handleClick();
          }
        })}
      >
        <TextInputForm form={form} text={"Custom"} />
        <TextInputForm form={form} text={"Formula"} />
        <TextInputForm form={form} text={"Material"} />
        <NumberInput
          required
          mt="sm"
          label="Price"
          placeholder="Price"
          {...form.getInputProps("price")}
        />
        <Group position="right" mt="md">
          <Button type="submit" className="">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
