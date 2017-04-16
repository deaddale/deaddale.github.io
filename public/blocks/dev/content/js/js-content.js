(
    function () {
        // Заводим новый блок (calc, так как есть блок calc)
        var contentBlock = {};

        // Регистрация
        WindCore.blockRegister(
            // Новый блок объединяется с существующим "WindBlock" (почитать подробнее про extend)
            $.extend(
                contentBlock,
                WindBlock, {
                    // Устанавливаем родительский блок
                    getSelector: function () {
                        return '.js-content';
                    },
                    // Возвращает массив объектов с которыми работаем
                    getBindings: function () {
                        // Сохраняем текущий контекст
                        var self = this;

                        return [
                        ];
                    },
                    // Вызывается при загрузке странице
                    // $target - получаем в getSelector
                    initialize: function ($target) {
                        
                    }
                }
            )
        );
    }()
);
