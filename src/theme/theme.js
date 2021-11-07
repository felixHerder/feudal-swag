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
      padding: ".5rem",
      borderRadius: "md",
      _focus: {},
      _hover: {
        textDecoration: "none",
      },
    },
  },
  Button: {
    baseStyle: {
      borderRadius: "full",
      boxShadow: "none",
      _hover: {
        boxShadow: "glowsm",
      },
    },
  },
};

const styles = {
  global: (props) => ({
    "*::-webkit-scrollbar": {
      width: "12px",
    },
    "*::-webkit-scrollbar-track": {
      background: props.colorMode === 'light' ? "gray.200" : "gray.600",
    },
    "*::-webkit-scrollbar-thumb": {
      background: props.colorMode === 'light' ?  "gray.400" : "gray.300" ,
      border:"3px solid transparent",
      backgroundClip:"content-box",
      borderRadius: "16px",
      transition: "all .2s ease",
      "&:hover": {
        background: props.colorMode === 'light' ?  "gray.500" : "gray.400" ,
      },
    },
  }),
};
const shadows = {
  glowlg: "0 0 12px 3px rgba(177, 140, 255, 0.6)",
  glowsm: "0 0 2px 0px rgba(177, 140, 255, 0.9)",
  outline: "0 0 0 3px rgba(150, 102, 255, 0.6)",
};
const theme = extendTheme({ colors, fonts, config, components, shadows, styles }, withDefaultColorScheme({ colorScheme: "brand" }));
export default theme;
