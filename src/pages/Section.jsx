import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { selectItemsBySection } from "../redux/shop/shop.selectors";
import { fetchShopItemsBySection } from "../redux/shop/shop.actions";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Item from "../components/ItemCard";
import LoadingWrapper from "../components/LoadingWrapper";

function Section({ itemsBySection, fetchShopItemsBySection, isLoading }) {
  const { sectionId } = useParams();
  React.useEffect(() => {
    fetchShopItemsBySection(sectionId);
    console.log('Section mounted')
  }, [sectionId,fetchShopItemsBySection]);
  const itemsArr = itemsBySection(sectionId);
  console.log("Section ",sectionId,"renderd")
  return (
    <Container maxW="container.xl" minH="75vh">
      <LoadingWrapper isLoading={isLoading}>
        <Heading textAlign="center" size="2xl" mt={[2, 4, 6]} mb={[4, 8, 12]} textTransform="capitalize">
          {sectionId}
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {itemsArr && itemsArr.map((item, idx) => item && (
            <Item key={idx} item={item} />
          ))}
        </SimpleGrid>
      </LoadingWrapper>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  itemsBySection: (section) => selectItemsBySection(state, section),
  isLoading: state.shop.isFetchingItems,
});
const mapDispatchToProps = {
  fetchShopItemsBySection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
