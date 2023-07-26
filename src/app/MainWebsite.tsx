import Front from "Tabs/Front";
import { atom } from "jotai";
import { Tabs, MantineProvider } from "@mantine/core";
import Image from "next/image";
import Check from "Tabs/Check";
import Sales from "Tabs/Sales";

const Logo = require("Images/Logo.svg") as string;

//These atoms are cause a lot of re-renders on calculation need to do something about it !
export const exchangeRateAtom = atom<number | "">(1);
export const freightAtom = atom<number | "">(1);
export const yeildAtom = atom<number | "">(1);
export const marginAtom = atom<number | "">(1);
export const fullTotalAtom = atom<number>(0);
// Note that Select value should always be either **string** or **null**: -Mantine
export const panelAtom = atom<string | null>("1.5");

function MainWebsite() {
  return (
    <MantineProvider
      withCSSVariables
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: "Helvetica",
      }}
    >
      <Tabs color="yellow" variant="pills" defaultValue={"Front"}>
        <Tabs.List
          className="bg-light h-16 sticky top-0 left-0 px-2.5 pr-5 right-0 z-50 print:hidden"
          position="right"
        >
          <Image
            className="w-auto h-16 p-2.5"
            src={Logo}
            priority={true}
            alt="PFC FLEX LOGO"
          />
          <Tabs.Tab
            className="p-5"
            ml="auto"
            value="Front"
            style={{
              width: 100,
              fontSize: 18,
              fontWeight: "bold",
              color: "#22223B",
            }}
          >
            Front
          </Tabs.Tab>
          <Tabs.Tab
            className={"p-5"}
            value="Sales"
            style={{
              width: 100,
              fontSize: 18,
              fontWeight: "bold",
              color: "#22223B",
            }}
          >
            Sales
          </Tabs.Tab>
          <Tabs.Tab
            className={"p-5"}
            value="Test"
            style={{
              width: 100,
              fontSize: 18,
              fontWeight: "bold",
              color: "#22223B",
            }}
          >
            Proto Type
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel className="p-0 h-screen" value="Front" pt="xs">
          <Front />
        </Tabs.Panel>
        <Tabs.Panel className="p-0 h-screen" value="Sales" pt="xs">
          <Sales />
        </Tabs.Panel>
        <Tabs.Panel className="p-0 h-screen" value="Test" pt="xs">
          <Check />
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
}

export default MainWebsite;
