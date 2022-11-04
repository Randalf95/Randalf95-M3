

/* process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      var cmd = data.toString().trim(); // remueve la nueva línea
      process.stdout.write('You typed: ' + cmd);
      process.stdout.write('\nprompt > ');
    });
 */

    const commands = require('./commands');

 /*    // Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      var cmd = data.toString().trim(); // remueve la nueva línea
      if(cmd === 'date') {
        process.stdout.write(Date());  
      }
      if(cmd === 'pwd') {
        process.stdout.write(process.cwd());
      }
      process.stdout.write('\nprompt > ');
    }); */
    function done(output){
        process.stdout.write(output);
        process.stdout.write('\nprompt >')
    }

    process.stdout.write('prompt > ');
    process.stdin.on('data', function (data) {
    var palabra= data.toString().trim().split(' ')
    var arg= palabra.filter((palabra, index)=>index>0)
    var cmd = palabra[0]
    if (commands.hasOwnProperty(cmd)) {
        commands[cmd](arg.join(' '), done)
    }
    else process.stdout.write(`El comando ${cmd} no existe.`);
    })