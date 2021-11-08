import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cart.actions";
import { selectIsFetchingItems, selectItemById } from "../redux/shop/shop.selectors";

import { Center, Box, Flex, Button, Image, Text, IconButton, Heading, Container, SimpleGrid, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import FavIcon from "../components/FavIcon";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "../components/LoadingWrapper";
import { fetchShopItemsByIds } from "../redux/shop/shop.actions";

export default function Item() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) => selectItemById(state,itemId));
  const isLoading = useSelector((state) => selectIsFetchingItems(state));
  console.log("Item comp rendered with",{item})
  React.useEffect(() => {
    if (!item) {
      dispatch(fetchShopItemsByIds([itemId]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  return (
    <Container maxW="container.lg" minH="75vh">
      <LoadingWrapper isLoading={isLoading}>
        {item && <ItemContent item={item}/>}
      </LoadingWrapper>
    </Container>
  );
}

const ItemContent = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imgurlLarge, description, sizes } = item;
  const { bg, cardBg, textPrice, textSecondary } = useThemeColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sizeId, setSizeId] = React.useState(0);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "itemSizes",
    defaultValue: sizeId.toString(),
    onChange: setSizeId,
  });
  const group = getRootProps();
  const handleAddToCart = () => {
    dispatch(addItemToCart({ itemId: item.id, sizeId}));
  };
  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing={8} my={[4, 8, 16]} mb={8} alignItems="center">
        {/* Image */}
        <Box maxHeight="480px" h="100%" w="100%" cursor="pointer" onClick={onOpen} borderRadius="md" overflow="hidden" _active={{ boxShadow: "outline" }}>
          <Image src={imgurlLarge} h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
        </Box>
        {/* Item details */}
        <Box display="flex" flexDir="column" h="100%">
          <Heading size="2xl" mb={4}>
            {name}
          </Heading>
          <Text color={textSecondary}>{description}</Text>
          {/* Size selection */}
          <Box my="auto" py={6}>
            <Text mb={2} fontSize="lg" color={textSecondary}>
              SELECT SIZE:
            </Text>
            <Flex {...group} sx={{ rowGap: 8, columnGap: 16 }} wrap="wrap">
              {sizes.map((size,idx) => {
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
          <Text mt="auto" mb={4} fontSize="5xl" color={textPrice}>
            ${price}
          </Text>
          <Center mb={0} justifyContent="space-between">
            <Button isFullWidth fontWeight="normal" size="lg" onClick={handleAddToCart}>
              Add to Trunk
            </Button>
            <IconButton icon={<FavIcon boxSize={6} isFav={false} mt="4px" />} role="group" variant="outline" ml={8} size="lg" />
          </Center>
        </Box>
      </SimpleGrid>
      {/* Item image zoom modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent width="auto" minH="auto" my={16}>
          <ModalCloseButton m={4} bg={bg} _hover={{ bg: cardBg }} _active={{ bg: cardBg }} />
          <Image src={imgurlLarge} alt="item modal" borderRadius="md" />
        </ModalContent>
      </Modal>
    </>
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
