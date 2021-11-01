import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchData } from "../redux/shop/shop.actions.js";

import WithSpinner from "../components/with-spinner/with-spinner.component";
import CollectionsOverview from "../components/collections-overview/collections-overview.component";
import CollectionPage from "./collection/collection.component";

// import { db, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <div>
        {/* <Route exact path={`${match.path}/`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} /> */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchData,
};

export default connect(null, mapDispatchToProps)(Shop);
