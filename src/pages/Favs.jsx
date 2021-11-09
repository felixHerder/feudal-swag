import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { Container, Heading, SimpleGrid,Center,Text } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import LoadingWrapper from "../components/LoadingWrapper";
import { selectAreFavsLoading, selectFavsItemIdsArr, selectFavsItems } from "../redux/favs/favs.selectors";
import { selectIsFetchingItems } from "../redux/shop/shop.selectors";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Favs() {
  const dispatch = useDispatch();
  const areItemsLoading = useSelector((state) => selectIsFetchingItems(state));
  const areFavsLoading = useSelector((state) => selectAreFavsLoading(state));
  const favsItemIdsArr = useSelector((state) => selectFavsItemIdsArr(state));
  const favsItems = useSelector((state) => selectFavsItems(state));

  React.useEffect(() => {
    dispatch(fetchShopItemsByIds(favsItemIdsArr));
  }, [dispatch, favsItemIdsArr]);

  console.log("Favs rendered");
  return (
    <Container maxW="container.lg" minH="65vh">
      <Heading textAlign="center" size="2xl" mt={[2, 4, 6]} mb={[4, 8, 12]} textTransform="capitalize">
        Favourites
      </Heading>
      <LoadingWrapper isLoading={areItemsLoading}>
        <LoadingOverlay isLoading={areFavsLoading}>
          <SimpleGrid columns={[1, 2, 3]} spacing={12} py={2}>
            {favsItems && favsItems.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
          </SimpleGrid>
        </LoadingOverlay>
      </LoadingWrapper>
      {(!favsItems || favsItems.length === 0) && (
        <Center minH="50vh">
          <Text textAlign="center" fontFamily="body" fontSize="xl">
           You have no favourites. Hit the heart button!
          </Text>
        </Center>
      )}
    </Container>
  );
}
