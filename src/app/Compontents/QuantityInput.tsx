import { TextInput } from "@mantine/core";
import { qualityAtom } from "Library/Atoms/FrontPageAtoms";
import { useAtom } from "jotai";
import React, { useState } from "react";

export default function QuantityInput() {
  const [value, setValue] = useAtom(qualityAtom);

  return (
    <TextInput
      size="xs"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
