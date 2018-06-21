import projectApi from "./projectsApi";

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

const nestedTree = projectApi.nestProjectRepositoryTree(mockResponse);

describe("correctly nests Gitlab's project tree response", () => {
  it("nestProjectRepositoryTree() is correct", () => {
    expect(nestedTree).toEqual({
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
});
