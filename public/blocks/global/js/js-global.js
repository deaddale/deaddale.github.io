(
	function () {
		// Заводим новый блок (calc, так как есть блок calc)
		var packTableBlock = {};

		// Регистрация
		WindCore.blockRegister(
			// Новый блок объединяется с существующим "WindBlock" (почитать подробнее про extend)
			$.extend(
				packTableBlock,
				WindBlock, {
					// Устанавливаем родительский блок
					getSelector: function () {
						return '.js-parent';
					},
					// Возвращает массив объектов с которыми работаем
					getBindings: function () {
						// Сохраняем текущий контекст
						var self = this;

						return [
							// Клик на дочерний блок
							[
								'click',
								'.js-child',
								function (event) {
									event.preventDefault();
									// Действие
								}
							]
						];
					},
					// Вызывается при загрузке странице
					// $target - получаем в getSelector
					initialize: function ($target) {
						// У Кира еще раз уточнить что это за фигня
						this.$table = $target;
					},
					// Добавить новую упаковку в таблицу
					addPackToTable: function () {
						var self = this;
					}
				}
			)
		);
	}()
);