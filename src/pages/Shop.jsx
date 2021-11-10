import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, SimpleGrid, HStack, Button, Box, VStack, Icon, Flex, Text } from "@chakra-ui/react";
import LoadingWrapper from "../components/LoadingWrapper";
import { fetchShopItemsByQuery } from "../redux/shop/shop.actions";
import { selectItems, selectIsFetchingItems } from "../redux/shop/shop.selectors";
import { useLocation, useHistory } from "react-router-dom";
import useThemeColors from "../theme/useThemeColors";
import ItemCard from "../components/ItemCard";
import { FaFont, FaDollarSign, FaStar, FaSitemap, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
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
  const isFetchingItems = useSelector(selectIsFetchingItems);
  const [searchParams, setSearchParams] = React.useState({ limit: 6, section: "gauntlets", orderBy: "name", asc: "asc" });
  const [page, setPage] = React.useState(0);
  console.log("Shop Rendered with Search:", routerLocation.search, "items:", itemsArr);

  const handleAddParams = (param) => {
    const newSearchParams = { ...searchParams, ...param };
    setSearchParams(newSearchParams);
    setPage(0);
    const searchString = new URLSearchParams(newSearchParams).toString();
    routerHistory.push("?" + searchString);
    dispatch(fetchShopItemsByQuery(newSearchParams));
  };
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    dispatch(fetchShopItemsByQuery({ ...searchParams, page: "next" }));
  };
  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
    dispatch(fetchShopItemsByQuery({ ...searchParams, page: "prev" }));
  };

  React.useEffect(() => {}, []);
  console.log(isFetchingItems)
  return (
    <Container maxW="container.xl">
      <HStack alignItems="flex-start" spacing={8}>
        {/* Side Panel */}
        <VStack alignItems="flex-start" w="200px" spacing={4}>
          {/* Pick Section */}
          <Box w="100%">
            <Text fontSize="xl" fontWeight="bold" color={colors.textSecondary}>
              Sections:
            </Text>
            <SelectStack optionsArray={sectionOptions} handleAddParams={handleAddParams} paramName="section" />
          </Box>
          {/* Select Sort */}
          <Box w="100%">
            <Text fontSize="xl" fontWeight="bold" color={colors.textSecondary} mb={2}>
              Sort by:
            </Text>
            <SelectAscending handleAddParams={handleAddParams} />
            <SelectStack optionsArray={orderByOptions} handleAddParams={handleAddParams} paramName="orderBy" />
          </Box>
        </VStack>
        {/* Main content */}
        <Box w="100%" minH="65vh">
          <LoadingWrapper isLoading={isFetchingItems}>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {itemsArr && itemsArr.map((item, idx) => item && <ItemCard key={idx} item={item} />)}
            </SimpleGrid>
            <Flex my={4} w="100%" justifyContent="space-between" alignItems="center">
              <Button isDisabled={page === 0} onClick={handlePreviousPage}>
                Previous
              </Button>
              <Text fontSize="xl">{page}</Text>
              <Button isDisabled={itemsArr && itemsArr.length < searchParams.limit} onClick={handleNextPage}>
                Next
              </Button>
            </Flex>
          </LoadingWrapper>
        </Box>
      </HStack>
    </Container>
  );
}

const SelectAscending = ({ handleAddParams }) => {
  const colors = useThemeColors();
  return (
    <Flex
      justifyContent="space-between"
      sx={{ gap: 4, "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}
    >
      <input type="radio" defaultChecked name="sortOrder" id="ascending" style={{ visibility: "hidden", position: "absolute" }} />
      <Button
        as="label"
        htmlFor="ascending"
        cursor="pointer"
        leftIcon={<Icon boxSize={4} as={FaSortAmountUpAlt} />}
        size="sm"
        borderRadius="md"
        isFullWidth
        variant="outline"
        onClick={() => handleAddParams({ asc: "asc" })}
      >
        asc
      </Button>
      <input type="radio" name="sortOrder" id="descending" style={{ visibility: "hidden", position: "absolute" }} />
      <Button
        as="label"
        htmlFor="descending"
        cursor="pointer"
        leftIcon={<Icon boxSize={4} as={FaSortAmountDown} />}
        size="sm"
        borderRadius="md"
        isFullWidth
        variant="outline"
        onClick={() => handleAddParams({ asc: "desc" })}
      >
        desc
      </Button>
    </Flex>
  );
};

const SelectStack = ({ optionsArray, handleAddParams, paramName }) => {
  const colors = useThemeColors();
  return (
    <VStack alignItems="flex-start" sx={{ "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}>
      {optionsArray.map(({ title, icon, value }, idx) => (
        <>
          <input
            key={idx}
            type="radio"
            defaultChecked={idx === 0}
            name={paramName}
            id={title}
            style={{ visibility: "hidden", position: "absolute" }}
          />
          <Button
            as="label"
            cursor="pointer"
            borderRadius="md"
            key={idx * 2 + 1}
            isFullWidth
            justifyContent="space-between"
            rightIcon={<Icon boxSize={5} as={icon} />}
            variant="outline"
            htmlFor={title}
            onClick={() => handleAddParams({ [paramName]: value })}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Button>
        </>
      ))}
    </VStack>
  );
};
