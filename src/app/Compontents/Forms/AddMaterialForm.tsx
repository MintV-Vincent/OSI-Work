import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import React from "react";
import { createMaterialRow } from "Functions/Create/MapCreate";
import { filmAtom } from "Library/Atoms/AtomStorage";
import { processTableAtom } from "Library/Atoms/TableAtoms";
import ModalForm from "./ModalForm";

interface AddButtonInterface {
  handleClick: any;
}

export default function AddMaterialForm({ handleClick }: AddButtonInterface) {
  const [data, setData] = useAtom(processTableAtom);
  const [, setMaterial] = useAtom(filmAtom);
  const form = useForm<{
    material: string;
    formula: string[];
    price: number | undefined;
  }>({
    initialValues: {
      material: "",
      formula: ["price", " *", " amount "],
      price: undefined,
    },
    validate: (values) => ({
      formula: values.formula.length < 1 ? "Formula is required" : null,
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
            values.formula.length > 0 &&
            values.price != undefined &&
            values.material != ""
          ) {
            let newFormula: string = "cost ";
            console.log(values.formula);
            for (let i: number = 0; i < values.formula.length; i++) {
              newFormula += values.formula[i];
              if (i != values.formula.length - 1) {
                newFormula += " * ";
              }
            }
            setMaterial(
              values.material,
              values.material,
              values.price,
              newFormula
            );
            const newRow = createMaterialRow(data.length);
            setData([...data, newRow]);

            values.material = "";
            values.formula = ["price", " *", " amount "];
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
