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
};
console.log(defaultTheme);
const theme = extendTheme({ colors, fonts, config, components }, withDefaultColorScheme({ colorScheme: "brand" }));
console.log(theme.components.Button);
export default theme;
