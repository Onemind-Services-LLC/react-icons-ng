const path = require("path");
const createNextPWA = require("@ducanh2912/next-pwa").default;

const withPWA = createNextPWA({
  disable: process.env.NODE_ENV !== "production",
  dest: "public",
  register: true,
  scope: "/",
});

module.exports = withPWA({
  output: "export",
  assetPrefix: process.env.BASE_PATH || "",
  basePath: process.env.BASE_PATH || "",

  webpack: (config, { isServer }) => {
    // Fix fs module for client builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }

    // Aliases
    config.resolve.alias["@components"] = path.join(
      __dirname,
      "src/components",
    );
    config.resolve.alias["@styles"] = path.join(__dirname, "src/styles");
    config.resolve.alias["@utils"] = path.join(__dirname, "src/utils");

    return config;
  },
});
