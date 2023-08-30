import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { createService } from "Functions/Create/MapCreate";
import ModalForm from "app/Compontents/Forms/ModalForm";
import { servicesMap } from "Library/Types";
import { testCreateFormula } from "Functions/Create/CreateFormula";

interface AddServiceInterface {
  handleClick: () => void;
  setData: any;
  data: servicesMap[];
}

export default function AddServiceForm({
  handleClick,
  setData,
  data,
}: AddServiceInterface) {
  const form = useForm<{
    formula: string;
    material: string;
    price: number | undefined;
  }>({
    initialValues: {
      formula: "price * amount ",
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
            const newData = createService(
              data.length,
              0,
              values.formula,
              values.material,
              values.price,
              0
            );
            setData([...data, newData]);
            values.material = "";
            values.formula = "";
            values.price = undefined;
            handleClick();
          }
        })}
      >
        <ModalForm form={form} currency="CAD" />
      </form>
    </Box>
  );
}
