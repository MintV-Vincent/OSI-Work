"use client";
import React, { useEffect } from "react";
import { NumberInput } from "@mantine/core";
import { useAtom } from "jotai";
import { TotalTable } from "app/Compontents/Tables/TotalTable";
import { addArrayTotal, newTotal } from "Functions/MathFunctions";
import { IconPercentage, IconHash } from "@tabler/icons-react";
import {
  exchangeRateAtom,
  fullTotalAtom,
  marginAtom,
  totalAtom,
  unitAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";

const sharedTotal: string = "text-xl py-1.5 w-1/4 text-left";

export default function page() {
  const [exchange] = useAtom(exchangeRateAtom);
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [units, setUnit] = useAtom(unitAtom);
  const [total] = useAtom(totalAtom);
  const [fullTotal, setTotal] = useAtom(fullTotalAtom);

  useEffect(() => {
    setTotal(addArrayTotal(total));
  }, [total]);

  return (
    <>
      <TotalTable />

      <div className="flex justify-between pt-10">
        <label className={sharedTotal}>Yeild: </label>
        <label className={sharedTotal}>Margin: </label>
        <label className={sharedTotal}>Number Of Units: </label>
      </div>

      <div className="flex justify-between">
        <NumberInput
          className="pb-1.5 w-1/4"
          hideControls
          precision={2}
          value={yeild}
          onChange={(event: number | "") => setYeild(event)}
          rightSection={
            <IconPercentage
              size={"1.25rem"}
              style={{ display: "block", opacity: 0.5 }}
            />
          }
          rightSectionWidth={36}
        />

        <NumberInput
          className="pb-1.5 w-1/4"
          hideControls
          precision={2}
          value={margin}
          onChange={(event: number | "") => setMargin(event)}
          rightSection={
            <IconPercentage
              size={"1.25rem"}
              style={{ display: "block", opacity: 0.5 }}
            />
          }
          rightSectionWidth={36}
        />

        <NumberInput
          className="pb-1.5 w-1/4"
          hideControls
          value={units}
          onChange={(event: number) => setUnit(event)}
          rightSection={
            <IconHash
              size={"1.25rem"}
              style={{ display: "block", opacity: 0.5 }}
            />
          }
          rightSectionWidth={36}
        />
      </div>
      <div className="flex justify-between">
        <label className={sharedTotal}>
          Yeild Total: ${newTotal(fullTotal, yeild).toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Margin Total: $
          {newTotal(newTotal(fullTotal, yeild), margin).toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Cost Per Unit: $
          {newTotal(
            newTotal(newTotal(fullTotal, yeild), margin),
            units
          ).toFixed(2)}
        </label>
      </div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-primary">
        CAD Total: ${Number(fullTotal).toFixed(2)}
      </h1>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-primary">
        USD Total: ${(Number(fullTotal) / Number(exchange)).toFixed(2)}
      </h1>
    </>
  );
}
