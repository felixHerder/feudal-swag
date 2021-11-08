import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "../components/LoadingWrapper";
import { selectFavsItemIdsArr, selectFavsItems } from "../redux/favs/favs.selectors";
import { selectIsFetchingItems } from "../redux/shop/shop.selectors";

export default function Favs() {
  const dispatch = useDispatch();
  const areItemsLoading = useSelector((state) => selectIsFetchingItems(state));
  const favsItemIdsArr = useSelector((state) => selectFavsItemIdsArr(state));
  const favsItems = useSelector((state) => selectFavsItems(state));

  React.useEffect(() => {
    dispatch(fetchShopItemsByIds(favsItemIdsArr));
  }, [dispatch, favsItemIdsArr]);

  console.log("Favs rendered");
  return (
    <Container maxW="container.lg" minH="75vh">
      <LoadingWrapper isLoading={areItemsLoading}>
        <Heading textAlign="center" size="2xl" mt={[2, 4, 6]} mb={[4, 8, 12]} textTransform="capitalize">
          Favourites
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {favsItems && favsItems.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
        </SimpleGrid>
      </LoadingWrapper>
    </Container>
  );
}
