import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, SimpleGrid, HStack, Button,  VStack, Icon, Flex, Text, Center, Select } from "@chakra-ui/react";
import { Input, IconButton, InputRightElement, InputLeftElement, InputGroup, CloseButton } from "@chakra-ui/react";
import LoadingOverlay from "../components/LoadingOverlay";
import { fetchShopItems } from "../redux/shop/shop.actions";
import { selectItems, selectIsFetchingItems, selectSeachParams, selectSearchResults } from "../redux/shop/shop.selectors";
import { useLocation, useHistory } from "react-router-dom";
import useThemeColors from "../theme/useThemeColors";
import ItemCard from "../components/ItemCard";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import ShopFilter from "../components/ShopFilter";

export default function Shop() {
  const dispatch = useDispatch();
  const routerLocation = useLocation();
  const routerHistory = useHistory();
  const colors = useThemeColors();
  const itemsArr = useSelector(selectItems);
  const storeSeachParams = useSelector(selectSeachParams);
  const storeSearchResults = useSelector(selectSearchResults);
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
        <ShopFilter pushSearchParam={pushSearchParam} searchParams={searchParams} setSearchParams={setSearchParams} />
        {/* Main Item panel */}
        <VStack spacing={6} w="100%" minH="30vh" alignItems="flex-start" justifyContent="space-between" flexGrow="1">
          <Flex justifyContent="space-between" w="100%" alignItems="flex-end" wrap="wrap">
            {/* Search Box Input */}
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
            {/* Select items per page */}
            <Select
              borderRadius="md"
              size="sm"
              maxW="160px"
              mt={2}
              variant="outline"
              color={colors.textSecondary}
              pl={1}
              focusBorderColor="brand.400"
              title="Items per page"
              onChange={(e) => pushSearchParam({ limit: e.target.value })}
              value={searchParams.limit}
            >
              <option value="6">6 items per page</option>
              <option value="12">12 items per page</option>
              <option value="24">24 items per page</option>
            </Select>
          </Flex>
          {/* Item grid */}
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
          {/* Page controlls */}
          <Flex w="100%" justifyContent="space-between" alignItems="flex-end">
            <Button
              variant="outline"
              isDisabled={+searchParams.page <= 0}
              onClick={() => handleSetPage(-1)}
              leftIcon={<Icon as={FaArrowLeft} />}
            >
              Previous
            </Button>
            <Text fontSize="md" color={colors.textTertiary}>
              - {+searchParams.page + 1} of {Math.ceil(storeSearchResults / +searchParams.limit)} -
            </Text>
            <Button
              variant="outline"
              isDisabled={+searchParams.page >= storeSearchResults / +searchParams.limit - 1}
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
