import React from "react";
import {useParams} from 'react-router-dom'
import { connect } from "react-redux";
import { selectSectionItems } from "../redux/shop/shop.selectors";

import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Item from "../components/ItemCard";

function Section({getSectionItems }) {
  const {sectionId} = useParams();
  return (
    <Container maxW="container.xl">
      <Heading textAlign="center" size="2xl" mt={[2,4,6]} mb={[4,8,12]} textTransform="capitalize">
        {sectionId}
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {getSectionItems(sectionId)
          .map((item, idx) => (
            <Item key={idx} item={item} />
          ))}
      </SimpleGrid>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  getSectionItems: (section) => selectSectionItems(state, section),
});

export default connect(mapStateToProps)(Section);
