import React from "react";
import { connect } from "react-redux";
import { fetchShopSections } from "../redux/shop/shop.actions";

import { Container } from "@chakra-ui/react";
import LoadingWrapper from "../components/LoadingWrapper";
import SectionRow from "../components/SectionRow";

function Shop({ sectionsMap, fetchShopSections, isLoading }) {
  //on Comp mount fetch shop sections 
  React.useEffect(() => {
      fetchShopSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

const mapStateToProps = (state) => ({
  sectionsMap: state.shop.sections,
  isLoading: state.shop.isFetchingSections,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
