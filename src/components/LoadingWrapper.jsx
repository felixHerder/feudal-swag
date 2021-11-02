import { Center, CircularProgress } from "@chakra-ui/react";

export default function LoadingWrapper ({ isLoading, children }) {
  return (
    <>
      {isLoading ? (
        <Center minH="90vh">
          <CircularProgress isIndeterminate color="brand.500" size={24} thickness="4px" />
        </Center>
      ) : (
        children
      )}
    </>
  );
};