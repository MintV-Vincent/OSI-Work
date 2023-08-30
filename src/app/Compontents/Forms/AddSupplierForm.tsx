import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { createMaterialRow, createRowPrice } from "Functions/Create/MapCreate";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialAtom } from "Library/Atoms/AtomStorage";
import ModalForm from "app/Compontents/Forms/ModalForm";
import { rowMapPrice } from "Library/Types";
import { testCreateFormula } from "Functions/Create/CreateFormula";

interface AddButtonInterface {
  handleClick: () => void;
}

export default function AddSupplierForm({ handleClick }: AddButtonInterface) {
  const [, setMaterial] = useAtom(materialAtom);
  const [data, setData] = useAtom(materialTableAtom);
  const form = useForm<{
    formula: string;
    material: string;
    price: number | undefined;
  }>({
    initialValues: {
      formula: "price * amount * exchange * 1.05",
      material: "",
      price: undefined,
    },
    validate: (values) => ({
      formula:
        values.formula.length < 1
          ? "Formula is required"
          : testCreateFormula(values.formula)
          ? null
          : "Wrong Format",
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
            values.formula.length != 0 &&
            values.material != "" &&
            values.price != undefined
          ) {
            const newItem: rowMapPrice = createRowPrice(
              values.material.toString(),
              values.material.toString() + "Added" + values.price.toString(),
              values.formula.toString(),
              "2",
              "Added",
              values.price
            );
            setMaterial(
              values.material.toString(),
              values.material.toString(),
              values.price,
              values.formula,
              "2",
              "Added"
            );
            const newRow = createMaterialRow(data.length, newItem, "Added");
            setData([...data, newRow]);

            values.material = "";
            values.formula = "";
            values.price = undefined;
            handleClick();
          }
        })}
      >
        <ModalForm form={form} currency="USD" />
      </form>
    </Box>
  );
}
