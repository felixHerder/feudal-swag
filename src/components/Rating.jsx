import { Icon, Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
export default function Rating({ value, size,...props }) {
  const colors = useThemeColors();
  return (
    <Box  lineHeight="1" {...props}>
      {new Array(5).fill(0).map((_, idx) => {
        const width = idx + 1 <= value ? "100%" : idx < value ? `${(value % 1) * 100}%` : "0%";
        return (
          <Box  key={idx} position="relative" mr={2} display="inline-block">
            <Icon boxSize={size} as={FaStar} color={colors.cardBgSecondary} />
            <Box  w={width} overflow="hidden" position="absolute" top="0" >
              <Icon boxSize={size} as={FaStar} color={colors.bgBrand} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
