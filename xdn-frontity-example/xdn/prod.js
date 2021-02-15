module.exports = async function prod(port) {
  await require("@frontity/core").serve({ isHttps: false, port });
};
