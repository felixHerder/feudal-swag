import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShopData } from "../redux/shop/shop.actions";
import { selectSections } from "../redux/shop/shop.selectors";

import { Container } from "@chakra-ui/react";
import ShopSectionRow from "../components/ShopSectionRow";
import LoadingWrapper from "../components/LoadingWrapper";
import Section from "./Section";
import Item from "./Item";

class Shop extends React.Component {
  componentDidMount() {
    const { sections, fetchShopData } = this.props;
    if (!sections) {
      fetchShopData();
    }
  }
  render() {
    const { isLoading, sections } = this.props;
    return (
      <LoadingWrapper isLoading={isLoading}>
        <Route exact path="/shop/">
          <ShopSections sections={sections} />
        </Route>
        <Route exact path="/shop/:sectionId">
          <Section />
        </Route>
        <Route exact path="/shop/:sectionId/:itemId">
          <Item />
        </Route>
      </LoadingWrapper>
    );
  }
}

const ShopSections = ({ sections }) => (
  <Container maxW="container.xl">
    {Object.keys(sections).map((section, idx) => (
      <ShopSectionRow key={idx} section={section} />
    ))}
  </Container>
);

const mapDispatchToProps = {
  fetchShopData,
};
const mapStateToProps = (state) => ({
  sections: selectSections(state),
  isLoading: state.shop.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
