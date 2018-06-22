import projectApi from "./projectsApi";
const { mapToProjectRepositoryTree } = projectApi;

const mockResponse = [
  {
    name: "group",
    type: "tree",
    path: "group"
  },
  {
    name: "subgroup",
    type: "tree",
    path: "group/subgroup"
  },
  {
    name: "index.md",
    type: "blob",
    path: "group/index.md"
  },
  {
    name: "index.md",
    type: "blob",
    path: "group/subgroup/index.md"
  },
  {
    name: "index.md",
    type: "blob",
    path: "index.md"
  }
];

describe("projectApi", () => {
  it("should parse gitlab project response to a correct structure", () => {
    expect(mapToProjectRepositoryTree(mockResponse)).toEqual({
      tree: {
        group: {
          name: "group",
          type: "tree",
          path: "group",
          tree: {
            "index.md": {
              name: "index.md",
              type: "blob",
              path: "group/index.md"
            },
            subgroup: {
              name: "subgroup",
              type: "tree",
              path: "group/subgroup",
              tree: {
                "index.md": {
                  name: "index.md",
                  type: "blob",
                  path: "group/subgroup/index.md"
                }
              }
            }
          }
        },
        "index.md": {
          name: "index.md",
          type: "blob",
          path: "index.md"
        }
      }
    });
  });
  it("should return empty object, if passed an empty array", () => {
    expect(mapToProjectRepositoryTree([])).toEqual({});
  });
  it("should handle deep nesting", () => {
    expect(
      mapToProjectRepositoryTree([
        {
          name: "index.md",
          type: "blob",
          path: "group/subgroup/subgroup2/subgroup3/index.md"
        }
      ])
    ).toEqual({
      tree: {
        group: {
          tree: {
            subgroup: {
              tree: {
                subgroup2: {
                  tree: {
                    subgroup3: {
                      tree: {
                        "index.md": {
                          name: "index.md",
                          type: "blob",
                          path: "group/subgroup/subgroup2/subgroup3/index.md"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });
  it("should return a single item", () => {
    expect(
      mapToProjectRepositoryTree([
        {
          name: "index.md",
          type: "blob",
          path: "index.md"
        }
      ])
    ).toEqual({
      tree: {
        "index.md": {
          name: "index.md",
          type: "blob",
          path: "index.md"
        }
      }
    });
  });
  it("should return a single empty folder", () => {
    expect(
      mapToProjectRepositoryTree([
        {
          name: "group",
          type: "tree",
          path: "group"
        }
      ])
    ).toEqual({
      tree: {
        group: {
          name: "group",
          type: "tree",
          path: "group"
        }
      }
    });
  });
  it("should filter out non - '.md' files", () => {
    expect(
      mapToProjectRepositoryTree([
        {
          name: "index.md",
          type: "blob",
          path: "index.md"
        },
        {
          name: "app.js",
          type: "blob",
          path: "app.js"
        }
      ])
    ).toEqual({
      tree: {
        "index.md": {
          name: "index.md",
          type: "blob",
          path: "index.md"
        }
      }
    });
  });
});
