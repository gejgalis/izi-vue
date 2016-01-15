var path = require("path");

module.exports = {
    entryJS: {
        "izi-js-vue": "./src/main/js/izi-js-vue"
    },

    loaders: [
        {
            test: /\.js?$/,
            loader: "babel",
            include: [
                path.resolve("src"),
                path.resolve("examples")
            ],
            query: {
                presets: ["es2015"],
                plugins: ["transform-runtime"]
            }
        }
    ],

    plugins: []
};
