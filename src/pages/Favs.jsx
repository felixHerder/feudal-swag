import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Heading, SimpleGrid, Center, Text } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import { selectAreFavsLoading, selectFavsItemIds, selectFavsItemsArr } from "../redux/favs/favs.selectors";
import LoadingOverlay from "../components/LoadingOverlay";
import { fetchFavsItems } from "../redux/favs/favs.actions";

export default function Favs() {
  const dispatch = useDispatch();
  const areFavsLoading = useSelector(selectAreFavsLoading);
  const favItemsIds = useSelector(selectFavsItemIds);
  const favsItems = useSelector(selectFavsItemsArr);

  React.useEffect(() => {
    dispatch(fetchFavsItems());
  }, [dispatch, favItemsIds]);
  return (
    <Container maxW="container.lg" minH="65vh">
      <Heading textAlign="center" size="2xl" mt={[2, 4, 6]} mb={[4, 8, 12]} textTransform="capitalize">
        Favourites
      </Heading>
      <LoadingOverlay isLoading={areFavsLoading}>
        <SimpleGrid columns={[1, 2, 3]} spacing={12} py={2}>
          {favsItems && favsItems.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
        </SimpleGrid>
        {(!favsItems || favsItems.length === 0) && (
          <Center minH="50vh">
            <Text textAlign="center" fontFamily="body" fontSize="xl">
              You have no favourites. Hit the heart button!
            </Text>
          </Center>
        )}
      </LoadingOverlay>
    </Container>
  );
}
