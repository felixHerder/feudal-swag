import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function PriceRange({ label, defaultValue, field, setSearchParams, searchParams, ...props }) {
  const [active, setActive] = React.useState(searchParams[field] && searchParams[field] !== "undefined");
  const defaultNumberValue = searchParams[field] && searchParams[field] !== "undefined" ? searchParams[field] : defaultValue;
  const [numberValue, setNumberValue] = React.useState(defaultNumberValue);
  const handleChange = (value) => {
    setNumberValue(value);
    setActive(true);
    setSearchParams({ ...searchParams, [field]: value });
  };
  const handleToggleActive = () => {
    setActive(!active);
    if (active) {
      setSearchParams({ ...searchParams, [field]: undefined });
    }
    if (!active) {
      setSearchParams({ ...searchParams, [field]: numberValue });
    }
  };
  return (
    <HStack w="100%" {...props} justifyContent="space-between" {...props}>
      <Button isFullWidth borderRadius="md" variant={active ? "solid" : "outline"} onClick={handleToggleActive} size="sm">
        {label}
      </Button>
      <NumberInput
        size="sm"
        defaultValue={defaultNumberValue}
        minW={"100px"}
        min={0}
        max={10000}
        step={100}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
}
