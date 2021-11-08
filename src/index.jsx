import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme/theme";
import "@fontsource/nova-round/400.css";
import "@fontsource/cabin/400.css";
import "@fontsource/cabin/700.css";

import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
  </Provider>,
  document.getElementById("feudalapp")
);
