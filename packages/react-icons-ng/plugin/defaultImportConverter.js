module.exports = (babel, options) => {
  return {
    name: "default-import-converter",
    visitor: {
      ImportDeclaration(path) {
        path.node.specifiers = path.node.specifiers.map((spec) =>
          options.keys.includes(spec.local.name)
            ? babel.types.ImportDefaultSpecifier(spec.local)
            : spec,
        );
      },
    },
  };
};
