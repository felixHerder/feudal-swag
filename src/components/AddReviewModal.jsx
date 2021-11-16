import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Button, Text, Icon, IconButton, VStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, Textarea } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
import { submitReview } from "../redux/reviews/reviews.actions";
import { selectIsReviewSubmiting } from "../redux/reviews/reviews.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";

export default function AddReviewModal({ itemId, isAddReviewOpen, setAddReviewOpen }) {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const reviewsError = useSelector((state) => state.reviews.error);
  const isReviewSubmiting = useSelector(selectIsReviewSubmiting);
  const [newRating, setNewRating] = React.useState(0);
  const [newComment, setNewComment] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const prevReviewSubmiting = React.useRef(isReviewSubmiting);
  React.useEffect(() => {
    if (prevReviewSubmiting.current === true && isReviewSubmiting === false && !reviewsError) {
      setAddReviewOpen(false);
    }
    prevReviewSubmiting.current = isReviewSubmiting;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewSubmiting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setErrorMsg("Please select a star rating");
      return;
    }
    if (newComment === "") {
      setErrorMsg("Please write a review comment");
      return;
    }
    if (newComment.length < 12) {
      setErrorMsg("Please write a review of min. 12 characters");
      return;
    }
    setErrorMsg("");
    setNewComment("");
    setNewRating(0);
    dispatch(submitReview(itemId, newRating, newComment, currentUser.uid, currentUser.displayName));
  };

  return (
    <Modal isOpen={isAddReviewOpen} onClose={() => setAddReviewOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md" py={3}>
          Add a Review
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack as="form" w="100%" spacing={4} mb={4} onSubmit={handleSubmit}>
            {/* Star Rating */}
            <Flex
              sx={{
                // "& button svg": { color: colors.cardBgSecondary },
                "&:hover button svg": { color: colors.bgBrand },
                "& button:hover ~ button svg": { color: colors.cardBgSecondary },
              }}
            >
              {new Array(5).fill(0).map((_, idx) => (
                <IconButton
                  borderRadius="md"
                  size="lg"
                  color={idx < newRating ? colors.bgBrand : colors.cardBgSecondary}
                  p={4}
                  variant="ghost"
                  key={idx}
                  title={`rating button ${idx + 1} stars`}
                  icon={<Icon boxSize={9} mb="2px" as={FaStar} onClick={() => setNewRating(idx + 1)} />}
                />
              ))}
            </Flex>
            <Textarea
              placeholder="Write your review comment here"
              focusBorderColor="brand.400"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button isLoading={isReviewSubmiting} type="submit" isFullWidth>
              Submit
            </Button>
            {errorMsg !== "" && <Text color="red.400">{errorMsg} </Text>}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
