module.exports = {
    build: {
        src: [
            '<%= project.js %>/<%= project.name %>-base.js',
        ],
        dest: '<%= project.js %>/<%= project.name %>.min.js'
    }
};
