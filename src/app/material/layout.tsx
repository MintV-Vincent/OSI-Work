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
      <div className="flex justify-between h-8">
        <label className="text-xl w-60 text-left">1 USD to CAD</label>
        <div className="flex">
          <label className="text-xl w-60 text-left">#-Up-Per-Panel</label>
          <label className="text-xl w-60 text-left">Panel Size</label>
        </div>
      </div>
      <div className="flex justify-between h-8">
        <ExchangeRateInput />
        <div className="flex">
          <NumberInput
            className="w-60"
            hideControls
            precision={percision}
            value={upNum}
            onChange={(event: number) => setNumUp(event)}
          />
          <Select
            className="w-60"
            defaultValue={"1.5"}
            value={panel}
            onChange={setPanel as any}
            data={panelRow}
            title={"Panel Size"}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
