import React from "react";
import { connect } from "react-redux";
import { fetchShopData } from "../redux/shop/shop.actions";
import { selectSections } from "../redux/shop/shop.selectors";

import { Container } from "@chakra-ui/react";
import ShopSectionRow from "../components/ShopSectionRow";
import LoadingWrapper from "../components/LoadingWrapper";

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
      <Container maxW="container.xl">
        <LoadingWrapper isLoading={isLoading}>
          <ShopSections sections={sections} />
        </LoadingWrapper>
      </Container>
    );
  }
}
const ShopSections = ({ sections }) => Object.keys(sections).map((section, idx) => <ShopSectionRow key={idx} section={section} />);
const mapDispatchToProps = {
  fetchShopData,
};
const mapStateToProps = (state) => ({
  sections: selectSections(state),
  isLoading: state.shop.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
