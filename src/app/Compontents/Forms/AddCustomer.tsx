import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperCaseString } from "Functions/StringFunction";
import React from "react";
import { createData } from "Functions/Create/MapCreate";
import { createCode } from "Functions/SelectCodeCreate";
import { addItem } from "Functions/SortArray";
import { useAtom } from "jotai";
import {
  codeAtom,
  customerAtom,
  customerRowAtom,
} from "Library/Atoms/FrontPageAtoms";

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
        <TextInput
          required
          label={"Customer"}
          placeholder={"Customer"}
          {...form.getInputProps("Customer".toLocaleLowerCase())}
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
