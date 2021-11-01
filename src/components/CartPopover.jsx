import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../redux/cart/cart.actions";
import { selectCartHidden, selectCartItemsCount, selectCartItems } from "../redux/cart/cart.selectors";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
// import CartItem from "./cart-item/car-item.component";

import { Center, Text, Icon, Button, Portal } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react";

function CartPopover({ cartHidden, itemCount, toggleCartHidden, cartItems }) {
  return (
    <>
      <Popover isLazy isOpen={!cartHidden} onClose={toggleCartHidden} placement="bottom-end" arrowSize={16}>
        <PopoverTrigger>
          <Button variant="ghost" px={0} position="relative" onClick={toggleCartHidden}>
            <Icon as={TrunkIcon} boxSize={9} fill="currentcolor" />
            <Text fontSize="x-small" as="span" position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
              {itemCount}
            </Text>
          </Button>
        </PopoverTrigger>

        <Portal>
          <PopoverContent w="auto" m={0}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Center minH="160px">
                <Text className="empty-message">Your trunk is empty</Text>
              </Center>
              <Center px={2}>
                <Button my={2} size="sm" isFullWidth>
                  GO TO CHECKOUT
                </Button>
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

const mapStatetoProps = createStructuredSelector({
  cartHidden: selectCartHidden,
  itemCount: selectCartItemsCount,
  carItems: selectCartItems,
});
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(CartPopover);
