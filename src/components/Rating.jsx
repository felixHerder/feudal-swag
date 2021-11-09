import { Icon, Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
export default function Rating({ value, size }) {
  const colors = useThemeColors();
  return (
    <>
      {new Array(5).fill(0).map((_, idx) => {
        const width = idx + 1 <= value ? "100%" : idx < value ? `${(value % 1) * 100}%` : "0%";
        return (
          <Box position="relative" mr={2} lineHeight="1">
            <Icon boxSize={size} as={FaStar} color={colors.cardBgSecondary} />
            <Box w={width} overflow="hidden" position="absolute" top="0">
              <Icon boxSize={size} as={FaStar} color={colors.bgBrand} />
            </Box>
          </Box>
        );
      })}
    </>
  );
}
