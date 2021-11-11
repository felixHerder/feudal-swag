import { useColorModeValue } from "@chakra-ui/react";

export default function useThemeColors() {
  const themeColors = {
    bg: useColorModeValue("white", "gray.800"),
    cardBg: useColorModeValue("gray.200", "gray.700"),
    cardBgSecondary: useColorModeValue("gray.300", "gray.600"),
    bgBrand: useColorModeValue("brand.500", "brand.200"),
    bgSelect: useColorModeValue("gray.700", "gray.200"),
    textBrand: useColorModeValue("brand.600", "brand.100"),
    textOnBrand: useColorModeValue("white", "gray.800"),
    textSecondary: useColorModeValue("gray.700", "gray.300"),
    textTertiary: useColorModeValue("gray.600", "gray.400"),
    overlayBg: useColorModeValue("blackAlpha.200","whiteAlpha.300", ),
    overlayBgAlt: useColorModeValue("whiteAlpha.300", "blackAlpha.200"),
  };

  return themeColors;
}
