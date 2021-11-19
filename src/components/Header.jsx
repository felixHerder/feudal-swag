import React, { lazy, Suspense } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Container, HStack, Center, Icon, Heading, IconButton, useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ReactComponent as Logo } from "../assets/banner.svg";
import { IoStorefrontOutline } from "react-icons/io5";
import FavIcon from "./FavIcon";
import { useSelector } from "react-redux";
import { selectFavsItemIdsArr } from "../redux/favs/favs.selectors";
import useThemeColors from "../theme/useThemeColors";
import LoadingWrapper from "./LoadingWrapper";

const UserMenu = lazy(() => import("./UserMenu"));
const CartPopover = lazy(() => import("./CartPopover"));

const Header = () => {
  const favsIds = useSelector(selectFavsItemIdsArr);
  const { pathname: routerPath } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const colors = useThemeColors();
  const [favsBadge, setFavsBadge] = React.useState(false);
  const isMounted = React.useRef(false);
  const oldFavsCount = React.useRef(favsIds.length);
  React.useEffect(() => {
    if (isMounted.current && favsIds.length > 0 && favsIds.length > oldFavsCount.current) {
      setFavsBadge(true);
    }
    oldFavsCount.current = favsIds.length;
    isMounted.current = true;
  }, [favsIds]);
  return (
    <Container
      h="70px"
      maxW="container.xl"
      px={[2, 2, 4]}
      sx={{ userSelect: "none" }}
      display="flex"
      justifyContent="space-between"
    >
      {/* Brand Logo */}
      <Center as={RouterLink} to="/" h="100%" minW={["50px"]}>
        <Icon as={Logo} fill="currentColor" boxSize={8} />
        <Heading as="h1" letterSpacing="tight" size="md" ml={2} display={["none", null, "block"]}>
          Feudal Swag
        </Heading>
      </Center>
      {/* Nav links */}
      <Flex>
        <HStack spacing={[2, 4, 8]} fontSize={["xs", "sm", "md"]} alignItems="center">
          {/*shop desktop link */}
          <Button
            minW="110px"
            display={["none", null, "flex"]}
            variant={routerPath === "/shop" ? "solid" : "ghost"}
            colorScheme="gray"
            as={RouterLink}
            to="/shop"
            px={5}
            rightIcon={<Icon boxSize={5} as={IoStorefrontOutline} />}
          >
            SHOP
          </Button>
          {/*shop mobile link */}
          <IconButton
            display={["flex", null, "none"]}
            variant={routerPath === "/shop" ? "solid" : "ghost"}
            colorScheme="gray"
            as={RouterLink}
            to="/shop"
            icon={<Icon boxSize={5} as={IoStorefrontOutline} />}
          />
          {/* Cart popover toggle button */}
          <Suspense fallback={<LoadingWrapper isLoading={true} size={4} />}>
            <CartPopover />
          </Suspense>
          {/* Favs link and badge*/}
          <Box position="relative">
            <IconButton
              variant={routerPath === "/favs" ? "solid" : "ghost"}
              as={RouterLink}
              to="/favs"
              icon={<FavIcon mt="4px" boxSize={4} />}
              colorScheme="gray"
              px={6}
              onClick={() => setFavsBadge(false)}
            />
            {favsBadge && (
              <Box position="absolute" top="8px" right="8px" boxSize="10px" borderRadius="lg" bg={colors.bgBrand} as="span">
                {favsBadge}
              </Box>
            )}
          </Box>
          {/* User menu options */}
          <Suspense fallback={<LoadingWrapper isLoading={true} size={4} />}>
            <UserMenu />
          </Suspense>
          {/* Theme toggle button */}
          <IconButton
            size="md"
            colorScheme="gray"
            variant="ghost"
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Header;
