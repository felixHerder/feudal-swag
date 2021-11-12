import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, SimpleGrid, HStack, Button, Box, VStack, Icon, Flex, Text, Center } from "@chakra-ui/react";
import { Input, IconButton, InputRightElement, InputLeftElement, InputGroup, CloseButton } from "@chakra-ui/react";
// import LoadingWrapper from "../components/LoadingWrapper";
import LoadingOverlay from "../components/LoadingOverlay";
import { fetchShopItems } from "../redux/shop/shop.actions";
import { selectItems, selectIsFetchingItems, selectSeachParams } from "../redux/shop/shop.selectors";
import { useLocation, useHistory } from "react-router-dom";
import useThemeColors from "../theme/useThemeColors";
import ItemCard from "../components/ItemCard";
import { FaFont, FaDollarSign, FaStar, FaSitemap } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountUpAlt, FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { GiGauntlet, GiGreaves, GiMetalBoot, GiDwarfHelmet, GiBreastplate } from "react-icons/gi";

const orderByOptions = [
  { title: "Alphabetical", value: "name", icon: FaFont },
  { title: "Price", value: "price", icon: FaDollarSign },
  { title: "Rating", value: "ratingAvg", icon: FaStar },
];

const sectionOptions = [
  { title: "All", value: "all", icon: FaSitemap },
  { title: "Breastplates", value: "breastplates", icon: GiBreastplate },
  { title: "Gauntlets", value: "gauntlets", icon: GiGauntlet },
  { title: "Greaves", value: "greaves", icon: GiGreaves },
  { title: "Helmets", value: "helmets", icon: GiDwarfHelmet },
  { title: "Sabatons", value: "sabatons", icon: GiMetalBoot },
];
export default function Shop() {
  const dispatch = useDispatch();
  const routerLocation = useLocation();
  const routerHistory = useHistory();
  const colors = useThemeColors();
  const itemsArr = useSelector(selectItems);
  const storeSeachParams = useSelector(selectSeachParams);
  const isFetchingItems = useSelector(selectIsFetchingItems);
  const [searchParams, setSearchParams] = React.useState({ ...storeSeachParams });

  //push new params state to router history
  const pushSearchParam = (param) => {
    const newSearchParams = { ...searchParams, page: 0, ...param };
    routerHistory.push("?" + new URLSearchParams(newSearchParams).toString());
  };
  const handleSetPage = (val) => {
    const newPage = +searchParams.page + val;
    pushSearchParam({ page: newPage });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    pushSearchParam();
  };
  const handleClearSearch = () => {
    setSearchParams({ ...searchParams, name: "" });
    pushSearchParam({ name: "" });
  };
  //listen for router location changes to modify state and fetch  new items
  React.useEffect(() => {
    const routerSearchParams = {};
    new URLSearchParams(routerLocation.search).forEach((v, k) => (routerSearchParams[k] = v));
    setSearchParams({ ...storeSeachParams, ...routerSearchParams });
    dispatch(fetchShopItems({ ...storeSeachParams, ...routerSearchParams }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerLocation, dispatch]);

  return (
    <Container maxW="container.xl">
      <HStack spacing={8} alignItems="stretch" pb={8}>
        {/* Side Panel */}
        <VStack alignItems="flex-start" w="200px" spacing={8} pt={2}>
          {/* Pick Section */}
          <VStack w="100%">
            <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
              Sections:
            </Text>
            <SelectStack
              optionsArray={sectionOptions}
              pushSearchParam={pushSearchParam}
              paramName="section"
              active={searchParams.section}
            />
          </VStack>
          {/* Select Sort */}
          <VStack w="100%">
            <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
              Sort by:
            </Text>
            <SelectAscending pushSearchParam={pushSearchParam} asc={searchParams.asc} />
            <SelectStack
              optionsArray={orderByOptions}
              pushSearchParam={pushSearchParam}
              paramName="orderBy"
              active={searchParams.orderBy}
            />
          </VStack>
        </VStack>
        {/* Item display */}
        <VStack w="100%" minH="30vh" alignItems="center" justifyContent="space-between" flexGrow="1">
          {/* Search Box Input */}
          <Box pb={4}>
            <InputGroup as="form" onSubmit={handleSearch} maxW="260px">
              <Input
                placeholder="Search by Name"
                focusBorderColor="brand.400"
                value={searchParams.name}
                onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
              />
              {searchParams.name !== "" && (
                <InputLeftElement>
                  <CloseButton size="sm" onClick={handleClearSearch} />
                </InputLeftElement>
              )}
              <InputRightElement>
                <IconButton type="submit" variant="ghost" borderRadius="md" icon={<Icon as={FaSearch} />} />
              </InputRightElement>
            </InputGroup>
          </Box>
          {/* Main display */}
          <LoadingOverlay isLoading={isFetchingItems}>
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={8}>
              {itemsArr && itemsArr.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
            </SimpleGrid>
            {itemsArr && itemsArr.length === 0 && !isFetchingItems && (
              <Center minH="40vh" w="100%" h="100%">
                <Text>No armor found...</Text>
              </Center>
            )}
          </LoadingOverlay>
          {/* Page buttons */}
          <Flex pt={8} w="100%" justifyContent="space-between" alignItems="flex-end">
            <Button
              variant="outline"
              isDisabled={+searchParams.page <= 0}
              onClick={() => handleSetPage(-1)}
              leftIcon={<Icon as={FaArrowLeft} />}
            >
              Previous
            </Button>
            <Text fontSize="md" color={colors.textTertiary}>
              - {+searchParams.page + 1} -
            </Text>
            <Button
              variant="outline"
              isDisabled={itemsArr && itemsArr.length < searchParams.limit}
              onClick={() => handleSetPage(1)}
              rightIcon={<Icon as={FaArrowRight} />}
            >
              Next
            </Button>
          </Flex>
        </VStack>
      </HStack>
    </Container>
  );
}

const SelectAscending = ({ pushSearchParam, asc }) => {
  const colors = useThemeColors();
  return (
    <Flex
      justifyContent="space-between"
      sx={{ gap: 4, "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}
    >
      <input
        type="radio"
        checked={asc === "asc"}
        name="sortOrder"
        id="ascending"
        style={{ visibility: "hidden", position: "absolute" }}
        onChange={() => pushSearchParam({ asc: "asc" })}
      />
      <Button
        as="label"
        htmlFor="ascending"
        cursor="pointer"
        leftIcon={<Icon boxSize={4} as={FaSortAmountUpAlt} />}
        size="sm"
        borderRadius="md"
        isFullWidth
        variant="outline"
      >
        asc
      </Button>
      <input
        type="radio"
        checked={asc === "desc"}
        name="sortOrder"
        id="descending"
        style={{ visibility: "hidden", position: "absolute" }}
        onChange={() => pushSearchParam({ asc: "desc" })}
      />
      <Button
        as="label"
        htmlFor="descending"
        cursor="pointer"
        leftIcon={<Icon boxSize={4} as={FaSortAmountDown} />}
        size="sm"
        borderRadius="md"
        isFullWidth
        variant="outline"
      >
        desc
      </Button>
    </Flex>
  );
};

const SelectStack = ({ optionsArray, pushSearchParam, paramName, active }) => {
  const colors = useThemeColors();
  return (
    <VStack alignItems="flex-start" sx={{ "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}>
      {optionsArray.map(({ title, icon, value }, idx) => (
        <Box key={idx} w="100%">
          <input
            type="radio"
            checked={active === value}
            onChange={() => pushSearchParam({ [paramName]: value })}
            name={paramName}
            id={title}
            style={{ visibility: "hidden", position: "absolute" }}
          />
          <Button
            as="label"
            cursor="pointer"
            borderRadius="md"
            isFullWidth
            justifyContent="space-between"
            rightIcon={<Icon boxSize={5} as={icon} />}
            variant="outline"
            htmlFor={title}
            onClick={() => pushSearchParam({ [paramName]: value })}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Button>
        </Box>
      ))}
    </VStack>
  );
};
