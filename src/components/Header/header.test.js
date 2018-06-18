import React from "react";
import { shallow } from "enzyme";

import { Header } from "./index";

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
    props = {
      logout: () => {},
      isAuthenticated: false,
      name: undefined,
      avatarUrl: undefined
    };
    mountedHeader = undefined;
  });
  it("Header Renders", () => {
    expect(header()).toBeTruthy();
    expect(
      header()
        .find("h1")
        .text()
    ).toBe("GitNotes");
  });
  it("Login button is shown", () => {
    expect(
      header()
        .find({ to: "/login" })
        .props().children
    ).toBe("Login Page");
  });
  it("When logged in login button is not visible", () => {
    props = { ...props, isAuthenticated: true };
    expect(
      header()
        .find({ to: "/login" })
        .exists()
    ).toBe(false);
  });
});
