import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectSectionItems } from "../redux/shop/shop.selectors";

import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "./ItemCard";

function ShopSectionRow({ section, getSectionItems }) {
  return (
    <Box py={4}>
      <Button
        isFullWidth
        as={RouterLink}
        to={`/shop/${section}`}
        my={4}
        textTransform="capitalize"
        variant="ghost"
        fontFamily="heading"
        fontSize={["2xl", "2xl", "3xl"]}
        colorScheme="gray"
        p={[4, 4, 6]}
      >
        {section}
      </Button>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
        {getSectionItems(section)
          .slice(0, 4)
          .map((item, idx) => (
            <ItemCard key={idx} item={item} />
          ))}
      </SimpleGrid>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  getSectionItems: (section) => selectSectionItems(state, section),
});

export default connect(mapStateToProps)(ShopSectionRow);
