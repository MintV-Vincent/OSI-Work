import Front from "app/Tabs/Front";
import { Tabs, MantineProvider } from "@mantine/core";
import Image from "next/image";
import Sales from "app/Tabs/Sales";

const Logo = require("Images/Logo.svg") as string;

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
            Materials
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel className="p-0 h-screen" value="Front" pt="xs">
          <Front />
        </Tabs.Panel>
        <Tabs.Panel className="p-0 h-screen" value="Sales" pt="xs">
          <Sales />
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
}

export default MainWebsite;
