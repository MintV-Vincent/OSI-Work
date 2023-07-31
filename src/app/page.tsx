"use client";
import Front from "./Tabs/Front";
import { useHydrateAtoms } from "jotai/utils";
import { useAtom } from "jotai";
import {
  yeildAtom,
  marginAtom,
  exchangeRateAtom,
  freightAtom,
  panelAtom,
} from "Library/AtomStorage";

export default function page() {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [margin] = useAtom(marginAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  useHydrateAtoms([
    [exchangeRateAtom, exchangeRate],
    [freightAtom, freight],
    [marginAtom, margin],
    [panelAtom, panel],
    [yeildAtom, yeild],
  ]);
  return <Front />;
}
