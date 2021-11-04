import React from "react";
import { connect } from "react-redux";
import { fetchShopSections, fetchShopItemsByIds } from "../redux/shop/shop.actions";

import { Container } from "@chakra-ui/react";
import LoadingWrapper from "../components/LoadingWrapper";
import SectionRow from "../components/SectionRow";

function Shop({ sectionsMap, fetchShopSections,fetchShopItemsByIds, isLoading }) {
  //on Comp mount fetch shop sections then on sections update fetch the first 3 items
  React.useEffect(() => {
    if (!sectionsMap) {
      fetchShopSections();
    } else {
      //fetch the first 3 item on each section
      const ids = Object.values(sectionsMap).flatMap((section) => section.slice(0, 3));
      console.log('fetching ids:',ids)
      fetchShopItemsByIds(ids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionsMap]);

  console.log("Shop Rendered with sections:", sectionsMap);
  return (
    <Container maxW="container.xl" mb={8} minH="75vh">
      <LoadingWrapper isLoading={isLoading}>
        {sectionsMap && Object.keys(sectionsMap).map((section, idx) => <SectionRow key={idx} section={section} />)}
      </LoadingWrapper>
    </Container>
  );
}

const mapDispatchToProps = {
  fetchShopSections,
  fetchShopItemsByIds,
};

const mapStateToProps = (state) => ({
  sectionsMap: state.shop.sections,
  isLoading: state.shop.isFetchingSections,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
