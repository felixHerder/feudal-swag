import React from "react";
import { useLocation } from "react-router-dom";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Container, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoadingWrapper from "../components/LoadingWrapper";
import ItemDetails from "../components/ItemDetails";
import ItemReviews from "../components/ItemReviews";
import { selectItemById } from "../redux/shop/shop.selectors";

export default function Item() {
  const routerLocation = useLocation();
  const itemId = new URLSearchParams(routerLocation.search).get("id");
  const [isItemFetching, setItemFetching] = React.useState(false);
  const itemFromStore = useSelector((state) => selectItemById(state, itemId));
  const [item, setItem] = React.useState(itemFromStore);
  React.useEffect(() => {
    setItemFetching(true);
    const itemRef = doc(getFirestore(), "items", itemId);
    const unsubsribe = onSnapshot(itemRef, (snapshot) => {
      console.log("Item Page, updated item:", itemId);
      setItem(snapshot.data());
      setItemFetching(false);
    });
    return () => {
      unsubsribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  return (
    <Container maxW="container.xl" minH="75vh">
      <LoadingWrapper isLoading={isItemFetching && !item}>
        {item && (
          <VStack alignItems="flex-start" spacing={8} mt={[2, 4, 8]}>
            <ItemDetails item={item} />
            <ItemReviews item={item} />
          </VStack>
        )}
      </LoadingWrapper>
    </Container>
  );
}
