import React from "react";
import { connect } from "react-redux";
import { setCartHidden } from "../redux/cart/cart.actions";
import { selectCartItemsCount, selectCartItemsFromShop } from "../redux/cart/cart.selectors";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import { Center, Text, Icon, Button, Portal, Box, Image, HStack, VStack,Divider } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverFooter } from "@chakra-ui/react";
import useThemeColors from "../theme/useThemeColors";

function CartPopover({ cartHidden, itemCount, setCartHidden, cartItems }) {
  // React.useEffect(()=>console.log(cartItems),[])
  const {cardBg,bg} = useThemeColors()
  return (
    <>
      <Popover
        isLazy
        isOpen={!cartHidden}
        onClose={() => {
          setCartHidden(true);
        }}
        placement="bottom-end"
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
          <PopoverContent w="auto" m={0}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Trunk Preview</PopoverHeader>
            <PopoverBody p={0}>
              {/* {cartItems && cartItems.length > 0 && (
                <VStack spacing={0}>
                  {cartItems.map((item, idx) => (
                    <HStack spacing={12} w="100%" key={idx} justifyContent="space-between" bg={idx%2?cardBg : bg} px={4} py={2}>
                      <HStack>
                        <Image boxSize="56px" src={item.imgurl} alt="cart item" objectFit="cover" objectPosition="center" borderRadius="md" />
                        <Box textAlign="left" >
                          <Text fontWeight="bold">x{item.count}</Text>
                          <Text fontSize="sm">{item.sizes[item.sizeId]}sz</Text>
                        </Box>
                      </HStack>
                      <Box textAlign="right" ml="auto" >
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm">${item.price}</Text>
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              )} */}

              {/* Empty Cart state */}
              {itemCount === 0 && (
                <Center minH="160px">
                  <Text className="empty-message">Your trunk is empty</Text>
                </Center>
              )}
            </PopoverBody>
            <PopoverFooter>
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
});
const mapDispatchToProps = {
  setCartHidden,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CartPopover);
