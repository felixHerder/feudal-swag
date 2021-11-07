import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { makeSelectItemsBySection, selectIsFetchingItems, selectItemIdsBySection } from "../redux/shop/shop.selectors";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "./LoadingWrapper";
const SectionRow = ({ section }) => {
  //use createSelector factory to generate different selectors for each section component,
  //otherwise they will rerender on every state change
  const selectItemsBySectionInstance = makeSelectItemsBySection();
  const itemsBySection = useSelector((state) => selectItemsBySectionInstance(state, section));
  const isLoading = useSelector((state) => selectIsFetchingItems(state));
  const itemIds = useSelector((state) => selectItemIdsBySection(state, section));
  const dispatch = useDispatch();
  //on mount fetch the first 3 items in current section
  React.useEffect(() => {
    dispatch(fetchShopItemsByIds(itemIds.slice(0,3)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsArr = itemsBySection.slice(0, 3);
  console.log("SectionRow ", section, " rendered", "items:", itemsArr);
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
        fontFamily="heading"
        fontSize={["3xl"]}
        colorScheme="gray"
        p={[4, 4, 6]}
      >
        {section}
      </Button>
      <LoadingWrapper isLoading={isLoading}>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {itemsArr.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
        </SimpleGrid>
      </LoadingWrapper>
    </Box>
  );
};

export default SectionRow;
