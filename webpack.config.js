module.exports = {
    entry: './src/js/main.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist`,
        filename: 'prototypePanel.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
};