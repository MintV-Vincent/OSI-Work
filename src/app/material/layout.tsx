"use client";
import { NumberInput, Select } from "@mantine/core";
import { useAtom } from "jotai";
import { panelAtom, upPanelAtom } from "Library/Atoms/AtomStorage";
import { panelRow, percision } from "Library/ConstantValues";
import ExchangeRateInput from "app/Compontents/ExchangeRateInput";

export default function MaterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [panel, setPanel] = useAtom(panelAtom);
  const [upNum, setNumUp] = useAtom(upPanelAtom);
  return (
    <div className="flex flex-col mx-10 my-6">
      <div className="grid grid-cols-6">
        <label className="text-xl text-left col-span-4">1 USD to CAD</label>
        <label className="text-xl text-left">#-Up-Per-Panel</label>
        <label className="text-xl pl-[20%] text-left">Panel Size</label>
      </div>
      <div className="grid grid-cols-6">
        <ExchangeRateInput />
        <div className="col-span-3" />
        <NumberInput
          className="col-span-1 w-4/5"
          hideControls
          precision={percision}
          value={upNum}
          onChange={(event: number) => setNumUp(event)}
        />
        <Select
          className="pl-[20%] col-span-1 pl-1/5"
          defaultValue={"1.5"}
          value={panel}
          onChange={setPanel as any}
          data={panelRow}
          title={"Panel Size"}
        />
      </div>
      {children}
    </div>
  );
}
