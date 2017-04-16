module.exports = {
    develop: {
        files: {
            '<%= project.js %>/<%= project.name %>-run.js': [
                // '<%= project.blocks %>/**/js/*.js',
                '<%= project.app %>/*.js'
            ]
        },
        options: {
            browserifyOptions: {
                debug: true
            }
        }
    }
};
