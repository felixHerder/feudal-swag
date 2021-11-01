import React from "react";
import { connect } from "react-redux";
import { addCartItem, toggleCartHidden } from "../redux/cart/cart.actions";
import { Center, Box, Flex, Button, Image, Text, useColorModeValue,Heading } from "@chakra-ui/react";

const Item = ({ item, addCartItem, toggleCartHidden, hidden }) => {
  const { name, price, imgurl } = item;
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const textPrice = useColorModeValue("brand.700", "brand.100");
  const textName = useColorModeValue("gray.600", "gray.200");
  const handleClick = () => {
    if (hidden) toggleCartHidden();
    addCartItem(item);
  };
  return (
    <Box borderRadius="lg" overflow="hidden" bg={cardBg} _hover={{ boxShadow: "lg" }} transition="box-shadow .2s ease" boxShadow="md">
      <Box height="160px" w="100%">
        <Image src={imgurl} h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
      </Box>
      <Flex justifyContent="space-between" alignItems="center" my={3} px={4} lineHeight="short">
        <Text fontWeight="bold" fontSize="lg" color={textName}>{name}</Text>
        <Text fontSize="md" color={textPrice}>${price}</Text>
      </Flex>
      <Center mb={5}>
        <Button size="sm"  fontWeight="normal" width="50%"  onClick={handleClick}>
          Add to Trunk
        </Button>
      </Center>
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItem(item)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
