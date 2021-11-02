import { useColorModeValue } from "@chakra-ui/react";

export default function useThemeColors() {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const bg = useColorModeValue("white", "gray.800");
  const bgBrand = useColorModeValue("brand.700", "brand.200");
  const bgSelect = useColorModeValue("gray.700", "gray.200");
  const textPrice = useColorModeValue("brand.600", "brand.100");
  const textOnBrand = useColorModeValue("white", "gray.800");
  const textSecondary = useColorModeValue("gray.600", "gray.200");
  const textTertiary = useColorModeValue("gray.500", "gray.300");
  const overlayBg = useColorModeValue("whiteAlpha.300", "blackAlpha.300");

  return { cardBg, textPrice, textSecondary, overlayBg, bg, bgBrand, textTertiary,textOnBrand,bgSelect };
}
