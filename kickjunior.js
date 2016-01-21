var readline = require('readline');
var evaluate = require('./lib/commands/evaluate');
var data = require('./lib/data/data');
var rl = readline.createInterface(process.stdin, process.stdout);

data.init();

rl.setPrompt('KickJunior> ');
rl.prompt();

rl.on('line', function (line) {
  var result = evaluate(line);
  console.log(result, '\n');
  rl.prompt();
}).on('close', function () {
  console.log('Thanks for checking it out!');
  process.exit(0);
});
