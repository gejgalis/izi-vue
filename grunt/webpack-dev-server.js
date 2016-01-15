
var common = require("./webpack-common");
var _ = require("lodash");

module.exports.tasks = {
    "webpack-dev-server": {
        "izi-js-vue": {

            webpack: {

                entry: _.extend({
                    "example-es6": "./examples/es6/js/app.js"
                }, common.entryJS),

                output: {
                    filename: "[name].js",
                    library: "izi",
                    libraryTarget: "umd"
                },

                devtool: "source-map",

                externals: common.externals,

                module: {
                    loaders: common.loaders
                },

                plugins: common.plugins

            },

            stats: {
                colors: true,
                modules: false,
                reasons: true
            },

            progress: false,
            port: 6655,
            keepalive: true
        }
    }
};
