module.exports = {
    htmlrender: {
        options: {
            src: ['<%= project.blocks %>/**/*.html', 'templates/sources/*.html', '<%= project.blocks %>/**/**/*.html'], //Все возможные пути, для поиска TPL
            vars: {} // Объявление переменных, доступных внутри TPL
        },
        files: [
            {
                expand: true, // Включает и отключает указание пути в свойстве cwd
                cwd: 'templates/sources', // Путь к файлу сборщика TPL
                src: ['main.html'], // Название файлов сборщика TPL, важно! Эти файлы должны так же находиться в options.src
                dest: 'templates', // Папка для собранных файлов
                ext: '.html' // Ограничение набора файлов для построения карты маршрутов
            }
        ]
    }
};