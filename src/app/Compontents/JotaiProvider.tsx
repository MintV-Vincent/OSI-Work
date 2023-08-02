"use client";
import React from "react";
import { Provider } from "jotai";
import { MantineProvider } from "@mantine/core";

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <MantineProvider withCSSVariables withNormalizeCSS withGlobalStyles>
        {children}
      </MantineProvider>
    </Provider>
  );
};
