var path = require("path");

module.exports = {
    entryJS: {
        "izi-vue": "./src/main/index"
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
