import merge from "deepmerge";

export const nestData = projects => {
  const tree = [];
  projects.forEach(child => {
    const object = child.path
      .split("/")
      .reverse()
      .reduce((acc, val, i) => {
        if (i === 0) {
          return {
            [val]: child
          };
        } else {
          return {
            [val]: {
              tree: { ...acc }
            }
          };
        }
      }, {});
    tree.push(object);
  });
  return merge.all(tree);
};
