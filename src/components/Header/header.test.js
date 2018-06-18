import React from "react";
import { shallow } from "enzyme";

import Header from "./index";

describe("Header Component Test", () => {
  let props;
  let mountedHeader;
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = shallow(<Header {...props} />);
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props = {};
    mountedHeader = undefined;
  });
  it("Header Renders", () => {
    header();
    expect(header()).toBeTruthy();
  });
});
