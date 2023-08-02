import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import React from "react";
import { createMaterialRow } from "Functions/Create/MapCreate";
import { filmAtom } from "Library/Atoms/AtomStorage";
import { processTableAtom } from "Library/Atoms/TableAtoms";
import ModalForm from "app/Compontents/Forms/ModalForm";

interface AddButtonInterface {
  handleClick: any;
}

export default function AddMaterialForm({ handleClick }: AddButtonInterface) {
  const [data, setData] = useAtom(processTableAtom);
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
        <ModalForm form={form} />
      </form>
    </Box>
  );
}
