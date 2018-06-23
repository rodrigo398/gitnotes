import { STATE_HASH_KEY, ACCESS_TOKEN_KEY, EXPIRES_AT_KEY } from "./constants";
import auth from "./authenticationApi";
import configuration from "../../config";

describe("authenticationApi", () => {
  describe("constants values", () => {
    it("STATE_HASH_KEY is correct", () => {
      expect(STATE_HASH_KEY).toBe("stateHash");
    });
    it("ACCESS_TOKEN_KEY is correct", () => {
      expect(ACCESS_TOKEN_KEY).toBe("access_token");
    });
    it("EXPIRES_AT_KEY is correct", () => {
      expect(EXPIRES_AT_KEY).toBe("expires_at");
    });
  });

  it("should clear authentication data when clearAuthentication is called", () => {
    auth.clearAuthentication();

    expect(localStorage.removeItem).toBeCalledWith(ACCESS_TOKEN_KEY);
    expect(localStorage.removeItem).toBeCalledWith(EXPIRES_AT_KEY);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
  });

  it("should redirect the user to gitlab OAuth page when initiateAuthentication is called", () => {
    const callbackUrl = "https://gitnotes.skillcamp.io";
    const stateHash = "atotalltarbitrarystatehash";

    auth.initateAuthentication({
      callbackUrl,
      stateHash
    });

    expect(localStorage.setItem).toBeCalledWith(STATE_HASH_KEY, stateHash);

    expect(location.replace).toHaveBeenCalledWith(
      `https://gitlab.com/oauth/authorize?\
client_id=${configuration.gitlab.gitnotesApplicationId}\
&redirect_uri=https%3A%2F%2Fgitnotes.skillcamp.io&response_type=token\
&state=atotalltarbitrarystatehash`
    );
  });

  describe("getAuthenticationData", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should not initialze a session when stateHash is not equal to the one received on a valid OAuth response data", () => {
      const now = Date.now();
      Date.now = jest.genMockFunction().mockReturnValue(now);

      const storage = {
        [STATE_HASH_KEY]: JSON.stringify(42),
        [EXPIRES_AT_KEY]: null
      };

      jest.spyOn(localStorage, "getItem").mockImplementation(key => {
        return storage[key];
      });

      jest.spyOn(localStorage, "setItem").mockImplementation((key, value) => {
        storage[key] = value;
      });

      location.hash =
        "#access_token=anAccessToken&token_type=bearer&state=1529702783752";

      const authenticationData = auth.getAuthenticationData();

      expect(authenticationData).toBeUndefined();
    });

    it("should initialize a session when location.hash contains a valid OAuth response data", () => {
      const now = Date.now();
      Date.now = jest.genMockFunction().mockReturnValue(now);

      const storage = {
        [STATE_HASH_KEY]: JSON.stringify(1529702783752)
      };

      jest.spyOn(localStorage, "getItem").mockImplementation(key => {
        return storage[key];
      });

      jest.spyOn(localStorage, "setItem").mockImplementation((key, value) => {
        storage[key] = value;
      });

      location.hash =
        "#access_token=anAccessToken&token_type=bearer&state=1529702783752";

      const authenticationData = auth.getAuthenticationData();

      expect(localStorage.setItem).toHaveBeenCalledWith(
        EXPIRES_AT_KEY,
        `${3600 * 1000 + now}`
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY,
        `anAccessToken`
      );
      expect(authenticationData).toBeTruthy();
      expect(authenticationData.accessToken).toBe("anAccessToken");
      expect(authenticationData.tokenExpiration).toBe(`${now + 1000 * 3600}`);
    });

    it("should not initialize a session when location.hash does not contain OAuth response data", () => {
      const now = Date.now();
      Date.now = jest.genMockFunction().mockReturnValue(now);

      const expectedLocalStorageValues = {
        [ACCESS_TOKEN_KEY]: JSON.stringify("anAccessToken"),
        [EXPIRES_AT_KEY]: JSON.stringify(0),
        [STATE_HASH_KEY]: JSON.stringify(1529702783752)
      };

      location.hash =
        "#a totally arbitrary hash value not containing OAuth data";

      jest
        .spyOn(localStorage, "getItem")
        .mockImplementation(value => expectedLocalStorageValues[value]);

      auth.getAuthenticationData();

      expect(localStorage.setItem).not.toHaveBeenCalledWith(EXPIRES_AT_KEY);
      expect(localStorage.setItem).not.toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);

      Date.now.mockRestore();
    });

    it("should return undefined the user is not authenticated", () => {
      const now = Date.now();
      Date.now = jest.genMockFunction().mockReturnValue(now);

      const expectedLocalStorageValues = {
        [ACCESS_TOKEN_KEY]: JSON.stringify("anAccessToken"),
        [EXPIRES_AT_KEY]: JSON.stringify(now - 3600), // defining expires_at value < current date
        [STATE_HASH_KEY]: JSON.stringify(1529702783752)
      };

      jest
        .spyOn(localStorage, "getItem")
        .mockImplementation(value => expectedLocalStorageValues[value]);

      location.hash = "";

      const authenticationData = auth.getAuthenticationData();

      expect(authenticationData).toBeUndefined();
      Date.now.mockRestore();
    });

    it("should return a valid access token data when the user is authenticated", () => {
      const now = Date.now();
      Date.now = jest.genMockFunction().mockReturnValue(now);

      const expectedLocalStorageValues = {
        [ACCESS_TOKEN_KEY]: "anAccessToken",
        [EXPIRES_AT_KEY]: now + 3600, // defining expires_at value > current date
        [STATE_HASH_KEY]: 1529702783752
      };

      jest
        .spyOn(localStorage, "getItem")
        .mockImplementation(value => expectedLocalStorageValues[value]);

      location.hash = "";

      const authenticationData = auth.getAuthenticationData();

      expect(authenticationData).toBeTruthy();
      expect(authenticationData.accessToken).toBe("anAccessToken");
      expect(authenticationData.tokenExpiration).toBe(now + 3600);

      Date.now.mockRestore();
    });
  });
});
