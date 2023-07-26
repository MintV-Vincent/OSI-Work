import { MantineProvider } from "@mantine/core";

const Layout = ({ children }: any) => {
  return (
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
  );
};

export default Layout;
