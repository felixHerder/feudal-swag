import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsFetchingItems, selectItemById } from "../redux/shop/shop.selectors";
import { Flex, Button, Text, Heading, Icon, Container, VStack, Box, Divider, Center } from "@chakra-ui/react";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "../components/LoadingWrapper";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import ItemDetails from "../components/ItemDetails";
import { fetchReviewById } from "../redux/reviews/reviews.actions";
import { selectReviewById, selectIsReviewLoading } from "../redux/reviews/reviews.selectors";
import Rating from "../components/Rating";

export default function Item() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) => selectItemById(state, itemId));
  const reviews = useSelector((state) => selectReviewById(state, itemId));
  const isItemLoading = useSelector((state) => selectIsFetchingItems(state));
  const isReviewLoading = useSelector(selectIsReviewLoading);
  console.log("Item comp rendered with", { item });
  React.useEffect(() => {
    if (!item) {
      dispatch(fetchShopItemsByIds([itemId]));
    }
    if (!reviews) {
      dispatch(fetchReviewById(itemId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  return (
    <Container maxW="container.lg" minH="75vh">
      <VStack alignItems="flex-start" spacing={8} mt={[4, 8, 16]}>
        <LoadingWrapper isLoading={isItemLoading}>{item && <ItemDetails item={item} />}</LoadingWrapper>
        <LoadingWrapper isLoading={isReviewLoading}>{reviews && <ItemReviews item={item} />}</LoadingWrapper>
      </VStack>
    </Container>
  );
}

const ItemReviews = ({ item: { rating, id } }) => {
  const colors = useThemeColors();
  const [countLoaded, setCountLoaded] = React.useState(3);
  const handleLoadMore = () => setCountLoaded((prev) => prev + 5);
  const handleCollapse = () => setCountLoaded(3);
  const itemReviews = useSelector((state) => selectReviewById(state, id));
  const reviewsArr = itemReviews && Object.values(itemReviews);
  const reviewsArrSliced = itemReviews && Object.values(itemReviews).slice(0, countLoaded);
  return (
    <Box pb={8}>
      <Flex mb={2} w="100%" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Heading fontFamily="body" size="xl">
          User Reviews{" "}
          <Text fontFamily="body" color={colors.textTertiary} fontWeight="normal" as="span">
            ({rating.count})
          </Text>
        </Heading>
        <Button variant="outline" size="md" my={2} leftIcon={<Icon boxSize={5} as={FaPlus} />}>
          REVIEW
        </Button>
      </Flex>
      <VStack alignItems="flex-start" spacing={4} mt={4}>
        {reviewsArrSliced &&
          reviewsArrSliced.map((review, idx) => (
            <Box key={idx} w="100%">
              <Divider mb={2} />
              <Text fontSize={["lg", "xl"]} fontWeight="bold" as="h4" color={colors.textSecondary}>
                {review.name}
              </Text>
              <Rating value={review.rating} mb={2} />
              <Text textAlign="justify" color={colors.textTertiary}>
                {review.comment}
              </Text>
            </Box>
          ))}
        {/* hide load more button on all reviews displayed */}

        <Center w="100%" py={8}>
          {reviewsArr && countLoaded < reviewsArr.length && (
            <Button size="lg" variant="ghost" rightIcon={<Icon as={FaChevronDown} />} onClick={handleLoadMore}>
              Load More
            </Button>
          )}
          {countLoaded > 3 && (
            <Button ml={2} size="lg" variant="ghost" rightIcon={<Icon as={FaChevronUp} />} onClick={handleCollapse}>
              Collapse
            </Button>
          )}
        </Center>
      </VStack>
    </Box>
  );
};
