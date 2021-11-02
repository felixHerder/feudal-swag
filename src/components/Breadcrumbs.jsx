import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.split("/").slice(1);
  console.log(breadcrumbs);
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
            const path=breadcrumbs.slice(0, idx + 1).join("/");
            console.log({crumb,path});
            return (
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to={"/"+path}>
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
