const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: '/', // Ruta pública para los recursos (importante para el despliegue)
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // Solo usar MiniCssExtractPlugin.loader y css-loader
                use: [MiniCssExtractPlugin.loader, "css-loader"], 
                exclude: [/node_modules\/leaflet/,/node_modules\/bootstrap/], // Excluir el CSS de leaflet y bootstrap para que no sean procesados como módulos
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[name][ext]'
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css", 
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/imgs", to: "imgs" },
                { from: "src/components", to: "components" }
            ],
        }),
    ],
    devServer: {
        static: './dist',
        port: 8081, 
    },
    mode: 'development'
};