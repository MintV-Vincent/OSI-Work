"use client";
import SideBar from "app/Compontents/SideBar";
import { NumberInput, Select } from "@mantine/core";
import { useAtom } from "jotai";
import { exchangeRateAtom, panelAtom } from "Library/Atoms/AtomStorage";
import { panelRow } from "Library/SelectMap";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { JotaiProvider } from "app/Compontents/JotaiProvider";

export default function MaterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  return (
    <div className="flex">
      <SideBar />
      <div className="m-8 w-full">
        <div className="flex justify-between">
          <div className="flex justify-between w-1/2">
            <label className="text-xl text-left">USD</label>
            <label className="text-xl text-left">CAD Exchange Rate</label>
          </div>
          <label className="text-xl w-1/4 text-left">Panel Size</label>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between w-1/2">
            <NumberInput
              className="pb-3"
              hideControls
              precision={2}
              value={1.0}
              rightSection={
                <IconCurrencyDollar
                  size={"1.25rem"}
                  style={{ display: "block", opacity: 0.5 }}
                />
              }
              rightSectionWidth={36}
            />
            <NumberInput
              className="pb-3"
              hideControls
              precision={2}
              value={exchangeRate}
              onChange={(event: number | "") => {
                setExchangeRate(event);
              }}
              rightSection={
                <IconCurrencyDollar
                  size={"1.25rem"}
                  style={{ display: "block", opacity: 0.5 }}
                />
              }
              rightSectionWidth={36}
            />
          </div>
          <Select
            className="w-1/4 pb-3"
            defaultValue={"1.5"}
            value={panel}
            onChange={setPanel as any}
            data={panelRow}
            title={"Panel Size"}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
