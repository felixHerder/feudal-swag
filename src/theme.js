import { extendTheme, theme as defaultTheme, withDefaultColorScheme } from "@chakra-ui/react";

const colors = {
  brand: defaultTheme.colors.purple,
};
const fonts = {
  heading: `Nova Round, ${defaultTheme.fonts?.heading}`,
  body: `Cabin, ${defaultTheme.fonts?.body}`,
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const components = {
  Link: {
    baseStyle: {
      padding:".5rem",
      borderRadius:"md",
      _focus: {
      },
      _hover: {
        textDecoration: "none",
      },
    },
  },
  Button:{
    baseStyle:{
      borderRadius:"full",
      boxShadow:"none",
      _hover:{
        boxShadow:"glowsm",
      }
    }
  }
};
const shadows ={
  glowlg: "0 0 12px 3px rgba(177, 140, 255, 0.6)",
  glowsm: "0 0 2px 0px rgba(177, 140, 255, 0.9)"
}
const theme = extendTheme({ colors, fonts, config, components,shadows }, withDefaultColorScheme({ colorScheme: "brand" }));
console.log(theme);
export default theme;
