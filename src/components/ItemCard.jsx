import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { setCartHidden, addItemToCart } from "../redux/cart/cart.actions";
import { Box, Flex, Image, Text, IconButton, Icon } from "@chakra-ui/react";
import FavIcon from "./FavIcon";
import { ReactComponent as TrunkIcon } from "../assets/trunk.svg";
import useThemeColors from "../theme/useThemeColors";

const ItemCard = ({ item, addItemToCart, setCartHidden,cartHidden }) => {
  const { name, price, imgurl, id, section } = item;
  const { cardBg, textPrice, textSecondary, overlayBg } = useThemeColors();
  const handleAddtoCart = () => {
    if(cartHidden){
      setCartHidden(false);
    }
    addItemToCart({ itemId:id, sizeId: 0 });
  };
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      _hover={{ boxShadow: "lg" }}
      transition="box-shadow .2s ease"
      boxShadow="md"
      _active={{ boxShadow: "outline" }}
    >
      <Box as={RouterLink} to={`/shop/${section}/${id}`} height="160px" w="100%" display="block" position="relative" title="Go to Item Page">
        <Image src={imgurl} h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          bg="transparent"
          sx={{ "&:hover,&:active": { bg: overlayBg } }}
          transition="background .2s ease"
        ></Box>
      </Box>
      <Flex justifyContent="space-between" alignItems="center" my={2} px={3} lineHeight="shorter">
        <Box>
          <Text fontSize="sm" color={textPrice}>
            ${price}
          </Text>
          <Text fontWeight="bold" fontSize="2xl" color={textSecondary}>
            {name}
          </Text>
        </Box>
        <IconButton ml="auto" icon={<FavIcon boxSize={5} isFav={false} mt="3px" />} role="group" variant="ghost" size="md" title="Add to favourites" />
        <IconButton
          ml={1}
          icon={<Icon as={TrunkIcon} fill="currentColor" mt="2px" boxSize={6} />}
          role="group"
          variant="ghost"
          size="md"
          title="Add to trunk"
          onClick={handleAddtoCart}
        />
      </Flex>
    </Box>
  );
};

const mapStatetoProps = (state) => ({
  cartHidden: state.cart.hidden
});
const mapDispatchToProps = {
  setCartHidden,
  addItemToCart,
};

export default connect(mapStatetoProps, mapDispatchToProps)(ItemCard);
