"use client";
import { MantineProvider } from "@mantine/core";
import MainWebsite from "./MainWebsite";

export default function page() {
  return (
    <MantineProvider
      withCSSVariables
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: "Helvetica",
      }}
    >
      <MainWebsite />
    </MantineProvider>
  );
}
