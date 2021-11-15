import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function BreadCrumbs() {
  const { pathname, search } = useLocation();
  const breadcrumbs = pathname.split("/").slice(1);
  return (
    <Container maxW="container.xl" pb={4}>
      {breadcrumbs[0] ? (
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((crumb, idx) => {
            let path = breadcrumbs.slice(0, idx + 1).join("/");
            path = idx === breadcrumbs.length - 1 ? path + search : path;
            return (
              <BreadcrumbItem key={idx}>
                <BreadcrumbLink as={RouterLink} to={"/" + path}>
                  {crumb}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      ) : null}
    </Container>
  );
}
