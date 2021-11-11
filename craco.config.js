const { ESLINT_MODES } = require("@craco/craco");
module.exports = {
  webpack: {
    configure: {
      devtool: "eval-source-map",
    },
  },
  eslint: {
    mode: ESLINT_MODES.extends,
    configure: () => {
      return {
        overrides: [
          {
            files: ["*.jsx"],
            rules: {
              "no-unused-vars": "off",
            },
          },
        ],
      };
    },
  },
};
