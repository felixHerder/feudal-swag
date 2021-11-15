import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Button, Text, Heading, Icon, Box, Select, Center, SimpleGrid, IconButton } from "@chakra-ui/react";
import { FaPlus, FaChevronDown, FaTrash } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
import LoadingOverlay from "../components/LoadingOverlay";
import { fetchReviewsById, clearStoreReviews, deleteReview, fetchUserReviewed } from "../redux/reviews/reviews.actions";
import { selectReviews, selectAreReviewsFetching, selectUserReviewd } from "../redux/reviews/reviews.selectors";
import Rating from "../components/Rating";
import { selectCurrentUser } from "../redux/user/user.selectors";
import AddReviewModal from "./AddReviewModal";
import SigninupModal from "./SigninupModal";

export default function ItemReviews({ item }) {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const areReviewsFetching = useSelector(selectAreReviewsFetching);
  const currentUser = useSelector(selectCurrentUser);
  const didUserReview = useSelector(selectUserReviewd);
  const [countLoaded, setCountLoaded] = React.useState(6);
  const [sortBy, setSortBy] = React.useState({ sort: "date", by: "desc" });
  const reviewsArr = useSelector(selectReviews);
  const [isAddReviewOpen, setAddReviewOpen] = React.useState(false);
  const [isSigninOpen, setSigninOpen] = React.useState(false);
  const handleLoadMore = () => setCountLoaded((prev) => prev + 6);

  React.useEffect(() => {
    dispatch(fetchReviewsById(item.id, countLoaded, sortBy));
  }, [countLoaded, sortBy, dispatch, item.id]);
  React.useEffect(() => {
    currentUser && dispatch(fetchUserReviewed(item.id, currentUser.uid));
  }, [currentUser, dispatch, item.id]);
  //clear store of reviews on unmount
  React.useEffect(() => {
    currentUser && dispatch(fetchUserReviewed(item.id, currentUser.uid));
    return () => {
      dispatch(clearStoreReviews());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectSortBy = (e) => {
    const [sort, by] = e.target.value.split("-");
    setSortBy({ sort, by });
  };

  const handleDeleteReview = () => {
    dispatch(deleteReview(item.id, currentUser.uid));
  };

  const handleAddReview = () => {
    if (!currentUser.isAnonymous) {
      setAddReviewOpen(true);
    } else {
      setSigninOpen(true);
    }
  };

  return (
    <Box pb={8} w="100%" minH="20vh">
      {/* Reviews Header */}
      <Flex mb={2} w="100%" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Flex wrap="wrap" flexGrow="1" alignItems="center">
          <Heading fontFamily="body" size="xl" mr={4} mb={1}>
            Reviews{" "}
            <Text fontFamily="body" color={colors.textTertiary} fontWeight="normal" as="span">
              ({item.reviewCount})
            </Text>
          </Heading>
          {/* Add review button */}
          <Button
            isDisabled={didUserReview}
            variant="outline"
            size="sm"
            my={1}
            leftIcon={<Icon as={FaPlus} />}
            onClick={handleAddReview}
          >
            Add a Review
          </Button>
        </Flex>
        {/* Select Sort By */}
        <Select
          my={2}
          maxW="160px"
          borderRadius="md"
          size="sm"
          variant="outline"
          color={colors.textSecondary}
          focusBorderColor="brand.400"
          title="Sort comments by"
          onChange={handleSelectSortBy}
        >
          <option value="date-desc">Sort by Date New</option>
          <option value="date-asc">Sort by Date Old</option>
          <option value="rating-desc">Sort by Rating High</option>
          <option value="rating-asc">Sort by Rating Low</option>
        </Select>
      </Flex>
      {/* Reviews Content */}
      <LoadingOverlay isLoading={areReviewsFetching}>
        <SimpleGrid columns={[1, 1, 2]} alignItems="flex-start" spacingY={6} spacingX={16} mt={4} px={[1, 2, 4]}>
          {reviewsArr &&
            reviewsArr.map((review, idx) => (
              <Box key={idx} w="100%">
                <Flex w="100%" alignItems="flex-end">
                  <Text fontSize={["lg", "xl"]} fontWeight="bold" as="h4" color={colors.textSecondary}>
                    {review.name}
                  </Text>
                  {/* delete review for current user */}
                  {currentUser && currentUser.uid === review.id && (
                    <IconButton size="sm" ml={"auto"} variant="ghost" icon={<Icon as={FaTrash} />} onClick={handleDeleteReview} />
                  )}
                </Flex>
                <Flex alignItems="center" mt={1} mb={2}>
                  <Rating value={review.rating} />
                  <Text lineHeight="1" ml={2} color={colors.textSecondary} fontSize="md">
                    {review.date.toDate().toLocaleDateString("en-Gb", { day: "numeric", month: "long", year: "numeric" })}
                  </Text>
                </Flex>
                <Text textAlign="justify" color={colors.textTertiary}>
                  {review.comment}
                </Text>
              </Box>
            ))}
        </SimpleGrid>
        {/* Load more button*/}
        <Center w="100%" pb={4} pt={6}>
          <Button
            isDisabled={reviewsArr.length <= 0 || reviewsArr.length >= item.reviewCount}
            size="lg"
            variant="ghost"
            rightIcon={<Icon as={FaChevronDown} />}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Center>
      </LoadingOverlay>

      {/* Add Review Modal */}
      <AddReviewModal itemId={item.id} {...{ isAddReviewOpen, setAddReviewOpen }} />
      <SigninupModal isOpen={isSigninOpen} onClose={() => setSigninOpen(false)} label="Please sign in or sign up to review" />
    </Box>
  );
}
