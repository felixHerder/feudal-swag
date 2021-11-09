import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cart.actions";
import { selectIsFetchingItems, selectItemById } from "../redux/shop/shop.selectors";
import { addItemToFavs, removeItemFromFavs } from "../redux/favs/favs.actions";
import { Center, Box, Flex, Button, Image, Text, IconButton, Heading,Icon } from "@chakra-ui/react";
import { useDisclosure, useRadio, useRadioGroup, Container, SimpleGrid, VStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import FavIcon from "../components/FavIcon";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "../components/LoadingWrapper";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { selectIsItemFav } from "../redux/favs/favs.selectors";
import Rating from "../components/Rating";
export default function Item() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) => selectItemById(state, itemId));
  const isLoading = useSelector((state) => selectIsFetchingItems(state));
  console.log("Item comp rendered with", { item });
  React.useEffect(() => {
    if (!item) {
      dispatch(fetchShopItemsByIds([itemId]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  return (
    <Container maxW="container.lg" minH="75vh">
      <LoadingWrapper isLoading={isLoading}>{item && <ItemContent item={item} />}</LoadingWrapper>
    </Container>
  );
}

const ItemContent = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imgurlLarge, description, sizes, rating } = item;
  const colors = useThemeColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sizeId, setSizeId] = React.useState(0);
  const isItemFav = useSelector((state) => selectIsItemFav(state, item.id));
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "itemSizes",
    defaultValue: sizeId.toString(),
    onChange: setSizeId,
  });
  const group = getRootProps();
  const handleAddToCart = () => {
    dispatch(addItemToCart({ itemId: item.id, sizeId }));
  };
  const handleAddtoFavs = () => {
    if (isItemFav) {
      dispatch(removeItemFromFavs(item.id));
    } else {
      dispatch(addItemToFavs(item.id));
    }
  };

  return (
    <VStack alignItems="flex-start" spacing={12} mt={[4, 8, 16]}>
      <SimpleGrid columns={[1, 1, 2]} spacingX={12} spacingY={6} alignItems="center">
        {/* Image */}
        <VStack alignItems="center" spacing={8}>
          <Box
            flexGrow="1"
            w="100%"
            cursor="pointer"
            onClick={onOpen}
            borderRadius="md"
            overflow="hidden"
            _active={{ boxShadow: "outline" }}
          >
            <Image src={imgurlLarge} maxH="480px" w="100%" alt="item" objectPosition="center" objectFit="cover" />
          </Box>
        </VStack>
        {/* Item details */}
        <VStack h="100%" alignItems="flex-start" justifyContent="space-between" spacing={4}>
          <Heading size="2xl">{name}</Heading>
          {/* description */}
          <Flex alignItems="center">
            <Rating value={rating.value} size={6} />
            <Text mr={2} fontSize="xl" color={colors.textSecondary} mt={1}>
              {rating.value.toString().concat(".0").slice(0, 3)}
            </Text>
          </Flex>
          <Text color={colors.textSecondary}>{description}</Text>
          {/* Size selection */}
          <Box>
            <Text mb={2} fontSize="lg" color={colors.textSecondary}>
              SELECT SIZE:
            </Text>
            <Flex {...group} sx={{ rowGap: 8, columnGap: 16 }} wrap="wrap">
              {sizes.map((size, idx) => {
                const value = idx.toString();
                const radio = getRadioProps({ value });
                return (
                  <RadioButton key={value} {...radio}>
                    {sizes[idx]}
                  </RadioButton>
                );
              })}
            </Flex>
          </Box>
          {/* Price and buttons */}
          <Text fontSize="5xl" color={colors.textBrand}>
            ${price}
          </Text>
          <Center w="100%" justifyContent="space-between">
            <Button isFullWidth fontWeight="normal" size="md" onClick={handleAddToCart}>
              Add to Trunk
            </Button>
            <IconButton
              icon={<FavIcon boxSize={8} isFav={isItemFav} mt="5px" />}
              role="group"
              variant="outline"
              ml={8}
              size="lg"
              title="Toggle favourite"
              onClick={handleAddtoFavs}
            />
          </Center>
        </VStack>
      </SimpleGrid>
      <Flex w="100%">
        <Heading fontFamily="body">
          User Reviews{" "}
          <Text fontFamily="body" color={colors.textTertiary} fontWeight="normal" as="span">
            ({rating.count})
          </Text>
        </Heading>
        <Button variant="outline" leftIcon={<Icon boxSize={5} as={FaPlus}/>} ml="auto">REVIEW</Button>
      </Flex>
      {/* Item image zoom modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent width="auto" minH="auto" my={16}>
          <ModalCloseButton m={4} bg={colors.bg} _hover={{ bg: colors.cardBg }} _active={{ bg: colors.cardBg }} />
          <Image src={imgurlLarge} alt="item modal" borderRadius="md" />
        </ModalContent>
      </Modal>
    </VStack>
  );
};

function RadioButton(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const { bgSelect, textOnBrand } = useThemeColors();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="full"
        px={6}
        py={1}
        fontSize="xl"
        _checked={{
          bg: bgSelect,
          color: textOnBrand,
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
