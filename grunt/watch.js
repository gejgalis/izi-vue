module.exports.tasks = {
    watch: {
        options: {
            spawn: false,
            livereload: true,
            livereloadOnError: false,
            interrupt: true
        },

        izi: {
            files: [
                'src/js/**/*.js'
            ],
            tasks: [
                'compile'
            ]
        },
        examples: {
            files: [
                'examples/**/*.*'
            ]
        }
    }
};