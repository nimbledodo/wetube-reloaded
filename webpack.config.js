const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  mode: "development",
  watch: true, //이렇게 하면 매번 npm run assets를 다시 시작하지 않아도 됨
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true, // 이렇게 하면 지난 것을 지우고 다시 만듬
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // 마지막에 사용하는 것부터 먼저 적어야 함
        // sass-loader: scss-> css변경
        //css-loader: css파일을 읽어서 javascript에서 사용가능한 string으로 반환
        //style-loader: css-loader가 반환한 값을 실제로 dom에 <style> 태그로 넣는다
      },
    ],
  },
};
