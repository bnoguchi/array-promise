/**
 * @constructor
 * @param {Array} array is an optional list of members we'd like to populate the promise array with.
 */
function ArrayPromise (array) {
  this.arr = array;
  this.callbacks = [];
}

ArrayPromise.prototype = {
  /**
   * Adds callbacks to the promise that are triggered when the Promise Array has
   * members assigned to it.
   * @param {Function} fn is the callback function
   * @param {Array} args is the Array of arguments we'd like to pass to the callback when it's invoked.
   */
  callback: function (fn, args) {
    if (!(this.arr && this.arr.length)) { // TODO Do we need the length check?
      this.callbacks.push([fn, args]);
    } else {
      fn.arr = this.arr; // Provides a shortcut within the function to access the arr
      fn.apply(this, args);
    }
  },

  /**
   * Assigns members to the Promise Array and triggers all registered callbacks to date.
   * @param {Array} arr is the Array of members we're successfully assigning to this Promise Array
   */
  succeed: function (arr) {
    this.arr = arr || arguments.callee.arr;
    var cb, callbacks = this.callbacks;
    while (cb = callbacks.shift()) {
      cb[0].arr = arr; // Provides a shortcut to access the arr from inside the callback
      cb[0].apply(this, cb[1]);
    }
  },

  /**
   * When we have members, then we pass these members to the callback function, fn.
   * @param {Function} fn = function (arrayOfMembers) {...}
   */
  all: function (fn) {
    this.callback(this._all, arguments);
    return this;
  },

  /**
   * This invokes fn, passing it the members associated with this ArrayPromise
   * @param {Function} fn = function (arrayOfMembers) {...}
   */
  _all: function (fn) {
    fn(this.arr);
  },
  forEach: function (fn) {
    this.callback(this._forEach, arguments);
    return this;
  },
  _forEach: function (fn) {
    var arr = this.arr;
    for (var i = 0, l = arr.length; i < l; i++) {
      fn(arr[i], i);
    }
  },
  slice: function (start, num, fn) {
    var newArrayPromise = new ArrayPromise();
    newArrayPromise.callback(newArrayPromise._slice, arguments);
    this.callback(function () {
      newArrayPromise.succeed(arguments.callee.arr);
    });
    return newArrayPromise;
  },
  _slice: function (start, end, fn) {
    var slice = this.arr.slice(start, end);
    this.arr = slice;
  },
  splice: function () {
    this.callback(this._splice, arguments);
    return this;
  },
  _splice: function () {
    this.arr.splice.apply(this.arr, arguments);
  },
  filter: function (fn) {
    var newArrayPromise = new ArrayPromise();
    newArrayPromise.callback(newArrayPromise._filter, arguments);
    this.callback(function () {
      newArrayPromise.succeed(arguments.callee.arr);
    });
    return newArrayPromise;
  },
  _filter: function (fn) {
    var arr = this.arr;
    this.arr = arr.filter(fn);
  },
  map: function (fn) {
    var newArrayPromise = new ArrayPromise();
    newArrayPromise.callback(newArrayPromise._map, arguments);
    this.callback(function () {
      newArrayPromise.succeed(arguments.callee.arr);
    });
    return newArrayPromise;
  },
  _map: function (fn) {
    var arr = this.arr;
    this.arr = arr.map(fn);
  },
  toJSON: function (fn) {
    var newArrayPromise = new ArrayPromise();
    newArrayPromise.callback(newArrayPromise._toJSON, arguments);
    this.callback(newArrayPromise.succeed.bind(newArrayPromise));
    return newArrayPromise;
  },
  _toJSON: function (fn) {
    this.arr = this.arr.map( function (member) {
      var json = member.toJSON();
      if (fn) json = fn(json);
      return json;
    });
  },
  at: function (index, fn) {
    this.callback(this._at, arguments);
    return this;
  },
  _at: function (index, fn) {
    fn(this.arr[index]);
  },
  clear: function () {
    this.arr.length = 0;
    return this;
  }
};

module.exports = ArrayPromise;
