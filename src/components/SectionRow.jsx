import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectIsFetchingItems } from "../redux/shop/shop.selectors";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import useThemeColors from "../theme/useThemeColors";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "./LoadingWrapper";
const SectionRow = ({ section, items }) => {
  const colors = useThemeColors();
  const isLoading = useSelector((state) => selectIsFetchingItems(state));
  const areEmptyItems = items.includes(undefined);
  console.log("SectionRow ", section, " rendered", "items:", items, { areEmptyItems });
  return (
    <Box py={4} minH="200px">
      {/* Section title and link to section */}
      <Button
        isFullWidth
        as={RouterLink}
        to={`/shop/${section}`}
        my={4}
        textTransform="capitalize"
        variant="ghost"
        color={colors.textSecondary}
        fontFamily="heading"
        fontSize={["3xl"]}
        colorScheme="gray"
        p={[4, 4, 6]}
      >
        {section}
      </Button>
      <LoadingWrapper isLoading={areEmptyItems && isLoading}>
      <SimpleGrid columns={[1, 2, 3]} spacing={12} py={2}>
          {!areEmptyItems &&
            items.map((item, idx) => item && <ItemCard  key={idx} item={item} />)}
        </SimpleGrid>
      </LoadingWrapper>
    </Box>
  );
};

export default SectionRow;
