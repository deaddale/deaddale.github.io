module.exports = function (grunt) {

    var path = require('path');

    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {

        configPath: path.join(process.cwd(), 'grunt'),

        jitGrunt: {
            staticMappings: {
                htmlrender: 'grunt-htmlrender'
            }
        },

        data: {
            project: {
                name: 'portfolio-project',
                app: 'public',
                dist: '<%=project.app %>/dist',
                scss: '<%=project.app %>/<%=project.name%>.scss',
                js: '<%=project.dist %>/js',
                blocks: '<%=project.app %>/blocks',
                libs: '<%=project.app %>/libs',
                modules: '<%=project.app %>/modules',
                images: '<%=project.app %>/img',
                fonts: '<%=project.app %>/fonts',
                tpls: 'templates'
            }
        }
    });
};
