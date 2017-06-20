(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
(function() {
    WindCore.blocksRun(WindCore.$body);
})();
},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYmxvY2tzL2J1dHRvbi9qcy9qcy1idXR0b24uanMiLCJwdWJsaWMvc3RhdGUtcHJvamVjdC5idW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKFxuXHRmdW5jdGlvbiAoKSB7XG5cdFx0Ly8g0JfQsNCy0L7QtNC40Lwg0L3QvtCy0YvQuSDQsdC70L7QuiAoY2FsYywg0YLQsNC6INC60LDQuiDQtdGB0YLRjCDQsdC70L7QuiBjYWxjKVxuXHRcdHZhciBwYWNrVGFibGVCbG9jayA9IHt9O1xuXG5cdFx0Ly8g0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xuXHRcdFdpbmRDb3JlLmJsb2NrUmVnaXN0ZXIoXG5cdFx0XHQvLyDQndC+0LLRi9C5INCx0LvQvtC6INC+0LHRitC10LTQuNC90Y/QtdGC0YHRjyDRgSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LwgXCJXaW5kQmxvY2tcIiAo0L/QvtGH0LjRgtCw0YLRjCDQv9C+0LTRgNC+0LHQvdC10LUg0L/RgNC+IGV4dGVuZClcblx0XHRcdCQuZXh0ZW5kKFxuXHRcdFx0XHRwYWNrVGFibGVCbG9jayxcblx0XHRcdFx0V2luZEJsb2NrLCB7XG5cdFx0XHRcdFx0Ly8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnLmpzLXBhcmVudCc7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QsiDRgSDQutC+0YLQvtGA0YvQvNC4INGA0LDQsdC+0YLQsNC10Lxcblx0XHRcdFx0XHRnZXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Ly8g0KHQvtGF0YDQsNC90Y/QtdC8INGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcblx0XHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHRcdFx0Ly8g0JrQu9C40Log0L3QsCDQtNC+0YfQtdGA0L3QuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFx0XHQnY2xpY2snLFxuXHRcdFx0XHRcdFx0XHRcdCcuanMtY2hpbGQnLFxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vINCU0LXQudGB0YLQstC40LVcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdF07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG5cdFx0XHRcdFx0Ly8gJHRhcmdldCAtINC/0L7Qu9GD0YfQsNC10Lwg0LIgZ2V0U2VsZWN0b3Jcblx0XHRcdFx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoJHRhcmdldCkge1xuXHRcdFx0XHRcdFx0Ly8g0KMg0JrQuNGA0LAg0LXRidC1INGA0LDQtyDRg9GC0L7Rh9C90LjRgtGMINGH0YLQviDRjdGC0L4g0LfQsCDRhNC40LPQvdGPXG5cdFx0XHRcdFx0XHR0aGlzLiR0YWJsZSA9ICR0YXJnZXQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQlNC+0LHQsNCy0LjRgtGMINC90L7QstGD0Y4g0YPQv9Cw0LrQvtCy0LrRgyDQsiDRgtCw0LHQu9C40YbRg1xuXHRcdFx0XHRcdGFkZFBhY2tUb1RhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpXG5cdFx0KTtcblx0fSgpXG4pOyIsIihmdW5jdGlvbigpIHtcbiAgICBXaW5kQ29yZS5ibG9ja3NSdW4oV2luZENvcmUuJGJvZHkpO1xufSkoKTsiXX0=
