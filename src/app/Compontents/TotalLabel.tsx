import { HoverCard } from "@mantine/core";
import { currencySelectorAtom } from "Library/Atoms/FrontPageAtoms";
import { useAtom } from "jotai";
import { IconInfoSquareFilled } from "@tabler/icons-react";
import React from "react";

const totalClassName =
  "my-auto text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-primary text-left ";

interface TotalLabelInterface {
  title: string;
  total: number;
  hoverText: string;
  USDSelector?: string;
}

export default function TotalLabel({
  title,
  total,
  hoverText,
  USDSelector,
}: TotalLabelInterface) {
  const [selector] = useAtom(currencySelectorAtom);
  return (
    <div className="flex flex-grow">
      <label
        className={
          totalClassName + "basis-1/2 md:basis-2/3 lg:basis-2/3 xl:basis-1/4"
        }
      >
        {title}:
      </label>
      {USDSelector ? (
        <label
          className={
            totalClassName + "basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
          }
        >
          ${total.toFixed(2) + " USD"}
        </label>
      ) : (
        <label
          className={
            totalClassName + "basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
          }
        >
          ${total.toFixed(2) + " " + selector}
        </label>
      )}
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
