import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cart.actions";
import { addItemToFavs, removeItemFromFavs } from "../redux/favs/favs.actions";
import { Center, Box, Flex, Button, Image, Text, IconButton, Heading,  } from "@chakra-ui/react";
import { useDisclosure, useRadio, useRadioGroup,  SimpleGrid, VStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import FavIcon from "../components/FavIcon";
import useThemeColors from "../theme/useThemeColors";
import { selectIsItemFav } from "../redux/favs/favs.selectors";
import Rating from "../components/Rating";

export default function ItemDetails({ item }){
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
    <>
      <SimpleGrid columns={[1, 1, 2]} spacingX={12} spacingY={6} alignItems="center">
        {/* Image */}
          <Box
            flexGrow="1"
            w="100%"
            h="100%"
            cursor="pointer"
            onClick={onOpen}
            borderRadius="md"
            overflow="hidden"
            _active={{ boxShadow: "outline" }}
          >
            <Image src={imgurlLarge} maxH="480px" h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
          </Box>
        {/* Item details */}
        <VStack h="100%" alignItems="flex-start" justifyContent="space-between" spacing={4}>
          <Heading size="2xl">{name}</Heading>
          {/* description */}
          <Flex alignItems="center">
            <Rating value={rating.value} size={6} />
            <Text mr={2} fontSize="2xl" color={colors.textSecondary} mt={1}>
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
              icon={<FavIcon boxSize={7} isFav={isItemFav} mt="5px" />}
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

      {/* Item image zoom modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent width="auto" minH="auto" my={16}>
          <ModalCloseButton m={4} bg={colors.bg} _hover={{ bg: colors.cardBg }} _active={{ bg: colors.cardBg }} />
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
