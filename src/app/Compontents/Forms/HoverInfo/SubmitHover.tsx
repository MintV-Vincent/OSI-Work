import { HoverCard } from "@mantine/core";
import { IconInfoSquareFilled } from "@tabler/icons-react";
import React from "react";

export default function SubmitHover() {
  return (
    <HoverCard
      position="top"
      shadow="md"
      withArrow
      openDelay={200}
      closeDelay={400}
    >
      <HoverCard.Target>
        <IconInfoSquareFilled className="mx-5 my-auto" />
      </HoverCard.Target>
      <HoverCard.Dropdown>
        This does not add items into the data base.
        <br />
        Need Administrative power to add new items.
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
