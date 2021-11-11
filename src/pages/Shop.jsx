import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, SimpleGrid, HStack, Button, Box, VStack, Icon, Flex, Text, Center } from "@chakra-ui/react";
// import LoadingWrapper from "../components/LoadingWrapper";
import LoadingOverlay from "../components/LoadingOverlay";
import { fetchShopItemsByQuery, fetchShopItemsByQueryPaginate } from "../redux/shop/shop.actions";
import { selectItems, selectIsFetchingItems, selectSeachParams } from "../redux/shop/shop.selectors";
import { useLocation, useHistory } from "react-router-dom";
import useThemeColors from "../theme/useThemeColors";
import ItemCard from "../components/ItemCard";
import {
  FaFont,
  FaDollarSign,
  FaStar,
  FaSitemap,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
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
  const [page, setPage] = React.useState(0);
  // console.log("Shop Rendered with Search:", routerLocation.search, "items:", itemsArr);

  const handleAddParams = (param) => {
    const newSearchParams = { ...searchParams, ...param, page: 0 };
    setPage(0);
    setSearchParams(newSearchParams);
    routerHistory.push("?" + new URLSearchParams(newSearchParams).toString());
  };
  const handleNextPage = () => {
    setPage(page + 1);
    dispatch(fetchShopItemsByQueryPaginate({ ...searchParams, page: page + 1 }));
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
    dispatch(fetchShopItemsByQueryPaginate({ ...searchParams, page: page - 1 }));
  };
  React.useEffect(() => {
    const routerSearchParams = {};
    new URLSearchParams(routerLocation.search).forEach((v, k) => (routerSearchParams[k] = v));
    setSearchParams({ ...storeSeachParams, ...routerSearchParams });
    dispatch(fetchShopItemsByQuery({ ...storeSeachParams, ...routerSearchParams }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerLocation, dispatch]);

  return (
    <Container maxW="container.xl">
      <HStack alignItems="flex-start" spacing={8}>
        {/* Side Panel */}
        <VStack alignItems="flex-start" w="200px" spacing={8} py={4}>
          {/* Pick Section */}
          <VStack w="100%">
            <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
              Sections:
            </Text>
            <SelectStack
              optionsArray={sectionOptions}
              handleAddParams={handleAddParams}
              paramName="section"
              active={searchParams.section}
            />
          </VStack>
          {/* Select Sort */}
          <VStack w="100%">
            <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
              Sort by:
            </Text>
            <SelectAscending handleAddParams={handleAddParams} asc={searchParams.asc} />
            <SelectStack
              optionsArray={orderByOptions}
              handleAddParams={handleAddParams}
              paramName="orderBy"
              active={searchParams.orderBy}
            />
          </VStack>
        </VStack>
        {/* Main content */}
        <Box w="100%" minH="30vh">
          <LoadingOverlay isLoading={isFetchingItems}>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {itemsArr && itemsArr.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
            </SimpleGrid>
            {itemsArr && itemsArr.length === 0 && !isFetchingItems && (
              <Center h="40vh" w="100%">
                <Text>No more Items...</Text>
              </Center>
            )}
          </LoadingOverlay>
          <Flex py={8} w="100%" justifyContent="space-between" alignItems="flex-end">
            <Button variant="outline" isDisabled={page === 0} onClick={handlePreviousPage} leftIcon={<Icon as={FaArrowLeft} />}>
              Previous
            </Button>
            <Text fontSize="md" color={colors.textTertiary}>
              - {page + 1} -
            </Text>
            <Button
              variant="outline"
              isDisabled={itemsArr && itemsArr.length < searchParams.limit}
              onClick={handleNextPage}
              rightIcon={<Icon as={FaArrowRight} />}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </HStack>
    </Container>
  );
}

const SelectAscending = ({ handleAddParams, asc }) => {
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
        onChange={() => handleAddParams({ asc: "asc" })}
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
        onChange={() => handleAddParams({ asc: "desc" })}
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

const SelectStack = ({ optionsArray, handleAddParams, paramName, active }) => {
  const colors = useThemeColors();
  return (
    <VStack alignItems="flex-start" sx={{ "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}>
      {optionsArray.map(({ title, icon, value }, idx) => (
        <Box key={idx} w="100%">
          <input
            type="radio"
            checked={active === value}
            onChange={() => handleAddParams({ [paramName]: value })}
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
            onClick={() => handleAddParams({ [paramName]: value })}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Button>
        </Box>
      ))}
    </VStack>
  );
};
