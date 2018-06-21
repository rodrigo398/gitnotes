import React from "react";
import { connect } from "react-redux";

const Folder = props => {
  const renderChildren = () => {};

  return (
    <div>
      <p>{props.name}</p>
      <ul>{renderChildren()}</ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  project: state.projects.synchronizedProjects.filter(
    project => project.name === ownProps.projectName
  )
});

export default connect(mapStateToProps)(Folder);
