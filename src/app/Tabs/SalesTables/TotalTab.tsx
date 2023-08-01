import React, { useEffect, useState } from "react";
import { NumberInput } from "@mantine/core";
import { useAtom } from "jotai";
import { TotalTable } from "app/Compontents/Tables/TotalTable";
import { addArrayTotal, newTotal } from "Functions/MathFunctions";
import { IconPercentage, IconHash } from "@tabler/icons-react";
import {
  fullTotalAtom,
  marginAtom,
  totalAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";

const sharedTotal: string = "text-xl py-1.5 w-1/4 text-left";

export default function TotalTab() {
  const [yeild, setYeild] = useAtom(yeildAtom);
  const [margin, setMargin] = useAtom(marginAtom);
  const [units, setUnit] = useState<number | "">(1);
  const [total] = useAtom(totalAtom);
  const [, setTotal] = useAtom(fullTotalAtom);

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
          onChange={(event: number | "") => setUnit(event)}
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
          Yeild Total: ${newTotal(addArrayTotal(total), yeild).toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Margin Total: $
          {newTotal(newTotal(addArrayTotal(total), yeild), margin).toFixed(2)}
        </label>
        <label className={sharedTotal}>
          Cost Per Unit: $
          {newTotal(
            newTotal(newTotal(addArrayTotal(total), yeild), margin),
            units
          ).toFixed(2)}
        </label>
      </div>
    </>
  );
}
