"use client";
import { NumberInput } from "@mantine/core";
import { useAtom } from "jotai";
import { upPanelAtom } from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import ExchangeRateInput from "app/Compontents/Input/ExchangeRateInput";
import PanelSelect from "app/Compontents/PanelSelect";
import AssemblyExchangeRateInput from "app/Compontents/Input/AssemblyExchangeRateInput";

export default function MaterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [upNum, setNumUp] = useAtom(upPanelAtom);
  return (
    <div className="flex flex-col mx-10 my-3">
      <div className="grid grid-cols-6">
        <label className="text-xl text-left">1 USD to CAD</label>
        <label className="text-xl text-left col-span-3">
          Assembly CAD to USD
        </label>
        <label className="text-xl text-left">#-Up-Per-Panel</label>
        <label className="text-xl pl-[20%] text-left">Panel Size</label>
      </div>
      <div className="grid grid-cols-6">
        <ExchangeRateInput />
        <AssemblyExchangeRateInput />
        <div className="col-span-2" />
        <NumberInput
          size={"xs"}
          className="col-span-1 w-4/5"
          hideControls
          precision={percision}
          value={upNum}
          onChange={(event: number) => setNumUp(event)}
        />
        <div className="pl-[20%] pl-1/5">
          <PanelSelect size={"xs"} />
        </div>
      </div>
      {children}
    </div>
  );
}
