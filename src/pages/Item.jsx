import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addCartItem, toggleCartHidden } from "../redux/cart/cart.actions";
import { selectItemById } from "../redux/shop/shop.selectors";

import { Center, Box, Flex, Button, Image, Text, IconButton, Heading, Container, SimpleGrid, useDisclosure, useRadio, useRadioGroup, } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import FavIcon from "../components/FavIcon";
import useThemeColors from "../theme/useThemeColors";

function Item({ getItem, hidden }) {
  const { itemId } = useParams();
  const item = getItem(itemId);
  const { name, price, imgurl,imgurlLarge, description, sizes } = item;
  const { bg, cardBg, textPrice, textSecondary } = useThemeColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //eslint-disable-next-line
  const [size, setSize] = React.useState(sizes[0]);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "itemSizes",
    defaultValue: sizes[0].toString(),
    onChange: setSize,
  });
  const group = getRootProps();

  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={[1, 1, 2]} spacing={8} my={[4, 8, 16]} mb={8} alignItems="center">
        {/* Image */}
        <Box maxHeight="480px" h="100%" w="100%" cursor="pointer" onClick={onOpen} borderRadius="md" overflow="hidden" _active={{ boxShadow: "outline" }}>
          <Image src={imgurl} h="100%" w="100%" alt="item" objectPosition="center" objectFit="cover" />
        </Box>
        {/* Item details */}
        <Box display="flex" flexDir="column" h="100%">
          <Heading size="2xl" mb={4}>
            {name}
          </Heading>
          <Text color={textSecondary}>{description}</Text>
          {/* Size selection */}
          <Box my="auto" py={6}>
            <Text mb={2} fontSize="lg" color={textSecondary} >
              SELECT SIZE:
            </Text>
            <Flex {...group} sx={{rowGap:8,columnGap:16}} wrap="wrap">
              {sizes.map((size) => {
                const value = size.toString();
                const radio = getRadioProps({ value });
                return (
                  <RadioButton key={value} {...radio}>
                    {value}
                  </RadioButton>
                );
              })}
            </Flex>
          </Box>
          {/* Price and buttons */}
          <Text mt="auto" mb={4} fontSize="5xl"  color={textPrice}>
            ${price}
          </Text>
          <Center mb={0} justifyContent="space-between">
            <Button isFullWidth fontWeight="normal" size="lg">
              Add to Trunk
            </Button>
            <IconButton icon={<FavIcon boxSize={6} isFav={false} mt="4px" />} role="group" variant="outline" ml={8} size="lg" />
          </Center>
        </Box>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="full" >
        <ModalOverlay />
        <ModalContent width="auto" minH="auto" my={16}>
          <ModalCloseButton m={4} bg={bg} _hover={{ bg: cardBg }} _active={{ bg: cardBg }} />
          <Image src={imgurlLarge} alt="item modal" borderRadius="md" />
        </ModalContent>
      </Modal>
    </Container>
  );
}

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

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItem(item)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  getItem: (id) => selectItemById(state, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
