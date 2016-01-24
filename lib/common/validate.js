
// Implementing the Luhn-10 algorithm
function validate_card (cc) {
  var ccStr = cc;
  var len = ccStr.length;
  var multiplier = 0;
  // build an array that already contains the sum when multiplier=1
  var sumArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];
  var sum = 0;
  // credit card should be numeric and up to 19 numbers, luhn algorithm reverse the number, double every other number, sum every and check if the sum can be divided by 10
  while (len--) {
    sum += sumArr[multiplier][parseInt(ccStr.charAt(len), 10)];
    multiplier ^= 1;
  }
  return sum % 10 === 0 && sum > 0 && len < 20;
}

function validate_name (name) {
  return ((name.length < 21 && name.length > 3) && (name.match(/^[0-9A-Za-z-_]+$/) !== null));
}

// validates that amount strings are valid numbers >0 with 0-2 decimal digits
function validate_amount (amount_string) {
  var amount = Number(amount_string.replace(/,/g, ''));

  if (isNaN(amount)) {
    return false;
  }

  if (amount <= 0) {
    return false;
  }

  // this regex requires a number string without commas
  if (amount.toString().match(/^\d+(\.\d{1,2})?$/) === null) {
    return false;
  };

  return true;
}

module.exports = {
  validate_card: validate_card,
  validate_name: validate_name,
  validate_amount: validate_amount
};
