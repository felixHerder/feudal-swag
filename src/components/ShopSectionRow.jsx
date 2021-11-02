import React from "react";
import { connect } from "react-redux";
import { selectSectionItems } from "../redux/shop/shop.selectors";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Item from "../components/Item";

function ShopSectionRow({ section, getSectionItems }) {
  return (
    <Box py={4}>
      <Heading my={4} textTransform="capitalize">
        {section}
      </Heading>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
        {getSectionItems(section)
          .slice(0, 4)
          .map((item, idx) => (
            <Item key={idx} item={item} />
          ))}
      </SimpleGrid>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  getSectionItems: (section) => selectSectionItems(state, section),
});

export default connect(mapStateToProps)(ShopSectionRow);
