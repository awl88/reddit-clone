import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "urql";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
