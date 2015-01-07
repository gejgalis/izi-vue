module.exports.tasks = {
    karma: {
        options: {
            configFile: 'karma.conf.js',
            singleRun: true
        },

        all: {
        },
        phantomjs: {
            options: {
                browsers: ["PhantomJS"]
            }
        }
    }
};