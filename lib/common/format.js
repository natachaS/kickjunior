function format_number (num) {
  if (typeof (num) === 'string') {
    num = Number(num);
  }
  num = num.toLocaleString('en-US', {minimumFractionDigits: 2});
  num = num.replace(/\.00$/, '');
  return num;
}

module.exports = format_number;
