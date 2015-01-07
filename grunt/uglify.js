var grunt = require("grunt");

module.exports.tasks = {
    uglify: {
        options: {
            sourceMap: true,
            banner: grunt.file.read('LICENSE')
        },

        izi: {
            files: {
                "dist/izi-js-vue.min.js": "dist/izi-js-vue.js"
            }
        }
    }
};