const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist`,
        filename: 'prototypePanel.js',
    },
    plugins: [new MiniCssExtractPlugin(
      {filename: 'prototypePanel.css'}
    )],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
};
