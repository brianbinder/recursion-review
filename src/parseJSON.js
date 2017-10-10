// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var curChar = json[0];

  var parseObject = function() {
    nextCharacter();
    var obj = {};
    var parsePairs = function() {
      var colonPosition = json.indexOf(':');
      var key = json.slice(0, colonPosition);
      json = json.slice(colonPosition + 1);
      var value = parseValue();
      obj[key] = value;
      while (curChar === ',') {
        parsePairs();
      }
    };
    if (curChar === '}') {
      nextCharacter();
      return obj;
    }
    parsePairs();
    if (curChar === '}') {
      nextCharacter();
    }
    return obj;
  };

  var parseArray = function() {
    nextCharacter();
    var arr = [];
    if (curChar === ']') {
      nextCharacter();
      return arr;
    }
    arr.push(parseValue());
    while (curChar === ',') {
      nextCharacter();
      arr.push(parseValue());
    }
    if (curChar === ']') {
      nextCharacter();
    }
    return arr;
  };

  var parseValue = function() {
    //string
    if (curChar === '"') {
      nextCharacter();
      var string = '';
      while (curChar !== '"' && string[string.length - 1] !== '\\') {
        string += curChar;
        nextCharacter();
      }
      nextCharacter();
      return string;
    }
    //true
    if (json.slice(0, 4) === 'true') {
      json = json.slice(3);
      nextCharacter();
      return true;
    }
    //false
    if (json.slice(0, 5) === 'false') {
      json = json.slice(4);
      nextCharacter();
      return false;
    }
    //null
    if (json.slice(0, 4) === 'null') {
      json = json.slice(3);
      nextCharacter();
      return null;
    }
    //object
    if (curChar === '{') {
      return parseObject();
    }
    //array
    if (curChar === '[') {
      return parseArray();
    }
    //number
    var numCharacters = 0;
    while (curChar === '.' || curChar === '-' || !isNaN(curChar)) {
      numCharacters++;
      curChar = json[numCharacters];
    }
    var num = +json.slice(0, numCharacters);
    json = json.slice(numCharacters);
    curChar = json[0];
    return num;
  };

  var nextCharacter = function() {
    json = json.slice(1);
    curChar = json[0];
  };

  if (curChar === '{') {
    return parseObject();
  }
  if (curChar === '[') {
    return parseArray();
  }
  //determine what type of data we have by looking for { or [
  //array or object
  //run an arrayparse or objectparse function

  //arrayparse function
  //looking for a ]
  //parseValue when the bracket is not closed

  //objectparse function
  //parseValue when the bracket is not closed

};


// object
//     {}
//     { members }
// members
//     pair
//     pair , members
// pair
//     string : value
// array
//     []
//     [ elements ]
// elements
//     value
//     value , elements
// value
//     string
//     number
//     object
//     array
//     true
//     false
//     null



