import React from "react";
import { connect } from "react-redux";
import { fetchData, fetchDataFailed } from "../redux/shop/shop.actions";
import { selectItems, selectSections, selectSectionItems } from "../redux/shop/shop.selectors";

import { Container } from "@chakra-ui/react";
import ShopSectionRow from "../components/ShopSectionRow";

class Shop extends React.Component {
  componentDidMount() {
    const { items, sections, fetchDataFailed } = this.props;
    fetchDataFailed();
    if (!sections || !items) {
      // fetchData();
    }
  }
  render() {
    const { isLoading, sections } = this.props;
    return (
    <Container maxW="container.xl">
      <LoadingWrapper isLoading>
       <ShopSections sections={sections} />
      </LoadingWrapper> 
    </Container>
    );
  }
}
const LoadingWrapper = ({isLoading,children,...props})=>{
  return(
    <>
    {isLoading ? <div>Loading</div> :children}
    </>
  )
}
const ShopSections = ({ sections }) => Object.keys(sections).map((section, idx) => <ShopSectionRow key={idx} section={section} />);

const mapDispatchToProps = {
  fetchData,
  fetchDataFailed,
};
const mapStateToProps = (state) => ({
  sections: selectSections(state),
  items: selectItems(state),
  getSectionItems: (section) => selectSectionItems(state, section),
  isLoading: state.shop.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
