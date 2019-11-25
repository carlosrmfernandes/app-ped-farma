module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    https: false,
    disableHostCheck: true,
    proxy: process.env.BASE_URL
  },
};
