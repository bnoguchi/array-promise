## array-promise - Act on asynchronously loaded arrays via forEach, map, etc without the usual, messy callback interface
====================================================================================

### Tutorial
    var array = new ArrayPromise();

    // Program what you want to do with the data when you finally receive it
    array.filter( function (member) {
      return 0 === (member % 2);
    }).map( function (member) {
      return member * 10;
    }).forEach( function (member, i) {
      console.log(i + ": " + member);
    });
    
    // Load the data into array after 1 second
    setTimeout( function () {
      array.succeed([1, 2, 3, 4, 5]);
    }, 1000);

    // After 1 second...prints to console:
    // => 0: 20
    // => 1: 40

The logic on the data also works if the data has already been loaded:
    var array = new ArrayPromise();

    // Load the data into array immediately
    array.succeed([1, 2, 3, 4, 5]);

    // Program what you want to do with the data
    array.filter( function (member) {
      return 0 === (member % 2);
    }).map( function (member) {
      return member * 10;
    }).forEach( function (member, i) {
      console.log(i + ": " + member);
    });
    
    // Immediately prints to console:
    // => 0: 20
    // => 1: 40

### Tests
To run tests:
    make test

# Contributors
- [Brian Noguchi](https://github.com/bnoguchi)

### License
MIT License

---
### Author
Brian Noguchi
