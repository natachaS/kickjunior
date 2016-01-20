var readline = require('readline');
var parser = require('./lib/commands/parser');
var data = require('./lib/data/data');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('KickJunior> ');
data.init();
rl.prompt();

rl.on('line', function (line) {
  var result = parser(line);
  console.log(result, '\n');
  rl.prompt();
}).on('close', function () {
  console.log('Thanks for checking it out!');
  process.exit(0);
});
