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
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],6:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],7:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],8:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],9:[function(require,module,exports){
// (
//     function () {
//         // Заводим новый блок
//         var spritesBlock = {};

//         // Регистрация
//         WindCore.blockRegister(
//             // Новый блок объединяется с существующим "WindBlock"
//             $.extend(
//                 spritesBlock,
//                 WindBlock, {
//                     // Устанавливаем родительский блок
//                     getSelector: function () {
//                         return '';
//                     },
//                     // Возвращает массив объектов с которыми работаем
//                     getBindings: function () {
//                         // Сохраняем текущий контекст
//                         var self = this;

//                         return [];
//                     },
//                     // Вызывается при загрузке странице
//                     initialize: function ($target) {
//                     }
//                 }
//             )
//         );
//     }()
// );
},{}],10:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],11:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],12:[function(require,module,exports){
(function() {
    WindCore.blocksRun(WindCore.$body);
})();
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYmxvY2tzL2J1dHRvbi9qcy9qcy1idXR0b24uanMiLCJwdWJsaWMvYmxvY2tzL2Rldi9jb250ZW50L2pzL2pzLWNvbnRlbnQuanMiLCJwdWJsaWMvYmxvY2tzL2dsb2JhbC9zcHJpdGVzL2pzL2pzLXNwcml0ZXMuanMiLCJwdWJsaWMvY3VsdHVyZS1wcm9qZWN0LmJ1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0JBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoXG5cdGZ1bmN0aW9uICgpIHtcblx0XHQvLyDQl9Cw0LLQvtC00LjQvCDQvdC+0LLRi9C5INCx0LvQvtC6IChjYWxjLCDRgtCw0Log0LrQsNC6INC10YHRgtGMINCx0LvQvtC6IGNhbGMpXG5cdFx0dmFyIHBhY2tUYWJsZUJsb2NrID0ge307XG5cblx0XHQvLyDQoNC10LPQuNGB0YLRgNCw0YbQuNGPXG5cdFx0V2luZENvcmUuYmxvY2tSZWdpc3Rlcihcblx0XHRcdC8vINCd0L7QstGL0Lkg0LHQu9C+0Log0L7QsdGK0LXQtNC40L3Rj9C10YLRgdGPINGBINGB0YPRidC10YHRgtCy0YPRjtGJ0LjQvCBcIldpbmRCbG9ja1wiICjQv9C+0YfQuNGC0LDRgtGMINC/0L7QtNGA0L7QsdC90LXQtSDQv9GA0L4gZXh0ZW5kKVxuXHRcdFx0JC5leHRlbmQoXG5cdFx0XHRcdHBhY2tUYWJsZUJsb2NrLFxuXHRcdFx0XHRXaW5kQmxvY2ssIHtcblx0XHRcdFx0XHQvLyDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0LHQu9C+0Lpcblx0XHRcdFx0XHRnZXRTZWxlY3RvcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICcuanMtcGFyZW50Jztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyINGBINC60L7RgtC+0YDRi9C80Lgg0YDQsNCx0L7RgtCw0LXQvFxuXHRcdFx0XHRcdGdldEJpbmRpbmdzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQvLyDQodC+0YXRgNCw0L3Rj9C10Lwg0YLQtdC60YPRidC40Lkg0LrQvtC90YLQtdC60YHRglxuXHRcdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdFx0XHQvLyDQmtC70LjQuiDQvdCwINC00L7Rh9C10YDQvdC40Lkg0LHQu9C+0Lpcblx0XHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRcdCdjbGljaycsXG5cdFx0XHRcdFx0XHRcdFx0Jy5qcy1jaGlsZCcsXG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8g0JTQtdC50YHRgtCy0LjQtVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0XTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0LVcblx0XHRcdFx0XHQvLyAkdGFyZ2V0IC0g0L/QvtC70YPRh9Cw0LXQvCDQsiBnZXRTZWxlY3RvclxuXHRcdFx0XHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHQvLyDQoyDQmtC40YDQsCDQtdGJ0LUg0YDQsNC3INGD0YLQvtGH0L3QuNGC0Ywg0YfRgtC+INGN0YLQviDQt9CwINGE0LjQs9C90Y9cblx0XHRcdFx0XHRcdHRoaXMuJHRhYmxlID0gJHRhcmdldDtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vINCU0L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YPRjiDRg9C/0LDQutC+0LLQutGDINCyINGC0LDQsdC70LjRhtGDXG5cdFx0XHRcdFx0YWRkUGFja1RvVGFibGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdClcblx0XHQpO1xuXHR9KClcbik7IiwiKFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g0JfQsNCy0L7QtNC40Lwg0L3QvtCy0YvQuSDQsdC70L7QuiAoY2FsYywg0YLQsNC6INC60LDQuiDQtdGB0YLRjCDQsdC70L7QuiBjYWxjKVxuICAgICAgICB2YXIgcGFja1RhYmxlQmxvY2sgPSB7fTtcblxuICAgICAgICAvLyDQoNC10LPQuNGB0YLRgNCw0YbQuNGPXG4gICAgICAgIFdpbmRDb3JlLmJsb2NrUmVnaXN0ZXIoXG4gICAgICAgICAgICAvLyDQndC+0LLRi9C5INCx0LvQvtC6INC+0LHRitC10LTQuNC90Y/QtdGC0YHRjyDRgSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LwgXCJXaW5kQmxvY2tcIiAo0L/QvtGH0LjRgtCw0YLRjCDQv9C+0LTRgNC+0LHQvdC10LUg0L/RgNC+IGV4dGVuZClcbiAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgIHBhY2tUYWJsZUJsb2NrLFxuICAgICAgICAgICAgICAgIFdpbmRCbG9jaywge1xuICAgICAgICAgICAgICAgICAgICAvLyDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0LHQu9C+0LpcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnLmpzLXBhcmVudCc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyINGBINC60L7RgtC+0YDRi9C80Lgg0YDQsNCx0L7RgtCw0LXQvFxuICAgICAgICAgICAgICAgICAgICBnZXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0KHQvtGF0YDQsNC90Y/QtdC8INGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQmtC70LjQuiDQvdCwINC00L7Rh9C10YDQvdC40Lkg0LHQu9C+0LpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtY2hpbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQlNC10LnRgdGC0LLQuNC1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG4gICAgICAgICAgICAgICAgICAgIC8vICR0YXJnZXQgLSDQv9C+0LvRg9GH0LDQtdC8INCyIGdldFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQoyDQmtC40YDQsCDQtdGJ0LUg0YDQsNC3INGD0YLQvtGH0L3QuNGC0Ywg0YfRgtC+INGN0YLQviDQt9CwINGE0LjQs9C90Y9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlID0gJHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8g0JTQvtCx0LDQstC40YLRjCDQvdC+0LLRg9GOINGD0L/QsNC60L7QstC60YMg0LIg0YLQsNCx0LvQuNGG0YNcbiAgICAgICAgICAgICAgICAgICAgYWRkUGFja1RvVGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9KClcbik7IiwiLy8gKFxuLy8gICAgIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgLy8g0JfQsNCy0L7QtNC40Lwg0L3QvtCy0YvQuSDQsdC70L7QulxuLy8gICAgICAgICB2YXIgc3ByaXRlc0Jsb2NrID0ge307XG5cbi8vICAgICAgICAgLy8g0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xuLy8gICAgICAgICBXaW5kQ29yZS5ibG9ja1JlZ2lzdGVyKFxuLy8gICAgICAgICAgICAgLy8g0J3QvtCy0YvQuSDQsdC70L7QuiDQvtCx0YrQtdC00LjQvdGP0LXRgtGB0Y8g0YEg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC8IFwiV2luZEJsb2NrXCJcbi8vICAgICAgICAgICAgICQuZXh0ZW5kKFxuLy8gICAgICAgICAgICAgICAgIHNwcml0ZXNCbG9jayxcbi8vICAgICAgICAgICAgICAgICBXaW5kQmxvY2ssIHtcbi8vICAgICAgICAgICAgICAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6XG4vLyAgICAgICAgICAgICAgICAgICAgIGdldFNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyINGBINC60L7RgtC+0YDRi9C80Lgg0YDQsNCx0L7RgtCw0LXQvFxuLy8gICAgICAgICAgICAgICAgICAgICBnZXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8g0KHQvtGF0YDQsNC90Y/QtdC8INGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuLy8gICAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAgICAvLyDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XG4vLyAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICApXG4vLyAgICAgICAgICk7XG4vLyAgICAgfSgpXG4vLyApOyIsIihmdW5jdGlvbigpIHtcbiAgICBXaW5kQ29yZS5ibG9ja3NSdW4oV2luZENvcmUuJGJvZHkpO1xufSkoKTsiXX0=
