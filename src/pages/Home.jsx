import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../redux/directory/directory.selectors";

import MenuItem from "../components/menu-item/menu-item.component";

const Homepage = ({ sections }) => (
  <div>
    {sections.map(({ id, ...othersectionProps }) => (
      <MenuItem key={id} {...othersectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});
export default connect(mapStateToProps)(Homepage);
