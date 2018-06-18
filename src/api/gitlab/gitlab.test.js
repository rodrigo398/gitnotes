import { STATE_HASH_KEY, ACCESS_TOKEN_KEY, EXPIRES_AT_KEY } from "./constants";
import auth from "./authenticationApi";

describe("Gitlab Constants are correct", () => {
  it("State_HASH_KEY is correct", () => {
    expect(STATE_HASH_KEY).toBe("stateHash");
  });
  it("State_HASH_KEY is correct", () => {
    expect(ACCESS_TOKEN_KEY).toBe("access_token");
  });
  it("State_HASH_KEY is correct", () => {
    expect(EXPIRES_AT_KEY).toBe("expires_at");
  });
});

describe("authenticationApi manages user auth", () => {
  it("clearAuthentication removes ACCESS_TOKEN_KEY and EXPIRES_AT_KEY from local storage", () => {
    auth.clearAuthentication();
    expect(localStorage.removeItem).toBeCalledWith(ACCESS_TOKEN_KEY);
    expect(localStorage.removeItem).toBeCalledWith(EXPIRES_AT_KEY);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
  });
});
