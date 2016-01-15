var webpack = require("webpack");
var common = require("./webpack-common");

module.exports.tasks = {
    webpack: {
        options: {

            devtool: "sourcemap",

            externals: common.externals,

            module: {
                loaders: common.loaders
            },

            plugins: common.plugins.concat([
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin()
            ]),

            bail: true,
            stats: false,
            progress: false
        },

        js: {
            entry: common.entryJS,

            output: {
                path: "dist",
                filename: "[name].js",
                library: "izi",
                libraryTarget: "umd"
            }
        }
    }
};
