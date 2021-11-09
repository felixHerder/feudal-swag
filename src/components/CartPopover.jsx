import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setCartHidden, clearItemFromCart } from "../redux/cart/cart.actions";
import {
  selectCartItemsCount,
  selectCartTotal,
  selectCartItemsFromShop,
  selectCartItemIds,
  selectIsCartLoading,
} from "../redux/cart/cart.selectors";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import { Center, Text, Icon, Button, Portal, Box, Image, HStack, VStack, Flex, CloseButton } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverFooter,
} from "@chakra-ui/react";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "./LoadingWrapper";

function CartPopover({ cartHidden, itemCount, setCartHidden, cartItems, cartTotal, isCartLoading, clearItemFromCart }) {
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
            <Text
              fontSize="x-small"
              as="span"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
            >
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
            <PopoverBody
              p={0}
              maxH="calc(100vh - 260px)"
              minH="100px"
              width="280px"
              overflowY="auto"
              bg={colors.cardBg}
            >
              {cartItems && cartItems.length > 0 && (
                <VStack spacing={0} alignItems="flex-start" position="relative">
                  <Box position="absolute" w="100%" h="100%" minH="100%" top="0" bg={colors.overlayBgStrong} display={!isCartLoading && "none"}>
                    <LoadingWrapper isLoading={isCartLoading}/>
                  </Box>
                  {cartItems.map(
                    (item, idx) =>
                      item && (
                        <HStack w="100%" spacing={2} key={idx} bg={idx % 2 ? colors.cardBg : colors.cardBgSecondary} py={2}>
                          <CloseButton ml={2} onClick={() => handleClearItem(item)} title="Remove from trunk" />
                          <Image
                            flexGrow="inherit"
                            boxSize="56px"
                            src={item.imgurlSmall}
                            alt="cart item"
                            objectFit="cover"
                            objectPosition="center"
                            borderRadius="md"
                          />
                          <Flex
                            flexGrow="1"
                            as={RouterLink}
                            to={`/shop/${item.section}/${item.id}`}
                            _hover={{ color: colors.textBrand }}
                            justifyContent="space-between"
                          >
                            <Box textAlign="left">
                              <Text fontWeight="bold">x{item.count}</Text>
                              <Text fontSize="sm">{item.sizes[item.sizeId]}sz</Text>
                            </Box>
                            <Box textAlign="right" ml="auto" pr={4}>
                              <Text fontWeight="bold">{item.name}</Text>
                              <Text fontSize="sm">${item.price}</Text>
                            </Box>
                          </Flex>
                        </HStack>
                      )
                  )}
                </VStack>
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
};

export default connect(mapStatetoProps, mapDispatchToProps)(CartPopover);
