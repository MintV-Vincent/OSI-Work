import { Box, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperCaseString } from "Functions/StringFunction";
import React from "react";
import { createData } from "Functions/GetFunction/Create/MapCreate";
import { createCode } from "Functions/SelectCodeCreate";
import { addItem } from "Functions/SortArray";
import {
  codeAtom,
  customerAtom,
  customerRowAtom,
} from "app/Compontents/Tables/FrontTable";
import { useAtom } from "jotai";
import TextInputForm from "./TextInputForm";

interface AddCustomerInterface {
  handleClick: any;
}

export default function AddCustomerForm({ handleClick }: AddCustomerInterface) {
  const [, setCustomer] = useAtom(customerAtom);
  const [, setCode] = useAtom(codeAtom);
  const [customerRow] = useAtom(customerRowAtom);
  const form = useForm<{
    customer: string;
  }>({
    initialValues: { customer: "" },
    validate: (values) => ({
      customer: values.customer.length < 1 ? "Invalid Customer" : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          if (form && values.customer != "") {
            const code: string = createCode(customerRow);
            const itemAdded: number = addItem(
              customerRow,
              createData(upperCaseString(values.customer), code)
            );
            if (itemAdded === 0) {
              setCode(code);
              setCustomer(upperCaseString(values.customer));
              handleClick();
            }
            values.customer = "";
          }
        })}
      >
        <TextInputForm form={form} text="Customer" />
        <Group position="right" mt="md">
          <Button type="submit" className="">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

/*
export default function AddCustomerForm({ handleClick }: AddCustomerInterface) {
  const [, setCustomer] = useAtom(customerAtom);
  const [, setCode] = useAtom(codeAtom);
  const [customerRow] = useAtom(customerRowAtom);
  const form = useForm<{
    customer: string;
  }>({
    initialValues: { customer: "" },
    validate: (values) => ({
      customer: values.customer.length < 1 ? "Invalid Customer" : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          if (form && values.customer != "") {
            const code: string = createCode(customerRow);
            const itemAdded: number = addItem(
              customerRow,
              createData(upperCaseString(values.customer), code)
            );
            if (itemAdded === 0) {
              SuccessfulNotification({
                title: "Customer Added",
                message: code,
              });
              setCode(code);
              setCustomer(upperCaseString(values.customer));
              handleClick();
            } else {
              NotSuccessfulNotification({
                title: "Customer Not Added",
                message: "This customer already exist!",
              });
            }
            values.customer = "";
          }
        })}
      >
        <TextInputForm form={form} text="Customer" />
        <Group position="right" mt="md">
          <Button type="submit" className="">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

*/
