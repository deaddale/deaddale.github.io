module.exports = {
    main: {
        files: [
            {
                expand: true,
                cwd: '<%=project.images %>',
                src: ['**'],
                dest: '<%= project.dist %>/img'
            },
            {
                expand: true,
                cwd: '<%=project.fonts %>',
                src: ['**'],
                dest: '<%= project.dist %>/fonts'
            },

        ]
    }
};