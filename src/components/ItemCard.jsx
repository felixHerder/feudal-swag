import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Text, IconButton, VStack } from "@chakra-ui/react";
import FavIcon from "./FavIcon";
import TrunkIcon from "./TrunkIcon";
import useThemeColors from "../theme/useThemeColors";
import { addItemToCart } from "../redux/cart/cart.actions";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectIsItemInCart } from "../redux/cart/cart.selectors";
import { addItemToFavs, removeItemFromFavs } from "../redux/favs/favs.actions";
import { makeSelectIsItemFav } from "../redux/favs/favs.selectors";
import Rating from "./Rating";

const ItemCard = ({ item, key, ...props }) => {
  const { name, price, imgurl, id, section, rating } = item;
  const colors = useThemeColors();

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
    <VStack
      alignItems="flex-start"
      borderRadius="lg"
      overflow="hidden"
      bg={colors.bg}
      border="1px solid"
      borderColor={colors.cardBg}
      _hover={{ boxShadow: "lg" }}
      transition="box-shadow .2s ease"
      // boxShadow="lg"
      _active={{ boxShadow: "outline" }}
      {...props}
    >
      {/* Card Image Container */}
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
        {/*Image Hover Overlay */}
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          bg="transparent"
          sx={{ "&:hover,&:active": { bg: colors.overlayBg } }}
          transition="background .2s ease"
        />
      </Box>
      {/* Card Footer */}
      <VStack
        lineHeight="shorter"
        w="100%"
        alignItems="flex-start"
        justifyContent="space-between"
        px={4}
        py={2}
        flexGrow="1"
      >
        {/* Title */}
        <Flex w="100%" alignItems="center">
          <Text
            mr={2}
            as={RouterLink}
            to={`/shop/${section}/${id}`}
            fontWeight="bold"
            fontSize="2xl"
            letterSpacing="wide"
            _hover={{ color: colors.textBrand }}
            _active={{ color: colors.textBrand }}
          >
            {name}
          </Text>
          {/* Heart Button */}
          <IconButton
            ml="auto"
            icon={<FavIcon boxSize={6} isFav={isItemFav} mt="3px" />}
            role="group"
            variant="ghost"
            size="md"
            title="Toggle favourite"
            onClick={handleAddtoFavs}
          />
        </Flex>
        {/* Rating */}
        <Flex alignItems="center">
          <Rating value={rating.value} size={4} />
          <Text ml={2} fontSize="md" color={colors.textSecondary}>
            ({rating.count})
          </Text>
        </Flex>
        {/* Bottom Row - Price and Buttons */}
        <Flex justifyContent="space-between" w="100%" alignItems="center">
          <Box>
            <Text fontSize="2xl" letterSpacing="tighter" fontWeight="bold">
              $ {price}
            </Text>
          </Box>
          {/* Trunk Buttons */}
          <IconButton
            ml="auto"
            mr={-1}
            icon={<TrunkIcon isInCart={isItemInCart} fill="currentColor" mt="2px" boxSize={8} />}
            role="group"
            variant="ghost"
            size="lg"
            title="Add to trunk"
            onClick={handleAddtoCart}
          />
        </Flex>
      </VStack>
    </VStack>
  );
};
export default ItemCard;
