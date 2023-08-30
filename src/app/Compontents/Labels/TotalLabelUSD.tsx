import { HoverCard } from "@mantine/core";
import { IconInfoSquareFilled } from "@tabler/icons-react";
import React from "react";

const totalClassName =
  "my-auto text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-primary text-left ";

interface TotalLabelInterface {
  title: string;
  total: number;
  hoverText: string;
}

export default function TotalLabelUSD({
  title,
  total,
  hoverText,
}: TotalLabelInterface) {
  return (
    <div className="flex flex-row">
      <label
        className={
          totalClassName + "basis-1/2 md:basis-2/3 lg:basis-2/3 xl:basis-1/3"
        }
      >
        {title}:
      </label>
      <label className={totalClassName + "flex-grow"}>
        ${total.toFixed(2) + " USD"}
      </label>

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
        <HoverCard.Dropdown>{hoverText}</HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
}
