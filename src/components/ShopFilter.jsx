import { Button, Box, VStack, Icon, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import { GiGauntlet, GiGreaves, GiMetalBoot, GiDwarfHelmet, GiBreastplate } from "react-icons/gi";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { FaFont, FaDollarSign, FaStar, FaSitemap } from "react-icons/fa";
import useThemeColors from "../theme/useThemeColors";
import PriceRange from "./PriceRange";

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

export default function ShopFilter({ pushSearchParam, searchParams, setSearchParams, ...props }) {
  const colors = useThemeColors();
  const handleFilterPrice = () => {
    const { priceMin, priceMax } = searchParams;
    pushSearchParam({ priceMin: priceMin, priceMax: priceMax });
  };
  return (
    <VStack alignItems="flex-start" w="200px" spacing={6} {...props}>
      {/* Pick Section */}
      <VStack w="100%">
        {/* <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
          Sections:
        </Text> */}
        <SelectStack
          optionsArray={sectionOptions}
          pushSearchParam={pushSearchParam}
          paramName="section"
          activeValue={searchParams.section}
        />
      </VStack>
      {/* Select Sort */}
      <VStack w="100%">
        <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
          Order by:
        </Text>
        <SelectAscending pushSearchParam={pushSearchParam} asc={searchParams.asc} />
        <SelectStack
          optionsArray={orderByOptions}
          pushSearchParam={pushSearchParam}
          paramName="orderBy"
          activeValue={searchParams.orderBy}
        />
      </VStack>
      {/* Price Range */}
      <VStack w="100%">
        <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
          Price Range:
        </Text>
        <PriceRange
          label="min"
          field="priceMin"
          defaultValue={100}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <PriceRange
          label="max"
          field="priceMax"
          defaultValue={1000}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <Button variant="outline" size="sm" borderRadius="md" isFullWidth onClick={handleFilterPrice}>
          Set price
        </Button>
      </VStack>
      {/* Min Rating */}
      <VStack w="100%" spacing={1}>
        <Text fontSize="md" fontWeight="bold" color={colors.textSecondary}>
          Min Rating:
        </Text>
        <Flex
          w="100%"
          justifyContent="space-between"
          px={1}
          sx={{
            // "& button svg": { color: colors.cardBgSecondary },
            "&:hover button svg": { color: colors.bgBrand },
            "& button:hover ~ button svg": { color: colors.cardBgSecondary },
          }}
        >
          {new Array(5).fill(0).map((_, idx) => (
            <IconButton
              borderRadius="md"
              color={
                searchParams.ratingMin && searchParams.ratingMin > idx.toString() ? colors.bgBrand : colors.cardBgSecondary
              }
              size="sm"
              p={1}
              variant="ghost"
              key={idx}
              title={`rating button ${idx + 1} stars`}
              icon={<Icon boxSize={5} mb="2px" as={FaStar} />}
              onClick={() => pushSearchParam({ ratingMin: idx + 1 })}
            />
          ))}
        </Flex>
      </VStack>
    </VStack>
  );
}

const SelectAscending = ({ pushSearchParam, asc }) => {
  const colors = useThemeColors();
  return (
    <Flex
      w="100%"
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
const SelectStack = ({ optionsArray, pushSearchParam, paramName, activeValue }) => {
  const colors = useThemeColors();
  return (
    <VStack
      spacing={1}
      w="100%"
      alignItems="stretch"
      sx={{ "input:checked + label": { bg: colors.bgBrand, color: colors.textOnBrand } }}
    >
      {optionsArray.map(({ title, icon, value }, idx) => (
        <Box key={idx} w="100%">
          <input
            type="radio"
            checked={activeValue === value}
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
