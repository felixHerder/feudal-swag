import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectItemsBySection } from "../redux/shop/shop.selectors";

import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "./LoadingWrapper";
const SectionRow = ({ section, itemsBySection, isLoading }) => {
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

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => ({
  itemsBySection: selectItemsBySection(state, ownProps.section),
  isLoading: state.shop.isFetchingItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionRow);