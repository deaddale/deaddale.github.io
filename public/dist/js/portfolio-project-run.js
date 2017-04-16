(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
(function() {
    WindCore.blocksRun(WindCore.$body);
})();
},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYmxvY2tzL2Rldi9jb250ZW50L2pzL2pzLWNvbnRlbnQuanMiLCJwdWJsaWMvYmxvY2tzL2dsb2JhbC9qcy9qcy1nbG9iYWwuanMiLCJwdWJsaWMvcG9ydGZvbGlvLXByb2plY3QuYnVuZGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDQl9Cw0LLQvtC00LjQvCDQvdC+0LLRi9C5INCx0LvQvtC6IChjYWxjLCDRgtCw0Log0LrQsNC6INC10YHRgtGMINCx0LvQvtC6IGNhbGMpXG4gICAgICAgIHZhciBjb250ZW50QmxvY2sgPSB7fTtcblxuICAgICAgICAvLyDQoNC10LPQuNGB0YLRgNCw0YbQuNGPXG4gICAgICAgIFdpbmRDb3JlLmJsb2NrUmVnaXN0ZXIoXG4gICAgICAgICAgICAvLyDQndC+0LLRi9C5INCx0LvQvtC6INC+0LHRitC10LTQuNC90Y/QtdGC0YHRjyDRgSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LwgXCJXaW5kQmxvY2tcIiAo0L/QvtGH0LjRgtCw0YLRjCDQv9C+0LTRgNC+0LHQvdC10LUg0L/RgNC+IGV4dGVuZClcbiAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgIGNvbnRlbnRCbG9jayxcbiAgICAgICAgICAgICAgICBXaW5kQmxvY2ssIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG4gICAgICAgICAgICAgICAgICAgIGdldFNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy5qcy1jb250ZW50JztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8g0JLQvtC30LLRgNCw0YnQsNC10YIg0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIg0YEg0LrQvtGC0L7RgNGL0LzQuCDRgNCw0LHQvtGC0LDQtdC8XG4gICAgICAgICAgICAgICAgICAgIGdldEJpbmRpbmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQodC+0YXRgNCw0L3Rj9C10Lwg0YLQtdC60YPRidC40Lkg0LrQvtC90YLQtdC60YHRglxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8g0JLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbQtVxuICAgICAgICAgICAgICAgICAgICAvLyAkdGFyZ2V0IC0g0L/QvtC70YPRh9Cw0LXQvCDQsiBnZXRTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSgpXG4pO1xuIiwiKFxuXHRmdW5jdGlvbiAoKSB7XG5cdFx0Ly8g0JfQsNCy0L7QtNC40Lwg0L3QvtCy0YvQuSDQsdC70L7QuiAoY2FsYywg0YLQsNC6INC60LDQuiDQtdGB0YLRjCDQsdC70L7QuiBjYWxjKVxuXHRcdHZhciBwYWNrVGFibGVCbG9jayA9IHt9O1xuXG5cdFx0Ly8g0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xuXHRcdFdpbmRDb3JlLmJsb2NrUmVnaXN0ZXIoXG5cdFx0XHQvLyDQndC+0LLRi9C5INCx0LvQvtC6INC+0LHRitC10LTQuNC90Y/QtdGC0YHRjyDRgSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LwgXCJXaW5kQmxvY2tcIiAo0L/QvtGH0LjRgtCw0YLRjCDQv9C+0LTRgNC+0LHQvdC10LUg0L/RgNC+IGV4dGVuZClcblx0XHRcdCQuZXh0ZW5kKFxuXHRcdFx0XHRwYWNrVGFibGVCbG9jayxcblx0XHRcdFx0V2luZEJsb2NrLCB7XG5cdFx0XHRcdFx0Ly8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnLmpzLXBhcmVudCc7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QsiDRgSDQutC+0YLQvtGA0YvQvNC4INGA0LDQsdC+0YLQsNC10Lxcblx0XHRcdFx0XHRnZXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Ly8g0KHQvtGF0YDQsNC90Y/QtdC8INGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcblx0XHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHRcdFx0Ly8g0JrQu9C40Log0L3QsCDQtNC+0YfQtdGA0L3QuNC5INCx0LvQvtC6XG5cdFx0XHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFx0XHQnY2xpY2snLFxuXHRcdFx0XHRcdFx0XHRcdCcuanMtY2hpbGQnLFxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vINCU0LXQudGB0YLQstC40LVcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdF07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG5cdFx0XHRcdFx0Ly8gJHRhcmdldCAtINC/0L7Qu9GD0YfQsNC10Lwg0LIgZ2V0U2VsZWN0b3Jcblx0XHRcdFx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoJHRhcmdldCkge1xuXHRcdFx0XHRcdFx0Ly8g0KMg0JrQuNGA0LAg0LXRidC1INGA0LDQtyDRg9GC0L7Rh9C90LjRgtGMINGH0YLQviDRjdGC0L4g0LfQsCDRhNC40LPQvdGPXG5cdFx0XHRcdFx0XHR0aGlzLiR0YWJsZSA9ICR0YXJnZXQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyDQlNC+0LHQsNCy0LjRgtGMINC90L7QstGD0Y4g0YPQv9Cw0LrQvtCy0LrRgyDQsiDRgtCw0LHQu9C40YbRg1xuXHRcdFx0XHRcdGFkZFBhY2tUb1RhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpXG5cdFx0KTtcblx0fSgpXG4pOyIsIihmdW5jdGlvbigpIHtcbiAgICBXaW5kQ29yZS5ibG9ja3NSdW4oV2luZENvcmUuJGJvZHkpO1xufSkoKTsiXX0=
