/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.Vue = factory());
}(this, (function () { 'use strict';

	/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
	function isUndef (v) {
		return v === undefined || v === null
	}

	function isDef (v) {
		return v !== undefined && v !== null
	}

	function isTrue (v) {
		return v === true
	}

	function isFalse (v) {
		return v === false
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
		return (
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean'
		)
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
		return obj !== null && typeof obj === 'object'
	}

	var _toString = Object.prototype.toString;

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
		return _toString.call(obj) === '[object Object]'
	}

	function isRegExp (v) {
		return _toString.call(v) === '[object RegExp]'
	}

	/**
	 * Check if val is a valid array index.
	 */
	function isValidArrayIndex (val) {
		var n = parseFloat(val);
		return n >= 0 && Math.floor(n) === n && isFinite(val)
	}

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
		return val == null
			? ''
			: typeof val === 'object'
				? JSON.stringify(val, null, 2)
				: String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
		var n = parseFloat(val);
		return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
		str,
		expectsLowerCase
	) {
		var map = Object.create(null);
		var list = str.split(',');
		for (var i = 0; i < list.length; i++) {
			map[list[i]] = true;
		}
		return expectsLowerCase
			? function (val) { return map[val.toLowerCase()]; }
			: function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Check if a attribute is a reserved attribute.
	 */
	var isReservedAttribute = makeMap('key,ref,slot,is');

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
		if (arr.length) {
			var index = arr.indexOf(item);
			if (index > -1) {
				return arr.splice(index, 1)
			}
		}
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
		return hasOwnProperty.call(obj, key)
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
		var cache = Object.create(null);
		return (function cachedFn (str) {
			var hit = cache[str];
			return hit || (cache[str] = fn(str))
		})
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
		return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
		return str
			.replace(hyphenateRE, '$1-$2')
			.replace(hyphenateRE, '$1-$2')
			.toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
		function boundFn (a) {
			var l = arguments.length;
			return l
				? l > 1
					? fn.apply(ctx, arguments)
					: fn.call(ctx, a)
				: fn.call(ctx)
		}
		// record original fn length
		boundFn._length = fn.length;
		return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
		start = start || 0;
		var i = list.length - start;
		var ret = new Array(i);
		while (i--) {
			ret[i] = list[i + start];
		}
		return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
		for (var key in _from) {
			to[key] = _from[key];
		}
		return to
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
		var res = {};
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]) {
				extend(res, arr[i]);
			}
		}
		return res
	}

	/**
	 * Perform no operation.
	 * Stubbing args to make Flow happy without leaving useless transpiled code
	 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
	 */
	function noop (a, b, c) {}

	/**
	 * Always return false.
	 */
	var no = function (a, b, c) { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
		return modules.reduce(function (keys, m) {
			return keys.concat(m.staticKeys || [])
		}, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
		if (a === b) { return true }
		var isObjectA = isObject(a);
		var isObjectB = isObject(b);
		if (isObjectA && isObjectB) {
			try {
				var isArrayA = Array.isArray(a);
				var isArrayB = Array.isArray(b);
				if (isArrayA && isArrayB) {
					return a.length === b.length && a.every(function (e, i) {
						return looseEqual(e, b[i])
					})
				} else if (!isArrayA && !isArrayB) {
					var keysA = Object.keys(a);
					var keysB = Object.keys(b);
					return keysA.length === keysB.length && keysA.every(function (key) {
						return looseEqual(a[key], b[key])
					})
				} else {
					/* istanbul ignore next */
					return false
				}
			} catch (e) {
				/* istanbul ignore next */
				return false
			}
		} else if (!isObjectA && !isObjectB) {
			return String(a) === String(b)
		} else {
			return false
		}
	}

	function looseIndexOf (arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (looseEqual(arr[i], val)) { return i }
		}
		return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
		var called = false;
		return function () {
			if (!called) {
				called = true;
				fn.apply(this, arguments);
			}
		}
	}

	var SSR_ATTR = 'data-server-rendered';

	var ASSET_TYPES = [
		'component',
		'directive',
		'filter'
	];

	var LIFECYCLE_HOOKS = [
		'beforeCreate',
		'created',
		'beforeMount',
		'mounted',
		'beforeUpdate',
		'updated',
		'beforeDestroy',
		'destroyed',
		'activated',
		'deactivated'
	];

	/*  */

	var config = ({
		/**
		 * Option merge strategies (used in core/util/options)
		 */
		optionMergeStrategies: Object.create(null),

		/**
		 * Whether to suppress warnings.
		 */
		silent: false,

		/**
		 * Show production mode tip message on boot?
		 */
		productionTip: "development" !== 'production',

		/**
		 * Whether to enable devtools
		 */
		devtools: "development" !== 'production',

		/**
		 * Whether to record perf
		 */
		performance: false,

		/**
		 * Error handler for watcher errors
		 */
		errorHandler: null,

		/**
		 * Warn handler for watcher warns
		 */
		warnHandler: null,

		/**
		 * Ignore certain custom elements
		 */
		ignoredElements: [],

		/**
		 * Custom user key aliases for v-on
		 */
		keyCodes: Object.create(null),

		/**
		 * Check if a tag is reserved so that it cannot be registered as a
		 * component. This is platform-dependent and may be overwritten.
		 */
		isReservedTag: no,

		/**
		 * Check if an attribute is reserved so that it cannot be used as a component
		 * prop. This is platform-dependent and may be overwritten.
		 */
		isReservedAttr: no,

		/**
		 * Check if a tag is an unknown element.
		 * Platform-dependent.
		 */
		isUnknownElement: no,

		/**
		 * Get the namespace of an element
		 */
		getTagNamespace: noop,

		/**
		 * Parse the real tag name for the specific platform.
		 */
		parsePlatformTagName: identity,

		/**
		 * Check if an attribute must be bound using property, e.g. value
		 * Platform-dependent.
		 */
		mustUseProp: no,

		/**
		 * Exposed for legacy reasons
		 */
		_lifecycleHooks: LIFECYCLE_HOOKS
	});

	/*  */

	var emptyObject = Object.freeze({});

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
		var c = (str + '').charCodeAt(0);
		return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
		Object.defineProperty(obj, key, {
			value: val,
			enumerable: !!enumerable,
			writable: true,
			configurable: true
		});
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
		if (bailRE.test(path)) {
			return
		}
		var segments = path.split('.');
		return function (obj) {
			for (var i = 0; i < segments.length; i++) {
				if (!obj) { return }
				obj = obj[segments[i]];
			}
			return obj
		}
	}

	/*  */

	var warn = noop;
	var tip = noop;
	var formatComponentName = (null); // work around flow check

	{
		var hasConsole = typeof console !== 'undefined';
		var classifyRE = /(?:^|[-_])(\w)/g;
		var classify = function (str) { return str
			.replace(classifyRE, function (c) { return c.toUpperCase(); })
			.replace(/[-_]/g, ''); };

		warn = function (msg, vm) {
			var trace = vm ? generateComponentTrace(vm) : '';

			if (config.warnHandler) {
				config.warnHandler.call(null, msg, vm, trace);
			} else if (hasConsole && (!config.silent)) {
				console.error(("[Vue warn]: " + msg + trace));
			}
		};

		tip = function (msg, vm) {
			if (hasConsole && (!config.silent)) {
				console.warn("[Vue tip]: " + msg + (
					vm ? generateComponentTrace(vm) : ''
				));
			}
		};

		formatComponentName = function (vm, includeFile) {
			if (vm.$root === vm) {
				return '<Root>'
			}
			var name = typeof vm === 'string'
				? vm
				: typeof vm === 'function' && vm.options
					? vm.options.name
					: vm._isVue
						? vm.$options.name || vm.$options._componentTag
						: vm.name;

			var file = vm._isVue && vm.$options.__file;
			if (!name && file) {
				var match = file.match(/([^/\\]+)\.vue$/);
				name = match && match[1];
			}

			return (
				(name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
				(file && includeFile !== false ? (" at " + file) : '')
			)
		};

		var repeat = function (str, n) {
			var res = '';
			while (n) {
				if (n % 2 === 1) { res += str; }
				if (n > 1) { str += str; }
				n >>= 1;
			}
			return res
		};

		var generateComponentTrace = function (vm) {
			if (vm._isVue && vm.$parent) {
				var tree = [];
				var currentRecursiveSequence = 0;
				while (vm) {
					if (tree.length > 0) {
						var last = tree[tree.length - 1];
						if (last.constructor === vm.constructor) {
							currentRecursiveSequence++;
							vm = vm.$parent;
							continue
						} else if (currentRecursiveSequence > 0) {
							tree[tree.length - 1] = [last, currentRecursiveSequence];
							currentRecursiveSequence = 0;
						}
					}
					tree.push(vm);
					vm = vm.$parent;
				}
				return '\n\nfound in\n\n' + tree
					.map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
						? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
						: formatComponentName(vm))); })
					.join('\n')
			} else {
				return ("\n\n(found in " + (formatComponentName(vm)) + ")")
			}
		};
	}

	/*  */

	function handleError (err, vm, info) {
		if (config.errorHandler) {
			config.errorHandler.call(null, err, vm, info);
		} else {
			{
				warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
			}
			/* istanbul ignore else */
			if (inBrowser && typeof console !== 'undefined') {
				console.error(err);
			} else {
				throw err
			}
		}
	}

	/*  */
	/* globals MutationObserver */

// can we use __proto__?
	var hasProto = '__proto__' in {};

// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
	var nativeWatch = ({}).watch;

	var supportsPassive = false;
	if (inBrowser) {
		try {
			var opts = {};
			Object.defineProperty(opts, 'passive', ({
				get: function get () {
					/* istanbul ignore next */
					supportsPassive = true;
				}
			})); // https://github.com/facebook/flow/issues/285
			window.addEventListener('test-passive', null, opts);
		} catch (e) {}
	}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
		if (_isServer === undefined) {
			/* istanbul ignore if */
			if (!inBrowser && typeof global !== 'undefined') {
				// detect presence of vue-server-renderer and avoid
				// Webpack shimming the process
				_isServer = global['process'].env.VUE_ENV === 'server';
			} else {
				_isServer = false;
			}
		}
		return _isServer
	};

// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
		return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

	var hasSymbol =
		typeof Symbol !== 'undefined' && isNative(Symbol) &&
		typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
		var callbacks = [];
		var pending = false;
		var timerFunc;

		function nextTickHandler () {
			pending = false;
			var copies = callbacks.slice(0);
			callbacks.length = 0;
			for (var i = 0; i < copies.length; i++) {
				copies[i]();
			}
		}

		// the nextTick behavior leverages the microtask queue, which can be accessed
		// via either native Promise.then or MutationObserver.
		// MutationObserver has wider support, however it is seriously bugged in
		// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
		// completely stops working after triggering a few times... so, if native
		// Promise is available, we will use it:
		/* istanbul ignore if */
		if (typeof Promise !== 'undefined' && isNative(Promise)) {
			var p = Promise.resolve();
			var logError = function (err) { console.error(err); };
			timerFunc = function () {
				p.then(nextTickHandler).catch(logError);
				// in problematic UIWebViews, Promise.then doesn't completely break, but
				// it can get stuck in a weird state where callbacks are pushed into the
				// microtask queue but the queue isn't being flushed, until the browser
				// needs to do some other work, e.g. handle a timer. Therefore we can
				// "force" the microtask queue to be flushed by adding an empty timer.
				if (isIOS) { setTimeout(noop); }
			};
		} else if (typeof MutationObserver !== 'undefined' && (
				isNative(MutationObserver) ||
				// PhantomJS and iOS 7.x
				MutationObserver.toString() === '[object MutationObserverConstructor]'
			)) {
			// use MutationObserver where native Promise is not available,
			// e.g. PhantomJS IE11, iOS7, Android 4.4
			var counter = 1;
			var observer = new MutationObserver(nextTickHandler);
			var textNode = document.createTextNode(String(counter));
			observer.observe(textNode, {
				characterData: true
			});
			timerFunc = function () {
				counter = (counter + 1) % 2;
				textNode.data = String(counter);
			};
		} else {
			// fallback to setTimeout
			/* istanbul ignore next */
			timerFunc = function () {
				setTimeout(nextTickHandler, 0);
			};
		}

		return function queueNextTick (cb, ctx) {
			var _resolve;
			callbacks.push(function () {
				if (cb) {
					try {
						cb.call(ctx);
					} catch (e) {
						handleError(e, ctx, 'nextTick');
					}
				} else if (_resolve) {
					_resolve(ctx);
				}
			});
			if (!pending) {
				pending = true;
				timerFunc();
			}
			if (!cb && typeof Promise !== 'undefined') {
				return new Promise(function (resolve, reject) {
					_resolve = resolve;
				})
			}
		}
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
		// use native Set when available.
		_Set = Set;
	} else {
		// a non-standard Set polyfill that only works with primitive keys.
		_Set = (function () {
			function Set () {
				this.set = Object.create(null);
			}
			Set.prototype.has = function has (key) {
				return this.set[key] === true
			};
			Set.prototype.add = function add (key) {
				this.set[key] = true;
			};
			Set.prototype.clear = function clear () {
				this.set = Object.create(null);
			};

			return Set;
		}());
	}

	/*  */


	var uid = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
		this.id = uid++;
		this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
		this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
		remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	};

	Dep.prototype.notify = function notify () {
		// stabilize the subscriber list first
		var subs = this.subs.slice();
		for (var i = 0, l = subs.length; i < l; i++) {
			subs[i].update();
		}
	};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
		if (Dep.target) { targetStack.push(Dep.target); }
		Dep.target = _target;
	}

	function popTarget () {
		Dep.target = targetStack.pop();
	}

	/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
		'push',
		'pop',
		'shift',
		'unshift',
		'splice',
		'sort',
		'reverse'
	]
		.forEach(function (method) {
			// cache original method
			var original = arrayProto[method];
			def(arrayMethods, method, function mutator () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var result = original.apply(this, args);
				var ob = this.__ob__;
				var inserted;
				switch (method) {
					case 'push':
					case 'unshift':
						inserted = args;
						break
					case 'splice':
						inserted = args.slice(2);
						break
				}
				if (inserted) { ob.observeArray(inserted); }
				// notify change
				ob.dep.notify();
				return result
			});
		});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
		shouldConvert: true
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
		this.value = value;
		this.dep = new Dep();
		this.vmCount = 0;
		def(value, '__ob__', this);
		if (Array.isArray(value)) {
			var augment = hasProto
				? protoAugment
				: copyAugment;
			augment(value, arrayMethods, arrayKeys);
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
		var keys = Object.keys(obj);
		for (var i = 0; i < keys.length; i++) {
			defineReactive$$1(obj, keys[i], obj[keys[i]]);
		}
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
		for (var i = 0, l = items.length; i < l; i++) {
			observe(items[i]);
		}
	};

// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src, keys) {
		/* eslint-disable no-proto */
		target.__proto__ = src;
		/* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];
			def(target, key, src[key]);
		}
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
		if (!isObject(value)) {
			return
		}
		var ob;
		if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
			ob = value.__ob__;
		} else if (
			observerState.shouldConvert &&
			!isServerRendering() &&
			(Array.isArray(value) || isPlainObject(value)) &&
			Object.isExtensible(value) &&
			!value._isVue
		) {
			ob = new Observer(value);
		}
		if (asRootData && ob) {
			ob.vmCount++;
		}
		return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
		obj,
		key,
		val,
		customSetter,
		shallow
	) {
		var dep = new Dep();

		var property = Object.getOwnPropertyDescriptor(obj, key);
		if (property && property.configurable === false) {
			return
		}

		// cater for pre-defined getter/setters
		var getter = property && property.get;
		var setter = property && property.set;

		var childOb = !shallow && observe(val);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function reactiveGetter () {
				var value = getter ? getter.call(obj) : val;
				if (Dep.target) {
					dep.depend();
					if (childOb) {
						childOb.dep.depend();
					}
					if (Array.isArray(value)) {
						dependArray(value);
					}
				}
				return value
			},
			set: function reactiveSetter (newVal) {
				var value = getter ? getter.call(obj) : val;
				/* eslint-disable no-self-compare */
				if (newVal === value || (newVal !== newVal && value !== value)) {
					return
				}
				/* eslint-enable no-self-compare */
				if ("development" !== 'production' && customSetter) {
					customSetter();
				}
				if (setter) {
					setter.call(obj, newVal);
				} else {
					val = newVal;
				}
				childOb = !shallow && observe(newVal);
				dep.notify();
			}
		});
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
		if (Array.isArray(target) && isValidArrayIndex(key)) {
			target.length = Math.max(target.length, key);
			target.splice(key, 1, val);
			return val
		}
		if (hasOwn(target, key)) {
			target[key] = val;
			return val
		}
		var ob = (target).__ob__;
		if (target._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
				'Avoid adding reactive properties to a Vue instance or its root $data ' +
				'at runtime - declare it upfront in the data option.'
			);
			return val
		}
		if (!ob) {
			target[key] = val;
			return val
		}
		defineReactive$$1(ob.value, key, val);
		ob.dep.notify();
		return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
		if (Array.isArray(target) && isValidArrayIndex(key)) {
			target.splice(key, 1);
			return
		}
		var ob = (target).__ob__;
		if (target._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
				'Avoid deleting properties on a Vue instance or its root $data ' +
				'- just set it to null.'
			);
			return
		}
		if (!hasOwn(target, key)) {
			return
		}
		delete target[key];
		if (!ob) {
			return
		}
		ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
		for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
			e = value[i];
			e && e.__ob__ && e.__ob__.dep.depend();
			if (Array.isArray(e)) {
				dependArray(e);
			}
		}
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
		strats.el = strats.propsData = function (parent, child, vm, key) {
			if (!vm) {
				warn(
					"option \"" + key + "\" can only be used during instance " +
					'creation with the `new` keyword.'
				);
			}
			return defaultStrat(parent, child)
		};
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
		if (!from) { return to }
		var key, toVal, fromVal;
		var keys = Object.keys(from);
		for (var i = 0; i < keys.length; i++) {
			key = keys[i];
			toVal = to[key];
			fromVal = from[key];
			if (!hasOwn(to, key)) {
				set(to, key, fromVal);
			} else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
				mergeData(toVal, fromVal);
			}
		}
		return to
	}

	/**
	 * Data
	 */
	function mergeDataOrFn (
		parentVal,
		childVal,
		vm
	) {
		if (!vm) {
			// in a Vue.extend merge, both should be functions
			if (!childVal) {
				return parentVal
			}
			if (!parentVal) {
				return childVal
			}
			// when parentVal & childVal are both present,
			// we need to return a function that returns the
			// merged result of both functions... no need to
			// check if parentVal is a function here because
			// it has to be a function to pass previous merges.
			return function mergedDataFn () {
				return mergeData(
					typeof childVal === 'function' ? childVal.call(this) : childVal,
					typeof parentVal === 'function' ? parentVal.call(this) : parentVal
				)
			}
		} else if (parentVal || childVal) {
			return function mergedInstanceDataFn () {
				// instance merge
				var instanceData = typeof childVal === 'function'
					? childVal.call(vm)
					: childVal;
				var defaultData = typeof parentVal === 'function'
					? parentVal.call(vm)
					: undefined;
				if (instanceData) {
					return mergeData(instanceData, defaultData)
				} else {
					return defaultData
				}
			}
		}
	}

	strats.data = function (
		parentVal,
		childVal,
		vm
	) {
		if (!vm) {
			if (childVal && typeof childVal !== 'function') {
				"development" !== 'production' && warn(
					'The "data" option should be a function ' +
					'that returns a per-instance value in component ' +
					'definitions.',
					vm
				);

				return parentVal
			}
			return mergeDataOrFn.call(this, parentVal, childVal)
		}

		return mergeDataOrFn(parentVal, childVal, vm)
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
		parentVal,
		childVal
	) {
		return childVal
			? parentVal
				? parentVal.concat(childVal)
				: Array.isArray(childVal)
					? childVal
					: [childVal]
			: parentVal
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
		strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
		var res = Object.create(parentVal || null);
		return childVal
			? extend(res, childVal)
			: res
	}

	ASSET_TYPES.forEach(function (type) {
		strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
		// work around Firefox's Object.prototype.watch...
		if (parentVal === nativeWatch) { parentVal = undefined; }
		if (childVal === nativeWatch) { childVal = undefined; }
		/* istanbul ignore if */
		if (!childVal) { return Object.create(parentVal || null) }
		if (!parentVal) { return childVal }
		var ret = {};
		extend(ret, parentVal);
		for (var key in childVal) {
			var parent = ret[key];
			var child = childVal[key];
			if (parent && !Array.isArray(parent)) {
				parent = [parent];
			}
			ret[key] = parent
				? parent.concat(child)
				: Array.isArray(child) ? child : [child];
		}
		return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
		strats.methods =
			strats.inject =
				strats.computed = function (parentVal, childVal) {
					if (!parentVal) { return childVal }
					var ret = Object.create(null);
					extend(ret, parentVal);
					if (childVal) { extend(ret, childVal); }
					return ret
				};
	strats.provide = mergeDataOrFn;

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
		return childVal === undefined
			? parentVal
			: childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
		for (var key in options.components) {
			var lower = key.toLowerCase();
			if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
				warn(
					'Do not use built-in or reserved HTML elements as component ' +
					'id: ' + key
				);
			}
		}
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
		var props = options.props;
		if (!props) { return }
		var res = {};
		var i, val, name;
		if (Array.isArray(props)) {
			i = props.length;
			while (i--) {
				val = props[i];
				if (typeof val === 'string') {
					name = camelize(val);
					res[name] = { type: null };
				} else {
					warn('props must be strings when using array syntax.');
				}
			}
		} else if (isPlainObject(props)) {
			for (var key in props) {
				val = props[key];
				name = camelize(key);
				res[name] = isPlainObject(val)
					? val
					: { type: val };
			}
		}
		options.props = res;
	}

	/**
	 * Normalize all injections into Object-based format
	 */
	function normalizeInject (options) {
		var inject = options.inject;
		if (Array.isArray(inject)) {
			var normalized = options.inject = {};
			for (var i = 0; i < inject.length; i++) {
				normalized[inject[i]] = inject[i];
			}
		}
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
		var dirs = options.directives;
		if (dirs) {
			for (var key in dirs) {
				var def = dirs[key];
				if (typeof def === 'function') {
					dirs[key] = { bind: def, update: def };
				}
			}
		}
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
		parent,
		child,
		vm
	) {
		{
			checkComponents(child);
		}

		if (typeof child === 'function') {
			child = child.options;
		}

		normalizeProps(child);
		normalizeInject(child);
		normalizeDirectives(child);
		var extendsFrom = child.extends;
		if (extendsFrom) {
			parent = mergeOptions(parent, extendsFrom, vm);
		}
		if (child.mixins) {
			for (var i = 0, l = child.mixins.length; i < l; i++) {
				parent = mergeOptions(parent, child.mixins[i], vm);
			}
		}
		var options = {};
		var key;
		for (key in parent) {
			mergeField(key);
		}
		for (key in child) {
			if (!hasOwn(parent, key)) {
				mergeField(key);
			}
		}
		function mergeField (key) {
			var strat = strats[key] || defaultStrat;
			options[key] = strat(parent[key], child[key], vm, key);
		}
		return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
		options,
		type,
		id,
		warnMissing
	) {
		/* istanbul ignore if */
		if (typeof id !== 'string') {
			return
		}
		var assets = options[type];
		// check local registration variations first
		if (hasOwn(assets, id)) { return assets[id] }
		var camelizedId = camelize(id);
		if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
		var PascalCaseId = capitalize(camelizedId);
		if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
		// fallback to prototype chain
		var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
		if ("development" !== 'production' && warnMissing && !res) {
			warn(
				'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
				options
			);
		}
		return res
	}

	/*  */

	function validateProp (
		key,
		propOptions,
		propsData,
		vm
	) {
		var prop = propOptions[key];
		var absent = !hasOwn(propsData, key);
		var value = propsData[key];
		// handle boolean props
		if (isType(Boolean, prop.type)) {
			if (absent && !hasOwn(prop, 'default')) {
				value = false;
			} else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
				value = true;
			}
		}
		// check default value
		if (value === undefined) {
			value = getPropDefaultValue(vm, prop, key);
			// since the default value is a fresh copy,
			// make sure to observe it.
			var prevShouldConvert = observerState.shouldConvert;
			observerState.shouldConvert = true;
			observe(value);
			observerState.shouldConvert = prevShouldConvert;
		}
		{
			assertProp(prop, key, value, vm, absent);
		}
		return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
		// no default, return undefined
		if (!hasOwn(prop, 'default')) {
			return undefined
		}
		var def = prop.default;
		// warn against non-factory defaults for Object & Array
		if ("development" !== 'production' && isObject(def)) {
			warn(
				'Invalid default value for prop "' + key + '": ' +
				'Props with type Object/Array must use a factory function ' +
				'to return the default value.',
				vm
			);
		}
		// the raw prop value was also undefined from previous render,
		// return previous default value to avoid unnecessary watcher trigger
		if (vm && vm.$options.propsData &&
			vm.$options.propsData[key] === undefined &&
			vm._props[key] !== undefined
		) {
			return vm._props[key]
		}
		// call factory function for non-Function types
		// a value is Function if its prototype is function even across different execution context
		return typeof def === 'function' && getType(prop.type) !== 'Function'
			? def.call(vm)
			: def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
		prop,
		name,
		value,
		vm,
		absent
	) {
		if (prop.required && absent) {
			warn(
				'Missing required prop: "' + name + '"',
				vm
			);
			return
		}
		if (value == null && !prop.required) {
			return
		}
		var type = prop.type;
		var valid = !type || type === true;
		var expectedTypes = [];
		if (type) {
			if (!Array.isArray(type)) {
				type = [type];
			}
			for (var i = 0; i < type.length && !valid; i++) {
				var assertedType = assertType(value, type[i]);
				expectedTypes.push(assertedType.expectedType || '');
				valid = assertedType.valid;
			}
		}
		if (!valid) {
			warn(
				'Invalid prop: type check failed for prop "' + name + '".' +
				' Expected ' + expectedTypes.map(capitalize).join(', ') +
				', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
				vm
			);
			return
		}
		var validator = prop.validator;
		if (validator) {
			if (!validator(value)) {
				warn(
					'Invalid prop: custom validator check failed for prop "' + name + '".',
					vm
				);
			}
		}
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType (value, type) {
		var valid;
		var expectedType = getType(type);
		if (simpleCheckRE.test(expectedType)) {
			valid = typeof value === expectedType.toLowerCase();
		} else if (expectedType === 'Object') {
			valid = isPlainObject(value);
		} else if (expectedType === 'Array') {
			valid = Array.isArray(value);
		} else {
			valid = value instanceof type;
		}
		return {
			valid: valid,
			expectedType: expectedType
		}
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
		var match = fn && fn.toString().match(/^\s*function (\w+)/);
		return match ? match[1] : ''
	}

	function isType (type, fn) {
		if (!Array.isArray(fn)) {
			return getType(fn) === getType(type)
		}
		for (var i = 0, len = fn.length; i < len; i++) {
			if (getType(fn[i]) === getType(type)) {
				return true
			}
		}
		/* istanbul ignore next */
		return false
	}

	/*  */

	var mark;
	var measure;

	{
		var perf = inBrowser && window.performance;
		/* istanbul ignore if */
		if (
			perf &&
			perf.mark &&
			perf.measure &&
			perf.clearMarks &&
			perf.clearMeasures
		) {
			mark = function (tag) { return perf.mark(tag); };
			measure = function (name, startTag, endTag) {
				perf.measure(name, startTag, endTag);
				perf.clearMarks(startTag);
				perf.clearMarks(endTag);
				perf.clearMeasures(name);
			};
		}
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
		var allowedGlobals = makeMap(
			'Infinity,undefined,NaN,isFinite,isNaN,' +
			'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
			'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
			'require' // for Webpack/Browserify
		);

		var warnNonPresent = function (target, key) {
			warn(
				"Property or method \"" + key + "\" is not defined on the instance but " +
				"referenced during render. Make sure to declare reactive data " +
				"properties in the data option.",
				target
			);
		};

		var hasProxy =
			typeof Proxy !== 'undefined' &&
			Proxy.toString().match(/native code/);

		if (hasProxy) {
			var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
			config.keyCodes = new Proxy(config.keyCodes, {
				set: function set (target, key, value) {
					if (isBuiltInModifier(key)) {
						warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
						return false
					} else {
						target[key] = value;
						return true
					}
				}
			});
		}

		var hasHandler = {
			has: function has (target, key) {
				var has = key in target;
				var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
				if (!has && !isAllowed) {
					warnNonPresent(target, key);
				}
				return has || !isAllowed
			}
		};

		var getHandler = {
			get: function get (target, key) {
				if (typeof key === 'string' && !(key in target)) {
					warnNonPresent(target, key);
				}
				return target[key]
			}
		};

		initProxy = function initProxy (vm) {
			if (hasProxy) {
				// determine which proxy handler to use
				var options = vm.$options;
				var handlers = options.render && options.render._withStripped
					? getHandler
					: hasHandler;
				vm._renderProxy = new Proxy(vm, handlers);
			} else {
				vm._renderProxy = vm;
			}
		};
	}

	/*  */

	var VNode = function VNode (
		tag,
		data,
		children,
		text,
		elm,
		context,
		componentOptions,
		asyncFactory
	) {
		this.tag = tag;
		this.data = data;
		this.children = children;
		this.text = text;
		this.elm = elm;
		this.ns = undefined;
		this.context = context;
		this.functionalContext = undefined;
		this.key = data && data.key;
		this.componentOptions = componentOptions;
		this.componentInstance = undefined;
		this.parent = undefined;
		this.raw = false;
		this.isStatic = false;
		this.isRootInsert = true;
		this.isComment = false;
		this.isCloned = false;
		this.isOnce = false;
		this.asyncFactory = asyncFactory;
		this.asyncMeta = undefined;
		this.isAsyncPlaceholder = false;
	};

	var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
		return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function (text) {
		if ( text === void 0 ) text = '';

		var node = new VNode();
		node.text = text;
		node.isComment = true;
		return node
	};

	function createTextVNode (val) {
		return new VNode(undefined, undefined, undefined, String(val))
	}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
	function cloneVNode (vnode) {
		var cloned = new VNode(
			vnode.tag,
			vnode.data,
			vnode.children,
			vnode.text,
			vnode.elm,
			vnode.context,
			vnode.componentOptions,
			vnode.asyncFactory
		);
		cloned.ns = vnode.ns;
		cloned.isStatic = vnode.isStatic;
		cloned.key = vnode.key;
		cloned.isComment = vnode.isComment;
		cloned.isCloned = true;
		return cloned
	}

	function cloneVNodes (vnodes) {
		var len = vnodes.length;
		var res = new Array(len);
		for (var i = 0; i < len; i++) {
			res[i] = cloneVNode(vnodes[i]);
		}
		return res
	}

	/*  */

	var normalizeEvent = cached(function (name) {
		var passive = name.charAt(0) === '&';
		name = passive ? name.slice(1) : name;
		var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
		name = once$$1 ? name.slice(1) : name;
		var capture = name.charAt(0) === '!';
		name = capture ? name.slice(1) : name;
		return {
			name: name,
			once: once$$1,
			capture: capture,
			passive: passive
		}
	});

	function createFnInvoker (fns) {
		function invoker () {
			var arguments$1 = arguments;

			var fns = invoker.fns;
			if (Array.isArray(fns)) {
				var cloned = fns.slice();
				for (var i = 0; i < cloned.length; i++) {
					cloned[i].apply(null, arguments$1);
				}
			} else {
				// return handler return value for single handlers
				return fns.apply(null, arguments)
			}
		}
		invoker.fns = fns;
		return invoker
	}

	function updateListeners (
		on,
		oldOn,
		add,
		remove$$1,
		vm
	) {
		var name, cur, old, event;
		for (name in on) {
			cur = on[name];
			old = oldOn[name];
			event = normalizeEvent(name);
			if (isUndef(cur)) {
				"development" !== 'production' && warn(
					"Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
					vm
				);
			} else if (isUndef(old)) {
				if (isUndef(cur.fns)) {
					cur = on[name] = createFnInvoker(cur);
				}
				add(event.name, cur, event.once, event.capture, event.passive);
			} else if (cur !== old) {
				old.fns = cur;
				on[name] = old;
			}
		}
		for (name in oldOn) {
			if (isUndef(on[name])) {
				event = normalizeEvent(name);
				remove$$1(event.name, oldOn[name], event.capture);
			}
		}
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
		var invoker;
		var oldHook = def[hookKey];

		function wrappedHook () {
			hook.apply(this, arguments);
			// important: remove merged hook to ensure it's called only once
			// and prevent memory leak
			remove(invoker.fns, wrappedHook);
		}

		if (isUndef(oldHook)) {
			// no existing hook
			invoker = createFnInvoker([wrappedHook]);
		} else {
			/* istanbul ignore if */
			if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
				// already a merged invoker
				invoker = oldHook;
				invoker.fns.push(wrappedHook);
			} else {
				// existing plain hook
				invoker = createFnInvoker([oldHook, wrappedHook]);
			}
		}

		invoker.merged = true;
		def[hookKey] = invoker;
	}

	/*  */

	function extractPropsFromVNodeData (
		data,
		Ctor,
		tag
	) {
		// we are only extracting raw values here.
		// validation and default values are handled in the child
		// component itself.
		var propOptions = Ctor.options.props;
		if (isUndef(propOptions)) {
			return
		}
		var res = {};
		var attrs = data.attrs;
		var props = data.props;
		if (isDef(attrs) || isDef(props)) {
			for (var key in propOptions) {
				var altKey = hyphenate(key);
				{
					var keyInLowerCase = key.toLowerCase();
					if (
						key !== keyInLowerCase &&
						attrs && hasOwn(attrs, keyInLowerCase)
					) {
						tip(
							"Prop \"" + keyInLowerCase + "\" is passed to component " +
							(formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
							" \"" + key + "\". " +
							"Note that HTML attributes are case-insensitive and camelCased " +
							"props need to use their kebab-case equivalents when using in-DOM " +
							"templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
						);
					}
				}
				checkProp(res, props, key, altKey, true) ||
				checkProp(res, attrs, key, altKey, false);
			}
		}
		return res
	}

	function checkProp (
		res,
		hash,
		key,
		altKey,
		preserve
	) {
		if (isDef(hash)) {
			if (hasOwn(hash, key)) {
				res[key] = hash[key];
				if (!preserve) {
					delete hash[key];
				}
				return true
			} else if (hasOwn(hash, altKey)) {
				res[key] = hash[altKey];
				if (!preserve) {
					delete hash[altKey];
				}
				return true
			}
		}
		return false
	}

	/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
		for (var i = 0; i < children.length; i++) {
			if (Array.isArray(children[i])) {
				return Array.prototype.concat.apply([], children)
			}
		}
		return children
	}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
		return isPrimitive(children)
			? [createTextVNode(children)]
			: Array.isArray(children)
				? normalizeArrayChildren(children)
				: undefined
	}

	function isTextNode (node) {
		return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}

	function normalizeArrayChildren (children, nestedIndex) {
		var res = [];
		var i, c, last;
		for (i = 0; i < children.length; i++) {
			c = children[i];
			if (isUndef(c) || typeof c === 'boolean') { continue }
			last = res[res.length - 1];
			//  nested
			if (Array.isArray(c)) {
				res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
			} else if (isPrimitive(c)) {
				if (isTextNode(last)) {
					// merge adjacent text nodes
					// this is necessary for SSR hydration because text nodes are
					// essentially merged when rendered to HTML strings
					(last).text += String(c);
				} else if (c !== '') {
					// convert primitive to vnode
					res.push(createTextVNode(c));
				}
			} else {
				if (isTextNode(c) && isTextNode(last)) {
					// merge adjacent text nodes
					res[res.length - 1] = createTextVNode(last.text + c.text);
				} else {
					// default key for nested array children (likely generated by v-for)
					if (isTrue(children._isVList) &&
						isDef(c.tag) &&
						isUndef(c.key) &&
						isDef(nestedIndex)) {
						c.key = "__vlist" + nestedIndex + "_" + i + "__";
					}
					res.push(c);
				}
			}
		}
		return res
	}

	/*  */

	function ensureCtor (comp, base) {
		if (comp.__esModule && comp.default) {
			comp = comp.default;
		}
		return isObject(comp)
			? base.extend(comp)
			: comp
	}

	function createAsyncPlaceholder (
		factory,
		data,
		context,
		children,
		tag
	) {
		var node = createEmptyVNode();
		node.asyncFactory = factory;
		node.asyncMeta = { data: data, context: context, children: children, tag: tag };
		return node
	}

	function resolveAsyncComponent (
		factory,
		baseCtor,
		context
	) {
		if (isTrue(factory.error) && isDef(factory.errorComp)) {
			return factory.errorComp
		}

		if (isDef(factory.resolved)) {
			return factory.resolved
		}

		if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
			return factory.loadingComp
		}

		if (isDef(factory.contexts)) {
			// already pending
			factory.contexts.push(context);
		} else {
			var contexts = factory.contexts = [context];
			var sync = true;

			var forceRender = function () {
				for (var i = 0, l = contexts.length; i < l; i++) {
					contexts[i].$forceUpdate();
				}
			};

			var resolve = once(function (res) {
				// cache resolved
				factory.resolved = ensureCtor(res, baseCtor);
				// invoke callbacks only if this is not a synchronous resolve
				// (async resolves are shimmed as synchronous during SSR)
				if (!sync) {
					forceRender();
				}
			});

			var reject = once(function (reason) {
				"development" !== 'production' && warn(
					"Failed to resolve async component: " + (String(factory)) +
					(reason ? ("\nReason: " + reason) : '')
				);
				if (isDef(factory.errorComp)) {
					factory.error = true;
					forceRender();
				}
			});

			var res = factory(resolve, reject);

			if (isObject(res)) {
				if (typeof res.then === 'function') {
					// () => Promise
					if (isUndef(factory.resolved)) {
						res.then(resolve, reject);
					}
				} else if (isDef(res.component) && typeof res.component.then === 'function') {
					res.component.then(resolve, reject);

					if (isDef(res.error)) {
						factory.errorComp = ensureCtor(res.error, baseCtor);
					}

					if (isDef(res.loading)) {
						factory.loadingComp = ensureCtor(res.loading, baseCtor);
						if (res.delay === 0) {
							factory.loading = true;
						} else {
							setTimeout(function () {
								if (isUndef(factory.resolved) && isUndef(factory.error)) {
									factory.loading = true;
									forceRender();
								}
							}, res.delay || 200);
						}
					}

					if (isDef(res.timeout)) {
						setTimeout(function () {
							if (isUndef(factory.resolved)) {
								reject(
									"timeout (" + (res.timeout) + "ms)"
								);
							}
						}, res.timeout);
					}
				}
			}

			sync = false;
			// return in case resolved synchronously
			return factory.loading
				? factory.loadingComp
				: factory.resolved
		}
	}

	/*  */

	function getFirstComponentChild (children) {
		if (Array.isArray(children)) {
			for (var i = 0; i < children.length; i++) {
				var c = children[i];
				if (isDef(c) && isDef(c.componentOptions)) {
					return c
				}
			}
		}
	}

	/*  */

	/*  */

	function initEvents (vm) {
		vm._events = Object.create(null);
		vm._hasHookEvent = false;
		// init parent attached events
		var listeners = vm.$options._parentListeners;
		if (listeners) {
			updateComponentListeners(vm, listeners);
		}
	}

	var target;

	function add (event, fn, once$$1) {
		if (once$$1) {
			target.$once(event, fn);
		} else {
			target.$on(event, fn);
		}
	}

	function remove$1 (event, fn) {
		target.$off(event, fn);
	}

	function updateComponentListeners (
		vm,
		listeners,
		oldListeners
	) {
		target = vm;
		updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}

	function eventsMixin (Vue) {
		var hookRE = /^hook:/;
		Vue.prototype.$on = function (event, fn) {
			var this$1 = this;

			var vm = this;
			if (Array.isArray(event)) {
				for (var i = 0, l = event.length; i < l; i++) {
					this$1.$on(event[i], fn);
				}
			} else {
				(vm._events[event] || (vm._events[event] = [])).push(fn);
				// optimize hook:event cost by using a boolean flag marked at registration
				// instead of a hash lookup
				if (hookRE.test(event)) {
					vm._hasHookEvent = true;
				}
			}
			return vm
		};

		Vue.prototype.$once = function (event, fn) {
			var vm = this;
			function on () {
				vm.$off(event, on);
				fn.apply(vm, arguments);
			}
			on.fn = fn;
			vm.$on(event, on);
			return vm
		};

		Vue.prototype.$off = function (event, fn) {
			var this$1 = this;

			var vm = this;
			// all
			if (!arguments.length) {
				vm._events = Object.create(null);
				return vm
			}
			// array of events
			if (Array.isArray(event)) {
				for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
					this$1.$off(event[i$1], fn);
				}
				return vm
			}
			// specific event
			var cbs = vm._events[event];
			if (!cbs) {
				return vm
			}
			if (arguments.length === 1) {
				vm._events[event] = null;
				return vm
			}
			// specific handler
			var cb;
			var i = cbs.length;
			while (i--) {
				cb = cbs[i];
				if (cb === fn || cb.fn === fn) {
					cbs.splice(i, 1);
					break
				}
			}
			return vm
		};

		Vue.prototype.$emit = function (event) {
			var vm = this;
			{
				var lowerCaseEvent = event.toLowerCase();
				if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
					tip(
						"Event \"" + lowerCaseEvent + "\" is emitted in component " +
						(formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
						"Note that HTML attributes are case-insensitive and you cannot use " +
						"v-on to listen to camelCase events when using in-DOM templates. " +
						"You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
					);
				}
			}
			var cbs = vm._events[event];
			if (cbs) {
				cbs = cbs.length > 1 ? toArray(cbs) : cbs;
				var args = toArray(arguments, 1);
				for (var i = 0, l = cbs.length; i < l; i++) {
					try {
						cbs[i].apply(vm, args);
					} catch (e) {
						handleError(e, vm, ("event handler for \"" + event + "\""));
					}
				}
			}
			return vm
		};
	}

	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
		children,
		context
	) {
		var slots = {};
		if (!children) {
			return slots
		}
		var defaultSlot = [];
		for (var i = 0, l = children.length; i < l; i++) {
			var child = children[i];
			// named slots should only be respected if the vnode was rendered in the
			// same context.
			if ((child.context === context || child.functionalContext === context) &&
				child.data && child.data.slot != null
			) {
				var name = child.data.slot;
				var slot = (slots[name] || (slots[name] = []));
				if (child.tag === 'template') {
					slot.push.apply(slot, child.children);
				} else {
					slot.push(child);
				}
			} else {
				defaultSlot.push(child);
			}
		}
		// ignore whitespace
		if (!defaultSlot.every(isWhitespace)) {
			slots.default = defaultSlot;
		}
		return slots
	}

	function isWhitespace (node) {
		return node.isComment || node.text === ' '
	}

	function resolveScopedSlots (
		fns, // see flow/vnode
		res
	) {
		res = res || {};
		for (var i = 0; i < fns.length; i++) {
			if (Array.isArray(fns[i])) {
				resolveScopedSlots(fns[i], res);
			} else {
				res[fns[i].key] = fns[i].fn;
			}
		}
		return res
	}

	/*  */

	var activeInstance = null;
	var isUpdatingChildComponent = false;

	function initLifecycle (vm) {
		var options = vm.$options;

		// locate first non-abstract parent
		var parent = options.parent;
		if (parent && !options.abstract) {
			while (parent.$options.abstract && parent.$parent) {
				parent = parent.$parent;
			}
			parent.$children.push(vm);
		}

		vm.$parent = parent;
		vm.$root = parent ? parent.$root : vm;

		vm.$children = [];
		vm.$refs = {};

		vm._watcher = null;
		vm._inactive = null;
		vm._directInactive = false;
		vm._isMounted = false;
		vm._isDestroyed = false;
		vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
		Vue.prototype._update = function (vnode, hydrating) {
			var vm = this;
			if (vm._isMounted) {
				callHook(vm, 'beforeUpdate');
			}
			var prevEl = vm.$el;
			var prevVnode = vm._vnode;
			var prevActiveInstance = activeInstance;
			activeInstance = vm;
			vm._vnode = vnode;
			// Vue.prototype.__patch__ is injected in entry points
			// based on the rendering backend used.
			if (!prevVnode) {
				// initial render
				vm.$el = vm.__patch__(
					vm.$el, vnode, hydrating, false /* removeOnly */,
					vm.$options._parentElm,
					vm.$options._refElm
				);
				// no need for the ref nodes after initial patch
				// this prevents keeping a detached DOM tree in memory (#5851)
				vm.$options._parentElm = vm.$options._refElm = null;
			} else {
				// updates
				vm.$el = vm.__patch__(prevVnode, vnode);
			}
			activeInstance = prevActiveInstance;
			// update __vue__ reference
			if (prevEl) {
				prevEl.__vue__ = null;
			}
			if (vm.$el) {
				vm.$el.__vue__ = vm;
			}
			// if parent is an HOC, update its $el as well
			if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
				vm.$parent.$el = vm.$el;
			}
			// updated hook is called by the scheduler to ensure that children are
			// updated in a parent's updated hook.
		};

		Vue.prototype.$forceUpdate = function () {
			var vm = this;
			if (vm._watcher) {
				vm._watcher.update();
			}
		};

		Vue.prototype.$destroy = function () {
			var vm = this;
			if (vm._isBeingDestroyed) {
				return
			}
			callHook(vm, 'beforeDestroy');
			vm._isBeingDestroyed = true;
			// remove self from parent
			var parent = vm.$parent;
			if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
				remove(parent.$children, vm);
			}
			// teardown watchers
			if (vm._watcher) {
				vm._watcher.teardown();
			}
			var i = vm._watchers.length;
			while (i--) {
				vm._watchers[i].teardown();
			}
			// remove reference from data ob
			// frozen object may not have observer.
			if (vm._data.__ob__) {
				vm._data.__ob__.vmCount--;
			}
			// call the last hook...
			vm._isDestroyed = true;
			// invoke destroy hooks on current rendered tree
			vm.__patch__(vm._vnode, null);
			// fire destroyed hook
			callHook(vm, 'destroyed');
			// turn off all instance listeners.
			vm.$off();
			// remove __vue__ reference
			if (vm.$el) {
				vm.$el.__vue__ = null;
			}
		};
	}

	function mountComponent (
		vm,
		el,
		hydrating
	) {
		vm.$el = el;
		if (!vm.$options.render) {
			vm.$options.render = createEmptyVNode;
			{
				/* istanbul ignore if */
				if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
					vm.$options.el || el) {
					warn(
						'You are using the runtime-only build of Vue where the template ' +
						'compiler is not available. Either pre-compile the templates into ' +
						'render functions, or use the compiler-included build.',
						vm
					);
				} else {
					warn(
						'Failed to mount component: template or render function not defined.',
						vm
					);
				}
			}
		}
		callHook(vm, 'beforeMount');

		var updateComponent;
		/* istanbul ignore if */
		if ("development" !== 'production' && config.performance && mark) {
			updateComponent = function () {
				var name = vm._name;
				var id = vm._uid;
				var startTag = "vue-perf-start:" + id;
				var endTag = "vue-perf-end:" + id;

				mark(startTag);
				var vnode = vm._render();
				mark(endTag);
				measure((name + " render"), startTag, endTag);

				mark(startTag);
				vm._update(vnode, hydrating);
				mark(endTag);
				measure((name + " patch"), startTag, endTag);
			};
		} else {
			updateComponent = function () {
				vm._update(vm._render(), hydrating);
			};
		}

		vm._watcher = new Watcher(vm, updateComponent, noop);
		hydrating = false;

		// manually mounted instance, call mounted on self
		// mounted is called for render-created child components in its inserted hook
		if (vm.$vnode == null) {
			vm._isMounted = true;
			callHook(vm, 'mounted');
		}
		return vm
	}

	function updateChildComponent (
		vm,
		propsData,
		listeners,
		parentVnode,
		renderChildren
	) {
		{
			isUpdatingChildComponent = true;
		}

		// determine whether component has slot children
		// we need to do this before overwriting $options._renderChildren
		var hasChildren = !!(
			renderChildren ||               // has new static slots
			vm.$options._renderChildren ||  // has old static slots
			parentVnode.data.scopedSlots || // has new scoped slots
			vm.$scopedSlots !== emptyObject // has old scoped slots
		);

		vm.$options._parentVnode = parentVnode;
		vm.$vnode = parentVnode; // update vm's placeholder node without re-render

		if (vm._vnode) { // update child tree's parent
			vm._vnode.parent = parentVnode;
		}
		vm.$options._renderChildren = renderChildren;

		// update $attrs and $listensers hash
		// these are also reactive so they may trigger child update if the child
		// used them during render
		vm.$attrs = parentVnode.data && parentVnode.data.attrs;
		vm.$listeners = listeners;

		// update props
		if (propsData && vm.$options.props) {
			observerState.shouldConvert = false;
			var props = vm._props;
			var propKeys = vm.$options._propKeys || [];
			for (var i = 0; i < propKeys.length; i++) {
				var key = propKeys[i];
				props[key] = validateProp(key, vm.$options.props, propsData, vm);
			}
			observerState.shouldConvert = true;
			// keep a copy of raw propsData
			vm.$options.propsData = propsData;
		}

		// update listeners
		if (listeners) {
			var oldListeners = vm.$options._parentListeners;
			vm.$options._parentListeners = listeners;
			updateComponentListeners(vm, listeners, oldListeners);
		}
		// resolve slots + force update if has children
		if (hasChildren) {
			vm.$slots = resolveSlots(renderChildren, parentVnode.context);
			vm.$forceUpdate();
		}

		{
			isUpdatingChildComponent = false;
		}
	}

	function isInInactiveTree (vm) {
		while (vm && (vm = vm.$parent)) {
			if (vm._inactive) { return true }
		}
		return false
	}

	function activateChildComponent (vm, direct) {
		if (direct) {
			vm._directInactive = false;
			if (isInInactiveTree(vm)) {
				return
			}
		} else if (vm._directInactive) {
			return
		}
		if (vm._inactive || vm._inactive === null) {
			vm._inactive = false;
			for (var i = 0; i < vm.$children.length; i++) {
				activateChildComponent(vm.$children[i]);
			}
			callHook(vm, 'activated');
		}
	}

	function deactivateChildComponent (vm, direct) {
		if (direct) {
			vm._directInactive = true;
			if (isInInactiveTree(vm)) {
				return
			}
		}
		if (!vm._inactive) {
			vm._inactive = true;
			for (var i = 0; i < vm.$children.length; i++) {
				deactivateChildComponent(vm.$children[i]);
			}
			callHook(vm, 'deactivated');
		}
	}

	function callHook (vm, hook) {
		var handlers = vm.$options[hook];
		if (handlers) {
			for (var i = 0, j = handlers.length; i < j; i++) {
				try {
					handlers[i].call(vm);
				} catch (e) {
					handleError(e, vm, (hook + " hook"));
				}
			}
		}
		if (vm._hasHookEvent) {
			vm.$emit('hook:' + hook);
		}
	}

	/*  */


	var MAX_UPDATE_COUNT = 100;

	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
		index = queue.length = activatedChildren.length = 0;
		has = {};
		{
			circular = {};
		}
		waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
		flushing = true;
		var watcher, id;

		// Sort queue before flush.
		// This ensures that:
		// 1. Components are updated from parent to child. (because parent is always
		//    created before the child)
		// 2. A component's user watchers are run before its render watcher (because
		//    user watchers are created before the render watcher)
		// 3. If a component is destroyed during a parent component's watcher run,
		//    its watchers can be skipped.
		queue.sort(function (a, b) { return a.id - b.id; });

		// do not cache length because more watchers might be pushed
		// as we run existing watchers
		for (index = 0; index < queue.length; index++) {
			watcher = queue[index];
			id = watcher.id;
			has[id] = null;
			watcher.run();
			// in dev build, check and stop circular updates.
			if ("development" !== 'production' && has[id] != null) {
				circular[id] = (circular[id] || 0) + 1;
				if (circular[id] > MAX_UPDATE_COUNT) {
					warn(
						'You may have an infinite update loop ' + (
							watcher.user
								? ("in watcher with expression \"" + (watcher.expression) + "\"")
								: "in a component render function."
						),
						watcher.vm
					);
					break
				}
			}
		}

		// keep copies of post queues before resetting state
		var activatedQueue = activatedChildren.slice();
		var updatedQueue = queue.slice();

		resetSchedulerState();

		// call component updated and activated hooks
		callActivatedHooks(activatedQueue);
		callUpdatedHooks(updatedQueue);

		// devtool hook
		/* istanbul ignore if */
		if (devtools && config.devtools) {
			devtools.emit('flush');
		}
	}

	function callUpdatedHooks (queue) {
		var i = queue.length;
		while (i--) {
			var watcher = queue[i];
			var vm = watcher.vm;
			if (vm._watcher === watcher && vm._isMounted) {
				callHook(vm, 'updated');
			}
		}
	}

	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
		// setting _inactive to false here so that a render function can
		// rely on checking whether it's in an inactive tree (e.g. router-view)
		vm._inactive = false;
		activatedChildren.push(vm);
	}

	function callActivatedHooks (queue) {
		for (var i = 0; i < queue.length; i++) {
			queue[i]._inactive = true;
			activateChildComponent(queue[i], true /* true */);
		}
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
		var id = watcher.id;
		if (has[id] == null) {
			has[id] = true;
			if (!flushing) {
				queue.push(watcher);
			} else {
				// if already flushing, splice the watcher based on its id
				// if already past its id, it will be run next immediately.
				var i = queue.length - 1;
				while (i > index && queue[i].id > watcher.id) {
					i--;
				}
				queue.splice(i + 1, 0, watcher);
			}
			// queue the flush
			if (!waiting) {
				waiting = true;
				nextTick(flushSchedulerQueue);
			}
		}
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
		vm,
		expOrFn,
		cb,
		options
	) {
		this.vm = vm;
		vm._watchers.push(this);
		// options
		if (options) {
			this.deep = !!options.deep;
			this.user = !!options.user;
			this.lazy = !!options.lazy;
			this.sync = !!options.sync;
		} else {
			this.deep = this.user = this.lazy = this.sync = false;
		}
		this.cb = cb;
		this.id = ++uid$2; // uid for batching
		this.active = true;
		this.dirty = this.lazy; // for lazy watchers
		this.deps = [];
		this.newDeps = [];
		this.depIds = new _Set();
		this.newDepIds = new _Set();
		this.expression = expOrFn.toString();
		// parse expression for getter
		if (typeof expOrFn === 'function') {
			this.getter = expOrFn;
		} else {
			this.getter = parsePath(expOrFn);
			if (!this.getter) {
				this.getter = function () {};
				"development" !== 'production' && warn(
					"Failed watching path: \"" + expOrFn + "\" " +
					'Watcher only accepts simple dot-delimited paths. ' +
					'For full control, use a function instead.',
					vm
				);
			}
		}
		this.value = this.lazy
			? undefined
			: this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
		pushTarget(this);
		var value;
		var vm = this.vm;
		try {
			value = this.getter.call(vm, vm);
		} catch (e) {
			if (this.user) {
				handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
			} else {
				throw e
			}
		} finally {
			// "touch" every property so they are all tracked as
			// dependencies for deep watching
			if (this.deep) {
				traverse(value);
			}
			popTarget();
			this.cleanupDeps();
		}
		return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
		var id = dep.id;
		if (!this.newDepIds.has(id)) {
			this.newDepIds.add(id);
			this.newDeps.push(dep);
			if (!this.depIds.has(id)) {
				dep.addSub(this);
			}
		}
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
		var this$1 = this;

		var i = this.deps.length;
		while (i--) {
			var dep = this$1.deps[i];
			if (!this$1.newDepIds.has(dep.id)) {
				dep.removeSub(this$1);
			}
		}
		var tmp = this.depIds;
		this.depIds = this.newDepIds;
		this.newDepIds = tmp;
		this.newDepIds.clear();
		tmp = this.deps;
		this.deps = this.newDeps;
		this.newDeps = tmp;
		this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
		/* istanbul ignore else */
		if (this.lazy) {
			this.dirty = true;
		} else if (this.sync) {
			this.run();
		} else {
			queueWatcher(this);
		}
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
		if (this.active) {
			var value = this.get();
			if (
				value !== this.value ||
				// Deep watchers and watchers on Object/Arrays should fire even
				// when the value is the same, because the value may
				// have mutated.
				isObject(value) ||
				this.deep
			) {
				// set new value
				var oldValue = this.value;
				this.value = value;
				if (this.user) {
					try {
						this.cb.call(this.vm, value, oldValue);
					} catch (e) {
						handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
					}
				} else {
					this.cb.call(this.vm, value, oldValue);
				}
			}
		}
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
		this.value = this.get();
		this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
		var this$1 = this;

		var i = this.deps.length;
		while (i--) {
			this$1.deps[i].depend();
		}
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
		var this$1 = this;

		if (this.active) {
			// remove self from vm's watcher list
			// this is a somewhat expensive operation so we skip it
			// if the vm is being destroyed.
			if (!this.vm._isBeingDestroyed) {
				remove(this.vm._watchers, this);
			}
			var i = this.deps.length;
			while (i--) {
				this$1.deps[i].removeSub(this$1);
			}
			this.active = false;
		}
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
		seenObjects.clear();
		_traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
		var i, keys;
		var isA = Array.isArray(val);
		if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
			return
		}
		if (val.__ob__) {
			var depId = val.__ob__.dep.id;
			if (seen.has(depId)) {
				return
			}
			seen.add(depId);
		}
		if (isA) {
			i = val.length;
			while (i--) { _traverse(val[i], seen); }
		} else {
			keys = Object.keys(val);
			i = keys.length;
			while (i--) { _traverse(val[keys[i]], seen); }
		}
	}

	/*  */

	var sharedPropertyDefinition = {
		enumerable: true,
		configurable: true,
		get: noop,
		set: noop
	};

	function proxy (target, sourceKey, key) {
		sharedPropertyDefinition.get = function proxyGetter () {
			return this[sourceKey][key]
		};
		sharedPropertyDefinition.set = function proxySetter (val) {
			this[sourceKey][key] = val;
		};
		Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
		vm._watchers = [];
		var opts = vm.$options;
		if (opts.props) { initProps(vm, opts.props); }
		if (opts.methods) { initMethods(vm, opts.methods); }
		if (opts.data) {
			initData(vm);
		} else {
			observe(vm._data = {}, true /* asRootData */);
		}
		if (opts.computed) { initComputed(vm, opts.computed); }
		if (opts.watch && opts.watch !== nativeWatch) {
			initWatch(vm, opts.watch);
		}
	}

	function checkOptionType (vm, name) {
		var option = vm.$options[name];
		if (!isPlainObject(option)) {
			warn(
				("component option \"" + name + "\" should be an object."),
				vm
			);
		}
	}

	function initProps (vm, propsOptions) {
		var propsData = vm.$options.propsData || {};
		var props = vm._props = {};
		// cache prop keys so that future props updates can iterate using Array
		// instead of dynamic object key enumeration.
		var keys = vm.$options._propKeys = [];
		var isRoot = !vm.$parent;
		// root instance props should be converted
		observerState.shouldConvert = isRoot;
		var loop = function ( key ) {
			keys.push(key);
			var value = validateProp(key, propsOptions, propsData, vm);
			/* istanbul ignore else */
			{
				if (isReservedAttribute(key) || config.isReservedAttr(key)) {
					warn(
						("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
						vm
					);
				}
				defineReactive$$1(props, key, value, function () {
					if (vm.$parent && !isUpdatingChildComponent) {
						warn(
							"Avoid mutating a prop directly since the value will be " +
							"overwritten whenever the parent component re-renders. " +
							"Instead, use a data or computed property based on the prop's " +
							"value. Prop being mutated: \"" + key + "\"",
							vm
						);
					}
				});
			}
			// static props are already proxied on the component's prototype
			// during Vue.extend(). We only need to proxy props defined at
			// instantiation here.
			if (!(key in vm)) {
				proxy(vm, "_props", key);
			}
		};

		for (var key in propsOptions) loop( key );
		observerState.shouldConvert = true;
	}

	function initData (vm) {
		var data = vm.$options.data;
		data = vm._data = typeof data === 'function'
			? getData(data, vm)
			: data || {};
		if (!isPlainObject(data)) {
			data = {};
			"development" !== 'production' && warn(
				'data functions should return an object:\n' +
				'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
				vm
			);
		}
		// proxy data on instance
		var keys = Object.keys(data);
		var props = vm.$options.props;
		var methods = vm.$options.methods;
		var i = keys.length;
		while (i--) {
			var key = keys[i];
			{
				if (methods && hasOwn(methods, key)) {
					warn(
						("method \"" + key + "\" has already been defined as a data property."),
						vm
					);
				}
			}
			if (props && hasOwn(props, key)) {
				"development" !== 'production' && warn(
					"The data property \"" + key + "\" is already declared as a prop. " +
					"Use prop default value instead.",
					vm
				);
			} else if (!isReserved(key)) {
				proxy(vm, "_data", key);
			}
		}
		// observe data
		observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
		try {
			return data.call(vm)
		} catch (e) {
			handleError(e, vm, "data()");
			return {}
		}
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
		"development" !== 'production' && checkOptionType(vm, 'computed');
		var watchers = vm._computedWatchers = Object.create(null);

		for (var key in computed) {
			var userDef = computed[key];
			var getter = typeof userDef === 'function' ? userDef : userDef.get;
			if ("development" !== 'production' && getter == null) {
				warn(
					("Getter is missing for computed property \"" + key + "\"."),
					vm
				);
			}
			// create internal watcher for the computed property.
			watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

			// component-defined computed properties are already defined on the
			// component prototype. We only need to define computed properties defined
			// at instantiation here.
			if (!(key in vm)) {
				defineComputed(vm, key, userDef);
			} else {
				if (key in vm.$data) {
					warn(("The computed property \"" + key + "\" is already defined in data."), vm);
				} else if (vm.$options.props && key in vm.$options.props) {
					warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
				}
			}
		}
	}

	function defineComputed (target, key, userDef) {
		if (typeof userDef === 'function') {
			sharedPropertyDefinition.get = createComputedGetter(key);
			sharedPropertyDefinition.set = noop;
		} else {
			sharedPropertyDefinition.get = userDef.get
				? userDef.cache !== false
					? createComputedGetter(key)
					: userDef.get
				: noop;
			sharedPropertyDefinition.set = userDef.set
				? userDef.set
				: noop;
		}
		if ("development" !== 'production' &&
			sharedPropertyDefinition.set === noop) {
			sharedPropertyDefinition.set = function () {
				warn(
					("Computed property \"" + key + "\" was assigned to but it has no setter."),
					this
				);
			};
		}
		Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
		return function computedGetter () {
			var watcher = this._computedWatchers && this._computedWatchers[key];
			if (watcher) {
				if (watcher.dirty) {
					watcher.evaluate();
				}
				if (Dep.target) {
					watcher.depend();
				}
				return watcher.value
			}
		}
	}

	function initMethods (vm, methods) {
		"development" !== 'production' && checkOptionType(vm, 'methods');
		var props = vm.$options.props;
		for (var key in methods) {
			vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
			{
				if (methods[key] == null) {
					warn(
						"method \"" + key + "\" has an undefined value in the component definition. " +
						"Did you reference the function correctly?",
						vm
					);
				}
				if (props && hasOwn(props, key)) {
					warn(
						("method \"" + key + "\" has already been defined as a prop."),
						vm
					);
				}
			}
		}
	}

	function initWatch (vm, watch) {
		"development" !== 'production' && checkOptionType(vm, 'watch');
		for (var key in watch) {
			var handler = watch[key];
			if (Array.isArray(handler)) {
				for (var i = 0; i < handler.length; i++) {
					createWatcher(vm, key, handler[i]);
				}
			} else {
				createWatcher(vm, key, handler);
			}
		}
	}

	function createWatcher (
		vm,
		keyOrFn,
		handler,
		options
	) {
		if (isPlainObject(handler)) {
			options = handler;
			handler = handler.handler;
		}
		if (typeof handler === 'string') {
			handler = vm[handler];
		}
		return vm.$watch(keyOrFn, handler, options)
	}

	function stateMixin (Vue) {
		// flow somehow has problems with directly declared definition object
		// when using Object.defineProperty, so we have to procedurally build up
		// the object here.
		var dataDef = {};
		dataDef.get = function () { return this._data };
		var propsDef = {};
		propsDef.get = function () { return this._props };
		{
			dataDef.set = function (newData) {
				warn(
					'Avoid replacing instance root $data. ' +
					'Use nested data properties instead.',
					this
				);
			};
			propsDef.set = function () {
				warn("$props is readonly.", this);
			};
		}
		Object.defineProperty(Vue.prototype, '$data', dataDef);
		Object.defineProperty(Vue.prototype, '$props', propsDef);

		Vue.prototype.$set = set;
		Vue.prototype.$delete = del;

		Vue.prototype.$watch = function (
			expOrFn,
			cb,
			options
		) {
			var vm = this;
			if (isPlainObject(cb)) {
				return createWatcher(vm, expOrFn, cb, options)
			}
			options = options || {};
			options.user = true;
			var watcher = new Watcher(vm, expOrFn, cb, options);
			if (options.immediate) {
				cb.call(vm, watcher.value);
			}
			return function unwatchFn () {
				watcher.teardown();
			}
		};
	}

	/*  */

	function initProvide (vm) {
		var provide = vm.$options.provide;
		if (provide) {
			vm._provided = typeof provide === 'function'
				? provide.call(vm)
				: provide;
		}
	}

	function initInjections (vm) {
		var result = resolveInject(vm.$options.inject, vm);
		if (result) {
			observerState.shouldConvert = false;
			Object.keys(result).forEach(function (key) {
				/* istanbul ignore else */
				{
					defineReactive$$1(vm, key, result[key], function () {
						warn(
							"Avoid mutating an injected value directly since the changes will be " +
							"overwritten whenever the provided component re-renders. " +
							"injection being mutated: \"" + key + "\"",
							vm
						);
					});
				}
			});
			observerState.shouldConvert = true;
		}
	}

	function resolveInject (inject, vm) {
		if (inject) {
			// inject is :any because flow is not smart enough to figure out cached
			var result = Object.create(null);
			var keys = hasSymbol
				? Reflect.ownKeys(inject)
				: Object.keys(inject);

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var provideKey = inject[key];
				var source = vm;
				while (source) {
					if (source._provided && provideKey in source._provided) {
						result[key] = source._provided[provideKey];
						break
					}
					source = source.$parent;
				}
				if ("development" !== 'production' && !source) {
					warn(("Injection \"" + key + "\" not found"), vm);
				}
			}
			return result
		}
	}

	/*  */

	function createFunctionalComponent (
		Ctor,
		propsData,
		data,
		context,
		children
	) {
		var props = {};
		var propOptions = Ctor.options.props;
		if (isDef(propOptions)) {
			for (var key in propOptions) {
				props[key] = validateProp(key, propOptions, propsData || {});
			}
		} else {
			if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
			if (isDef(data.props)) { mergeProps(props, data.props); }
		}
		// ensure the createElement function in functional components
		// gets a unique context - this is necessary for correct named slot check
		var _context = Object.create(context);
		var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
		var vnode = Ctor.options.render.call(null, h, {
			data: data,
			props: props,
			children: children,
			parent: context,
			listeners: data.on || {},
			injections: resolveInject(Ctor.options.inject, context),
			slots: function () { return resolveSlots(children, context); }
		});
		if (vnode instanceof VNode) {
			vnode.functionalContext = context;
			vnode.functionalOptions = Ctor.options;
			if (data.slot) {
				(vnode.data || (vnode.data = {})).slot = data.slot;
			}
		}
		return vnode
	}

	function mergeProps (to, from) {
		for (var key in from) {
			to[camelize(key)] = from[key];
		}
	}

	/*  */

// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
		init: function init (
			vnode,
			hydrating,
			parentElm,
			refElm
		) {
			if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
				var child = vnode.componentInstance = createComponentInstanceForVnode(
					vnode,
					activeInstance,
					parentElm,
					refElm
				);
				child.$mount(hydrating ? vnode.elm : undefined, hydrating);
			} else if (vnode.data.keepAlive) {
				// kept-alive components, treat as a patch
				var mountedNode = vnode; // work around flow
				componentVNodeHooks.prepatch(mountedNode, mountedNode);
			}
		},

		prepatch: function prepatch (oldVnode, vnode) {
			var options = vnode.componentOptions;
			var child = vnode.componentInstance = oldVnode.componentInstance;
			updateChildComponent(
				child,
				options.propsData, // updated props
				options.listeners, // updated listeners
				vnode, // new parent vnode
				options.children // new children
			);
		},

		insert: function insert (vnode) {
			var context = vnode.context;
			var componentInstance = vnode.componentInstance;
			if (!componentInstance._isMounted) {
				componentInstance._isMounted = true;
				callHook(componentInstance, 'mounted');
			}
			if (vnode.data.keepAlive) {
				if (context._isMounted) {
					// vue-router#1212
					// During updates, a kept-alive component's child components may
					// change, so directly walking the tree here may call activated hooks
					// on incorrect children. Instead we push them into a queue which will
					// be processed after the whole patch process ended.
					queueActivatedComponent(componentInstance);
				} else {
					activateChildComponent(componentInstance, true /* direct */);
				}
			}
		},

		destroy: function destroy (vnode) {
			var componentInstance = vnode.componentInstance;
			if (!componentInstance._isDestroyed) {
				if (!vnode.data.keepAlive) {
					componentInstance.$destroy();
				} else {
					deactivateChildComponent(componentInstance, true /* direct */);
				}
			}
		}
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
		Ctor,
		data,
		context,
		children,
		tag
	) {
		if (isUndef(Ctor)) {
			return
		}

		var baseCtor = context.$options._base;

		// plain options object: turn it into a constructor
		if (isObject(Ctor)) {
			Ctor = baseCtor.extend(Ctor);
		}

		// if at this stage it's not a constructor or an async component factory,
		// reject.
		if (typeof Ctor !== 'function') {
			{
				warn(("Invalid Component definition: " + (String(Ctor))), context);
			}
			return
		}

		// async component
		var asyncFactory;
		if (isUndef(Ctor.cid)) {
			asyncFactory = Ctor;
			Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
			if (Ctor === undefined) {
				// return a placeholder node for async component, which is rendered
				// as a comment node but preserves all the raw information for the node.
				// the information will be used for async server-rendering and hydration.
				return createAsyncPlaceholder(
					asyncFactory,
					data,
					context,
					children,
					tag
				)
			}
		}

		data = data || {};

		// resolve constructor options in case global mixins are applied after
		// component constructor creation
		resolveConstructorOptions(Ctor);

		// transform component v-model data into props & events
		if (isDef(data.model)) {
			transformModel(Ctor.options, data);
		}

		// extract props
		var propsData = extractPropsFromVNodeData(data, Ctor, tag);

		// functional component
		if (isTrue(Ctor.options.functional)) {
			return createFunctionalComponent(Ctor, propsData, data, context, children)
		}

		// extract listeners, since these needs to be treated as
		// child component listeners instead of DOM listeners
		var listeners = data.on;
		// replace with listeners with .native modifier
		// so it gets processed during parent component patch.
		data.on = data.nativeOn;

		if (isTrue(Ctor.options.abstract)) {
			// abstract components do not keep anything
			// other than props & listeners & slot

			// work around flow
			var slot = data.slot;
			data = {};
			if (slot) {
				data.slot = slot;
			}
		}

		// merge component management hooks onto the placeholder node
		mergeHooks(data);

		// return a placeholder vnode
		var name = Ctor.options.name || tag;
		var vnode = new VNode(
			("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
			data, undefined, undefined, undefined, context,
			{ Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
			asyncFactory
		);
		return vnode
	}

	function createComponentInstanceForVnode (
		vnode, // we know it's MountedComponentVNode but flow doesn't
		parent, // activeInstance in lifecycle state
		parentElm,
		refElm
	) {
		var vnodeComponentOptions = vnode.componentOptions;
		var options = {
			_isComponent: true,
			parent: parent,
			propsData: vnodeComponentOptions.propsData,
			_componentTag: vnodeComponentOptions.tag,
			_parentVnode: vnode,
			_parentListeners: vnodeComponentOptions.listeners,
			_renderChildren: vnodeComponentOptions.children,
			_parentElm: parentElm || null,
			_refElm: refElm || null
		};
		// check inline-template render functions
		var inlineTemplate = vnode.data.inlineTemplate;
		if (isDef(inlineTemplate)) {
			options.render = inlineTemplate.render;
			options.staticRenderFns = inlineTemplate.staticRenderFns;
		}
		return new vnodeComponentOptions.Ctor(options)
	}

	function mergeHooks (data) {
		if (!data.hook) {
			data.hook = {};
		}
		for (var i = 0; i < hooksToMerge.length; i++) {
			var key = hooksToMerge[i];
			var fromParent = data.hook[key];
			var ours = componentVNodeHooks[key];
			data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
		}
	}

	function mergeHook$1 (one, two) {
		return function (a, b, c, d) {
			one(a, b, c, d);
			two(a, b, c, d);
		}
	}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
	function transformModel (options, data) {
		var prop = (options.model && options.model.prop) || 'value';
		var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
		var on = data.on || (data.on = {});
		if (isDef(on[event])) {
			on[event] = [data.model.callback].concat(on[event]);
		} else {
			on[event] = data.model.callback;
		}
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
	function createElement (
		context,
		tag,
		data,
		children,
		normalizationType,
		alwaysNormalize
	) {
		if (Array.isArray(data) || isPrimitive(data)) {
			normalizationType = children;
			children = data;
			data = undefined;
		}
		if (isTrue(alwaysNormalize)) {
			normalizationType = ALWAYS_NORMALIZE;
		}
		return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
		context,
		tag,
		data,
		children,
		normalizationType
	) {
		if (isDef(data) && isDef((data).__ob__)) {
			"development" !== 'production' && warn(
				"Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
				'Always create fresh vnode data objects in each render!',
				context
			);
			return createEmptyVNode()
		}
		// object syntax in v-bind
		if (isDef(data) && isDef(data.is)) {
			tag = data.is;
		}
		if (!tag) {
			// in case of component :is set to falsy value
			return createEmptyVNode()
		}
		// warn against non-primitive key
		if ("development" !== 'production' &&
			isDef(data) && isDef(data.key) && !isPrimitive(data.key)
		) {
			warn(
				'Avoid using non-primitive value as key, ' +
				'use string/number value instead.',
				context
			);
		}
		// support single function children as default scoped slot
		if (Array.isArray(children) &&
			typeof children[0] === 'function'
		) {
			data = data || {};
			data.scopedSlots = { default: children[0] };
			children.length = 0;
		}
		if (normalizationType === ALWAYS_NORMALIZE) {
			children = normalizeChildren(children);
		} else if (normalizationType === SIMPLE_NORMALIZE) {
			children = simpleNormalizeChildren(children);
		}
		var vnode, ns;
		if (typeof tag === 'string') {
			var Ctor;
			ns = config.getTagNamespace(tag);
			if (config.isReservedTag(tag)) {
				// platform built-in elements
				vnode = new VNode(
					config.parsePlatformTagName(tag), data, children,
					undefined, undefined, context
				);
			} else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
				// component
				vnode = createComponent(Ctor, data, context, children, tag);
			} else {
				// unknown or unlisted namespaced elements
				// check at runtime because it may get assigned a namespace when its
				// parent normalizes children
				vnode = new VNode(
					tag, data, children,
					undefined, undefined, context
				);
			}
		} else {
			// direct component options / constructor
			vnode = createComponent(tag, data, context, children);
		}
		if (isDef(vnode)) {
			if (ns) { applyNS(vnode, ns); }
			return vnode
		} else {
			return createEmptyVNode()
		}
	}

	function applyNS (vnode, ns) {
		vnode.ns = ns;
		if (vnode.tag === 'foreignObject') {
			// use default namespace inside foreignObject
			return
		}
		if (isDef(vnode.children)) {
			for (var i = 0, l = vnode.children.length; i < l; i++) {
				var child = vnode.children[i];
				if (isDef(child.tag) && isUndef(child.ns)) {
					applyNS(child, ns);
				}
			}
		}
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
		val,
		render
	) {
		var ret, i, l, keys, key;
		if (Array.isArray(val) || typeof val === 'string') {
			ret = new Array(val.length);
			for (i = 0, l = val.length; i < l; i++) {
				ret[i] = render(val[i], i);
			}
		} else if (typeof val === 'number') {
			ret = new Array(val);
			for (i = 0; i < val; i++) {
				ret[i] = render(i + 1, i);
			}
		} else if (isObject(val)) {
			keys = Object.keys(val);
			ret = new Array(keys.length);
			for (i = 0, l = keys.length; i < l; i++) {
				key = keys[i];
				ret[i] = render(val[key], key, i);
			}
		}
		if (isDef(ret)) {
			(ret)._isVList = true;
		}
		return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
		name,
		fallback,
		props,
		bindObject
	) {
		var scopedSlotFn = this.$scopedSlots[name];
		if (scopedSlotFn) { // scoped slot
			props = props || {};
			if (bindObject) {
				props = extend(extend({}, bindObject), props);
			}
			return scopedSlotFn(props) || fallback
		} else {
			var slotNodes = this.$slots[name];
			// warn duplicate slot usage
			if (slotNodes && "development" !== 'production') {
				slotNodes._rendered && warn(
					"Duplicate presence of slot \"" + name + "\" found in the same render tree " +
					"- this will likely cause render errors.",
					this
				);
				slotNodes._rendered = true;
			}
			return slotNodes || fallback
		}
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
		return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
		eventKeyCode,
		key,
		builtInAlias
	) {
		var keyCodes = config.keyCodes[key] || builtInAlias;
		if (Array.isArray(keyCodes)) {
			return keyCodes.indexOf(eventKeyCode) === -1
		} else {
			return keyCodes !== eventKeyCode
		}
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
		data,
		tag,
		value,
		asProp,
		isSync
	) {
		if (value) {
			if (!isObject(value)) {
				"development" !== 'production' && warn(
					'v-bind without argument expects an Object or Array value',
					this
				);
			} else {
				if (Array.isArray(value)) {
					value = toObject(value);
				}
				var hash;
				var loop = function ( key ) {
					if (
						key === 'class' ||
						key === 'style' ||
						isReservedAttribute(key)
					) {
						hash = data;
					} else {
						var type = data.attrs && data.attrs.type;
						hash = asProp || config.mustUseProp(tag, type, key)
							? data.domProps || (data.domProps = {})
							: data.attrs || (data.attrs = {});
					}
					if (!(key in hash)) {
						hash[key] = value[key];

						if (isSync) {
							var on = data.on || (data.on = {});
							on[("update:" + key)] = function ($event) {
								value[key] = $event;
							};
						}
					}
				};

				for (var key in value) loop( key );
			}
		}
		return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
		index,
		isInFor
	) {
		var tree = this._staticTrees[index];
		// if has already-rendered static tree and not inside v-for,
		// we can reuse the same tree by doing a shallow clone.
		if (tree && !isInFor) {
			return Array.isArray(tree)
				? cloneVNodes(tree)
				: cloneVNode(tree)
		}
		// otherwise, render a fresh tree.
		tree = this._staticTrees[index] =
			this.$options.staticRenderFns[index].call(this._renderProxy);
		markStatic(tree, ("__static__" + index), false);
		return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
		tree,
		index,
		key
	) {
		markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
		return tree
	}

	function markStatic (
		tree,
		key,
		isOnce
	) {
		if (Array.isArray(tree)) {
			for (var i = 0; i < tree.length; i++) {
				if (tree[i] && typeof tree[i] !== 'string') {
					markStaticNode(tree[i], (key + "_" + i), isOnce);
				}
			}
		} else {
			markStaticNode(tree, key, isOnce);
		}
	}

	function markStaticNode (node, key, isOnce) {
		node.isStatic = true;
		node.key = key;
		node.isOnce = isOnce;
	}

	/*  */

	function bindObjectListeners (data, value) {
		if (value) {
			if (!isPlainObject(value)) {
				"development" !== 'production' && warn(
					'v-on without argument expects an Object value',
					this
				);
			} else {
				var on = data.on = data.on ? extend({}, data.on) : {};
				for (var key in value) {
					var existing = on[key];
					var ours = value[key];
					on[key] = existing ? [].concat(ours, existing) : ours;
				}
			}
		}
		return data
	}

	/*  */

	function initRender (vm) {
		vm._vnode = null; // the root of the child tree
		vm._staticTrees = null;
		var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
		var renderContext = parentVnode && parentVnode.context;
		vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
		vm.$scopedSlots = emptyObject;
		// bind the createElement fn to this instance
		// so that we get proper render context inside it.
		// args order: tag, data, children, normalizationType, alwaysNormalize
		// internal version is used by render functions compiled from templates
		vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
		// normalization is always applied for the public version, used in
		// user-written render functions.
		vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

		// $attrs & $listeners are exposed for easier HOC creation.
		// they need to be reactive so that HOCs using them are always updated
		var parentData = parentVnode && parentVnode.data;
		/* istanbul ignore else */
		{
			defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
				!isUpdatingChildComponent && warn("$attrs is readonly.", vm);
			}, true);
			defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
				!isUpdatingChildComponent && warn("$listeners is readonly.", vm);
			}, true);
		}
	}

	function renderMixin (Vue) {
		Vue.prototype.$nextTick = function (fn) {
			return nextTick(fn, this)
		};

		Vue.prototype._render = function () {
			var vm = this;
			var ref = vm.$options;
			var render = ref.render;
			var staticRenderFns = ref.staticRenderFns;
			var _parentVnode = ref._parentVnode;

			if (vm._isMounted) {
				// clone slot nodes on re-renders
				for (var key in vm.$slots) {
					vm.$slots[key] = cloneVNodes(vm.$slots[key]);
				}
			}

			vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

			if (staticRenderFns && !vm._staticTrees) {
				vm._staticTrees = [];
			}
			// set parent vnode. this allows render functions to have access
			// to the data on the placeholder node.
			vm.$vnode = _parentVnode;
			// render self
			var vnode;
			try {
				vnode = render.call(vm._renderProxy, vm.$createElement);
			} catch (e) {
				handleError(e, vm, "render function");
				// return error render result,
				// or previous vnode to prevent render error causing blank component
				/* istanbul ignore else */
				{
					vnode = vm.$options.renderError
						? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
						: vm._vnode;
				}
			}
			// return empty vnode in case the render function errored out
			if (!(vnode instanceof VNode)) {
				if ("development" !== 'production' && Array.isArray(vnode)) {
					warn(
						'Multiple root nodes returned from render function. Render function ' +
						'should return a single root node.',
						vm
					);
				}
				vnode = createEmptyVNode();
			}
			// set parent
			vnode.parent = _parentVnode;
			return vnode
		};

		// internal render helpers.
		// these are exposed on the instance prototype to reduce generated render
		// code size.
		Vue.prototype._o = markOnce;
		Vue.prototype._n = toNumber;
		Vue.prototype._s = toString;
		Vue.prototype._l = renderList;
		Vue.prototype._t = renderSlot;
		Vue.prototype._q = looseEqual;
		Vue.prototype._i = looseIndexOf;
		Vue.prototype._m = renderStatic;
		Vue.prototype._f = resolveFilter;
		Vue.prototype._k = checkKeyCodes;
		Vue.prototype._b = bindObjectProps;
		Vue.prototype._v = createTextVNode;
		Vue.prototype._e = createEmptyVNode;
		Vue.prototype._u = resolveScopedSlots;
		Vue.prototype._g = bindObjectListeners;
	}

	/*  */

	var uid$1 = 0;

	function initMixin (Vue) {
		Vue.prototype._init = function (options) {
			var vm = this;
			// a uid
			vm._uid = uid$1++;

			var startTag, endTag;
			/* istanbul ignore if */
			if ("development" !== 'production' && config.performance && mark) {
				startTag = "vue-perf-init:" + (vm._uid);
				endTag = "vue-perf-end:" + (vm._uid);
				mark(startTag);
			}

			// a flag to avoid this being observed
			vm._isVue = true;
			// merge options
			if (options && options._isComponent) {
				// optimize internal component instantiation
				// since dynamic options merging is pretty slow, and none of the
				// internal component options needs special treatment.
				initInternalComponent(vm, options);
			} else {
				vm.$options = mergeOptions(
					resolveConstructorOptions(vm.constructor),
					options || {},
					vm
				);
			}
			/* istanbul ignore else */
			{
				initProxy(vm);
			}
			// expose real self
			vm._self = vm;
			initLifecycle(vm);
			initEvents(vm);
			initRender(vm);
			callHook(vm, 'beforeCreate');
			initInjections(vm); // resolve injections before data/props
			initState(vm);
			initProvide(vm); // resolve provide after data/props
			callHook(vm, 'created');

			/* istanbul ignore if */
			if ("development" !== 'production' && config.performance && mark) {
				vm._name = formatComponentName(vm, false);
				mark(endTag);
				measure(((vm._name) + " init"), startTag, endTag);
			}

			if (vm.$options.el) {
				vm.$mount(vm.$options.el);
			}
		};
	}

	function initInternalComponent (vm, options) {
		var opts = vm.$options = Object.create(vm.constructor.options);
		// doing this because it's faster than dynamic enumeration.
		opts.parent = options.parent;
		opts.propsData = options.propsData;
		opts._parentVnode = options._parentVnode;
		opts._parentListeners = options._parentListeners;
		opts._renderChildren = options._renderChildren;
		opts._componentTag = options._componentTag;
		opts._parentElm = options._parentElm;
		opts._refElm = options._refElm;
		if (options.render) {
			opts.render = options.render;
			opts.staticRenderFns = options.staticRenderFns;
		}
	}

	function resolveConstructorOptions (Ctor) {
		var options = Ctor.options;
		if (Ctor.super) {
			var superOptions = resolveConstructorOptions(Ctor.super);
			var cachedSuperOptions = Ctor.superOptions;
			if (superOptions !== cachedSuperOptions) {
				// super option changed,
				// need to resolve new options.
				Ctor.superOptions = superOptions;
				// check if there are any late-modified/attached options (#4976)
				var modifiedOptions = resolveModifiedOptions(Ctor);
				// update base extend options
				if (modifiedOptions) {
					extend(Ctor.extendOptions, modifiedOptions);
				}
				options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
				if (options.name) {
					options.components[options.name] = Ctor;
				}
			}
		}
		return options
	}

	function resolveModifiedOptions (Ctor) {
		var modified;
		var latest = Ctor.options;
		var extended = Ctor.extendOptions;
		var sealed = Ctor.sealedOptions;
		for (var key in latest) {
			if (latest[key] !== sealed[key]) {
				if (!modified) { modified = {}; }
				modified[key] = dedupe(latest[key], extended[key], sealed[key]);
			}
		}
		return modified
	}

	function dedupe (latest, extended, sealed) {
		// compare latest and sealed to ensure lifecycle hooks won't be duplicated
		// between merges
		if (Array.isArray(latest)) {
			var res = [];
			sealed = Array.isArray(sealed) ? sealed : [sealed];
			extended = Array.isArray(extended) ? extended : [extended];
			for (var i = 0; i < latest.length; i++) {
				// push original options and not sealed options to exclude duplicated options
				if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
					res.push(latest[i]);
				}
			}
			return res
		} else {
			return latest
		}
	}

	function Vue$3 (options) {
		if ("development" !== 'production' &&
			!(this instanceof Vue$3)
		) {
			warn('Vue is a constructor and should be called with the `new` keyword');
		}
		this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
		Vue.use = function (plugin) {
			var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
			if (installedPlugins.indexOf(plugin) > -1) {
				return this
			}

			// additional parameters
			var args = toArray(arguments, 1);
			args.unshift(this);
			if (typeof plugin.install === 'function') {
				plugin.install.apply(plugin, args);
			} else if (typeof plugin === 'function') {
				plugin.apply(null, args);
			}
			installedPlugins.push(plugin);
			return this
		};
	}

	/*  */

	function initMixin$1 (Vue) {
		Vue.mixin = function (mixin) {
			this.options = mergeOptions(this.options, mixin);
			return this
		};
	}

	/*  */

	function initExtend (Vue) {
		/**
		 * Each instance constructor, including Vue, has a unique
		 * cid. This enables us to create wrapped "child
		 * constructors" for prototypal inheritance and cache them.
		 */
		Vue.cid = 0;
		var cid = 1;

		/**
		 * Class inheritance
		 */
		Vue.extend = function (extendOptions) {
			extendOptions = extendOptions || {};
			var Super = this;
			var SuperId = Super.cid;
			var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
			if (cachedCtors[SuperId]) {
				return cachedCtors[SuperId]
			}

			var name = extendOptions.name || Super.options.name;
			{
				if (!/^[a-zA-Z][\w-]*$/.test(name)) {
					warn(
						'Invalid component name: "' + name + '". Component names ' +
						'can only contain alphanumeric characters and the hyphen, ' +
						'and must start with a letter.'
					);
				}
			}

			var Sub = function VueComponent (options) {
				this._init(options);
			};
			Sub.prototype = Object.create(Super.prototype);
			Sub.prototype.constructor = Sub;
			Sub.cid = cid++;
			Sub.options = mergeOptions(
				Super.options,
				extendOptions
			);
			Sub['super'] = Super;

			// For props and computed properties, we define the proxy getters on
			// the Vue instances at extension time, on the extended prototype. This
			// avoids Object.defineProperty calls for each instance created.
			if (Sub.options.props) {
				initProps$1(Sub);
			}
			if (Sub.options.computed) {
				initComputed$1(Sub);
			}

			// allow further extension/mixin/plugin usage
			Sub.extend = Super.extend;
			Sub.mixin = Super.mixin;
			Sub.use = Super.use;

			// create asset registers, so extended classes
			// can have their private assets too.
			ASSET_TYPES.forEach(function (type) {
				Sub[type] = Super[type];
			});
			// enable recursive self-lookup
			if (name) {
				Sub.options.components[name] = Sub;
			}

			// keep a reference to the super options at extension time.
			// later at instantiation we can check if Super's options have
			// been updated.
			Sub.superOptions = Super.options;
			Sub.extendOptions = extendOptions;
			Sub.sealedOptions = extend({}, Sub.options);

			// cache constructor
			cachedCtors[SuperId] = Sub;
			return Sub
		};
	}

	function initProps$1 (Comp) {
		var props = Comp.options.props;
		for (var key in props) {
			proxy(Comp.prototype, "_props", key);
		}
	}

	function initComputed$1 (Comp) {
		var computed = Comp.options.computed;
		for (var key in computed) {
			defineComputed(Comp.prototype, key, computed[key]);
		}
	}

	/*  */

	function initAssetRegisters (Vue) {
		/**
		 * Create asset registration methods.
		 */
		ASSET_TYPES.forEach(function (type) {
			Vue[type] = function (
				id,
				definition
			) {
				if (!definition) {
					return this.options[type + 's'][id]
				} else {
					/* istanbul ignore if */
					{
						if (type === 'component' && config.isReservedTag(id)) {
							warn(
								'Do not use built-in or reserved HTML elements as component ' +
								'id: ' + id
							);
						}
					}
					if (type === 'component' && isPlainObject(definition)) {
						definition.name = definition.name || id;
						definition = this.options._base.extend(definition);
					}
					if (type === 'directive' && typeof definition === 'function') {
						definition = { bind: definition, update: definition };
					}
					this.options[type + 's'][id] = definition;
					return definition
				}
			};
		});
	}

	/*  */

	var patternTypes = [String, RegExp, Array];

	function getComponentName (opts) {
		return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
		if (Array.isArray(pattern)) {
			return pattern.indexOf(name) > -1
		} else if (typeof pattern === 'string') {
			return pattern.split(',').indexOf(name) > -1
		} else if (isRegExp(pattern)) {
			return pattern.test(name)
		}
		/* istanbul ignore next */
		return false
	}

	function pruneCache (cache, current, filter) {
		for (var key in cache) {
			var cachedNode = cache[key];
			if (cachedNode) {
				var name = getComponentName(cachedNode.componentOptions);
				if (name && !filter(name)) {
					if (cachedNode !== current) {
						pruneCacheEntry(cachedNode);
					}
					cache[key] = null;
				}
			}
		}
	}

	function pruneCacheEntry (vnode) {
		if (vnode) {
			vnode.componentInstance.$destroy();
		}
	}

	var KeepAlive = {
		name: 'keep-alive',
		abstract: true,

		props: {
			include: patternTypes,
			exclude: patternTypes
		},

		created: function created () {
			this.cache = Object.create(null);
		},

		destroyed: function destroyed () {
			var this$1 = this;

			for (var key in this$1.cache) {
				pruneCacheEntry(this$1.cache[key]);
			}
		},

		watch: {
			include: function include (val) {
				pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
			},
			exclude: function exclude (val) {
				pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
			}
		},

		render: function render () {
			var vnode = getFirstComponentChild(this.$slots.default);
			var componentOptions = vnode && vnode.componentOptions;
			if (componentOptions) {
				// check pattern
				var name = getComponentName(componentOptions);
				if (name && (
						(this.include && !matches(this.include, name)) ||
						(this.exclude && matches(this.exclude, name))
					)) {
					return vnode
				}
				var key = vnode.key == null
					// same constructor may get registered as different local components
					// so cid alone is not enough (#3269)
					? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
					: vnode.key;
				if (this.cache[key]) {
					vnode.componentInstance = this.cache[key].componentInstance;
				} else {
					this.cache[key] = vnode;
				}
				vnode.data.keepAlive = true;
			}
			return vnode
		}
	};

	var builtInComponents = {
		KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
		// config
		var configDef = {};
		configDef.get = function () { return config; };
		{
			configDef.set = function () {
				warn(
					'Do not replace the Vue.config object, set individual fields instead.'
				);
			};
		}
		Object.defineProperty(Vue, 'config', configDef);

		// exposed util methods.
		// NOTE: these are not considered part of the public API - avoid relying on
		// them unless you are aware of the risk.
		Vue.util = {
			warn: warn,
			extend: extend,
			mergeOptions: mergeOptions,
			defineReactive: defineReactive$$1
		};

		Vue.set = set;
		Vue.delete = del;
		Vue.nextTick = nextTick;

		Vue.options = Object.create(null);
		ASSET_TYPES.forEach(function (type) {
			Vue.options[type + 's'] = Object.create(null);
		});

		// this is used to identify the "base" constructor to extend all plain-object
		// components with in Weex's multi-instance scenarios.
		Vue.options._base = Vue;

		extend(Vue.options.components, builtInComponents);

		initUse(Vue);
		initMixin$1(Vue);
		initExtend(Vue);
		initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
		get: isServerRendering
	});

	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
		get: function get () {
			/* istanbul ignore next */
			return this.$vnode && this.$vnode.ssrContext
		}
	});

	Vue$3.version = '2.4.2';

	/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
	var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
		return (
			(attr === 'value' && acceptValue(tag)) && type !== 'button' ||
			(attr === 'selected' && tag === 'option') ||
			(attr === 'checked' && tag === 'input') ||
			(attr === 'muted' && tag === 'video')
		)
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
		'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
		'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
		'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
		'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
		'required,reversed,scoped,seamless,selected,sortable,translate,' +
		'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
		return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
		return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
		return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
		var data = vnode.data;
		var parentNode = vnode;
		var childNode = vnode;
		while (isDef(childNode.componentInstance)) {
			childNode = childNode.componentInstance._vnode;
			if (childNode.data) {
				data = mergeClassData(childNode.data, data);
			}
		}
		while (isDef(parentNode = parentNode.parent)) {
			if (parentNode.data) {
				data = mergeClassData(data, parentNode.data);
			}
		}
		return renderClass(data.staticClass, data.class)
	}

	function mergeClassData (child, parent) {
		return {
			staticClass: concat(child.staticClass, parent.staticClass),
			class: isDef(child.class)
				? [child.class, parent.class]
				: parent.class
		}
	}

	function renderClass (
		staticClass,
		dynamicClass
	) {
		if (isDef(staticClass) || isDef(dynamicClass)) {
			return concat(staticClass, stringifyClass(dynamicClass))
		}
		/* istanbul ignore next */
		return ''
	}

	function concat (a, b) {
		return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
		if (Array.isArray(value)) {
			return stringifyArray(value)
		}
		if (isObject(value)) {
			return stringifyObject(value)
		}
		if (typeof value === 'string') {
			return value
		}
		/* istanbul ignore next */
		return ''
	}

	function stringifyArray (value) {
		var res = '';
		var stringified;
		for (var i = 0, l = value.length; i < l; i++) {
			if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
				if (res) { res += ' '; }
				res += stringified;
			}
		}
		return res
	}

	function stringifyObject (value) {
		var res = '';
		for (var key in value) {
			if (value[key]) {
				if (res) { res += ' '; }
				res += key;
			}
		}
		return res
	}

	/*  */

	var namespaceMap = {
		svg: 'http://www.w3.org/2000/svg',
		math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
		'html,body,base,head,link,meta,style,title,' +
		'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
		'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
		'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
		's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
		'embed,object,param,source,canvas,script,noscript,del,ins,' +
		'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
		'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
		'output,progress,select,textarea,' +
		'details,dialog,menu,menuitem,summary,' +
		'content,element,shadow,template,blockquote,iframe,tfoot'
	);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
	var isSVG = makeMap(
		'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
		'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
		'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
		true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
		return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
		if (isSVG(tag)) {
			return 'svg'
		}
		// basic support for MathML
		// note it doesn't support other MathML elements being component roots
		if (tag === 'math') {
			return 'math'
		}
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
		/* istanbul ignore if */
		if (!inBrowser) {
			return true
		}
		if (isReservedTag(tag)) {
			return false
		}
		tag = tag.toLowerCase();
		/* istanbul ignore if */
		if (unknownElementCache[tag] != null) {
			return unknownElementCache[tag]
		}
		var el = document.createElement(tag);
		if (tag.indexOf('-') > -1) {
			// http://stackoverflow.com/a/28210364/1070244
			return (unknownElementCache[tag] = (
				el.constructor === window.HTMLUnknownElement ||
				el.constructor === window.HTMLElement
			))
		} else {
			return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
		}
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
		if (typeof el === 'string') {
			var selected = document.querySelector(el);
			if (!selected) {
				"development" !== 'production' && warn(
					'Cannot find element: ' + el
				);
				return document.createElement('div')
			}
			return selected
		} else {
			return el
		}
	}

	/*  */

	function createElement$1 (tagName, vnode) {
		var elm = document.createElement(tagName);
		if (tagName !== 'select') {
			return elm
		}
		// false or null will remove the attribute but undefined will not
		if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
			elm.setAttribute('multiple', 'multiple');
		}
		return elm
	}

	function createElementNS (namespace, tagName) {
		return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
		return document.createTextNode(text)
	}

	function createComment (text) {
		return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
		parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
		node.removeChild(child);
	}

	function appendChild (node, child) {
		node.appendChild(child);
	}

	function parentNode (node) {
		return node.parentNode
	}

	function nextSibling (node) {
		return node.nextSibling
	}

	function tagName (node) {
		return node.tagName
	}

	function setTextContent (node, text) {
		node.textContent = text;
	}

	function setAttribute (node, key, val) {
		node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
		create: function create (_, vnode) {
			registerRef(vnode);
		},
		update: function update (oldVnode, vnode) {
			if (oldVnode.data.ref !== vnode.data.ref) {
				registerRef(oldVnode, true);
				registerRef(vnode);
			}
		},
		destroy: function destroy (vnode) {
			registerRef(vnode, true);
		}
	};

	function registerRef (vnode, isRemoval) {
		var key = vnode.data.ref;
		if (!key) { return }

		var vm = vnode.context;
		var ref = vnode.componentInstance || vnode.elm;
		var refs = vm.$refs;
		if (isRemoval) {
			if (Array.isArray(refs[key])) {
				remove(refs[key], ref);
			} else if (refs[key] === ref) {
				refs[key] = undefined;
			}
		} else {
			if (vnode.data.refInFor) {
				if (!Array.isArray(refs[key])) {
					refs[key] = [ref];
				} else if (refs[key].indexOf(ref) < 0) {
					// $flow-disable-line
					refs[key].push(ref);
				}
			} else {
				refs[key] = ref;
			}
		}
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	 /*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode (a, b) {
		return (
			a.key === b.key && (
				(
					a.tag === b.tag &&
					a.isComment === b.isComment &&
					isDef(a.data) === isDef(b.data) &&
					sameInputType(a, b)
				) || (
					isTrue(a.isAsyncPlaceholder) &&
					a.asyncFactory === b.asyncFactory &&
					isUndef(b.asyncFactory.error)
				)
			)
		)
	}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
	function sameInputType (a, b) {
		if (a.tag !== 'input') { return true }
		var i;
		var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
		var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
		return typeA === typeB
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
		var i, key;
		var map = {};
		for (i = beginIdx; i <= endIdx; ++i) {
			key = children[i].key;
			if (isDef(key)) { map[key] = i; }
		}
		return map
	}

	function createPatchFunction (backend) {
		var i, j;
		var cbs = {};

		var modules = backend.modules;
		var nodeOps = backend.nodeOps;

		for (i = 0; i < hooks.length; ++i) {
			cbs[hooks[i]] = [];
			for (j = 0; j < modules.length; ++j) {
				if (isDef(modules[j][hooks[i]])) {
					cbs[hooks[i]].push(modules[j][hooks[i]]);
				}
			}
		}

		function emptyNodeAt (elm) {
			return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
		}

		function createRmCb (childElm, listeners) {
			function remove$$1 () {
				if (--remove$$1.listeners === 0) {
					removeNode(childElm);
				}
			}
			remove$$1.listeners = listeners;
			return remove$$1
		}

		function removeNode (el) {
			var parent = nodeOps.parentNode(el);
			// element may have already been removed due to v-html / v-text
			if (isDef(parent)) {
				nodeOps.removeChild(parent, el);
			}
		}

		var inPre = 0;
		function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
			vnode.isRootInsert = !nested; // for transition enter check
			if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
				return
			}

			var data = vnode.data;
			var children = vnode.children;
			var tag = vnode.tag;
			if (isDef(tag)) {
				{
					if (data && data.pre) {
						inPre++;
					}
					if (
						!inPre &&
						!vnode.ns &&
						!(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
						config.isUnknownElement(tag)
					) {
						warn(
							'Unknown custom element: <' + tag + '> - did you ' +
							'register the component correctly? For recursive components, ' +
							'make sure to provide the "name" option.',
							vnode.context
						);
					}
				}
				vnode.elm = vnode.ns
					? nodeOps.createElementNS(vnode.ns, tag)
					: nodeOps.createElement(tag, vnode);
				setScope(vnode);

				/* istanbul ignore if */
				{
					createChildren(vnode, children, insertedVnodeQueue);
					if (isDef(data)) {
						invokeCreateHooks(vnode, insertedVnodeQueue);
					}
					insert(parentElm, vnode.elm, refElm);
				}

				if ("development" !== 'production' && data && data.pre) {
					inPre--;
				}
			} else if (isTrue(vnode.isComment)) {
				vnode.elm = nodeOps.createComment(vnode.text);
				insert(parentElm, vnode.elm, refElm);
			} else {
				vnode.elm = nodeOps.createTextNode(vnode.text);
				insert(parentElm, vnode.elm, refElm);
			}
		}

		function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
			var i = vnode.data;
			if (isDef(i)) {
				var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
				if (isDef(i = i.hook) && isDef(i = i.init)) {
					i(vnode, false /* hydrating */, parentElm, refElm);
				}
				// after calling the init hook, if the vnode is a child component
				// it should've created a child instance and mounted it. the child
				// component also has set the placeholder vnode's elm.
				// in that case we can just return the element and be done.
				if (isDef(vnode.componentInstance)) {
					initComponent(vnode, insertedVnodeQueue);
					if (isTrue(isReactivated)) {
						reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
					}
					return true
				}
			}
		}

		function initComponent (vnode, insertedVnodeQueue) {
			if (isDef(vnode.data.pendingInsert)) {
				insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
				vnode.data.pendingInsert = null;
			}
			vnode.elm = vnode.componentInstance.$el;
			if (isPatchable(vnode)) {
				invokeCreateHooks(vnode, insertedVnodeQueue);
				setScope(vnode);
			} else {
				// empty component root.
				// skip all element-related modules except for ref (#3455)
				registerRef(vnode);
				// make sure to invoke the insert hook
				insertedVnodeQueue.push(vnode);
			}
		}

		function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
			var i;
			// hack for #4339: a reactivated component with inner transition
			// does not trigger because the inner node's created hooks are not called
			// again. It's not ideal to involve module-specific logic in here but
			// there doesn't seem to be a better way to do it.
			var innerNode = vnode;
			while (innerNode.componentInstance) {
				innerNode = innerNode.componentInstance._vnode;
				if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
					for (i = 0; i < cbs.activate.length; ++i) {
						cbs.activate[i](emptyNode, innerNode);
					}
					insertedVnodeQueue.push(innerNode);
					break
				}
			}
			// unlike a newly created component,
			// a reactivated keep-alive component doesn't insert itself
			insert(parentElm, vnode.elm, refElm);
		}

		function insert (parent, elm, ref$$1) {
			if (isDef(parent)) {
				if (isDef(ref$$1)) {
					if (ref$$1.parentNode === parent) {
						nodeOps.insertBefore(parent, elm, ref$$1);
					}
				} else {
					nodeOps.appendChild(parent, elm);
				}
			}
		}

		function createChildren (vnode, children, insertedVnodeQueue) {
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; ++i) {
					createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
				}
			} else if (isPrimitive(vnode.text)) {
				nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
			}
		}

		function isPatchable (vnode) {
			while (vnode.componentInstance) {
				vnode = vnode.componentInstance._vnode;
			}
			return isDef(vnode.tag)
		}

		function invokeCreateHooks (vnode, insertedVnodeQueue) {
			for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
				cbs.create[i$1](emptyNode, vnode);
			}
			i = vnode.data.hook; // Reuse variable
			if (isDef(i)) {
				if (isDef(i.create)) { i.create(emptyNode, vnode); }
				if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
			}
		}

		// set scope id attribute for scoped CSS.
		// this is implemented as a special case to avoid the overhead
		// of going through the normal attribute patching process.
		function setScope (vnode) {
			var i;
			var ancestor = vnode;
			while (ancestor) {
				if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
					nodeOps.setAttribute(vnode.elm, i, '');
				}
				ancestor = ancestor.parent;
			}
			// for slot content they should also get the scopeId from the host instance.
			if (isDef(i = activeInstance) &&
				i !== vnode.context &&
				isDef(i = i.$options._scopeId)
			) {
				nodeOps.setAttribute(vnode.elm, i, '');
			}
		}

		function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
			for (; startIdx <= endIdx; ++startIdx) {
				createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
			}
		}

		function invokeDestroyHook (vnode) {
			var i, j;
			var data = vnode.data;
			if (isDef(data)) {
				if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
				for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
			}
			if (isDef(i = vnode.children)) {
				for (j = 0; j < vnode.children.length; ++j) {
					invokeDestroyHook(vnode.children[j]);
				}
			}
		}

		function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
			for (; startIdx <= endIdx; ++startIdx) {
				var ch = vnodes[startIdx];
				if (isDef(ch)) {
					if (isDef(ch.tag)) {
						removeAndInvokeRemoveHook(ch);
						invokeDestroyHook(ch);
					} else { // Text node
						removeNode(ch.elm);
					}
				}
			}
		}

		function removeAndInvokeRemoveHook (vnode, rm) {
			if (isDef(rm) || isDef(vnode.data)) {
				var i;
				var listeners = cbs.remove.length + 1;
				if (isDef(rm)) {
					// we have a recursively passed down rm callback
					// increase the listeners count
					rm.listeners += listeners;
				} else {
					// directly removing
					rm = createRmCb(vnode.elm, listeners);
				}
				// recursively invoke hooks on child component root node
				if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
					removeAndInvokeRemoveHook(i, rm);
				}
				for (i = 0; i < cbs.remove.length; ++i) {
					cbs.remove[i](vnode, rm);
				}
				if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
					i(vnode, rm);
				} else {
					rm();
				}
			} else {
				removeNode(vnode.elm);
			}
		}

		function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
			var oldStartIdx = 0;
			var newStartIdx = 0;
			var oldEndIdx = oldCh.length - 1;
			var oldStartVnode = oldCh[0];
			var oldEndVnode = oldCh[oldEndIdx];
			var newEndIdx = newCh.length - 1;
			var newStartVnode = newCh[0];
			var newEndVnode = newCh[newEndIdx];
			var oldKeyToIdx, idxInOld, elmToMove, refElm;

			// removeOnly is a special flag used only by <transition-group>
			// to ensure removed elements stay in correct relative positions
			// during leaving transitions
			var canMove = !removeOnly;

			while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
				if (isUndef(oldStartVnode)) {
					oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
				} else if (isUndef(oldEndVnode)) {
					oldEndVnode = oldCh[--oldEndIdx];
				} else if (sameVnode(oldStartVnode, newStartVnode)) {
					patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
					oldStartVnode = oldCh[++oldStartIdx];
					newStartVnode = newCh[++newStartIdx];
				} else if (sameVnode(oldEndVnode, newEndVnode)) {
					patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
					oldEndVnode = oldCh[--oldEndIdx];
					newEndVnode = newCh[--newEndIdx];
				} else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
					patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
					canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
					oldStartVnode = oldCh[++oldStartIdx];
					newEndVnode = newCh[--newEndIdx];
				} else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
					patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
					canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
					oldEndVnode = oldCh[--oldEndIdx];
					newStartVnode = newCh[++newStartIdx];
				} else {
					if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
					idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
					if (isUndef(idxInOld)) { // New element
						createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
						newStartVnode = newCh[++newStartIdx];
					} else {
						elmToMove = oldCh[idxInOld];
						/* istanbul ignore if */
						if ("development" !== 'production' && !elmToMove) {
							warn(
								'It seems there are duplicate keys that is causing an update error. ' +
								'Make sure each v-for item has a unique key.'
							);
						}
						if (sameVnode(elmToMove, newStartVnode)) {
							patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
							oldCh[idxInOld] = undefined;
							canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
							newStartVnode = newCh[++newStartIdx];
						} else {
							// same key but different element. treat as new element
							createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
							newStartVnode = newCh[++newStartIdx];
						}
					}
				}
			}
			if (oldStartIdx > oldEndIdx) {
				refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
				addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
			} else if (newStartIdx > newEndIdx) {
				removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
			}
		}

		function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
			if (oldVnode === vnode) {
				return
			}

			var elm = vnode.elm = oldVnode.elm;

			if (isTrue(oldVnode.isAsyncPlaceholder)) {
				if (isDef(vnode.asyncFactory.resolved)) {
					hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
				} else {
					vnode.isAsyncPlaceholder = true;
				}
				return
			}

			// reuse element for static trees.
			// note we only do this if the vnode is cloned -
			// if the new node is not cloned it means the render functions have been
			// reset by the hot-reload-api and we need to do a proper re-render.
			if (isTrue(vnode.isStatic) &&
				isTrue(oldVnode.isStatic) &&
				vnode.key === oldVnode.key &&
				(isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
			) {
				vnode.componentInstance = oldVnode.componentInstance;
				return
			}

			var i;
			var data = vnode.data;
			if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
				i(oldVnode, vnode);
			}

			var oldCh = oldVnode.children;
			var ch = vnode.children;
			if (isDef(data) && isPatchable(vnode)) {
				for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
				if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
			}
			if (isUndef(vnode.text)) {
				if (isDef(oldCh) && isDef(ch)) {
					if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
				} else if (isDef(ch)) {
					if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
					addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
				} else if (isDef(oldCh)) {
					removeVnodes(elm, oldCh, 0, oldCh.length - 1);
				} else if (isDef(oldVnode.text)) {
					nodeOps.setTextContent(elm, '');
				}
			} else if (oldVnode.text !== vnode.text) {
				nodeOps.setTextContent(elm, vnode.text);
			}
			if (isDef(data)) {
				if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
			}
		}

		function invokeInsertHook (vnode, queue, initial) {
			// delay insert hooks for component root nodes, invoke them after the
			// element is really inserted
			if (isTrue(initial) && isDef(vnode.parent)) {
				vnode.parent.data.pendingInsert = queue;
			} else {
				for (var i = 0; i < queue.length; ++i) {
					queue[i].data.hook.insert(queue[i]);
				}
			}
		}

		var bailed = false;
		// list of modules that can skip create hook during hydration because they
		// are already rendered on the client or has no need for initialization
		var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

		// Note: this is a browser-only function so we can assume elms are DOM nodes.
		function hydrate (elm, vnode, insertedVnodeQueue) {
			if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
				vnode.elm = elm;
				vnode.isAsyncPlaceholder = true;
				return true
			}
			{
				if (!assertNodeMatch(elm, vnode)) {
					return false
				}
			}
			vnode.elm = elm;
			var tag = vnode.tag;
			var data = vnode.data;
			var children = vnode.children;
			if (isDef(data)) {
				if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
				if (isDef(i = vnode.componentInstance)) {
					// child component. it should have hydrated its own tree.
					initComponent(vnode, insertedVnodeQueue);
					return true
				}
			}
			if (isDef(tag)) {
				if (isDef(children)) {
					// empty element, allow client to pick up and populate children
					if (!elm.hasChildNodes()) {
						createChildren(vnode, children, insertedVnodeQueue);
					} else {
						var childrenMatch = true;
						var childNode = elm.firstChild;
						for (var i$1 = 0; i$1 < children.length; i$1++) {
							if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
								childrenMatch = false;
								break
							}
							childNode = childNode.nextSibling;
						}
						// if childNode is not null, it means the actual childNodes list is
						// longer than the virtual children list.
						if (!childrenMatch || childNode) {
							if ("development" !== 'production' &&
								typeof console !== 'undefined' &&
								!bailed
							) {
								bailed = true;
								console.warn('Parent: ', elm);
								console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
							}
							return false
						}
					}
				}
				if (isDef(data)) {
					for (var key in data) {
						if (!isRenderedModule(key)) {
							invokeCreateHooks(vnode, insertedVnodeQueue);
							break
						}
					}
				}
			} else if (elm.data !== vnode.text) {
				elm.data = vnode.text;
			}
			return true
		}

		function assertNodeMatch (node, vnode) {
			if (isDef(vnode.tag)) {
				return (
					vnode.tag.indexOf('vue-component') === 0 ||
					vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
				)
			} else {
				return node.nodeType === (vnode.isComment ? 8 : 3)
			}
		}

		return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
			if (isUndef(vnode)) {
				if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
				return
			}

			var isInitialPatch = false;
			var insertedVnodeQueue = [];

			if (isUndef(oldVnode)) {
				// empty mount (likely as component), create new root element
				isInitialPatch = true;
				createElm(vnode, insertedVnodeQueue, parentElm, refElm);
			} else {
				var isRealElement = isDef(oldVnode.nodeType);
				if (!isRealElement && sameVnode(oldVnode, vnode)) {
					// patch existing root node
					patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
				} else {
					if (isRealElement) {
						// mounting to a real element
						// check if this is server-rendered content and if we can perform
						// a successful hydration.
						if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
							oldVnode.removeAttribute(SSR_ATTR);
							hydrating = true;
						}
						if (isTrue(hydrating)) {
							if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
								invokeInsertHook(vnode, insertedVnodeQueue, true);
								return oldVnode
							} else {
								warn(
									'The client-side rendered virtual DOM tree is not matching ' +
									'server-rendered content. This is likely caused by incorrect ' +
									'HTML markup, for example nesting block-level elements inside ' +
									'<p>, or missing <tbody>. Bailing hydration and performing ' +
									'full client-side render.'
								);
							}
						}
						// either not server-rendered, or hydration failed.
						// create an empty node and replace it
						oldVnode = emptyNodeAt(oldVnode);
					}
					// replacing existing element
					var oldElm = oldVnode.elm;
					var parentElm$1 = nodeOps.parentNode(oldElm);
					createElm(
						vnode,
						insertedVnodeQueue,
						// extremely rare edge case: do not insert if old element is in a
						// leaving transition. Only happens when combining transition +
						// keep-alive + HOCs. (#4590)
						oldElm._leaveCb ? null : parentElm$1,
						nodeOps.nextSibling(oldElm)
					);

					if (isDef(vnode.parent)) {
						// component root element replaced.
						// update parent placeholder node element, recursively
						var ancestor = vnode.parent;
						while (ancestor) {
							ancestor.elm = vnode.elm;
							ancestor = ancestor.parent;
						}
						if (isPatchable(vnode)) {
							for (var i = 0; i < cbs.create.length; ++i) {
								cbs.create[i](emptyNode, vnode.parent);
							}
						}
					}

					if (isDef(parentElm$1)) {
						removeVnodes(parentElm$1, [oldVnode], 0, 0);
					} else if (isDef(oldVnode.tag)) {
						invokeDestroyHook(oldVnode);
					}
				}
			}

			invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
			return vnode.elm
		}
	}

	/*  */

	var directives = {
		create: updateDirectives,
		update: updateDirectives,
		destroy: function unbindDirectives (vnode) {
			updateDirectives(vnode, emptyNode);
		}
	};

	function updateDirectives (oldVnode, vnode) {
		if (oldVnode.data.directives || vnode.data.directives) {
			_update(oldVnode, vnode);
		}
	}

	function _update (oldVnode, vnode) {
		var isCreate = oldVnode === emptyNode;
		var isDestroy = vnode === emptyNode;
		var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
		var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

		var dirsWithInsert = [];
		var dirsWithPostpatch = [];

		var key, oldDir, dir;
		for (key in newDirs) {
			oldDir = oldDirs[key];
			dir = newDirs[key];
			if (!oldDir) {
				// new directive, bind
				callHook$1(dir, 'bind', vnode, oldVnode);
				if (dir.def && dir.def.inserted) {
					dirsWithInsert.push(dir);
				}
			} else {
				// existing directive, update
				dir.oldValue = oldDir.value;
				callHook$1(dir, 'update', vnode, oldVnode);
				if (dir.def && dir.def.componentUpdated) {
					dirsWithPostpatch.push(dir);
				}
			}
		}

		if (dirsWithInsert.length) {
			var callInsert = function () {
				for (var i = 0; i < dirsWithInsert.length; i++) {
					callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
				}
			};
			if (isCreate) {
				mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
			} else {
				callInsert();
			}
		}

		if (dirsWithPostpatch.length) {
			mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
				for (var i = 0; i < dirsWithPostpatch.length; i++) {
					callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
				}
			});
		}

		if (!isCreate) {
			for (key in oldDirs) {
				if (!newDirs[key]) {
					// no longer present, unbind
					callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
				}
			}
		}
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
		dirs,
		vm
	) {
		var res = Object.create(null);
		if (!dirs) {
			return res
		}
		var i, dir;
		for (i = 0; i < dirs.length; i++) {
			dir = dirs[i];
			if (!dir.modifiers) {
				dir.modifiers = emptyModifiers;
			}
			res[getRawDirName(dir)] = dir;
			dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
		}
		return res
	}

	function getRawDirName (dir) {
		return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
		var fn = dir.def && dir.def[hook];
		if (fn) {
			try {
				fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
			} catch (e) {
				handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
			}
		}
	}

	var baseModules = [
		ref,
		directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
		var opts = vnode.componentOptions;
		if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
			return
		}
		if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
			return
		}
		var key, cur, old;
		var elm = vnode.elm;
		var oldAttrs = oldVnode.data.attrs || {};
		var attrs = vnode.data.attrs || {};
		// clone observed objects, as the user probably wants to mutate it
		if (isDef(attrs.__ob__)) {
			attrs = vnode.data.attrs = extend({}, attrs);
		}

		for (key in attrs) {
			cur = attrs[key];
			old = oldAttrs[key];
			if (old !== cur) {
				setAttr(elm, key, cur);
			}
		}
		// #4391: in IE9, setting type can reset value for input[type=radio]
		/* istanbul ignore if */
		if (isIE9 && attrs.value !== oldAttrs.value) {
			setAttr(elm, 'value', attrs.value);
		}
		for (key in oldAttrs) {
			if (isUndef(attrs[key])) {
				if (isXlink(key)) {
					elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
				} else if (!isEnumeratedAttr(key)) {
					elm.removeAttribute(key);
				}
			}
		}
	}

	function setAttr (el, key, value) {
		if (isBooleanAttr(key)) {
			// set attribute for blank value
			// e.g. <option disabled>Select one</option>
			if (isFalsyAttrValue(value)) {
				el.removeAttribute(key);
			} else {
				el.setAttribute(key, key);
			}
		} else if (isEnumeratedAttr(key)) {
			el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
		} else if (isXlink(key)) {
			if (isFalsyAttrValue(value)) {
				el.removeAttributeNS(xlinkNS, getXlinkProp(key));
			} else {
				el.setAttributeNS(xlinkNS, key, value);
			}
		} else {
			if (isFalsyAttrValue(value)) {
				el.removeAttribute(key);
			} else {
				el.setAttribute(key, value);
			}
		}
	}

	var attrs = {
		create: updateAttrs,
		update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
		var el = vnode.elm;
		var data = vnode.data;
		var oldData = oldVnode.data;
		if (
			isUndef(data.staticClass) &&
			isUndef(data.class) && (
				isUndef(oldData) || (
					isUndef(oldData.staticClass) &&
					isUndef(oldData.class)
				)
			)
		) {
			return
		}

		var cls = genClassForVnode(vnode);

		// handle transition classes
		var transitionClass = el._transitionClasses;
		if (isDef(transitionClass)) {
			cls = concat(cls, stringifyClass(transitionClass));
		}

		// set the class
		if (cls !== el._prevClass) {
			el.setAttribute('class', cls);
			el._prevClass = cls;
		}
	}

	var klass = {
		create: updateClass,
		update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;

	function parseFilters (exp) {
		var inSingle = false;
		var inDouble = false;
		var inTemplateString = false;
		var inRegex = false;
		var curly = 0;
		var square = 0;
		var paren = 0;
		var lastFilterIndex = 0;
		var c, prev, i, expression, filters;

		for (i = 0; i < exp.length; i++) {
			prev = c;
			c = exp.charCodeAt(i);
			if (inSingle) {
				if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
			} else if (inDouble) {
				if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
			} else if (inTemplateString) {
				if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
			} else if (inRegex) {
				if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
			} else if (
				c === 0x7C && // pipe
				exp.charCodeAt(i + 1) !== 0x7C &&
				exp.charCodeAt(i - 1) !== 0x7C &&
				!curly && !square && !paren
			) {
				if (expression === undefined) {
					// first filter, end of expression
					lastFilterIndex = i + 1;
					expression = exp.slice(0, i).trim();
				} else {
					pushFilter();
				}
			} else {
				switch (c) {
					case 0x22: inDouble = true; break         // "
					case 0x27: inSingle = true; break         // '
					case 0x60: inTemplateString = true; break // `
					case 0x28: paren++; break                 // (
					case 0x29: paren--; break                 // )
					case 0x5B: square++; break                // [
					case 0x5D: square--; break                // ]
					case 0x7B: curly++; break                 // {
					case 0x7D: curly--; break                 // }
				}
				if (c === 0x2f) { // /
					var j = i - 1;
					var p = (void 0);
					// find first non-whitespace prev char
					for (; j >= 0; j--) {
						p = exp.charAt(j);
						if (p !== ' ') { break }
					}
					if (!p || !validDivisionCharRE.test(p)) {
						inRegex = true;
					}
				}
			}
		}

		if (expression === undefined) {
			expression = exp.slice(0, i).trim();
		} else if (lastFilterIndex !== 0) {
			pushFilter();
		}

		function pushFilter () {
			(filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
			lastFilterIndex = i + 1;
		}

		if (filters) {
			for (i = 0; i < filters.length; i++) {
				expression = wrapFilter(expression, filters[i]);
			}
		}

		return expression
	}

	function wrapFilter (exp, filter) {
		var i = filter.indexOf('(');
		if (i < 0) {
			// _f: resolveFilter
			return ("_f(\"" + filter + "\")(" + exp + ")")
		} else {
			var name = filter.slice(0, i);
			var args = filter.slice(i + 1);
			return ("_f(\"" + name + "\")(" + exp + "," + args)
		}
	}

	/*  */

	function baseWarn (msg) {
		console.error(("[Vue compiler]: " + msg));
	}

	function pluckModuleFunction (
		modules,
		key
	) {
		return modules
			? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
			: []
	}

	function addProp (el, name, value) {
		(el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
		(el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
		el,
		name,
		rawName,
		value,
		arg,
		modifiers
	) {
		(el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
		el,
		name,
		value,
		modifiers,
		important,
		warn
	) {
		// warn prevent and passive modifier
		/* istanbul ignore if */
		if (
			"development" !== 'production' && warn &&
			modifiers && modifiers.prevent && modifiers.passive
		) {
			warn(
				'passive and prevent can\'t be used together. ' +
				'Passive handler can\'t prevent default event.'
			);
		}
		// check capture modifier
		if (modifiers && modifiers.capture) {
			delete modifiers.capture;
			name = '!' + name; // mark the event as captured
		}
		if (modifiers && modifiers.once) {
			delete modifiers.once;
			name = '~' + name; // mark the event as once
		}
		/* istanbul ignore if */
		if (modifiers && modifiers.passive) {
			delete modifiers.passive;
			name = '&' + name; // mark the event as passive
		}
		var events;
		if (modifiers && modifiers.native) {
			delete modifiers.native;
			events = el.nativeEvents || (el.nativeEvents = {});
		} else {
			events = el.events || (el.events = {});
		}
		var newHandler = { value: value, modifiers: modifiers };
		var handlers = events[name];
		/* istanbul ignore if */
		if (Array.isArray(handlers)) {
			important ? handlers.unshift(newHandler) : handlers.push(newHandler);
		} else if (handlers) {
			events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
		} else {
			events[name] = newHandler;
		}
	}

	function getBindingAttr (
		el,
		name,
		getStatic
	) {
		var dynamicValue =
			getAndRemoveAttr(el, ':' + name) ||
			getAndRemoveAttr(el, 'v-bind:' + name);
		if (dynamicValue != null) {
			return parseFilters(dynamicValue)
		} else if (getStatic !== false) {
			var staticValue = getAndRemoveAttr(el, name);
			if (staticValue != null) {
				return JSON.stringify(staticValue)
			}
		}
	}

	function getAndRemoveAttr (el, name) {
		var val;
		if ((val = el.attrsMap[name]) != null) {
			var list = el.attrsList;
			for (var i = 0, l = list.length; i < l; i++) {
				if (list[i].name === name) {
					list.splice(i, 1);
					break
				}
			}
		}
		return val
	}

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
		el,
		value,
		modifiers
	) {
		var ref = modifiers || {};
		var number = ref.number;
		var trim = ref.trim;

		var baseValueExpression = '$$v';
		var valueExpression = baseValueExpression;
		if (trim) {
			valueExpression =
				"(typeof " + baseValueExpression + " === 'string'" +
				"? " + baseValueExpression + ".trim()" +
				": " + baseValueExpression + ")";
		}
		if (number) {
			valueExpression = "_n(" + valueExpression + ")";
		}
		var assignment = genAssignmentCode(value, valueExpression);

		el.model = {
			value: ("(" + value + ")"),
			expression: ("\"" + value + "\""),
			callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
		};
	}

	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
		value,
		assignment
	) {
		var modelRs = parseModel(value);
		if (modelRs.idx === null) {
			return (value + "=" + assignment)
		} else {
			return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
		}
	}

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	function parseModel (val) {
		str = val;
		len = str.length;
		index$1 = expressionPos = expressionEndPos = 0;

		if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
			return {
				exp: val,
				idx: null
			}
		}

		while (!eof()) {
			chr = next();
			/* istanbul ignore if */
			if (isStringStart(chr)) {
				parseString(chr);
			} else if (chr === 0x5B) {
				parseBracket(chr);
			}
		}

		return {
			exp: val.substring(0, expressionPos),
			idx: val.substring(expressionPos + 1, expressionEndPos)
		}
	}

	function next () {
		return str.charCodeAt(++index$1)
	}

	function eof () {
		return index$1 >= len
	}

	function isStringStart (chr) {
		return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
		var inBracket = 1;
		expressionPos = index$1;
		while (!eof()) {
			chr = next();
			if (isStringStart(chr)) {
				parseString(chr);
				continue
			}
			if (chr === 0x5B) { inBracket++; }
			if (chr === 0x5D) { inBracket--; }
			if (inBracket === 0) {
				expressionEndPos = index$1;
				break
			}
		}
	}

	function parseString (chr) {
		var stringQuote = chr;
		while (!eof()) {
			chr = next();
			if (chr === stringQuote) {
				break
			}
		}
	}

	/*  */

	var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	function model (
		el,
		dir,
		_warn
	) {
		warn$1 = _warn;
		var value = dir.value;
		var modifiers = dir.modifiers;
		var tag = el.tag;
		var type = el.attrsMap.type;

		{
			var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
			if (tag === 'input' && dynamicType) {
				warn$1(
					"<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
					"v-model does not support dynamic input types. Use v-if branches instead."
				);
			}
			// inputs with type="file" are read only and setting the input's
			// value will throw an error.
			if (tag === 'input' && type === 'file') {
				warn$1(
					"<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
					"File inputs are read only. Use a v-on:change listener instead."
				);
			}
		}

		if (el.component) {
			genComponentModel(el, value, modifiers);
			// component v-model doesn't need extra runtime
			return false
		} else if (tag === 'select') {
			genSelect(el, value, modifiers);
		} else if (tag === 'input' && type === 'checkbox') {
			genCheckboxModel(el, value, modifiers);
		} else if (tag === 'input' && type === 'radio') {
			genRadioModel(el, value, modifiers);
		} else if (tag === 'input' || tag === 'textarea') {
			genDefaultModel(el, value, modifiers);
		} else if (!config.isReservedTag(tag)) {
			genComponentModel(el, value, modifiers);
			// component v-model doesn't need extra runtime
			return false
		} else {
			warn$1(
				"<" + (el.tag) + " v-model=\"" + value + "\">: " +
				"v-model is not supported on this element type. " +
				'If you are working with contenteditable, it\'s recommended to ' +
				'wrap a library dedicated for that purpose inside a custom component.'
			);
		}

		// ensure runtime directive metadata
		return true
	}

	function genCheckboxModel (
		el,
		value,
		modifiers
	) {
		var number = modifiers && modifiers.number;
		var valueBinding = getBindingAttr(el, 'value') || 'null';
		var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
		var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
		addProp(el, 'checked',
			"Array.isArray(" + value + ")" +
			"?_i(" + value + "," + valueBinding + ")>-1" + (
				trueValueBinding === 'true'
					? (":(" + value + ")")
					: (":_q(" + value + "," + trueValueBinding + ")")
			)
		);
		addHandler(el, CHECKBOX_RADIO_TOKEN,
			"var $$a=" + value + "," +
			'$$el=$event.target,' +
			"$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
			'if(Array.isArray($$a)){' +
			"var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
			'$$i=_i($$a,$$v);' +
			"if($$el.checked){$$i<0&&(" + value + "=$$a.concat($$v))}" +
			"else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
			"}else{" + (genAssignmentCode(value, '$$c')) + "}",
			null, true
		);
	}

	function genRadioModel (
		el,
		value,
		modifiers
	) {
		var number = modifiers && modifiers.number;
		var valueBinding = getBindingAttr(el, 'value') || 'null';
		valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
		addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
		addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
	}

	function genSelect (
		el,
		value,
		modifiers
	) {
		var number = modifiers && modifiers.number;
		var selectedVal = "Array.prototype.filter" +
			".call($event.target.options,function(o){return o.selected})" +
			".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
			"return " + (number ? '_n(val)' : 'val') + "})";

		var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
		var code = "var $$selectedVal = " + selectedVal + ";";
		code = code + " " + (genAssignmentCode(value, assignment));
		addHandler(el, 'change', code, null, true);
	}

	function genDefaultModel (
		el,
		value,
		modifiers
	) {
		var type = el.attrsMap.type;
		var ref = modifiers || {};
		var lazy = ref.lazy;
		var number = ref.number;
		var trim = ref.trim;
		var needCompositionGuard = !lazy && type !== 'range';
		var event = lazy
			? 'change'
			: type === 'range'
				? RANGE_TOKEN
				: 'input';

		var valueExpression = '$event.target.value';
		if (trim) {
			valueExpression = "$event.target.value.trim()";
		}
		if (number) {
			valueExpression = "_n(" + valueExpression + ")";
		}

		var code = genAssignmentCode(value, valueExpression);
		if (needCompositionGuard) {
			code = "if($event.target.composing)return;" + code;
		}

		addProp(el, 'value', ("(" + value + ")"));
		addHandler(el, event, code, null, true);
		if (trim || number) {
			addHandler(el, 'blur', '$forceUpdate()');
		}
	}

	/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
	function normalizeEvents (on) {
		var event;
		/* istanbul ignore if */
		if (isDef(on[RANGE_TOKEN])) {
			// IE input[type=range] only supports `change` event
			event = isIE ? 'change' : 'input';
			on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
			delete on[RANGE_TOKEN];
		}
		if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
			// Chrome fires microtasks in between click/change, leads to #4521
			event = isChrome ? 'click' : 'change';
			on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
			delete on[CHECKBOX_RADIO_TOKEN];
		}
	}

	var target$1;

	function add$1 (
		event,
		handler,
		once$$1,
		capture,
		passive
	) {
		if (once$$1) {
			var oldHandler = handler;
			var _target = target$1; // save current target element in closure
			handler = function (ev) {
				var res = arguments.length === 1
					? oldHandler(ev)
					: oldHandler.apply(null, arguments);
				if (res !== null) {
					remove$2(event, handler, capture, _target);
				}
			};
		}
		target$1.addEventListener(
			event,
			handler,
			supportsPassive
				? { capture: capture, passive: passive }
				: capture
		);
	}

	function remove$2 (
		event,
		handler,
		capture,
		_target
	) {
		(_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
		if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
			return
		}
		var on = vnode.data.on || {};
		var oldOn = oldVnode.data.on || {};
		target$1 = vnode.elm;
		normalizeEvents(on);
		updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
		create: updateDOMListeners,
		update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
		if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
			return
		}
		var key, cur;
		var elm = vnode.elm;
		var oldProps = oldVnode.data.domProps || {};
		var props = vnode.data.domProps || {};
		// clone observed objects, as the user probably wants to mutate it
		if (isDef(props.__ob__)) {
			props = vnode.data.domProps = extend({}, props);
		}

		for (key in oldProps) {
			if (isUndef(props[key])) {
				elm[key] = '';
			}
		}
		for (key in props) {
			cur = props[key];
			// ignore children if the node has textContent or innerHTML,
			// as these will throw away existing DOM nodes and cause removal errors
			// on subsequent patches (#3360)
			if (key === 'textContent' || key === 'innerHTML') {
				if (vnode.children) { vnode.children.length = 0; }
				if (cur === oldProps[key]) { continue }
			}

			if (key === 'value') {
				// store value as _value as well since
				// non-string values will be stringified
				elm._value = cur;
				// avoid resetting cursor position when value is the same
				var strCur = isUndef(cur) ? '' : String(cur);
				if (shouldUpdateValue(elm, vnode, strCur)) {
					elm.value = strCur;
				}
			} else {
				elm[key] = cur;
			}
		}
	}

// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
		elm,
		vnode,
		checkVal
	) {
		return (!elm.composing && (
			vnode.tag === 'option' ||
			isDirty(elm, checkVal) ||
			isInputChanged(elm, checkVal)
		))
	}

	function isDirty (elm, checkVal) {
		// return true when textbox (.number and .trim) loses focus and its value is
		// not equal to the updated value
		var notInFocus = true;
		// #6157
		// work around IE bug when accessing document.activeElement in an iframe
		try { notInFocus = document.activeElement !== elm; } catch (e) {}
		return notInFocus && elm.value !== checkVal
	}

	function isInputChanged (elm, newVal) {
		var value = elm.value;
		var modifiers = elm._vModifiers; // injected by v-model runtime
		if (isDef(modifiers) && modifiers.number) {
			return toNumber(value) !== toNumber(newVal)
		}
		if (isDef(modifiers) && modifiers.trim) {
			return value.trim() !== newVal.trim()
		}
		return value !== newVal
	}

	var domProps = {
		create: updateDOMProps,
		update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
		var res = {};
		var listDelimiter = /;(?![^(]*\))/g;
		var propertyDelimiter = /:(.+)/;
		cssText.split(listDelimiter).forEach(function (item) {
			if (item) {
				var tmp = item.split(propertyDelimiter);
				tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
			}
		});
		return res
	});

// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
		var style = normalizeStyleBinding(data.style);
		// static style is pre-processed into an object during compilation
		// and is always a fresh object, so it's safe to merge into it
		return data.staticStyle
			? extend(data.staticStyle, style)
			: style
	}

// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
		if (Array.isArray(bindingStyle)) {
			return toObject(bindingStyle)
		}
		if (typeof bindingStyle === 'string') {
			return parseStyleText(bindingStyle)
		}
		return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
		var res = {};
		var styleData;

		if (checkChild) {
			var childNode = vnode;
			while (childNode.componentInstance) {
				childNode = childNode.componentInstance._vnode;
				if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
					extend(res, styleData);
				}
			}
		}

		if ((styleData = normalizeStyleData(vnode.data))) {
			extend(res, styleData);
		}

		var parentNode = vnode;
		while ((parentNode = parentNode.parent)) {
			if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
				extend(res, styleData);
			}
		}
		return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
		/* istanbul ignore if */
		if (cssVarRE.test(name)) {
			el.style.setProperty(name, val);
		} else if (importantRE.test(val)) {
			el.style.setProperty(name, val.replace(importantRE, ''), 'important');
		} else {
			var normalizedName = normalize(name);
			if (Array.isArray(val)) {
				// Support values array created by autoprefixer, e.g.
				// {display: ["-webkit-box", "-ms-flexbox", "flex"]}
				// Set them one by one, and the browser will only set those it can recognize
				for (var i = 0, len = val.length; i < len; i++) {
					el.style[normalizedName] = val[i];
				}
			} else {
				el.style[normalizedName] = val;
			}
		}
	};

	var vendorNames = ['Webkit', 'Moz', 'ms'];

	var emptyStyle;
	var normalize = cached(function (prop) {
		emptyStyle = emptyStyle || document.createElement('div').style;
		prop = camelize(prop);
		if (prop !== 'filter' && (prop in emptyStyle)) {
			return prop
		}
		var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
		for (var i = 0; i < vendorNames.length; i++) {
			var name = vendorNames[i] + capName;
			if (name in emptyStyle) {
				return name
			}
		}
	});

	function updateStyle (oldVnode, vnode) {
		var data = vnode.data;
		var oldData = oldVnode.data;

		if (isUndef(data.staticStyle) && isUndef(data.style) &&
			isUndef(oldData.staticStyle) && isUndef(oldData.style)
		) {
			return
		}

		var cur, name;
		var el = vnode.elm;
		var oldStaticStyle = oldData.staticStyle;
		var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

		// if static style exists, stylebinding already merged into it when doing normalizeStyleData
		var oldStyle = oldStaticStyle || oldStyleBinding;

		var style = normalizeStyleBinding(vnode.data.style) || {};

		// store normalized style under a different key for next diff
		// make sure to clone it if it's reactive, since the user likley wants
		// to mutate it.
		vnode.data.normalizedStyle = isDef(style.__ob__)
			? extend({}, style)
			: style;

		var newStyle = getStyle(vnode, true);

		for (name in oldStyle) {
			if (isUndef(newStyle[name])) {
				setProp(el, name, '');
			}
		}
		for (name in newStyle) {
			cur = newStyle[name];
			if (cur !== oldStyle[name]) {
				// ie9 setting to null has no effect, must use empty string
				setProp(el, name, cur == null ? '' : cur);
			}
		}
	}

	var style = {
		create: updateStyle,
		update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
		/* istanbul ignore if */
		if (!cls || !(cls = cls.trim())) {
			return
		}

		/* istanbul ignore else */
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
			} else {
				el.classList.add(cls);
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			if (cur.indexOf(' ' + cls + ' ') < 0) {
				el.setAttribute('class', (cur + cls).trim());
			}
		}
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
		/* istanbul ignore if */
		if (!cls || !(cls = cls.trim())) {
			return
		}

		/* istanbul ignore else */
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
			} else {
				el.classList.remove(cls);
			}
			if (!el.classList.length) {
				el.removeAttribute('class');
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			var tar = ' ' + cls + ' ';
			while (cur.indexOf(tar) >= 0) {
				cur = cur.replace(tar, ' ');
			}
			cur = cur.trim();
			if (cur) {
				el.setAttribute('class', cur);
			} else {
				el.removeAttribute('class');
			}
		}
	}

	/*  */

	function resolveTransition (def$$1) {
		if (!def$$1) {
			return
		}
		/* istanbul ignore else */
		if (typeof def$$1 === 'object') {
			var res = {};
			if (def$$1.css !== false) {
				extend(res, autoCssTransition(def$$1.name || 'v'));
			}
			extend(res, def$$1);
			return res
		} else if (typeof def$$1 === 'string') {
			return autoCssTransition(def$$1)
		}
	}

	var autoCssTransition = cached(function (name) {
		return {
			enterClass: (name + "-enter"),
			enterToClass: (name + "-enter-to"),
			enterActiveClass: (name + "-enter-active"),
			leaveClass: (name + "-leave"),
			leaveToClass: (name + "-leave-to"),
			leaveActiveClass: (name + "-leave-active")
		}
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
		/* istanbul ignore if */
		if (window.ontransitionend === undefined &&
			window.onwebkittransitionend !== undefined
		) {
			transitionProp = 'WebkitTransition';
			transitionEndEvent = 'webkitTransitionEnd';
		}
		if (window.onanimationend === undefined &&
			window.onwebkitanimationend !== undefined
		) {
			animationProp = 'WebkitAnimation';
			animationEndEvent = 'webkitAnimationEnd';
		}
	}

// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
		? window.requestAnimationFrame.bind(window)
		: setTimeout;

	function nextFrame (fn) {
		raf(function () {
			raf(fn);
		});
	}

	function addTransitionClass (el, cls) {
		var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
		if (transitionClasses.indexOf(cls) < 0) {
			transitionClasses.push(cls);
			addClass(el, cls);
		}
	}

	function removeTransitionClass (el, cls) {
		if (el._transitionClasses) {
			remove(el._transitionClasses, cls);
		}
		removeClass(el, cls);
	}

	function whenTransitionEnds (
		el,
		expectedType,
		cb
	) {
		var ref = getTransitionInfo(el, expectedType);
		var type = ref.type;
		var timeout = ref.timeout;
		var propCount = ref.propCount;
		if (!type) { return cb() }
		var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
		var ended = 0;
		var end = function () {
			el.removeEventListener(event, onEnd);
			cb();
		};
		var onEnd = function (e) {
			if (e.target === el) {
				if (++ended >= propCount) {
					end();
				}
			}
		};
		setTimeout(function () {
			if (ended < propCount) {
				end();
			}
		}, timeout + 1);
		el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
		var styles = window.getComputedStyle(el);
		var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
		var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
		var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
		var animationDelays = styles[animationProp + 'Delay'].split(', ');
		var animationDurations = styles[animationProp + 'Duration'].split(', ');
		var animationTimeout = getTimeout(animationDelays, animationDurations);

		var type;
		var timeout = 0;
		var propCount = 0;
		/* istanbul ignore if */
		if (expectedType === TRANSITION) {
			if (transitionTimeout > 0) {
				type = TRANSITION;
				timeout = transitionTimeout;
				propCount = transitionDurations.length;
			}
		} else if (expectedType === ANIMATION) {
			if (animationTimeout > 0) {
				type = ANIMATION;
				timeout = animationTimeout;
				propCount = animationDurations.length;
			}
		} else {
			timeout = Math.max(transitionTimeout, animationTimeout);
			type = timeout > 0
				? transitionTimeout > animationTimeout
					? TRANSITION
					: ANIMATION
				: null;
			propCount = type
				? type === TRANSITION
					? transitionDurations.length
					: animationDurations.length
				: 0;
		}
		var hasTransform =
			type === TRANSITION &&
			transformRE.test(styles[transitionProp + 'Property']);
		return {
			type: type,
			timeout: timeout,
			propCount: propCount,
			hasTransform: hasTransform
		}
	}

	function getTimeout (delays, durations) {
		/* istanbul ignore next */
		while (delays.length < durations.length) {
			delays = delays.concat(delays);
		}

		return Math.max.apply(null, durations.map(function (d, i) {
			return toMs(d) + toMs(delays[i])
		}))
	}

	function toMs (s) {
		return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
		var el = vnode.elm;

		// call leave callback now
		if (isDef(el._leaveCb)) {
			el._leaveCb.cancelled = true;
			el._leaveCb();
		}

		var data = resolveTransition(vnode.data.transition);
		if (isUndef(data)) {
			return
		}

		/* istanbul ignore if */
		if (isDef(el._enterCb) || el.nodeType !== 1) {
			return
		}

		var css = data.css;
		var type = data.type;
		var enterClass = data.enterClass;
		var enterToClass = data.enterToClass;
		var enterActiveClass = data.enterActiveClass;
		var appearClass = data.appearClass;
		var appearToClass = data.appearToClass;
		var appearActiveClass = data.appearActiveClass;
		var beforeEnter = data.beforeEnter;
		var enter = data.enter;
		var afterEnter = data.afterEnter;
		var enterCancelled = data.enterCancelled;
		var beforeAppear = data.beforeAppear;
		var appear = data.appear;
		var afterAppear = data.afterAppear;
		var appearCancelled = data.appearCancelled;
		var duration = data.duration;

		// activeInstance will always be the <transition> component managing this
		// transition. One edge case to check is when the <transition> is placed
		// as the root node of a child component. In that case we need to check
		// <transition>'s parent for appear check.
		var context = activeInstance;
		var transitionNode = activeInstance.$vnode;
		while (transitionNode && transitionNode.parent) {
			transitionNode = transitionNode.parent;
			context = transitionNode.context;
		}

		var isAppear = !context._isMounted || !vnode.isRootInsert;

		if (isAppear && !appear && appear !== '') {
			return
		}

		var startClass = isAppear && appearClass
			? appearClass
			: enterClass;
		var activeClass = isAppear && appearActiveClass
			? appearActiveClass
			: enterActiveClass;
		var toClass = isAppear && appearToClass
			? appearToClass
			: enterToClass;

		var beforeEnterHook = isAppear
			? (beforeAppear || beforeEnter)
			: beforeEnter;
		var enterHook = isAppear
			? (typeof appear === 'function' ? appear : enter)
			: enter;
		var afterEnterHook = isAppear
			? (afterAppear || afterEnter)
			: afterEnter;
		var enterCancelledHook = isAppear
			? (appearCancelled || enterCancelled)
			: enterCancelled;

		var explicitEnterDuration = toNumber(
			isObject(duration)
				? duration.enter
				: duration
		);

		if ("development" !== 'production' && explicitEnterDuration != null) {
			checkDuration(explicitEnterDuration, 'enter', vnode);
		}

		var expectsCSS = css !== false && !isIE9;
		var userWantsControl = getHookArgumentsLength(enterHook);

		var cb = el._enterCb = once(function () {
			if (expectsCSS) {
				removeTransitionClass(el, toClass);
				removeTransitionClass(el, activeClass);
			}
			if (cb.cancelled) {
				if (expectsCSS) {
					removeTransitionClass(el, startClass);
				}
				enterCancelledHook && enterCancelledHook(el);
			} else {
				afterEnterHook && afterEnterHook(el);
			}
			el._enterCb = null;
		});

		if (!vnode.data.show) {
			// remove pending leave element on enter by injecting an insert hook
			mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
				var parent = el.parentNode;
				var pendingNode = parent && parent._pending && parent._pending[vnode.key];
				if (pendingNode &&
					pendingNode.tag === vnode.tag &&
					pendingNode.elm._leaveCb
				) {
					pendingNode.elm._leaveCb();
				}
				enterHook && enterHook(el, cb);
			});
		}

		// start enter transition
		beforeEnterHook && beforeEnterHook(el);
		if (expectsCSS) {
			addTransitionClass(el, startClass);
			addTransitionClass(el, activeClass);
			nextFrame(function () {
				addTransitionClass(el, toClass);
				removeTransitionClass(el, startClass);
				if (!cb.cancelled && !userWantsControl) {
					if (isValidDuration(explicitEnterDuration)) {
						setTimeout(cb, explicitEnterDuration);
					} else {
						whenTransitionEnds(el, type, cb);
					}
				}
			});
		}

		if (vnode.data.show) {
			toggleDisplay && toggleDisplay();
			enterHook && enterHook(el, cb);
		}

		if (!expectsCSS && !userWantsControl) {
			cb();
		}
	}

	function leave (vnode, rm) {
		var el = vnode.elm;

		// call enter callback now
		if (isDef(el._enterCb)) {
			el._enterCb.cancelled = true;
			el._enterCb();
		}

		var data = resolveTransition(vnode.data.transition);
		if (isUndef(data)) {
			return rm()
		}

		/* istanbul ignore if */
		if (isDef(el._leaveCb) || el.nodeType !== 1) {
			return
		}

		var css = data.css;
		var type = data.type;
		var leaveClass = data.leaveClass;
		var leaveToClass = data.leaveToClass;
		var leaveActiveClass = data.leaveActiveClass;
		var beforeLeave = data.beforeLeave;
		var leave = data.leave;
		var afterLeave = data.afterLeave;
		var leaveCancelled = data.leaveCancelled;
		var delayLeave = data.delayLeave;
		var duration = data.duration;

		var expectsCSS = css !== false && !isIE9;
		var userWantsControl = getHookArgumentsLength(leave);

		var explicitLeaveDuration = toNumber(
			isObject(duration)
				? duration.leave
				: duration
		);

		if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
			checkDuration(explicitLeaveDuration, 'leave', vnode);
		}

		var cb = el._leaveCb = once(function () {
			if (el.parentNode && el.parentNode._pending) {
				el.parentNode._pending[vnode.key] = null;
			}
			if (expectsCSS) {
				removeTransitionClass(el, leaveToClass);
				removeTransitionClass(el, leaveActiveClass);
			}
			if (cb.cancelled) {
				if (expectsCSS) {
					removeTransitionClass(el, leaveClass);
				}
				leaveCancelled && leaveCancelled(el);
			} else {
				rm();
				afterLeave && afterLeave(el);
			}
			el._leaveCb = null;
		});

		if (delayLeave) {
			delayLeave(performLeave);
		} else {
			performLeave();
		}

		function performLeave () {
			// the delayed leave may have already been cancelled
			if (cb.cancelled) {
				return
			}
			// record leaving element
			if (!vnode.data.show) {
				(el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
			}
			beforeLeave && beforeLeave(el);
			if (expectsCSS) {
				addTransitionClass(el, leaveClass);
				addTransitionClass(el, leaveActiveClass);
				nextFrame(function () {
					addTransitionClass(el, leaveToClass);
					removeTransitionClass(el, leaveClass);
					if (!cb.cancelled && !userWantsControl) {
						if (isValidDuration(explicitLeaveDuration)) {
							setTimeout(cb, explicitLeaveDuration);
						} else {
							whenTransitionEnds(el, type, cb);
						}
					}
				});
			}
			leave && leave(el, cb);
			if (!expectsCSS && !userWantsControl) {
				cb();
			}
		}
	}

