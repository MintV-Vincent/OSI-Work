import Front from "app/Tabs/Front";
import { atom } from "jotai";

//These atoms are cause a lot of re-renders on calculation need to do something about it !
export const exchangeRateAtom = atom<number | "">(1);
export const freightAtom = atom<number | "">(1);
export const yeildAtom = atom<number | "">(1);
export const marginAtom = atom<number | "">(1);
export const fullTotalAtom = atom<number>(0);
// Note that Select value should always be either **string** or **null**: -Mantine
export const panelAtom = atom<string | null>("1.5");

function MainWebsite() {
  return <Front />;
}

export default MainWebsite;
