// utils/helpers.js

export const numberToWords = (num) => {
    if (num === 0) return "zero";
  
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = [
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
      "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion"];
  
    const convertHundreds = (num) => {
      let result = "";
      if (num >= 100) {
        result += ones[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }
      if (num >= 10 && num < 20) {
        result += teens[num - 10] + " ";
        num = 0;
      } else if (num >= 20) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }
      if (num > 0) {
        result += ones[num] + " ";
      }
      return result.trim();
    };
  
    let result = "";
    let i = 0;
  
    while (num > 0) {
      if (num % 1000 !== 0) {
        result = convertHundreds(num % 1000) + " " + thousands[i] + " " + result;
      }
      num = Math.floor(num / 1000);
      i++;
    }
  
    return result.trim();
  };

  export const defaultCurrency = () => { 

        return 'Tk. ';
  };
  