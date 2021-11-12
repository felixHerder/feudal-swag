import { Center, CircularProgress, Box } from "@chakra-ui/react";
import useThemeColors from "../theme/useThemeColors";

export default function LoadingOverlay({ isLoading, children, ...props }) {
  const colors = useThemeColors();
  return (
    <Box position="relative" h="100%" w="100%" minH="inherit" {...props}>
      {isLoading && (
        <Center h="100%" w="100%" position="absolute" top="0" zIndex="99" bg={colors.overlayBgAlt}>
          <CircularProgress isIndeterminate color="brand.500" size={16} thickness="4px" {...props} />
        </Center>
      )}
      {children}
    </Box>
  );
}