// only used in dev mode
	function checkDuration (val, name, vnode) {
		if (typeof val !== 'number') {
			warn(
				"<transition> explicit " + name + " duration is not a valid number - " +
				"got " + (JSON.stringify(val)) + ".",
				vnode.context
			);
		} else if (isNaN(val)) {
			warn(
				"<transition> explicit " + name + " duration is NaN - " +
				'the duration expression might be incorrect.',
				vnode.context
			);
		}
	}

	function isValidDuration (val) {
		return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
		if (isUndef(fn)) {
			return false
		}
		var invokerFns = fn.fns;
		if (isDef(invokerFns)) {
			// invoker
			return getHookArgumentsLength(
				Array.isArray(invokerFns)
					? invokerFns[0]
					: invokerFns
			)
		} else {
			return (fn._length || fn.length) > 1
		}
	}

	function _enter (_, vnode) {
		if (vnode.data.show !== true) {
			enter(vnode);
		}
	}

	var transition = inBrowser ? {
		create: _enter,
		activate: _enter,
		remove: function remove$$1 (vnode, rm) {
			/* istanbul ignore else */
			if (vnode.data.show !== true) {
				leave(vnode, rm);
			} else {
				rm();
			}
		}
	} : {};

	var platformModules = [
		attrs,
		klass,
		events,
		domProps,
		style,
		transition
	];

	/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var isTextInputType = makeMap('text,number,password,search,email,tel,url');

	/* istanbul ignore if */
	if (isIE9) {
		// http://www.matts411.com/post/internet-explorer-9-oninput/
		document.addEventListener('selectionchange', function () {
			var el = document.activeElement;
			if (el && el.vmodel) {
				trigger(el, 'input');
			}
		});
	}

	var model$1 = {
		inserted: function inserted (el, binding, vnode) {
			if (vnode.tag === 'select') {
				var cb = function () {
					setSelected(el, binding, vnode.context);
				};
				cb();
				/* istanbul ignore if */
				if (isIE || isEdge) {
					setTimeout(cb, 0);
				}
				el._vOptions = [].map.call(el.options, getValue);
			} else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
				el._vModifiers = binding.modifiers;
				if (!binding.modifiers.lazy) {
					// Safari < 10.2 & UIWebView doesn't fire compositionend when
					// switching focus before confirming composition choice
					// this also fixes the issue where some browsers e.g. iOS Chrome
					// fires "change" instead of "input" on autocomplete.
					el.addEventListener('change', onCompositionEnd);
					if (!isAndroid) {
						el.addEventListener('compositionstart', onCompositionStart);
						el.addEventListener('compositionend', onCompositionEnd);
					}
					/* istanbul ignore if */
					if (isIE9) {
						el.vmodel = true;
					}
				}
			}
		},
		componentUpdated: function componentUpdated (el, binding, vnode) {
			if (vnode.tag === 'select') {
				setSelected(el, binding, vnode.context);
				// in case the options rendered by v-for have changed,
				// it's possible that the value is out-of-sync with the rendered options.
				// detect such cases and filter out values that no longer has a matching
				// option in the DOM.
				var prevOptions = el._vOptions;
				var curOptions = el._vOptions = [].map.call(el.options, getValue);
				if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
					trigger(el, 'change');
				}
			}
		}
	};

	function setSelected (el, binding, vm) {
		var value = binding.value;
		var isMultiple = el.multiple;
		if (isMultiple && !Array.isArray(value)) {
			"development" !== 'production' && warn(
				"<select multiple v-model=\"" + (binding.expression) + "\"> " +
				"expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
				vm
			);
			return
		}
		var selected, option;
		for (var i = 0, l = el.options.length; i < l; i++) {
			option = el.options[i];
			if (isMultiple) {
				selected = looseIndexOf(value, getValue(option)) > -1;
				if (option.selected !== selected) {
					option.selected = selected;
				}
			} else {
				if (looseEqual(getValue(option), value)) {
					if (el.selectedIndex !== i) {
						el.selectedIndex = i;
					}
					return
				}
			}
		}
		if (!isMultiple) {
			el.selectedIndex = -1;
		}
	}

	function getValue (option) {
		return '_value' in option
			? option._value
			: option.value
	}

	function onCompositionStart (e) {
		e.target.composing = true;
	}

	function onCompositionEnd (e) {
		// prevent triggering an input event for no reason
		if (!e.target.composing) { return }
		e.target.composing = false;
		trigger(e.target, 'input');
	}

	function trigger (el, type) {
		var e = document.createEvent('HTMLEvents');
		e.initEvent(type, true, true);
		el.dispatchEvent(e);
	}

	/*  */

// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
		return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
			? locateNode(vnode.componentInstance._vnode)
			: vnode
	}

	var show = {
		bind: function bind (el, ref, vnode) {
			var value = ref.value;

			vnode = locateNode(vnode);
			var transition$$1 = vnode.data && vnode.data.transition;
			var originalDisplay = el.__vOriginalDisplay =
				el.style.display === 'none' ? '' : el.style.display;
			if (value && transition$$1) {
				vnode.data.show = true;
				enter(vnode, function () {
					el.style.display = originalDisplay;
				});
			} else {
				el.style.display = value ? originalDisplay : 'none';
			}
		},

		update: function update (el, ref, vnode) {
			var value = ref.value;
			var oldValue = ref.oldValue;

			/* istanbul ignore if */
			if (value === oldValue) { return }
			vnode = locateNode(vnode);
			var transition$$1 = vnode.data && vnode.data.transition;
			if (transition$$1) {
				vnode.data.show = true;
				if (value) {
					enter(vnode, function () {
						el.style.display = el.__vOriginalDisplay;
					});
				} else {
					leave(vnode, function () {
						el.style.display = 'none';
					});
				}
			} else {
				el.style.display = value ? el.__vOriginalDisplay : 'none';
			}
		},

		unbind: function unbind (
			el,
			binding,
			vnode,
			oldVnode,
			isDestroy
		) {
			if (!isDestroy) {
				el.style.display = el.__vOriginalDisplay;
			}
		}
	};

	var platformDirectives = {
		model: model$1,
		show: show
	};

	/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

	var transitionProps = {
		name: String,
		appear: Boolean,
		css: Boolean,
		mode: String,
		type: String,
		enterClass: String,
		leaveClass: String,
		enterToClass: String,
		leaveToClass: String,
		enterActiveClass: String,
		leaveActiveClass: String,
		appearClass: String,
		appearActiveClass: String,
		appearToClass: String,
		duration: [Number, String, Object]
	};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
		var compOptions = vnode && vnode.componentOptions;
		if (compOptions && compOptions.Ctor.options.abstract) {
			return getRealChild(getFirstComponentChild(compOptions.children))
		} else {
			return vnode
		}
	}

	function extractTransitionData (comp) {
		var data = {};
		var options = comp.$options;
		// props
		for (var key in options.propsData) {
			data[key] = comp[key];
		}
		// events.
		// extract listeners and pass them directly to the transition methods
		var listeners = options._parentListeners;
		for (var key$1 in listeners) {
			data[camelize(key$1)] = listeners[key$1];
		}
		return data
	}

	function placeholder (h, rawChild) {
		if (/\d-keep-alive$/.test(rawChild.tag)) {
			return h('keep-alive', {
				props: rawChild.componentOptions.propsData
			})
		}
	}

	function hasParentTransition (vnode) {
		while ((vnode = vnode.parent)) {
			if (vnode.data.transition) {
				return true
			}
		}
	}

	function isSameChild (child, oldChild) {
		return oldChild.key === child.key && oldChild.tag === child.tag
	}

	function isAsyncPlaceholder (node) {
		return node.isComment && node.asyncFactory
	}

	var Transition = {
		name: 'transition',
		props: transitionProps,
		abstract: true,

		render: function render (h) {
			var this$1 = this;

			var children = this.$options._renderChildren;
			if (!children) {
				return
			}

			// filter out text nodes (possible whitespaces)
			children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
			/* istanbul ignore if */
			if (!children.length) {
				return
			}

			// warn multiple elements
			if ("development" !== 'production' && children.length > 1) {
				warn(
					'<transition> can only be used on a single element. Use ' +
					'<transition-group> for lists.',
					this.$parent
				);
			}

			var mode = this.mode;

			// warn invalid mode
			if ("development" !== 'production' &&
				mode && mode !== 'in-out' && mode !== 'out-in'
			) {
				warn(
					'invalid <transition> mode: ' + mode,
					this.$parent
				);
			}

			var rawChild = children[0];

			// if this is a component root node and the component's
			// parent container node also has transition, skip.
			if (hasParentTransition(this.$vnode)) {
				return rawChild
			}

			// apply transition data to child
			// use getRealChild() to ignore abstract components e.g. keep-alive
			var child = getRealChild(rawChild);
			/* istanbul ignore if */
			if (!child) {
				return rawChild
			}

			if (this._leaving) {
				return placeholder(h, rawChild)
			}

			// ensure a key that is unique to the vnode type and to this transition
			// component instance. This key will be used to remove pending leaving nodes
			// during entering.
			var id = "__transition-" + (this._uid) + "-";
			child.key = child.key == null
				? child.isComment
					? id + 'comment'
					: id + child.tag
				: isPrimitive(child.key)
					? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
					: child.key;

			var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
			var oldRawChild = this._vnode;
			var oldChild = getRealChild(oldRawChild);

			// mark v-show
			// so that the transition module can hand over the control to the directive
			if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
				child.data.show = true;
			}

			if (
				oldChild &&
				oldChild.data &&
				!isSameChild(child, oldChild) &&
				!isAsyncPlaceholder(oldChild)
			) {
				// replace old child transition data with fresh one
				// important for dynamic transitions!
				var oldData = oldChild && (oldChild.data.transition = extend({}, data));
				// handle transition mode
				if (mode === 'out-in') {
					// return placeholder node and queue update when leave finishes
					this._leaving = true;
					mergeVNodeHook(oldData, 'afterLeave', function () {
						this$1._leaving = false;
						this$1.$forceUpdate();
					});
					return placeholder(h, rawChild)
				} else if (mode === 'in-out') {
					if (isAsyncPlaceholder(child)) {
						return oldRawChild
					}
					var delayedLeave;
					var performLeave = function () { delayedLeave(); };
					mergeVNodeHook(data, 'afterEnter', performLeave);
					mergeVNodeHook(data, 'enterCancelled', performLeave);
					mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
				}
			}

			return rawChild
		}
	};

	/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

	var props = extend({
		tag: String,
		moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
		props: props,

		render: function render (h) {
			var tag = this.tag || this.$vnode.data.tag || 'span';
			var map = Object.create(null);
			var prevChildren = this.prevChildren = this.children;
			var rawChildren = this.$slots.default || [];
			var children = this.children = [];
			var transitionData = extractTransitionData(this);

			for (var i = 0; i < rawChildren.length; i++) {
				var c = rawChildren[i];
				if (c.tag) {
					if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
						children.push(c);
						map[c.key] = c
						;(c.data || (c.data = {})).transition = transitionData;
					} else {
						var opts = c.componentOptions;
						var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
						warn(("<transition-group> children must be keyed: <" + name + ">"));
					}
				}
			}

			if (prevChildren) {
				var kept = [];
				var removed = [];
				for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
					var c$1 = prevChildren[i$1];
					c$1.data.transition = transitionData;
					c$1.data.pos = c$1.elm.getBoundingClientRect();
					if (map[c$1.key]) {
						kept.push(c$1);
					} else {
						removed.push(c$1);
					}
				}
				this.kept = h(tag, null, kept);
				this.removed = removed;
			}

			return h(tag, null, children)
		},

		beforeUpdate: function beforeUpdate () {
			// force removing pass
			this.__patch__(
				this._vnode,
				this.kept,
				false, // hydrating
				true // removeOnly (!important, avoids unnecessary moves)
			);
			this._vnode = this.kept;
		},

		updated: function updated () {
			var children = this.prevChildren;
			var moveClass = this.moveClass || ((this.name || 'v') + '-move');
			if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
				return
			}

			// we divide the work into three loops to avoid mixing DOM reads and writes
			// in each iteration - which helps prevent layout thrashing.
			children.forEach(callPendingCbs);
			children.forEach(recordPosition);
			children.forEach(applyTranslation);

			// force reflow to put everything in position
			var body = document.body;
			var f = body.offsetHeight; // eslint-disable-line

			children.forEach(function (c) {
				if (c.data.moved) {
					var el = c.elm;
					var s = el.style;
					addTransitionClass(el, moveClass);
					s.transform = s.WebkitTransform = s.transitionDuration = '';
					el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
						if (!e || /transform$/.test(e.propertyName)) {
							el.removeEventListener(transitionEndEvent, cb);
							el._moveCb = null;
							removeTransitionClass(el, moveClass);
						}
					});
				}
			});
		},

		methods: {
			hasMove: function hasMove (el, moveClass) {
				/* istanbul ignore if */
				if (!hasTransition) {
					return false
				}
				/* istanbul ignore if */
				if (this._hasMove) {
					return this._hasMove
				}
				// Detect whether an element with the move class applied has
				// CSS transitions. Since the element may be inside an entering
				// transition at this very moment, we make a clone of it and remove
				// all other transition classes applied to ensure only the move class
				// is applied.
				var clone = el.cloneNode();
				if (el._transitionClasses) {
					el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
				}
				addClass(clone, moveClass);
				clone.style.display = 'none';
				this.$el.appendChild(clone);
				var info = getTransitionInfo(clone);
				this.$el.removeChild(clone);
				return (this._hasMove = info.hasTransform)
			}
		}
	};

	function callPendingCbs (c) {
		/* istanbul ignore if */
		if (c.elm._moveCb) {
			c.elm._moveCb();
		}
		/* istanbul ignore if */
		if (c.elm._enterCb) {
			c.elm._enterCb();
		}
	}

	function recordPosition (c) {
		c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
		var oldPos = c.data.pos;
		var newPos = c.data.newPos;
		var dx = oldPos.left - newPos.left;
		var dy = oldPos.top - newPos.top;
		if (dx || dy) {
			c.data.moved = true;
			var s = c.elm.style;
			s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
			s.transitionDuration = '0s';
		}
	}

	var platformComponents = {
		Transition: Transition,
		TransitionGroup: TransitionGroup
	};

	/*  */

// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.isReservedAttr = isReservedAttr;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
	Vue$3.prototype.$mount = function (
		el,
		hydrating
	) {
		el = el && inBrowser ? query(el) : undefined;
		return mountComponent(this, el, hydrating)
	};

// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
		if (config.devtools) {
			if (devtools) {
				devtools.emit('init', Vue$3);
			} else if ("development" !== 'production' && isChrome) {
				console[console.info ? 'info' : 'log'](
					'Download the Vue Devtools extension for a better development experience:\n' +
					'https://github.com/vuejs/vue-devtools'
				);
			}
		}
		if ("development" !== 'production' &&
			config.productionTip !== false &&
			inBrowser && typeof console !== 'undefined'
		) {
			console[console.info ? 'info' : 'log'](
				"You are running Vue in development mode.\n" +
				"Make sure to turn on production mode when deploying for production.\n" +
				"See more tips at https://vuejs.org/guide/deployment.html"
			);
		}
	}, 0);

	/*  */

// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
		var div = document.createElement('div');
		div.innerHTML = "<div a=\"" + content + "\"/>";
		return div.innerHTML.indexOf(encoded) > 0
	}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
		var open = delimiters[0].replace(regexEscapeRE, '\\$&');
		var close = delimiters[1].replace(regexEscapeRE, '\\$&');
		return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
		text,
		delimiters
	) {
		var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
		if (!tagRE.test(text)) {
			return
		}
		var tokens = [];
		var lastIndex = tagRE.lastIndex = 0;
		var match, index;
		while ((match = tagRE.exec(text))) {
			index = match.index;
			// push text token
			if (index > lastIndex) {
				tokens.push(JSON.stringify(text.slice(lastIndex, index)));
			}
			// tag token
			var exp = parseFilters(match[1].trim());
			tokens.push(("_s(" + exp + ")"));
			lastIndex = index + match[0].length;
		}
		if (lastIndex < text.length) {
			tokens.push(JSON.stringify(text.slice(lastIndex)));
		}
		return tokens.join('+')
	}

	/*  */

	function transformNode (el, options) {
		var warn = options.warn || baseWarn;
		var staticClass = getAndRemoveAttr(el, 'class');
		if ("development" !== 'production' && staticClass) {
			var expression = parseText(staticClass, options.delimiters);
			if (expression) {
				warn(
					"class=\"" + staticClass + "\": " +
					'Interpolation inside attributes has been removed. ' +
					'Use v-bind or the colon shorthand instead. For example, ' +
					'instead of <div class="{{ val }}">, use <div :class="val">.'
				);
			}
		}
		if (staticClass) {
			el.staticClass = JSON.stringify(staticClass);
		}
		var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
		if (classBinding) {
			el.classBinding = classBinding;
		}
	}

	function genData (el) {
		var data = '';
		if (el.staticClass) {
			data += "staticClass:" + (el.staticClass) + ",";
		}
		if (el.classBinding) {
			data += "class:" + (el.classBinding) + ",";
		}
		return data
	}

	var klass$1 = {
		staticKeys: ['staticClass'],
		transformNode: transformNode,
		genData: genData
	};

	/*  */

	function transformNode$1 (el, options) {
		var warn = options.warn || baseWarn;
		var staticStyle = getAndRemoveAttr(el, 'style');
		if (staticStyle) {
			/* istanbul ignore if */
			{
				var expression = parseText(staticStyle, options.delimiters);
				if (expression) {
					warn(
						"style=\"" + staticStyle + "\": " +
						'Interpolation inside attributes has been removed. ' +
						'Use v-bind or the colon shorthand instead. For example, ' +
						'instead of <div style="{{ val }}">, use <div :style="val">.'
					);
				}
			}
			el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
		}

		var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
		if (styleBinding) {
			el.styleBinding = styleBinding;
		}
	}

	function genData$1 (el) {
		var data = '';
		if (el.staticStyle) {
			data += "staticStyle:" + (el.staticStyle) + ",";
		}
		if (el.styleBinding) {
			data += "style:(" + (el.styleBinding) + "),";
		}
		return data
	}

	var style$1 = {
		staticKeys: ['staticStyle'],
		transformNode: transformNode$1,
		genData: genData$1
	};

	var modules$1 = [
		klass$1,
		style$1
	];

	/*  */

	function text (el, dir) {
		if (dir.value) {
			addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
		}
	}

	/*  */

	function html (el, dir) {
		if (dir.value) {
			addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
		}
	}

	var directives$1 = {
		model: model,
		text: text,
		html: html
	};

	/*  */

	var isUnaryTag = makeMap(
		'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
		'link,meta,param,source,track,wbr'
	);

// Elements that you can, intentionally, leave open
// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
		'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
		'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
		'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
		'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
		'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
		'title,tr,track'
	);

	/*  */

	var baseOptions = {
		expectHTML: true,
		modules: modules$1,
		directives: directives$1,
		isPreTag: isPreTag,
		isUnaryTag: isUnaryTag,
		mustUseProp: mustUseProp,
		canBeLeftOpenTag: canBeLeftOpenTag,
		isReservedTag: isReservedTag,
		getTagNamespace: getTagNamespace,
		staticKeys: genStaticKeys(modules$1)
	};

	/*  */

	var decoder;

	var he = {
		decode: function decode (html) {
			decoder = decoder || document.createElement('div');
			decoder.innerHTML = html;
			return decoder.textContent
		}
	};

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
		// attr value double quotes
		/"([^"]*)"+/.source,
		// attr value, single quotes
		/'([^']*)'+/.source,
		// attr value, no quotes
		/([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
		'^\\s*' + singleAttrIdentifier.source +
		'(?:\\s*(' + singleAttrAssign.source + ')' +
		'\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
		IS_REGEX_CAPTURING_BROKEN = g === '';
	});

