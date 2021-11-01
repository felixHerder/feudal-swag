import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../redux/shop/shop.actions";
import { selectItems, selectSections, selectSectionItems } from "../redux/shop/shop.selectors";

import { Container, Box, Flex, Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import Item from "../components/Item";

class Shop extends React.Component {
  componentDidMount() {
    const { items, sections, fetchData } = this.props;
    console.log("Shop comp mounted");
    if (!sections || !items) {
      console.log("Shop data missing,fetching");
      fetchData();
    }
  }

  render() {
    const { isLoading, getSectionItems, sections } = this.props;
    return (
      <Container maxW="container.xl">
        {isLoading ? (
          <div>Loading... </div>
        ) : (
          Object.keys(sections).map((section,idx) => (
            <Box py={4} key={idx}>
              <Heading my={4} textTransform="capitalize">{section}</Heading>
              <SimpleGrid columns={[1, 2, 4]} spacing={4}>
                {getSectionItems(section)
                  .slice(0, 4)
                  .map((item, idx) => (
                    <Item key={idx} item={item} />
                  ))}
              </SimpleGrid>
            </Box>
          ))
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  fetchData,
};
const mapStateToProps = (state) => ({
  sections: selectSections(state),
  items: selectItems(state),
  getSectionItems: (section) => selectSectionItems(state, section),
  isLoading: state.shop.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
