"use client";

import React from "react";
import { atom, Provider } from "jotai";
import { MantineProvider } from "@mantine/core";

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <MantineProvider
        withCSSVariables
        withNormalizeCSS
        withGlobalStyles
        theme={{
          fontFamily: "Helvetica",
        }}
      >
        {children}
      </MantineProvider>
    </Provider>
  );
};