// Special Elements (can contain anything)
	var isPlainTextElement = makeMap('script,style,textarea', true);
	var reCache = {};

	var decodingMap = {
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&amp;': '&',
		'&#10;': '\n'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
	var isIgnoreNewlineTag = makeMap('pre,textarea', true);
	var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

	function decodeAttr (value, shouldDecodeNewlines) {
		var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
		return value.replace(re, function (match) { return decodingMap[match]; })
	}

	function parseHTML (html, options) {
		var stack = [];
		var expectHTML = options.expectHTML;
		var isUnaryTag$$1 = options.isUnaryTag || no;
		var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
		var index = 0;
		var last, lastTag;
		while (html) {
			last = html;
			// Make sure we're not in a plaintext content element like script/style
			if (!lastTag || !isPlainTextElement(lastTag)) {
				var textEnd = html.indexOf('<');
				if (textEnd === 0) {
					// Comment:
					if (comment.test(html)) {
						var commentEnd = html.indexOf('-->');

						if (commentEnd >= 0) {
							if (options.shouldKeepComment) {
								options.comment(html.substring(4, commentEnd));
							}
							advance(commentEnd + 3);
							continue
						}
					}

					// http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
					if (conditionalComment.test(html)) {
						var conditionalEnd = html.indexOf(']>');

						if (conditionalEnd >= 0) {
							advance(conditionalEnd + 2);
							continue
						}
					}

					// Doctype:
					var doctypeMatch = html.match(doctype);
					if (doctypeMatch) {
						advance(doctypeMatch[0].length);
						continue
					}

					// End tag:
					var endTagMatch = html.match(endTag);
					if (endTagMatch) {
						var curIndex = index;
						advance(endTagMatch[0].length);
						parseEndTag(endTagMatch[1], curIndex, index);
						continue
					}

					// Start tag:
					var startTagMatch = parseStartTag();
					if (startTagMatch) {
						handleStartTag(startTagMatch);
						if (shouldIgnoreFirstNewline(lastTag, html)) {
							advance(1);
						}
						continue
					}
				}

				var text = (void 0), rest = (void 0), next = (void 0);
				if (textEnd >= 0) {
					rest = html.slice(textEnd);
					while (
						!endTag.test(rest) &&
						!startTagOpen.test(rest) &&
						!comment.test(rest) &&
						!conditionalComment.test(rest)
						) {
						// < in plain text, be forgiving and treat it as text
						next = rest.indexOf('<', 1);
						if (next < 0) { break }
						textEnd += next;
						rest = html.slice(textEnd);
					}
					text = html.substring(0, textEnd);
					advance(textEnd);
				}

				if (textEnd < 0) {
					text = html;
					html = '';
				}

				if (options.chars && text) {
					options.chars(text);
				}
			} else {
				var endTagLength = 0;
				var stackedTag = lastTag.toLowerCase();
				var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
				var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
					endTagLength = endTag.length;
					if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
						text = text
							.replace(/<!--([\s\S]*?)-->/g, '$1')
							.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
					}
					if (shouldIgnoreFirstNewline(stackedTag, text)) {
						text = text.slice(1);
					}
					if (options.chars) {
						options.chars(text);
					}
					return ''
				});
				index += html.length - rest$1.length;
				html = rest$1;
				parseEndTag(stackedTag, index - endTagLength, index);
			}

			if (html === last) {
				options.chars && options.chars(html);
				if ("development" !== 'production' && !stack.length && options.warn) {
					options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
				}
				break
			}
		}

		// Clean up any remaining tags
		parseEndTag();

		function advance (n) {
			index += n;
			html = html.substring(n);
		}

		function parseStartTag () {
			var start = html.match(startTagOpen);
			if (start) {
				var match = {
					tagName: start[1],
					attrs: [],
					start: index
				};
				advance(start[0].length);
				var end, attr;
				while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
					advance(attr[0].length);
					match.attrs.push(attr);
				}
				if (end) {
					match.unarySlash = end[1];
					advance(end[0].length);
					match.end = index;
					return match
				}
			}
		}

		function handleStartTag (match) {
			var tagName = match.tagName;
			var unarySlash = match.unarySlash;

			if (expectHTML) {
				if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
					parseEndTag(lastTag);
				}
				if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
					parseEndTag(tagName);
				}
			}

			var unary = isUnaryTag$$1(tagName) || !!unarySlash;

			var l = match.attrs.length;
			var attrs = new Array(l);
			for (var i = 0; i < l; i++) {
				var args = match.attrs[i];
				// hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
				if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
					if (args[3] === '') { delete args[3]; }
					if (args[4] === '') { delete args[4]; }
					if (args[5] === '') { delete args[5]; }
				}
				var value = args[3] || args[4] || args[5] || '';
				attrs[i] = {
					name: args[1],
					value: decodeAttr(
						value,
						options.shouldDecodeNewlines
					)
				};
			}

			if (!unary) {
				stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
				lastTag = tagName;
			}

			if (options.start) {
				options.start(tagName, attrs, unary, match.start, match.end);
			}
		}

		function parseEndTag (tagName, start, end) {
			var pos, lowerCasedTagName;
			if (start == null) { start = index; }
			if (end == null) { end = index; }

			if (tagName) {
				lowerCasedTagName = tagName.toLowerCase();
			}

			// Find the closest opened tag of the same type
			if (tagName) {
				for (pos = stack.length - 1; pos >= 0; pos--) {
					if (stack[pos].lowerCasedTag === lowerCasedTagName) {
						break
					}
				}
			} else {
				// If no tag name is provided, clean shop
				pos = 0;
			}

			if (pos >= 0) {
				// Close all the open elements, up the stack
				for (var i = stack.length - 1; i >= pos; i--) {
					if ("development" !== 'production' &&
						(i > pos || !tagName) &&
						options.warn
					) {
						options.warn(
							("tag <" + (stack[i].tag) + "> has no matching end tag.")
						);
					}
					if (options.end) {
						options.end(stack[i].tag, start, end);
					}
				}

				// Remove the open elements from the stack
				stack.length = pos;
				lastTag = pos && stack[pos - 1].tag;
			} else if (lowerCasedTagName === 'br') {
				if (options.start) {
					options.start(tagName, [], true, start, end);
				}
			} else if (lowerCasedTagName === 'p') {
				if (options.start) {
					options.start(tagName, [], false, start, end);
				}
				if (options.end) {
					options.end(tagName, start, end);
				}
			}
		}
	}

	/*  */

	var onRE = /^@|^v-on:/;
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

	var argRE = /:(.*)$/;
	var bindRE = /^:|^v-bind:/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(he.decode);

// configurable state
	var warn$2;
	var delimiters;
	var transforms;
	var preTransforms;
	var postTransforms;
	var platformIsPreTag;
	var platformMustUseProp;
	var platformGetTagNamespace;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
		template,
		options
	) {
		warn$2 = options.warn || baseWarn;

		platformIsPreTag = options.isPreTag || no;
		platformMustUseProp = options.mustUseProp || no;
		platformGetTagNamespace = options.getTagNamespace || no;

		transforms = pluckModuleFunction(options.modules, 'transformNode');
		preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
		postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

		delimiters = options.delimiters;

		var stack = [];
		var preserveWhitespace = options.preserveWhitespace !== false;
		var root;
		var currentParent;
		var inVPre = false;
		var inPre = false;
		var warned = false;

		function warnOnce (msg) {
			if (!warned) {
				warned = true;
				warn$2(msg);
			}
		}

		function endPre (element) {
			// check pre state
			if (element.pre) {
				inVPre = false;
			}
			if (platformIsPreTag(element.tag)) {
				inPre = false;
			}
		}

		parseHTML(template, {
			warn: warn$2,
			expectHTML: options.expectHTML,
			isUnaryTag: options.isUnaryTag,
			canBeLeftOpenTag: options.canBeLeftOpenTag,
			shouldDecodeNewlines: options.shouldDecodeNewlines,
			shouldKeepComment: options.comments,
			start: function start (tag, attrs, unary) {
				// check namespace.
				// inherit parent ns if there is one
				var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

				// handle IE svg bug
				/* istanbul ignore if */
				if (isIE && ns === 'svg') {
					attrs = guardIESVGBug(attrs);
				}

				var element = {
					type: 1,
					tag: tag,
					attrsList: attrs,
					attrsMap: makeAttrsMap(attrs),
					parent: currentParent,
					children: []
				};
				if (ns) {
					element.ns = ns;
				}

				if (isForbiddenTag(element) && !isServerRendering()) {
					element.forbidden = true;
					"development" !== 'production' && warn$2(
						'Templates should only be responsible for mapping the state to the ' +
						'UI. Avoid placing tags with side-effects in your templates, such as ' +
						"<" + tag + ">" + ', as they will not be parsed.'
					);
				}

				// apply pre-transforms
				for (var i = 0; i < preTransforms.length; i++) {
					preTransforms[i](element, options);
				}

				if (!inVPre) {
					processPre(element);
					if (element.pre) {
						inVPre = true;
					}
				}
				if (platformIsPreTag(element.tag)) {
					inPre = true;
				}
				if (inVPre) {
					processRawAttrs(element);
				} else {
					processFor(element);
					processIf(element);
					processOnce(element);
					processKey(element);

					// determine whether this is a plain element after
					// removing structural attributes
					element.plain = !element.key && !attrs.length;

					processRef(element);
					processSlot(element);
					processComponent(element);
					for (var i$1 = 0; i$1 < transforms.length; i$1++) {
						transforms[i$1](element, options);
					}
					processAttrs(element);
				}

				function checkRootConstraints (el) {
					{
						if (el.tag === 'slot' || el.tag === 'template') {
							warnOnce(
								"Cannot use <" + (el.tag) + "> as component root element because it may " +
								'contain multiple nodes.'
							);
						}
						if (el.attrsMap.hasOwnProperty('v-for')) {
							warnOnce(
								'Cannot use v-for on stateful component root element because ' +
								'it renders multiple elements.'
							);
						}
					}
				}

				// tree management
				if (!root) {
					root = element;
					checkRootConstraints(root);
				} else if (!stack.length) {
					// allow root elements with v-if, v-else-if and v-else
					if (root.if && (element.elseif || element.else)) {
						checkRootConstraints(element);
						addIfCondition(root, {
							exp: element.elseif,
							block: element
						});
					} else {
						warnOnce(
							"Component template should contain exactly one root element. " +
							"If you are using v-if on multiple elements, " +
							"use v-else-if to chain them instead."
						);
					}
				}
				if (currentParent && !element.forbidden) {
					if (element.elseif || element.else) {
						processIfConditions(element, currentParent);
					} else if (element.slotScope) { // scoped slot
						currentParent.plain = false;
						var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
					} else {
						currentParent.children.push(element);
						element.parent = currentParent;
					}
				}
				if (!unary) {
					currentParent = element;
					stack.push(element);
				} else {
					endPre(element);
				}
				// apply post-transforms
				for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
					postTransforms[i$2](element, options);
				}
			},

			end: function end () {
				// remove trailing whitespace
				var element = stack[stack.length - 1];
				var lastNode = element.children[element.children.length - 1];
				if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
					element.children.pop();
				}
				// pop stack
				stack.length -= 1;
				currentParent = stack[stack.length - 1];
				endPre(element);
			},

			chars: function chars (text) {
				if (!currentParent) {
					{
						if (text === template) {
							warnOnce(
								'Component template requires a root element, rather than just text.'
							);
						} else if ((text = text.trim())) {
							warnOnce(
								("text \"" + text + "\" outside root element will be ignored.")
							);
						}
					}
					return
				}
				// IE textarea placeholder bug
				/* istanbul ignore if */
				if (isIE &&
					currentParent.tag === 'textarea' &&
					currentParent.attrsMap.placeholder === text
				) {
					return
				}
				var children = currentParent.children;
				text = inPre || text.trim()
					? isTextTag(currentParent) ? text : decodeHTMLCached(text)
					// only preserve whitespace if its not right after a starting tag
					: preserveWhitespace && children.length ? ' ' : '';
				if (text) {
					var expression;
					if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
						children.push({
							type: 2,
							expression: expression,
							text: text
						});
					} else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
						children.push({
							type: 3,
							text: text
						});
					}
				}
			},
			comment: function comment (text) {
				currentParent.children.push({
					type: 3,
					text: text,
					isComment: true
				});
			}
		});
		return root
	}

	function processPre (el) {
		if (getAndRemoveAttr(el, 'v-pre') != null) {
			el.pre = true;
		}
	}

	function processRawAttrs (el) {
		var l = el.attrsList.length;
		if (l) {
			var attrs = el.attrs = new Array(l);
			for (var i = 0; i < l; i++) {
				attrs[i] = {
					name: el.attrsList[i].name,
					value: JSON.stringify(el.attrsList[i].value)
				};
			}
		} else if (!el.pre) {
			// non root node in pre blocks with no attributes
			el.plain = true;
		}
	}

	function processKey (el) {
		var exp = getBindingAttr(el, 'key');
		if (exp) {
			if ("development" !== 'production' && el.tag === 'template') {
				warn$2("<template> cannot be keyed. Place the key on real elements instead.");
			}
			el.key = exp;
		}
	}

	function processRef (el) {
		var ref = getBindingAttr(el, 'ref');
		if (ref) {
			el.ref = ref;
			el.refInFor = checkInFor(el);
		}
	}

	function processFor (el) {
		var exp;
		if ((exp = getAndRemoveAttr(el, 'v-for'))) {
			var inMatch = exp.match(forAliasRE);
			if (!inMatch) {
				"development" !== 'production' && warn$2(
					("Invalid v-for expression: " + exp)
				);
				return
			}
			el.for = inMatch[2].trim();
			var alias = inMatch[1].trim();
			var iteratorMatch = alias.match(forIteratorRE);
			if (iteratorMatch) {
				el.alias = iteratorMatch[1].trim();
				el.iterator1 = iteratorMatch[2].trim();
				if (iteratorMatch[3]) {
					el.iterator2 = iteratorMatch[3].trim();
				}
			} else {
				el.alias = alias;
			}
		}
	}

	function processIf (el) {
		var exp = getAndRemoveAttr(el, 'v-if');
		if (exp) {
			el.if = exp;
			addIfCondition(el, {
				exp: exp,
				block: el
			});
		} else {
			if (getAndRemoveAttr(el, 'v-else') != null) {
				el.else = true;
			}
			var elseif = getAndRemoveAttr(el, 'v-else-if');
			if (elseif) {
				el.elseif = elseif;
			}
		}
	}

	function processIfConditions (el, parent) {
		var prev = findPrevElement(parent.children);
		if (prev && prev.if) {
			addIfCondition(prev, {
				exp: el.elseif,
				block: el
			});
		} else {
			warn$2(
				"v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
				"used on element <" + (el.tag) + "> without corresponding v-if."
			);
		}
	}

	function findPrevElement (children) {
		var i = children.length;
		while (i--) {
			if (children[i].type === 1) {
				return children[i]
			} else {
				if ("development" !== 'production' && children[i].text !== ' ') {
					warn$2(
						"text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
						"will be ignored."
					);
				}
				children.pop();
			}
		}
	}

	function addIfCondition (el, condition) {
		if (!el.ifConditions) {
			el.ifConditions = [];
		}
		el.ifConditions.push(condition);
	}

	function processOnce (el) {
		var once$$1 = getAndRemoveAttr(el, 'v-once');
		if (once$$1 != null) {
			el.once = true;
		}
	}

	function processSlot (el) {
		if (el.tag === 'slot') {
			el.slotName = getBindingAttr(el, 'name');
			if ("development" !== 'production' && el.key) {
				warn$2(
					"`key` does not work on <slot> because slots are abstract outlets " +
					"and can possibly expand into multiple elements. " +
					"Use the key on a wrapping element instead."
				);
			}
		} else {
			var slotTarget = getBindingAttr(el, 'slot');
			if (slotTarget) {
				el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
			}
			if (el.tag === 'template') {
				el.slotScope = getAndRemoveAttr(el, 'scope');
			}
		}
	}

	function processComponent (el) {
		var binding;
		if ((binding = getBindingAttr(el, 'is'))) {
			el.component = binding;
		}
		if (getAndRemoveAttr(el, 'inline-template') != null) {
			el.inlineTemplate = true;
		}
	}

	function processAttrs (el) {
		var list = el.attrsList;
		var i, l, name, rawName, value, modifiers, isProp;
		for (i = 0, l = list.length; i < l; i++) {
			name = rawName = list[i].name;
			value = list[i].value;
			if (dirRE.test(name)) {
				// mark element as dynamic
				el.hasBindings = true;
				// modifiers
				modifiers = parseModifiers(name);
				if (modifiers) {
					name = name.replace(modifierRE, '');
				}
				if (bindRE.test(name)) { // v-bind
					name = name.replace(bindRE, '');
					value = parseFilters(value);
					isProp = false;
					if (modifiers) {
						if (modifiers.prop) {
							isProp = true;
							name = camelize(name);
							if (name === 'innerHtml') { name = 'innerHTML'; }
						}
						if (modifiers.camel) {
							name = camelize(name);
						}
						if (modifiers.sync) {
							addHandler(
								el,
								("update:" + (camelize(name))),
								genAssignmentCode(value, "$event")
							);
						}
					}
					if (isProp || (
							!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
						)) {
						addProp(el, name, value);
					} else {
						addAttr(el, name, value);
					}
				} else if (onRE.test(name)) { // v-on
					name = name.replace(onRE, '');
					addHandler(el, name, value, modifiers, false, warn$2);
				} else { // normal directives
					name = name.replace(dirRE, '');
					// parse arg
					var argMatch = name.match(argRE);
					var arg = argMatch && argMatch[1];
					if (arg) {
						name = name.slice(0, -(arg.length + 1));
					}
					addDirective(el, name, rawName, value, arg, modifiers);
					if ("development" !== 'production' && name === 'model') {
						checkForAliasModel(el, value);
					}
				}
			} else {
				// literal attribute
				{
					var expression = parseText(value, delimiters);
					if (expression) {
						warn$2(
							name + "=\"" + value + "\": " +
							'Interpolation inside attributes has been removed. ' +
							'Use v-bind or the colon shorthand instead. For example, ' +
							'instead of <div id="{{ val }}">, use <div :id="val">.'
						);
					}
				}
				addAttr(el, name, JSON.stringify(value));
			}
		}
	}

	function checkInFor (el) {
		var parent = el;
		while (parent) {
			if (parent.for !== undefined) {
				return true
			}
			parent = parent.parent;
		}
		return false
	}

	function parseModifiers (name) {
		var match = name.match(modifierRE);
		if (match) {
			var ret = {};
			match.forEach(function (m) { ret[m.slice(1)] = true; });
			return ret
		}
	}

	function makeAttrsMap (attrs) {
		var map = {};
		for (var i = 0, l = attrs.length; i < l; i++) {
			if (
				"development" !== 'production' &&
				map[attrs[i].name] && !isIE && !isEdge
			) {
				warn$2('duplicate attribute: ' + attrs[i].name);
			}
			map[attrs[i].name] = attrs[i].value;
		}
		return map
	}

