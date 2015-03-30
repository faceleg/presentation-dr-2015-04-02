// 1 Callback json file handling
fs.readFile("file.json", function(err, val) {
    if( err ) {
        console.error("unable to read file");
    }
    else {
        try {
            val = JSON.parse(val);
            console.log(val.success);
        }
        catch( e ) {
            console.error("invalid json in file");
        }
    }
});

// 2 Promise based json file handling
fs.readFileAsync("file.json").then(JSON.parse).then(function(val) {
    console.log(val.success);
})
// Typed errors - in this case SyntaxError
.catch(SyntaxError, function(e) {
    console.error("invalid json in file");
})
// Untyped but expected errors (common to promisified libraries - what they would pass as the 'err' first parameter
.error(function (e) {
    console.error("unable to read file, because: ", e.message);
});

// 3 Synchronous json file handling
try {
    var val = JSON.parse(fs.readFileSync("file.json"));
    console.log(val.success);
}
catch(Error e) {
    console.error("invalid json in file or unable to read file")
}

// Once the basic nature of Promises are understood, code is arguably as easy to understand as synchronous
// Notice how much harder to read the async code is compared to Promise code
// Promises (bluebird) allows finer control over error handling

// 4 - Bonus! bluebird predicate errors
function clientError(e) {
    return e.code >= 400 && e.code < 500;
}

request("http://www.google.com").then(function(contents){
    console.log(contents);
}).catch(clientError, function(e){
   //A client error like 400 Bad Request happened
});

// From https://github.com/petkaantonov/bluebird#error-handling
