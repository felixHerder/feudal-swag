import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import FavIcon from "./FavIcon";
import TrunkIcon from "./TrunkIcon";
import useThemeColors from "../theme/useThemeColors";
import { addItemToCart } from "../redux/cart/cart.actions";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectIsItemInCart } from "../redux/cart/cart.selectors";
import { addItemToFavs, removeItemFromFavs } from "../redux/favs/favs.actions";
import { makeSelectIsItemFav } from "../redux/favs/favs.selectors";

const ItemCard = ({ item }) => {
  const { name, price, imgurl, id, section } = item;
  const { cardBg, textPrice, textSecondary, overlayBg } = useThemeColors();

  const dispatch = useDispatch();
  const selectIsItemInCartInstance = React.useMemo(() => makeSelectIsItemInCart(id), [id]);
  const isItemInCart = useSelector((state) => selectIsItemInCartInstance(state));

  const selectIsItemFavIstance = React.useMemo(() => makeSelectIsItemFav(id), [id]);
  const isItemFav = useSelector((state) => selectIsItemFavIstance(state));

  const handleAddtoCart = () => {
    dispatch(addItemToCart({ itemId: id, sizeId: 0 }));
  };
  const handleAddtoFavs = () => {
    if (isItemFav) {
      dispatch(removeItemFromFavs(item.id));
    } else {
      dispatch(addItemToFavs(item.id));
    }
  };
  console.log("Item Card: ", item.id, " rendered");
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
      <Box
        as={RouterLink}
        to={`/shop/${section}/${id}`}
        height="160px"
        w="100%"
        display="block"
        position="relative"
        title="Go to Item Page"
      >
        <Image src={imgurl} h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          bg="transparent"
          sx={{ "&:hover,&:active": { bg: overlayBg } }}
          transition="background .2s ease"
        />
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
        <IconButton
          ml="auto"
          icon={<FavIcon boxSize={5} isFav={isItemFav} mt="3px" />}
          role="group"
          variant="ghost"
          size="md"
          title="Toggle favourite"
          onClick={handleAddtoFavs}
        />
        <IconButton
          ml={1}
          icon={<TrunkIcon isInCart={isItemInCart} fill="currentColor" mt="2px" boxSize={6} />}
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

// const mapStatetoProps = (state, ownProps) => {
//   const selectIsItemFavInstance = makeSelectIsItemFav();
//   // const selectIsItemInCartInstance = makeSelectIsItemInCart();
//   const realMapStateToProps = {
//     isItemFav: selectIsItemFavInstance(state, ownProps.item.id),
//     isItemInCart: selectIsItemInCart(state, ownProps.item.id),
//   };
//   return realMapStateToProps;
// };
// const mapDispatchToProps = {
//   addItemToCart,
//   addItemToFavs,
//   removeItemFromFavs,
// };

// export default connect(mapStatetoProps, mapDispatchToProps)(ItemCard);
export default ItemCard;