// for script (e.g. type="x/template") or style, do not decode content
	function isTextTag (el) {
		return el.tag === 'script' || el.tag === 'style'
	}

	function isForbiddenTag (el) {
		return (
			el.tag === 'style' ||
			(el.tag === 'script' && (
				!el.attrsMap.type ||
				el.attrsMap.type === 'text/javascript'
			))
		)
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
		var res = [];
		for (var i = 0; i < attrs.length; i++) {
			var attr = attrs[i];
			if (!ieNSBug.test(attr.name)) {
				attr.name = attr.name.replace(ieNSPrefix, '');
				res.push(attr);
			}
		}
		return res
	}

	function checkForAliasModel (el, value) {
		var _el = el;
		while (_el) {
			if (_el.for && _el.alias === value) {
				warn$2(
					"<" + (el.tag) + " v-model=\"" + value + "\">: " +
					"You are binding v-model directly to a v-for iteration alias. " +
					"This will not be able to modify the v-for source array because " +
					"writing to the alias is like modifying a function local variable. " +
					"Consider using an array of objects and use v-model on an object property instead."
				);
			}
			_el = _el.parent;
		}
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
		if (!root) { return }
		isStaticKey = genStaticKeysCached(options.staticKeys || '');
		isPlatformReservedTag = options.isReservedTag || no;
		// first pass: mark all non-static nodes.
		markStatic$1(root);
		// second pass: mark static roots.
		markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
		return makeMap(
			'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
			(keys ? ',' + keys : '')
		)
	}

	function markStatic$1 (node) {
		node.static = isStatic(node);
		if (node.type === 1) {
			// do not make component slot content static. this avoids
			// 1. components not able to mutate slot nodes
			// 2. static slot content fails for hot-reloading
			if (
				!isPlatformReservedTag(node.tag) &&
				node.tag !== 'slot' &&
				node.attrsMap['inline-template'] == null
			) {
				return
			}
			for (var i = 0, l = node.children.length; i < l; i++) {
				var child = node.children[i];
				markStatic$1(child);
				if (!child.static) {
					node.static = false;
				}
			}
			if (node.ifConditions) {
				for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
					var block = node.ifConditions[i$1].block;
					markStatic$1(block);
					if (!block.static) {
						node.static = false;
					}
				}
			}
		}
	}

	function markStaticRoots (node, isInFor) {
		if (node.type === 1) {
			if (node.static || node.once) {
				node.staticInFor = isInFor;
			}
			// For a node to qualify as a static root, it should have children that
			// are not just static text. Otherwise the cost of hoisting out will
			// outweigh the benefits and it's better off to just always render it fresh.
			if (node.static && node.children.length && !(
					node.children.length === 1 &&
					node.children[0].type === 3
				)) {
				node.staticRoot = true;
				return
			} else {
				node.staticRoot = false;
			}
			if (node.children) {
				for (var i = 0, l = node.children.length; i < l; i++) {
					markStaticRoots(node.children[i], isInFor || !!node.for);
				}
			}
			if (node.ifConditions) {
				for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
					markStaticRoots(node.ifConditions[i$1].block, isInFor);
				}
			}
		}
	}

	function isStatic (node) {
		if (node.type === 2) { // expression
			return false
		}
		if (node.type === 3) { // text
			return true
		}
		return !!(node.pre || (
			!node.hasBindings && // no dynamic bindings
			!node.if && !node.for && // not v-if or v-for or v-else
			!isBuiltInTag(node.tag) && // not a built-in
			isPlatformReservedTag(node.tag) && // not a component
			!isDirectChildOfTemplateFor(node) &&
			Object.keys(node).every(isStaticKey)
		))
	}

	function isDirectChildOfTemplateFor (node) {
		while (node.parent) {
			node = node.parent;
			if (node.tag !== 'template') {
				return false
			}
			if (node.for) {
				return true
			}
		}
		return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
	var keyCodes = {
		esc: 27,
		tab: 9,
		enter: 13,
		space: 32,
		up: 38,
		left: 37,
		right: 39,
		down: 40,
		'delete': [8, 46]
	};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

	var modifierCode = {
		stop: '$event.stopPropagation();',
		prevent: '$event.preventDefault();',
		self: genGuard("$event.target !== $event.currentTarget"),
		ctrl: genGuard("!$event.ctrlKey"),
		shift: genGuard("!$event.shiftKey"),
		alt: genGuard("!$event.altKey"),
		meta: genGuard("!$event.metaKey"),
		left: genGuard("'button' in $event && $event.button !== 0"),
		middle: genGuard("'button' in $event && $event.button !== 1"),
		right: genGuard("'button' in $event && $event.button !== 2")
	};

	function genHandlers (
		events,
		isNative,
		warn
	) {
		var res = isNative ? 'nativeOn:{' : 'on:{';
		for (var name in events) {
			var handler = events[name];
			// #5330: warn click.right, since right clicks do not actually fire click events.
			if ("development" !== 'production' &&
				name === 'click' &&
				handler && handler.modifiers && handler.modifiers.right
			) {
				warn(
					"Use \"contextmenu\" instead of \"click.right\" since right clicks " +
					"do not actually fire \"click\" events."
				);
			}
			res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
		}
		return res.slice(0, -1) + '}'
	}

	function genHandler (
		name,
		handler
	) {
		if (!handler) {
			return 'function(){}'
		}

		if (Array.isArray(handler)) {
			return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
		}

		var isMethodPath = simplePathRE.test(handler.value);
		var isFunctionExpression = fnExpRE.test(handler.value);

		if (!handler.modifiers) {
			return isMethodPath || isFunctionExpression
				? handler.value
				: ("function($event){" + (handler.value) + "}") // inline statement
		} else {
			var code = '';
			var genModifierCode = '';
			var keys = [];
			for (var key in handler.modifiers) {
				if (modifierCode[key]) {
					genModifierCode += modifierCode[key];
					// left/right
					if (keyCodes[key]) {
						keys.push(key);
					}
				} else {
					keys.push(key);
				}
			}
			if (keys.length) {
				code += genKeyFilter(keys);
			}
			// Make sure modifiers like prevent and stop get executed after key filtering
			if (genModifierCode) {
				code += genModifierCode;
			}
			var handlerCode = isMethodPath
				? handler.value + '($event)'
				: isFunctionExpression
					? ("(" + (handler.value) + ")($event)")
					: handler.value;
			return ("function($event){" + code + handlerCode + "}")
		}
	}

	function genKeyFilter (keys) {
		return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}

	function genFilterCode (key) {
		var keyVal = parseInt(key, 10);
		if (keyVal) {
			return ("$event.keyCode!==" + keyVal)
		}
		var alias = keyCodes[key];
		return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function on (el, dir) {
		if ("development" !== 'production' && dir.modifiers) {
			warn("v-on without argument does not support modifiers.");
		}
		el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
	}

	/*  */

	function bind$1 (el, dir) {
		el.wrapData = function (code) {
			return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
		};
	}

	/*  */

	var baseDirectives = {
		on: on,
		bind: bind$1,
		cloak: noop
	};

	/*  */

	var CodegenState = function CodegenState (options) {
		this.options = options;
		this.warn = options.warn || baseWarn;
		this.transforms = pluckModuleFunction(options.modules, 'transformCode');
		this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
		this.directives = extend(extend({}, baseDirectives), options.directives);
		var isReservedTag = options.isReservedTag || no;
		this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
		this.onceId = 0;
		this.staticRenderFns = [];
	};



	function generate (
		ast,
		options
	) {
		var state = new CodegenState(options);
		var code = ast ? genElement(ast, state) : '_c("div")';
		return {
			render: ("with(this){return " + code + "}"),
			staticRenderFns: state.staticRenderFns
		}
	}

	function genElement (el, state) {
		if (el.staticRoot && !el.staticProcessed) {
			return genStatic(el, state)
		} else if (el.once && !el.onceProcessed) {
			return genOnce(el, state)
		} else if (el.for && !el.forProcessed) {
			return genFor(el, state)
		} else if (el.if && !el.ifProcessed) {
			return genIf(el, state)
		} else if (el.tag === 'template' && !el.slotTarget) {
			return genChildren(el, state) || 'void 0'
		} else if (el.tag === 'slot') {
			return genSlot(el, state)
		} else {
			// component or element
			var code;
			if (el.component) {
				code = genComponent(el.component, el, state);
			} else {
				var data = el.plain ? undefined : genData$2(el, state);

				var children = el.inlineTemplate ? null : genChildren(el, state, true);
				code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
			}
			// module transforms
			for (var i = 0; i < state.transforms.length; i++) {
				code = state.transforms[i](el, code);
			}
			return code
		}
	}

// hoist static sub-trees out
	function genStatic (el, state) {
		el.staticProcessed = true;
		state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
		return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

// v-once
	function genOnce (el, state) {
		el.onceProcessed = true;
		if (el.if && !el.ifProcessed) {
			return genIf(el, state)
		} else if (el.staticInFor) {
			var key = '';
			var parent = el.parent;
			while (parent) {
				if (parent.for) {
					key = parent.key;
					break
				}
				parent = parent.parent;
			}
			if (!key) {
				"development" !== 'production' && state.warn(
					"v-once can only be used inside v-for that is keyed. "
				);
				return genElement(el, state)
			}
			return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
		} else {
			return genStatic(el, state)
		}
	}

	function genIf (
		el,
		state,
		altGen,
		altEmpty
	) {
		el.ifProcessed = true; // avoid recursion
		return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
	}

	function genIfConditions (
		conditions,
		state,
		altGen,
		altEmpty
	) {
		if (!conditions.length) {
			return altEmpty || '_e()'
		}

		var condition = conditions.shift();
		if (condition.exp) {
			return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
		} else {
			return ("" + (genTernaryExp(condition.block)))
		}

		// v-if with v-once should generate code like (a)?_m(0):_m(1)
		function genTernaryExp (el) {
			return altGen
				? altGen(el, state)
				: el.once
					? genOnce(el, state)
					: genElement(el, state)
		}
	}

	function genFor (
		el,
		state,
		altGen,
		altHelper
	) {
		var exp = el.for;
		var alias = el.alias;
		var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
		var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

		if ("development" !== 'production' &&
			state.maybeComponent(el) &&
			el.tag !== 'slot' &&
			el.tag !== 'template' &&
			!el.key
		) {
			state.warn(
				"<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
				"v-for should have explicit keys. " +
				"See https://vuejs.org/guide/list.html#key for more info.",
				true /* tip */
			);
		}

		el.forProcessed = true; // avoid recursion
		return (altHelper || '_l') + "((" + exp + ")," +
			"function(" + alias + iterator1 + iterator2 + "){" +
			"return " + ((altGen || genElement)(el, state)) +
			'})'
	}

	function genData$2 (el, state) {
		var data = '{';

		// directives first.
		// directives may mutate the el's other properties before they are generated.
		var dirs = genDirectives(el, state);
		if (dirs) { data += dirs + ','; }

		// key
		if (el.key) {
			data += "key:" + (el.key) + ",";
		}
		// ref
		if (el.ref) {
			data += "ref:" + (el.ref) + ",";
		}
		if (el.refInFor) {
			data += "refInFor:true,";
		}
		// pre
		if (el.pre) {
			data += "pre:true,";
		}
		// record original tag name for components using "is" attribute
		if (el.component) {
			data += "tag:\"" + (el.tag) + "\",";
		}
		// module data generation functions
		for (var i = 0; i < state.dataGenFns.length; i++) {
			data += state.dataGenFns[i](el);
		}
		// attributes
		if (el.attrs) {
			data += "attrs:{" + (genProps(el.attrs)) + "},";
		}
		// DOM props
		if (el.props) {
			data += "domProps:{" + (genProps(el.props)) + "},";
		}
		// event handlers
		if (el.events) {
			data += (genHandlers(el.events, false, state.warn)) + ",";
		}
		if (el.nativeEvents) {
			data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
		}
		// slot target
		if (el.slotTarget) {
			data += "slot:" + (el.slotTarget) + ",";
		}
		// scoped slots
		if (el.scopedSlots) {
			data += (genScopedSlots(el.scopedSlots, state)) + ",";
		}
		// component v-model
		if (el.model) {
			data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
		}
		// inline-template
		if (el.inlineTemplate) {
			var inlineTemplate = genInlineTemplate(el, state);
			if (inlineTemplate) {
				data += inlineTemplate + ",";
			}
		}
		data = data.replace(/,$/, '') + '}';
		// v-bind data wrap
		if (el.wrapData) {
			data = el.wrapData(data);
		}
		// v-on data wrap
		if (el.wrapListeners) {
			data = el.wrapListeners(data);
		}
		return data
	}

	function genDirectives (el, state) {
		var dirs = el.directives;
		if (!dirs) { return }
		var res = 'directives:[';
		var hasRuntime = false;
		var i, l, dir, needRuntime;
		for (i = 0, l = dirs.length; i < l; i++) {
			dir = dirs[i];
			needRuntime = true;
			var gen = state.directives[dir.name];
			if (gen) {
				// compile-time directive that manipulates AST.
				// returns true if it also needs a runtime counterpart.
				needRuntime = !!gen(el, dir, state.warn);
			}
			if (needRuntime) {
				hasRuntime = true;
				res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
			}
		}
		if (hasRuntime) {
			return res.slice(0, -1) + ']'
		}
	}

	function genInlineTemplate (el, state) {
		var ast = el.children[0];
		if ("development" !== 'production' && (
				el.children.length > 1 || ast.type !== 1
			)) {
			state.warn('Inline-template components must have exactly one child element.');
		}
		if (ast.type === 1) {
			var inlineRenderFns = generate(ast, state.options);
			return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
		}
	}

	function genScopedSlots (
		slots,
		state
	) {
		return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
			return genScopedSlot(key, slots[key], state)
		}).join(',')) + "])")
	}

	function genScopedSlot (
		key,
		el,
		state
	) {
		if (el.for && !el.forProcessed) {
			return genForScopedSlot(key, el, state)
		}
		return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
			"return " + (el.tag === 'template'
				? genChildren(el, state) || 'void 0'
				: genElement(el, state)) + "}}"
	}

	function genForScopedSlot (
		key,
		el,
		state
	) {
		var exp = el.for;
		var alias = el.alias;
		var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
		var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
		el.forProcessed = true; // avoid recursion
		return "_l((" + exp + ")," +
			"function(" + alias + iterator1 + iterator2 + "){" +
			"return " + (genScopedSlot(key, el, state)) +
			'})'
	}

	function genChildren (
		el,
		state,
		checkSkip,
		altGenElement,
		altGenNode
	) {
		var children = el.children;
		if (children.length) {
			var el$1 = children[0];
			// optimize single v-for
			if (children.length === 1 &&
				el$1.for &&
				el$1.tag !== 'template' &&
				el$1.tag !== 'slot'
			) {
				return (altGenElement || genElement)(el$1, state)
			}
			var normalizationType = checkSkip
				? getNormalizationType(children, state.maybeComponent)
				: 0;
			var gen = altGenNode || genNode;
			return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
		}
	}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
	function getNormalizationType (
		children,
		maybeComponent
	) {
		var res = 0;
		for (var i = 0; i < children.length; i++) {
			var el = children[i];
			if (el.type !== 1) {
				continue
			}
			if (needsNormalization(el) ||
				(el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
				res = 2;
				break
			}
			if (maybeComponent(el) ||
				(el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
				res = 1;
			}
		}
		return res
	}

	function needsNormalization (el) {
		return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}

	function genNode (node, state) {
		if (node.type === 1) {
			return genElement(node, state)
		} if (node.type === 3 && node.isComment) {
			return genComment(node)
		} else {
			return genText(node)
		}
	}

	function genText (text) {
		return ("_v(" + (text.type === 2
			? text.expression // no need for () because already wrapped in _s()
			: transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genComment (comment) {
		return ("_e(" + (JSON.stringify(comment.text)) + ")")
	}

	function genSlot (el, state) {
		var slotName = el.slotName || '"default"';
		var children = genChildren(el, state);
		var res = "_t(" + slotName + (children ? ("," + children) : '');
		var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
		var bind$$1 = el.attrsMap['v-bind'];
		if ((attrs || bind$$1) && !children) {
			res += ",null";
		}
		if (attrs) {
			res += "," + attrs;
		}
		if (bind$$1) {
			res += (attrs ? '' : ',null') + "," + bind$$1;
		}
		return res + ')'
	}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (
		componentName,
		el,
		state
	) {
		var children = el.inlineTemplate ? null : genChildren(el, state, true);
		return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
		var res = '';
		for (var i = 0; i < props.length; i++) {
			var prop = props[i];
			res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
		}
		return res.slice(0, -1)
	}

// #3895, #4268
	function transformSpecialNewlines (text) {
		return text
			.replace(/\u2028/g, '\\u2028')
			.replace(/\u2029/g, '\\u2029')
	}

	/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
		'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
		'super,throw,while,yield,delete,export,import,return,switch,default,' +
		'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
		'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
	function detectErrors (ast) {
		var errors = [];
		if (ast) {
			checkNode(ast, errors);
		}
		return errors
	}

	function checkNode (node, errors) {
		if (node.type === 1) {
			for (var name in node.attrsMap) {
				if (dirRE.test(name)) {
					var value = node.attrsMap[name];
					if (value) {
						if (name === 'v-for') {
							checkFor(node, ("v-for=\"" + value + "\""), errors);
						} else if (onRE.test(name)) {
							checkEvent(value, (name + "=\"" + value + "\""), errors);
						} else {
							checkExpression(value, (name + "=\"" + value + "\""), errors);
						}
					}
				}
			}
			if (node.children) {
				for (var i = 0; i < node.children.length; i++) {
					checkNode(node.children[i], errors);
				}
			}
		} else if (node.type === 2) {
			checkExpression(node.expression, node.text, errors);
		}
	}

	function checkEvent (exp, text, errors) {
		var stipped = exp.replace(stripStringRE, '');
		var keywordMatch = stipped.match(unaryOperatorsRE);
		if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
			errors.push(
				"avoid using JavaScript unary operator as property name: " +
				"\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
			);
		}
		checkExpression(exp, text, errors);
	}

	function checkFor (node, text, errors) {
		checkExpression(node.for || '', text, errors);
		checkIdentifier(node.alias, 'v-for alias', text, errors);
		checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
		checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
		if (typeof ident === 'string' && !identRE.test(ident)) {
			errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
		}
	}

	function checkExpression (exp, text, errors) {
		try {
			new Function(("return " + exp));
		} catch (e) {
			var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
			if (keywordMatch) {
				errors.push(
					"avoid using JavaScript keyword as property name: " +
					"\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
				);
			} else {
				errors.push(("invalid expression: " + (text.trim())));
			}
		}
	}

	/*  */

	function createFunction (code, errors) {
		try {
			return new Function(code)
		} catch (err) {
			errors.push({ err: err, code: code });
			return noop
		}
	}

	function createCompileToFunctionFn (compile) {
		var cache = Object.create(null);

		return function compileToFunctions (
			template,
			options,
			vm
		) {
			options = options || {};

			/* istanbul ignore if */
			{
				// detect possible CSP restriction
				try {
					new Function('return 1');
				} catch (e) {
					if (e.toString().match(/unsafe-eval|CSP/)) {
						warn(
							'It seems you are using the standalone build of Vue.js in an ' +
							'environment with Content Security Policy that prohibits unsafe-eval. ' +
							'The template compiler cannot work in this environment. Consider ' +
							'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
							'templates into render functions.'
						);
					}
				}
			}

			// check cache
			var key = options.delimiters
				? String(options.delimiters) + template
				: template;
			if (cache[key]) {
				return cache[key]
			}

			// compile
			var compiled = compile(template, options);

			// check compilation errors/tips
			{
				if (compiled.errors && compiled.errors.length) {
					warn(
						"Error compiling template:\n\n" + template + "\n\n" +
						compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
						vm
					);
				}
				if (compiled.tips && compiled.tips.length) {
					compiled.tips.forEach(function (msg) { return tip(msg, vm); });
				}
			}

			// turn code into functions
			var res = {};
			var fnGenErrors = [];
			res.render = createFunction(compiled.render, fnGenErrors);
			res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
				return createFunction(code, fnGenErrors)
			});

			// check function generation errors.
			// this should only happen if there is a bug in the compiler itself.
			// mostly for codegen development use
			/* istanbul ignore if */
			{
				if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
					warn(
						"Failed to generate render function:\n\n" +
						fnGenErrors.map(function (ref) {
							var err = ref.err;
							var code = ref.code;

							return ((err.toString()) + " in\n\n" + code + "\n");
						}).join('\n'),
						vm
					);
				}
			}

			return (cache[key] = res)
		}
	}

	/*  */

	function createCompilerCreator (baseCompile) {
		return function createCompiler (baseOptions) {
			function compile (
				template,
				options
			) {
				var finalOptions = Object.create(baseOptions);
				var errors = [];
				var tips = [];
				finalOptions.warn = function (msg, tip) {
					(tip ? tips : errors).push(msg);
				};

				if (options) {
					// merge custom modules
					if (options.modules) {
						finalOptions.modules =
							(baseOptions.modules || []).concat(options.modules);
					}
					// merge custom directives
					if (options.directives) {
						finalOptions.directives = extend(
							Object.create(baseOptions.directives),
							options.directives
						);
					}
					// copy other options
					for (var key in options) {
						if (key !== 'modules' && key !== 'directives') {
							finalOptions[key] = options[key];
						}
					}
				}

				var compiled = baseCompile(template, finalOptions);
				{
					errors.push.apply(errors, detectErrors(compiled.ast));
				}
				compiled.errors = errors;
				compiled.tips = tips;
				return compiled
			}

			return {
				compile: compile,
				compileToFunctions: createCompileToFunctionFn(compile)
			}
		}
	}

	/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
	var createCompiler = createCompilerCreator(function baseCompile (
		template,
		options
	) {
		var ast = parse(template.trim(), options);
		optimize(ast, options);
		var code = generate(ast, options);
		return {
			ast: ast,
			render: code.render,
			staticRenderFns: code.staticRenderFns
		}
	});

	/*  */

	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;

	/*  */

	var idToTemplate = cached(function (id) {
		var el = query(id);
		return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
		el,
		hydrating
	) {
		el = el && query(el);

		/* istanbul ignore if */
		if (el === document.body || el === document.documentElement) {
			"development" !== 'production' && warn(
				"Do not mount Vue to <html> or <body> - mount to normal elements instead."
			);
			return this
		}

		var options = this.$options;
		// resolve template/el and convert to render function
		if (!options.render) {
			var template = options.template;
			if (template) {
				if (typeof template === 'string') {
					if (template.charAt(0) === '#') {
						template = idToTemplate(template);
						/* istanbul ignore if */
						if ("development" !== 'production' && !template) {
							warn(
								("Template element not found or is empty: " + (options.template)),
								this
							);
						}
					}
				} else if (template.nodeType) {
					template = template.innerHTML;
				} else {
					{
						warn('invalid template option:' + template, this);
					}
					return this
				}
			} else if (el) {
				template = getOuterHTML(el);
			}
			if (template) {
				/* istanbul ignore if */
				if ("development" !== 'production' && config.performance && mark) {
					mark('compile');
				}

				var ref = compileToFunctions(template, {
					shouldDecodeNewlines: shouldDecodeNewlines,
					delimiters: options.delimiters,
					comments: options.comments
				}, this);
				var render = ref.render;
				var staticRenderFns = ref.staticRenderFns;
				options.render = render;
				options.staticRenderFns = staticRenderFns;

				/* istanbul ignore if */
				if ("development" !== 'production' && config.performance && mark) {
					mark('compile end');
					measure(((this._name) + " compile"), 'compile', 'compile end');
				}
			}
		}
		return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
		if (el.outerHTML) {
			return el.outerHTML
		} else {
			var container = document.createElement('div');
			container.appendChild(el.cloneNode(true));
			return container.innerHTML
		}
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

})));
/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
    a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
    null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});
/*! highlight.js v9.12.0 | BSD3 License | git.io/hljslicense */
!function(e){var n="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):n&&(n.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return n.hljs}))}(function(e){function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0===t.index}function a(e){return k.test(e)}function i(e){var n,t,r,i,o=e.className+" ";if(o+=e.parentNode?e.parentNode.className:"",t=B.exec(o))return w(t[1])?t[1]:"no-highlight";for(o=o.split(/\s+/),n=0,r=o.length;r>n;n++)if(i=o[n],a(i)||w(i))return i}function o(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach(function(e){for(n in e)t[n]=e[n]}),t}function u(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?a+=i.nodeValue.length:1===i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function c(e,r,a){function i(){return e.length&&r.length?e[0].offset!==r[0].offset?e[0].offset<r[0].offset?e:r:"start"===r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value).replace('"',"&quot;")+'"'}s+="<"+t(e)+E.map.call(e.attributes,r).join("")+">"}function u(e){s+="</"+t(e)+">"}function c(e){("start"===e.event?o:u)(e.node)}for(var l=0,s="",f=[];e.length||r.length;){var g=i();if(s+=n(a.substring(l,g[0].offset)),l=g[0].offset,g===e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g===e&&g.length&&g[0].offset===l);f.reverse().forEach(o)}else"start"===g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return s+n(a.substr(l))}function l(e){return e.v&&!e.cached_variants&&(e.cached_variants=e.v.map(function(n){return o(e,{v:null},n)})),e.cached_variants||e.eW&&[o(e)]||[e]}function s(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var o={},u=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");o[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?u("keyword",a.k):x(a.k).forEach(function(e){u(e,a.k[e])}),a.k=o}a.lR=t(a.l||/\w+/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),null==a.r&&(a.r=1),a.c||(a.c=[]),a.c=Array.prototype.concat.apply([],a.c.map(function(e){return l("self"===e?a:e)})),a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var c=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=c.length?t(c.join("|"),!0):{exec:function(){return null}}}}r(e)}function f(e,t,a,i){function o(e,n){var t,a;for(t=0,a=n.c.length;a>t;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function c(e,n){return!a&&r(n.iR,e)}function l(e,n){var t=N.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":I.classPrefix,i='<span class="'+a,o=t?"":C;return i+=e+'">',i+n+o}function h(){var e,t,r,a;if(!E.k)return n(k);for(a="",t=0,E.lR.lastIndex=0,r=E.lR.exec(k);r;)a+=n(k.substring(t,r.index)),e=l(E,r),e?(B+=e[1],a+=p(e[0],n(r[0]))):a+=n(r[0]),t=E.lR.lastIndex,r=E.lR.exec(k);return a+n(k.substr(t))}function d(){var e="string"==typeof E.sL;if(e&&!y[E.sL])return n(k);var t=e?f(E.sL,k,!0,x[E.sL]):g(k,E.sL.length?E.sL:void 0);return E.r>0&&(B+=t.r),e&&(x[E.sL]=t.top),p(t.language,t.value,!1,!0)}function b(){L+=null!=E.sL?d():h(),k=""}function v(e){L+=e.cN?p(e.cN,"",!0):"",E=Object.create(e,{parent:{value:E}})}function m(e,n){if(k+=e,null==n)return b(),0;var t=o(n,E);if(t)return t.skip?k+=n:(t.eB&&(k+=n),b(),t.rB||t.eB||(k=n)),v(t,n),t.rB?0:n.length;var r=u(E,n);if(r){var a=E;a.skip?k+=n:(a.rE||a.eE||(k+=n),b(),a.eE&&(k=n));do E.cN&&(L+=C),E.skip||(B+=E.r),E=E.parent;while(E!==r.parent);return r.starts&&v(r.starts,""),a.rE?0:n.length}if(c(n,E))throw new Error('Illegal lexeme "'+n+'" for mode "'+(E.cN||"<unnamed>")+'"');return k+=n,n.length||1}var N=w(e);if(!N)throw new Error('Unknown language: "'+e+'"');s(N);var R,E=i||N,x={},L="";for(R=E;R!==N;R=R.parent)R.cN&&(L=p(R.cN,"",!0)+L);var k="",B=0;try{for(var M,j,O=0;;){if(E.t.lastIndex=O,M=E.t.exec(t),!M)break;j=m(t.substring(O,M.index),M[0]),O=M.index+j}for(m(t.substr(O)),R=E;R.parent;R=R.parent)R.cN&&(L+=C);return{r:B,value:L,language:e,top:E}}catch(T){if(T.message&&-1!==T.message.indexOf("Illegal"))return{r:0,value:n(t)};throw T}}function g(e,t){t=t||I.languages||x(y);var r={r:0,value:n(e)},a=r;return t.filter(w).forEach(function(n){var t=f(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}),a.language&&(r.second_best=a),r}function p(e){return I.tabReplace||I.useBR?e.replace(M,function(e,n){return I.useBR&&"\n"===e?"<br>":I.tabReplace?n.replace(/\t/g,I.tabReplace):""}):e}function h(e,n,t){var r=n?L[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function d(e){var n,t,r,o,l,s=i(e);a(s)||(I.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div"),n.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):n=e,l=n.textContent,r=s?f(s,l,!0):g(l),t=u(n),t.length&&(o=document.createElementNS("http://www.w3.org/1999/xhtml","div"),o.innerHTML=r.value,r.value=c(t,u(o),l)),r.value=p(r.value),e.innerHTML=r.value,e.className=h(e.className,s,r.language),e.result={language:r.language,re:r.r},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.r}))}function b(e){I=o(I,e)}function v(){if(!v.called){v.called=!0;var e=document.querySelectorAll("pre code");E.forEach.call(e,d)}}function m(){addEventListener("DOMContentLoaded",v,!1),addEventListener("load",v,!1)}function N(n,t){var r=y[n]=t(e);r.aliases&&r.aliases.forEach(function(e){L[e]=n})}function R(){return x(y)}function w(e){return e=(e||"").toLowerCase(),y[e]||y[L[e]]}var E=[],x=Object.keys,y={},L={},k=/^(no-?highlight|plain|text)$/i,B=/\blang(?:uage)?-([\w-]+)\b/i,M=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,C="</span>",I={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};return e.highlight=f,e.highlightAuto=g,e.fixMarkup=p,e.highlightBlock=d,e.configure=b,e.initHighlighting=v,e.initHighlightingOnLoad=m,e.registerLanguage=N,e.listLanguages=R,e.getLanguage=w,e.inherit=o,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e});hljs.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*#]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},s={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],o=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),s,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=o,s.c=o,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:o}});hljs.registerLanguage("ini",function(e){var b={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"section",b:/^\s*\[+/,e:/\]+/},{b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",rB:!0,c:[{cN:"attr",b:/[a-z0-9\[\]_-]+/},{b:/=/,eW:!0,r:0,c:[{cN:"literal",b:/\bon|off|true|false|yes|no\b/},{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},b,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM]}]}]}});hljs.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"meta",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"comment",v:[{b:/Index: /,e:/$/},{b:/={3,}/,e:/$/},{b:/^\-{3}/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+{3}/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"addition",b:"^\\!",e:"$"}]}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/\b-?[a-z\._]+\b/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,s,a,t]}});hljs.registerLanguage("php",function(e){var c={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},i={cN:"meta",b:/<\?(php)?|\?>/},t={cN:"string",c:[e.BE,i],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},a={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[i]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},i,{cN:"keyword",b:/\$this\b/},c,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,t,a]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},t,a]}});hljs.registerLanguage("python",function(e){var r={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},b={cN:"meta",b:/^(>>>|\.\.\.) /},c={cN:"subst",b:/\{/,e:/\}/,k:r,i:/#/},a={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[b],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[b],r:10},{b:/(fr|rf|f)'''/,e:/'''/,c:[b,c]},{b:/(fr|rf|f)"""/,e:/"""/,c:[b,c]},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)'/,e:/'/,c:[c]},{b:/(fr|rf|f)"/,e:/"/,c:[c]},e.ASM,e.QSM]},s={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},i={cN:"params",b:/\(/,e:/\)/,c:["self",b,s,a]};return c.c=[a,s,b],{aliases:["py","gyp"],k:r,i:/(<\/|->|\?)|=>/,c:[b,s,a,e.HCM,{v:[{cN:"function",bK:"def"},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,i,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",r={cN:"subst",b:/#\{/,e:/}/,k:c},i=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,r]},{b:/"/,e:/"/,c:[e.BE,r]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[r,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+n},{sL:"javascript",eB:!0,eE:!0,v:[{b:"```",e:"```"},{b:"`",e:"`"}]}];r.c=i;var s=e.inherit(e.TM,{b:n}),t="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(i)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:i.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+t,e:"[-=]>",rB:!0,c:[s,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:t,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[s]},s]},{b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("cpp",function(t){var e={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U)?L?"',e:'"',i:"\\n",c:[t.BE]},{b:'(u8?|U)?R"',e:'"',c:[t.BE]},{b:"'\\\\?.",e:"'",i:"."}]},s={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},i={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},t.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:/<[^\n>]*>/,e:/$/,i:"\\n"},t.CLCM,t.CBCM]},a=t.IR+"\\s*\\(",c={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},n=[e,t.CLCM,t.CBCM,s,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:c,i:"</",c:n.concat([i,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:c,c:["self",e]},{b:t.IR+"::",k:c},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:c,c:n.concat([{b:/\(/,e:/\)/,k:c,c:n.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+t.IR+"[\\*&\\s]+)+"+a,rB:!0,e:/[{;=]/,eE:!0,k:c,i:/[^\w\s\*&]/,c:[{b:a,rB:!0,c:[t.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:c,r:0,c:[t.CLCM,t.CBCM,r,s,e]},t.CLCM,t.CBCM,i]},{cN:"class",bK:"class struct",e:/[{;:]/,c:[{b:/</,e:/>/,c:["self"]},t.TM]}]),exports:{preprocessor:i,strings:r,k:c}}});hljs.registerLanguage("cs",function(e){var i={keyword:"abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",literal:"null false true"},t={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},r=e.inherit(t,{i:/\n/}),a={cN:"subst",b:"{",e:"}",k:i},c=e.inherit(a,{i:/\n/}),n={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,c]},s={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},a]},o=e.inherit(s,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},c]});a.c=[s,n,t,e.ASM,e.QSM,e.CNM,e.CBCM],c.c=[o,n,r,e.ASM,e.QSM,e.CNM,e.inherit(e.CBCM,{i:/\n/})];var l={v:[s,n,t,e.ASM,e.QSM]},b=e.IR+"(<"+e.IR+"(\\s*,\\s*"+e.IR+")*>)?(\\[\\])?";return{aliases:["csharp"],k:i,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},l,e.CNM,{bK:"class interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{cN:"meta",b:"^\\s*\\[",eB:!0,e:"\\]",eE:!0,c:[{cN:"meta-string",b:/"/,e:/"/}]},{bK:"new return throw await else",r:0},{cN:"function",b:"("+b+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:i,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:i,r:0,c:[l,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}});hljs.registerLanguage("shell",function(s){return{aliases:["console"],c:[{cN:"meta",b:"^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",starts:{e:"$",sL:"bash"}}]}});hljs.registerLanguage("ruby",function(e){var b="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},c={cN:"doctag",b:"@[A-Za-z]+"},a={b:"#<",e:">"},s=[e.C("#","$",{c:[c]}),e.C("^\\=begin","^\\=end",{c:[c],r:10}),e.C("^__END__","\\n$")],n={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,n],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{b:/<<(-?)\w+$/,e:/^\s*\w+$/}]},i={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},d=[t,a,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(s)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:b}),i].concat(s)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[t,{b:b}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+"|unless)\\s*",k:"unless",c:[a,{cN:"regexp",c:[e.BE,n],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(s),r:0}].concat(s);n.c=d,i.c=d;var l="[>?]>",o="[\\w#]+\\(\\w+\\):\\d+:\\d+>",u="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",w=[{b:/^\s*=>/,starts:{e:"$",c:d}},{cN:"meta",b:"^("+l+"|"+o+"|"+u+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:s.concat(w).concat(d)}});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{literal:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s+{",rB:!0,e:"{",c:[{cN:"section",b:e.UIR}],r:0},{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"attribute",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",t={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:c,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,t]}]}});hljs.registerLanguage("makefile",function(e){var i={cN:"variable",v:[{b:"\\$\\("+e.UIR+"\\)",c:[e.BE]},{b:/\$[@%<?\^\+\*]/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,i]},a={cN:"variable",b:/\$\([\w-]+\s/,e:/\)/,k:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},c:[i]},n={b:"^"+e.UIR+"\\s*[:+?]?=",i:"\\n",rB:!0,c:[{b:"^"+e.UIR,e:"[:+?]?=",eE:!0}]},t={cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},l={cN:"section",b:/^[^\s]+:/,e:/$/,c:[i]};return{aliases:["mk","mak"],k:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",l:/[\w-]+/,c:[e.HCM,i,r,a,n,t,l]}});hljs.registerLanguage("java",function(e){var a="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",t=a+"(<"+a+"(\\s*,\\s*"+a+")*>)?",r="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",s="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",c={cN:"number",b:s,r:0};return{aliases:["jsp"],k:r,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},c,{cN:"meta",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}});hljs.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},_={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},i=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:_,l:i,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:i,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("javascript",function(e){var r="[A-Za-z$_][0-9A-Za-z$_]*",t={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:t,c:[]},c={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,c,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:t,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,c,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:r+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:r,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+r+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:r},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:r}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"section",b:"</?",e:">"},{cN:"attribute",b:/\w+/,r:0,k:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"meta",b:"\\s\\[",e:"\\]$"},{cN:"variable",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("xml",function(s){var e="[A-Za-z0-9\\._:-]+",t={eW:!0,i:/</,r:0,c:[{cN:"attr",b:e,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},s.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[t],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[t],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},t]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}});hljs.registerLanguage("json",function(e){var i={literal:"true false null"},n=[e.QSM,e.CNM],r={e:",",eW:!0,eE:!0,c:n,k:i},t={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(r,{b:/:/})],i:"\\S"},c={b:"\\[",e:"\\]",c:[e.inherit(r)],i:"\\S"};return n.splice(n.length,0,t,c),{c:n,k:i,i:"\\S"}});