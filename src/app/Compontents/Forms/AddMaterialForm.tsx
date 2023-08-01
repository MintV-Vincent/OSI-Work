import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import React from "react";
import { materialRowMap } from "Library/Types";
import { createMaterialRow } from "Functions/Create/MapCreate";
import TextInputForm from "./TextInputForm";
import { filmAtom } from "Library/Atoms/AtomStorage";

interface AddButtonInterface {
  handleClick: any;
  data: materialRowMap[];
  setData: React.Dispatch<React.SetStateAction<materialRowMap[]>>;
}

export default function AddMaterialForm({
  handleClick,
  data,
  setData,
}: AddButtonInterface) {
  const [, setMaterial] = useAtom(filmAtom);
  const form = useForm<{
    material: string;
    formula: string;
    price: number | undefined;
  }>({
    initialValues: { material: "", formula: "", price: undefined },
    validate: (values) => ({
      material: values.material.length < 1 ? "Invalid Material" : null,
      formula: values.formula === "" ? "Code is required" : null,
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
            values.formula != "" &&
            values.price != undefined &&
            values.material != ""
          ) {
            setMaterial(
              values.material,
              values.material,
              values.price,
              values.formula
            );
            const newRow = createMaterialRow(data.length);
            setData([...data, newRow]);

            values.material = "";
            values.formula = "";
            values.price = undefined;
            handleClick();
          }
        })}
      >
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
