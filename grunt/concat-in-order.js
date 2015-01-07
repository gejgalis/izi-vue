var path = require("path");

module.exports.tasks = {
    concat_in_order: {
        izi: {
            options: {
                extractRequired: function (filepath, filecontent) {
                    var workingdir = path.normalize(filepath).split(path.sep);
                    workingdir.pop();

                    var deps = this.getMatches(/\*\s*@requires\s(.*\.js)/g, filecontent);
                    deps.forEach(function (dep, i) {
                        var dependency = workingdir.concat([dep]);
                        deps[i] = path.join.apply(null, dependency);
                    });
                    return deps;
                },
                extractDeclared: function (filepath) {
                    return [filepath];
                },
                onlyConcatRequiredFiles: true
            },

            files: {
                'dist/izi-js-vue.js': [
                    'LICENSE',
                    'src/sandbox-pre.js',
                    'src/js/org/izi/framework.js',
                    'src/sandbox-post.js'
                ]
            }
        }
    }
};