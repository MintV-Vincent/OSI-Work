import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { createMaterialRow } from "Functions/Create/MapCreate";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialAtom } from "Library/Atoms/AtomStorage";
import ModalForm from "./ModalForm";

interface AddButtonInterface {
  handleClick: any;
}

export default function AddSupplierForm({ handleClick }: AddButtonInterface) {
  const [, setMaterial] = useAtom(materialAtom);
  const [data, setData] = useAtom(materialTableAtom);
  const form = useForm<{
    formula: string[];
    material: string;
    price: number | undefined;
  }>({
    initialValues: {
      formula: ["price", " *", " amount "],
      material: "",
      price: undefined,
    },
    validate: (values) => ({
      formula:
        values.formula.length < 1
          ? "Formula is required"
          : values.formula.length % 2 === 0
          ? "Ending in operation error"
          : null,
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
            let newFormula: string = "cost ";
            for (let i: number = 3; i < values.formula.length; i++) {
              newFormula += values.formula[i];
            }
            console.log(newFormula);
            setMaterial(
              values.material.toString(),
              values.material.toString(),
              values.price,
              newFormula.toString(),
              "2"
            );
            const newRow = createMaterialRow(data.length);
            setData([...data, newRow]);

            values.material = "";
            values.formula = ["price", "*", "amount"];
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
