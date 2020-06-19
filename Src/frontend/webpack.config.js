import HtmlWebpackPlugin from "html-webpack-plugin";
const api_key = process.env.REACT_APP_API_KEY;

module.exports = {
  entry: "index.js",
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./public/index.html",

      // Pass the full url with the key!
      apiUrl: `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${api_key}`,
    }),
  ],
};
