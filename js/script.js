function expressionBuilder(inputNumber) {
  var values = [1000, 500, 100, 50, 10, 5, 1];
  var symbols = ["M", "D", "C", "L", "Z", "V", "I"];
  var romanArray = [];
  values.forEach(function(value, index) {
    var remainder = inputNumber % value;
    var amount = (inputNumber - remainder) / value + symbols[index];
    romanArray.push(makeSubtraction(amount, index, values, symbols));
    // romanArray.push(((inputNumber - remainder) / value) + symbols[index]) ;
    inputNumber = remainder;
  })
  var finalArray = fixFives(romanArray);
  var displayArray = buildNumeral(finalArray, symbols);
  return displayArray;
}

function makeSubtraction(numberString, index, values, symbols) {
  if (parseInt(numberString) <= 3) {
    return numberString;
  }
  var number = parseInt(numberString) * values[index];
  var newString;
  newString = 1 + symbols[index-1];
  var difference = values[index-1] - number;
  newString = buildSubtractionString(difference) + ";" + newString;
  return newString
};

function buildSubtractionString(value) {
  if (value <= 1) {
    return "1I";
  } else if (value <= 2) {
    return "2I";
  } else if (value <= 10) {
    return "1Z";
  } else if (value <= 20) {
    return "2Z";
  } else if (value <= 100) {
    return "1C";
  } else if (value <= 200) {
    return "2C";
  }
};

function fixFives(romanArray) {
  var fivehundreds= parseInt(romanArray[1]);
  var fifties = parseInt(romanArray[3]);
  var fives = parseInt(romanArray[5]);
  if (fifties === 0 && fives === 0 && fivehundreds === 0) {
    return romanArray;
  }
  if (fivehundreds > 0 && romanArray[2].includes("D")){
    romanArray[1] = "0D";
    romanArray[2] = romanArray[2].replace("D", "M")
  }
  if (fifties > 0 && romanArray[4].includes("L")) {
    romanArray[3] = "0L";
    romanArray[4] = romanArray[4].replace("L", "C");
  }
  if (fives > 0 && romanArray[6].includes("V")) {
    romanArray[5] = "0V";
    romanArray[6] = romanArray[6].replace("V", "Z");
  }
  return romanArray;
};

function buildNumeral(inputArray, symbols) {
  var romanString = inputArray.join(";");
  var romanArray = romanString.split(";");
  romanString = "";
  romanArray.forEach(function(element) {
    symbols.forEach(function(symbol) {
      if (element.includes(symbol)) {
        for (i=0; i<parseInt(element); i++) {
          romanString = romanString + symbol;
        }
      }
    })
  });romanString = romanString.replace(/Z/g,"X")
  return romanString;
}


$(document).ready(function() {
    $("#numberInput").submit(function(event){
      event.preventDefault();
      var inputNumber = $("#number").val();
      $("#displayArea").text(expressionBuilder(inputNumber));
    });
});
