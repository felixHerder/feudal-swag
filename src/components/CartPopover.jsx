import React from "react";
import { connect } from "react-redux";
import { setCartHidden, clearItemFromCart } from "../redux/cart/cart.actions";
import { selectCartItemsCount, selectCartTotal, selectCartItemsFromShop, selectCartItemIds, selectIsCartLoading } from "../redux/cart/cart.selectors";
// import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import { Center, Text, Icon, Button, Portal, Box, Image, HStack, VStack, CloseButton } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverFooter } from "@chakra-ui/react";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "./LoadingWrapper";

function CartPopover({ cartHidden, itemCount, setCartHidden, cartItems, cartTotal, cartItemIds, fetchShopItemsByIds, isCartLoading, clearItemFromCart }) {
  React.useEffect(() => {
    // if (cartHidden === false) {
    //   fetchShopItemsByIds(cartItemIds);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartHidden]);

  const colors = useThemeColors();
  const handleClearItem = (item) => {
    clearItemFromCart({ itemId: item.id, sizeId: item.sizeId });
  };
  return (
    <>
      <Popover
        isLazy
        initialFocusRef={null}
        closeOnBlur={false}
        isOpen={!cartHidden}
        onClose={() => {
          setCartHidden(true);
        }}
        placement="bottom"
        arrowSize={16}
      >
        <PopoverTrigger>
          <Button variant="ghost" px={0} position="relative" onClick={() => setCartHidden(!cartHidden)}>
            <Icon as={TrunkIcon} boxSize={6} fill="currentcolor" />
            <Text fontSize="x-small" as="span" position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
              {itemCount}
            </Text>
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="auto" mx={4} bg={colors.cardBg}>
            <PopoverArrow bg={colors.cardBg} />
            <PopoverCloseButton size="lg" mt={1} />
            <PopoverHeader fontSize="lg" py={4} pl={6}>
              Trunk Preview
            </PopoverHeader>
            <PopoverBody p={0} maxH="calc(100vh - 260px)" minH="100px" width="280px" overflowY="auto" bg={colors.cardBg}>
              {cartItems && cartItems.length > 0 && (
                <LoadingWrapper isLoading={isCartLoading}>
                  <VStack spacing={0}>
                    {cartItems.map(
                      (item, idx) =>
                        item && (
                          <HStack spacing={0} w="100%" key={idx} justifyContent="space-between" bg={idx % 2 ? colors.cardBg : colors.cardBgLight} py={2}>
                            <HStack pl={2}>
                              <CloseButton onClick={() => handleClearItem(item)} title="Remove from trunk" />
                              <Image boxSize="56px" src={item.imgurl} alt="cart item" objectFit="cover" objectPosition="center" borderRadius="md" />
                              <Box textAlign="left">
                                <Text fontWeight="bold">x{item.count}</Text>
                                <Text fontSize="sm">{item.sizes[item.sizeId]}sz</Text>
                              </Box>
                            </HStack>

                            <Box textAlign="right" ml="auto" pr={4}>
                              <Text fontWeight="bold">{item.name}</Text>
                              <Text fontSize="sm">${item.price}</Text>
                            </Box>
                          </HStack>
                        )
                    )}
                  </VStack>
                </LoadingWrapper>
              )}
              {/* Empty Cart state */}
              {itemCount === 0 && (
                <Center minH="inherit">
                  <Text className="empty-message">Your trunk is empty</Text>
                </Center>
              )}
            </PopoverBody>
            <PopoverFooter>
              <HStack spacing={12} w="100%" justifyContent="space-between" alignItems="flex-end" px={4} py={1}>
                <Text fontWeight="bold">TOTAL:</Text>
                <Text fontSize="lg">${cartTotal}</Text>
              </HStack>
              <Center px={2}>
                <Button my={2} size="sm" isFullWidth>
                  GO TO TRUNK
                </Button>
              </Center>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

const mapStatetoProps = (state) => ({
  cartHidden: state.cart.hidden,
  itemCount: selectCartItemsCount(state),
  cartItems: selectCartItemsFromShop(state),
  cartTotal: selectCartTotal(state),
  cartItemIds: selectCartItemIds(state),
  isCartLoading: selectIsCartLoading(state),
});
const mapDispatchToProps = {
  setCartHidden,
  clearItemFromCart,
  // fetchShopItemsByIds,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CartPopover);
