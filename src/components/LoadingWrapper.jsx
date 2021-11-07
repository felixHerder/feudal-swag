import { Center, CircularProgress } from "@chakra-ui/react";

export default function LoadingWrapper ({ isLoading, children }) {
  return (
    <>
      {isLoading ? (
        <Center minH="inherit" w="100%">
          <CircularProgress isIndeterminate color="brand.500" size={16} thickness="4px" />
        </Center>
      ) : (
        children
      )}
    </>
  );
};