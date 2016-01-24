function amount (num) {
  num = num.toLocaleString('en-US', {minimumFractionDigits: 2});
  num = num.replace(/\.00$/, '');
  return num;
}

module.exports = {
  amount: amount
};
