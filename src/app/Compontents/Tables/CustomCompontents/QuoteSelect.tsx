import { ActionIcon, Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import createQuote from "Functions/Create/CreateUniqueCodes";
import { quoteAtom } from "Library/Atoms/AtomStorage";
import { quoteTableAtom } from "Library/Atoms/TableAtoms";
import { useAtom } from "jotai";
import React from "react";

export default function QuoteSelect() {
  const [quoteData, setQuote] = useAtom(quoteTableAtom);
  const [quoteState, setQuoteState] = useAtom<string | null>(quoteAtom);
  return (
    <Select
      size={"xs"}
      value={quoteState}
      onChange={setQuoteState}
      data={quoteData}
      rightSection={
        <ActionIcon
          title="Add Customer"
          variant="filled"
          radius="xs"
          color="blue"
          onClick={(e) => createQuote(quoteData, setQuote)}
        >
          <IconPlus />
        </ActionIcon>
      }
    />
  );
}
