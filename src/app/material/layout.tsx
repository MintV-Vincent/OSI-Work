"use client";
import SideBar from "app/Compontents/SideBar";
import { Select } from "@mantine/core";
import { useAtom } from "jotai";
import { panelAtom } from "Library/Atoms/AtomStorage";
import { panelRow } from "Library/SelectMap";
import ExchangeRateInput from "app/Compontents/ExchangeRateInput";

export default function MaterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [panel, setPanel] = useAtom(panelAtom);
  return (
    <div className="flex">
      <SideBar />
      <div className="m-12 w-full">
        <div className="flex justify-between">
          <label className="text-xl text-left w-60">1 USD to CAD</label>
          <label className="text-xl w-1/4 text-left">Panel Size</label>
        </div>
        <div className="flex justify-between">
          <ExchangeRateInput />
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
