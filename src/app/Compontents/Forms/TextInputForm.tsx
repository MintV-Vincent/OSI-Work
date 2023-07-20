import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

interface TextInputInterface {
  form: UseFormReturnType<any>;
  text: string;
}

export default function TextInputForm({
  form,
  text,
}: TextInputInterface): React.JSX.Element {
  return (
    <TextInput
      required
      label={text}
      placeholder={text}
      {...form.getInputProps(text.toLocaleLowerCase())}
    />
  );
}
