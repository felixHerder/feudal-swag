import { Center, CircularProgress } from "@chakra-ui/react";

export default function LoadingWrapper ({ isLoading, children, ...props }) {
  return (
    <>
      {isLoading ? (
        <Center minH="inherit" w="100%">
          <CircularProgress title="loading progress" isIndeterminate color="brand.500" size={16} thickness="4px" {...props} />
        </Center>
      ) : (
        children
      )}
    </>
  );
};