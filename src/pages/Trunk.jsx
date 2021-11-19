import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearItemFromCart, fetchCartItems, addItemToCart, removeItemFromCart, setCartHidden } from "../redux/cart/cart.actions";
import { selectCartTotal, selectCartItemIds, selectCartItemsArr, selectIsCartLoading } from "../redux/cart/cart.selectors";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import { Container, Heading, Text, VStack, CloseButton, HStack, Image, Center } from "@chakra-ui/react";
import { Flex, IconButton, Icon, Grid, GridItem } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
import StripeCheckoutButton from "../components/StripeCheckoutButton";
import LoadingOverlay from "../components/LoadingOverlay";
import { selectCurrentUser } from "../redux/user/user.selectors";

export default function Trunk() {
  const dispatch = useDispatch();
  const isCartLoading = useSelector(selectIsCartLoading);
  const cartItems = useSelector(selectCartItemsArr);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemIds = useSelector(selectCartItemIds);
  const colors = useThemeColors();
  const currentUser = useSelector(selectCurrentUser);
  const handleClearItem = (item) => {
    dispatch(clearItemFromCart({ itemId: item.id, sizeId: item.sizeId }));
  };
  const handleAddItem = (item) => {
    dispatch(addItemToCart({ itemId: item.id, sizeId: item.sizeId }));
  };
  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart({ itemId: item.id, sizeId: item.sizeId }));
  };
  React.useEffect(() => {
    dispatch(fetchCartItems());
    return () => {
      dispatch(setCartHidden(true));
    };
  }, [cartItemIds, dispatch]);
  return (
    <Container maxW="container.lg" minH="65vh">
      {/* Title */}
      <Heading textAlign="center" size="2xl" mt={[4, 6]} mb={[8, 12]} textTransform="capitalize">
        Trunk <Icon fill="currentcolor" as={TrunkIcon} />
      </Heading>
      <LoadingOverlay isLoading={isCartLoading}>
        {cartItems && cartItems.length > 0 && (
          <>
            {/* Cart Items */}
            <VStack spacing={8} alignItems="flex-start">
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map(
                  (item, idx) =>
                    item && (
                      <Flex
                        w="100%"
                        key={idx}
                        alignItems="stretch"
                        position="relative"
                        sx={{ columnGap: [8, 16] }}
                        border="1px solid"
                        borderColor={colors.cardBg}
                        borderRadius="md"
                        overflow="clip"
                      >
                        <Image
                          minW={["120px", "160px"]}
                          w={["120px", "160px"]}
                          h={["160px", "160px"]}
                          src={item.imgurlSmall}
                          alt="cart item"
                          objectFit="cover"
                          objectPosition="center"
                        />
                        <Grid
                          p={1}
                          templateColumns={["repeat(2,1fr)", "repeat(4,1fr)", null, "repeat(5,1fr)"]}
                          columnGap={4}
                          rowGap={1}
                          w="100%"
                          alignItems="center"
                        >
                          <GridItem colSpan={[2, 2]} w={["80%", "auto"]}>
                            {/* Name */}
                            <Heading
                              as={RouterLink}
                              to={`/shop/${item.section}/${item.name}?id=${item.id}`}
                              _hover={{ color: colors.textBrand }}
                              size="lg"
                              fontFamily="body"
                            >
                              {item.name}
                            </Heading>
                          </GridItem>
                          <Text fontSize="md">size {item.sizes[+item.sizeId]}</Text>
                          <Text fontSize="2xl">${item.price * item.count}</Text>
                          <GridItem colSpan={[2, 2, 2, 1]} justifySelf={["flex-start", null, null, "center"]}>
                            <HStack justifyContent="start">
                              <IconButton size="sm" icon={<Icon as={FaMinus} />} onClick={() => handleRemoveItem(item)} />
                              <Text fontWeight="bold" fontSize="xl" w={9} textAlign="center">
                                x{item.count}
                              </Text>
                              <IconButton size="sm" icon={<Icon as={FaPlus} />} onClick={() => handleAddItem(item)} />
                            </HStack>
                          </GridItem>
                        </Grid>
                        <CloseButton
                          mt={1}
                          mr={1}
                          size="md"
                          position="absolute"
                          top="0"
                          right="0"
                          onClick={() => handleClearItem(item)}
                          title="Remove from trunk"
                        />
                      </Flex>
                    )
                )}
            </VStack>
            {/* Total */}
            <HStack spacing={4} w="100%" justifyContent="space-between" alignItems="center" p={4}>
              <Text fontSize="lg" fontWeight="bold">
                TOTAL:
              </Text>
              <Heading as="h5" fontFamily="body" size="xl">
                ${cartTotal}
              </Heading>
            </HStack>
            {/* Chekcout */}
            <Flex mb={4} w="100%" justifyContent="flex-end">
              <StripeCheckoutButton price={cartTotal} currentUser={currentUser} />
            </Flex>
            <Text mb={4} textAlign="right" size="sm" color={colors.textTertiary}>
              *Please use the following test credit card for payments*
              <br />
              4242 4242 4242 4242 4242 - Exp: 01/22 - CW: 123
            </Text>
          </>
        )}
        {(!cartItems || cartItems.length === 0) && !isCartLoading && (
          <Center minH="50vh">
            <Text textAlign="center" fontFamily="body" fontSize="xl">
              Your trunk is empty. Checkout out the shop!
            </Text>
          </Center>
        )}
      </LoadingOverlay>
    </Container>
  );
}
