var should = require('should')
  , ArrayPromise = require('./index');

module.exports = {
  'all should callback the entire array when the promise succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.all( function (array) {
      array.should.eql(expectedArray);
    });
    setTimeout( function () {
      pa.succeed(expectedArray);
    }, 1000);
  },

  'all should callback the entire array immediately if the promise succeed event has already been triggered': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.succeed(expectedArray);
    pa.all( function (array) {
      array.should.eql(expectedArray);
    });
  },

  'forEach should callback each member in the array that is set when the promise succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.forEach( function (member, i) {
      member.should.eql(expectedArray[i]);
    });
    setTimeout( function () {
      pa.succeed(expectedArray);
    }, 1000);
  },

  'forEach should callback each member of the array immediately if the promise succeed event has already been triggered': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.succeed(expectedArray);
    pa.forEach( function (member, i) {
      member.should.eql(expectedArray[i]);
    });
  },

  'slice should callback the resulting slice of the array that is assigned by the succeed event': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.slice(0, 5).all(function (array) {
      array.should.eql(expectedArray);
    });
    setTimeout( function () {
      pa.succeed(expectedArray);
    }, 1000);
  },

  'slice should callback the resulting slice of the array that was already assigned by a previously fired succeed event': function () {
    var pa = new ArrayPromise()
      , expectedArray = [1, 2, 3, 4];
    pa.succeed(expectedArray);
    pa.slice(0, 5).all(function (array) {
      array.should.eql(expectedArray);
    });
  },

  'test splice when fn is invoked before succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa.splice(1, 2, 9, 10, 11, 12).all(function (array) {
        array.should.eql([1, 9, 10, 11, 12, 4]);
      });
    setTimeout( function () {
      pa.succeed(succeedArray);
    }, 1000);
  },

  'test splice when fn is invoked after succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa.succeed(succeedArray);
    pa.splice(1, 2, 9, 10, 11, 12).all(function (array) {
        array.should.eql([1, 9, 10, 11, 12, 4]);
      });
  },

  'test filter when fn is invoked before succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa
      .filter( function (member) {
        return 0 === (member % 2);
      })
      .all(function (array) {
        array.should.eql([2, 4]);
      });
    setTimeout( function () {
      pa.succeed(succeedArray);
    }, 1000);
  },

  'test filter when fn is invoked after succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa.succeed(succeedArray);
    pa
      .filter( function (member) {
        return 0 === (member % 2);
      })
      .all(function (array) {
        array.should.eql([2, 4]);
      });
  },

  'test map when fn is invoked before succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa
      .map( function (member) {
        return member * 2;
      })
      .all(function (array) {
        array.should.eql([2, 4, 6, 8]);
      });
    setTimeout( function () {
      pa.succeed(succeedArray);
    }, 1000);
  },

  'test map when fn is invoked after succeed event is triggered': function () {
    var pa = new ArrayPromise()
      , succeedArray = [1, 2, 3, 4];
    pa.succeed(succeedArray);
    pa
      .map( function (member) {
        return member * 2;
      })
      .all(function (array) {
        array.should.eql([2, 4, 6, 8]);
      });
  },

};
