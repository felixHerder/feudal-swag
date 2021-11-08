import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectItemsBySection,selectIsFetchingItems } from "../redux/shop/shop.selectors";
import { fetchShopItemsBySection } from "../redux/shop/shop.actions";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "../components/LoadingWrapper";

function Section() {
  const { sectionId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectIsFetchingItems(state));
  const itemsBySection = useSelector((state) => selectItemsBySection(state, sectionId));

  React.useEffect(() => {
    dispatch(fetchShopItemsBySection(sectionId));
  }, [sectionId, dispatch]);

  console.log("Section ", sectionId, "rendered");
  return (
    <Container maxW="container.xl" minH="75vh">
      <LoadingWrapper isLoading={isLoading}>
        <Heading textAlign="center" size="2xl" mt={[2, 4, 6]} mb={[4, 8, 12]} textTransform="capitalize">
          {sectionId}
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {itemsBySection && itemsBySection.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
        </SimpleGrid>
      </LoadingWrapper>
    </Container>
  );
}

export default Section;
