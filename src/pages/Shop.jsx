import React from "react";
import { connect } from "react-redux";
import { fetchShopSections, fetchShopItemsByIds } from "../redux/shop/shop.actions";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@chakra-ui/react";
import LoadingWrapper from "../components/LoadingWrapper";
import SectionRow from "../components/SectionRow";
import { selectFirstNItemsBySection, selectIsFetchingSections, selectSections } from "../redux/shop/shop.selectors";

function Shop() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFetchingSections);
  const sectionsMap = useSelector(selectSections);
  const shopSectionsArr = useSelector(selectFirstNItemsBySection);
  //on Comp mount fetch shop sections
  React.useEffect(() => {
    dispatch(fetchShopSections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (sectionsMap) {
      const idsToFetch = Object.values(sectionsMap).flatMap((sectionArr) => sectionArr.slice(0, 3));
      dispatch(fetchShopItemsByIds(idsToFetch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionsMap]);

  console.log("Shop Rendered with sections:", shopSectionsArr);
  return (
    <Container maxW="container.xl" mb={8} minH="75vh">
      <LoadingWrapper isLoading={isLoading}>
        {shopSectionsArr &&
          shopSectionsArr.map(({ section, items }, idx) => <SectionRow key={idx} section={section} items={items} />)}
      </LoadingWrapper>
    </Container>
  );
}

export default Shop;
