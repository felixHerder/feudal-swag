import { useColorModeValue } from "@chakra-ui/react";

export default function useThemeColors() {
  const themeColors = {
    bg: useColorModeValue("white", "gray.800"),
    cardBg: useColorModeValue("gray.100", "gray.700"),
    cardBgLight: useColorModeValue("gray.50", "gray.600"),
    bgBrand: useColorModeValue("brand.700", "brand.200"),
    bgSelect: useColorModeValue("gray.700", "gray.200"),
    textPrice: useColorModeValue("brand.600", "brand.100"),
    textOnBrand: useColorModeValue("white", "gray.800"),
    textSecondary: useColorModeValue("gray.600", "gray.200"),
    textTertiary: useColorModeValue("gray.500", "gray.300"),
    overlayBg: useColorModeValue("whiteAlpha.300", "blackAlpha.300"),
  };

  return themeColors;
}
