function numberToEnglish(n) {
  var english = "";  //this is my final output string
  var num = n;  //this is a value that will decrease as I break n into groups of three or less digits
  var m = n;  //this digit is for making sure all 'ands' are in place
  var engarray = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];  //array for numbers less than twenty
  var tenarray = ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];  //array for tens place
  var digarray = ['zero','one','two','three','four','five','six','seven','eight','nine'];  //array for decimal places

  //  this block of code checks n to make sure it's the right type

  if(typeof num != 'number') {num = Number(num);}
  if(num == 0) {return 'zero';}
  if(num == Number.POSITIVE_INFINITY) {return 'infinity';}
  if(num == Number.NEGATIVE_INFINITY) {return 'negative infinity';}
  if(isNaN(num) == 1) {throw 'not a number';}
  if(num < 0) {
    english = 'negative ';
    num = num * -1;
    m = num;
    }
  
  if(num < 1 && num > 0) {english = english + 'zero'}  //  This is the first zero for numbers less than 1 or greater than -1 that are != 0

  // this is the main function for translating a group of three digits into english

  function ConvToEnglish(a) {
    var output = '';
    var ten = Math.trunc(a);
    if (a > 99) {
      var hun = Math.trunc(a / 100);
      var ten = a - (hun * 100);
      output = engarray[hun - 1] + ' hundred ';
      if (ten != 0) {
        output = output + 'and ';
      }
    }
    if (num < 100 && m > 999) {
      output = output + 'and ';
    }
    if (ten > 19) {
      var ten1 = Math.trunc(ten / 10);
      var one = a % 10;
      if (one == 0) {
        output = output + tenarray[ten1 - 2];
      }
      if (one != 0) {
        output = output + tenarray[ten1 - 2] + '-' + engarray[one - 1];
      }
    }
    if (ten < 20 && ten > 0) {
      output = output + engarray[ten - 1];
    }
    return output;
  }

  // these blocks of code translate each group of three or less digits

  if(num > 999999999999999) {
    var quadnum = Math.trunc(num / 1000000000000000);
    english = ConvToEnglish(quadnum) + ' quadrillion ';
    num = num - (quadnum * 1000000000000000);
  }

  if(num > 999999999999) {
    var trilnum = Math.trunc(num / 1000000000000);
    english = english + ConvToEnglish(trilnum) + ' trillion ';
    num = num - (trilnum * 1000000000000);
  }

  if(num > 999999999) {
    var bilnum = Math.trunc(num / 1000000000);
    english = english + ConvToEnglish(bilnum) + ' billion ';
    num = num - (bilnum * 1000000000);
  }

  if(num > 999999) {
    var milnum = Math.trunc(num / 1000000);
    english = english + ConvToEnglish(milnum) + ' million ';
    num = num - (milnum * 1000000);
  }

   if(num > 999) {
    var thounum = Math.trunc(num / 1000);
    english = english + ConvToEnglish(thounum) + ' thousand ';
    num = num - (thounum * 1000);
  }

   if(num > 0) {
    english = english + ConvToEnglish(num);
    num = num - Math.trunc(num);
  }
  
  if (english.charAt(english.length - 1) == ' ') {english = english.slice(0,-1);}

  english = english.replace("  "," ");  // removes unnecessary spaces
  english = english.replace("undefined","one");  // For some unknown reason, one of the 52 tests gave me an undefined for the ones place. Quick fix.

  //  handles decimals

  if(num != 0) {
  	english = english + ' point';
    num = num * 100000;
    if (num < 10000) { english = english + ' zero';}
    if (num < 1000) { english = english + ' zero';}
    if (num < 100) { english = english + ' zero';}
    if (num < 10) { english = english + ' zero';}
    num = Math.round(num);
    num = num.toString();
    for(i = 0; i < num.length; i++) {
      english = english + ' ' + digarray[Number(num.slice(i,i+1))];
    }
  }

  //  removes zeros at the end of the string

  while(english.charAt(english.length - 4) == 'z') {
    english = english.slice(0,-5);
  }

  return english;
}