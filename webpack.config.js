const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {VueLoaderPlugin} = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const config = {
    mode: 'development',
    entry: {
        main: "./resources/js/app.ts",
    },
    output: {
        publicPath: '/js/',
        path: path.resolve(__dirname, "public/js"),
    },
    plugins: [
        new UglifyJsPlugin(),
        new MiniCssExtractPlugin({
            filename: `components/preload-[name].css`
        }),
        // new WebpackBundleAnalyzer(),
        //new VuetifyLoaderPlugin(),
        new VueLoaderPlugin(),
        // new PreloadWebpackPlugin({
        //     rel: 'preload',
        //     include: 'asyncChunks', // can be 'allChunks' or 'initial' or see more on npm page
        //     fileBlacklist: [/\.map|.js/], // here may be chunks that you don't want to have preloaded
        // })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(mov|mp4|m4v)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue','.ts'],
        alias: {
            'vue$': 'vue/dist/vue.esm-bundler.js'
        }
    },
    optimization: {
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](vue|axios|tailwindcss|jquery|bootstrap|lodash|vue-i18n|vue-router|vuex|vue-lazyload|vue-ls|popper)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
    }
}

module.exports = config
