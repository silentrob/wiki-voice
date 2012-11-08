var childProcess = require('child_process'),
     ls,stdin ='',stdout ='';
 ls = childProcess.exec('./opennlp POSTagger en-pos-perceptron.bin', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
     console.log('Signal received: '+error.signal);
   }
   console.log('Child Process STDOUT: '+stdout);
   console.log('Child Process STDERR: '+stderr);
 });
 ls.stdin.write('Hello World.\n');
 ls.stdout.on('data',function(data){
  stdout += data.toString('utf8');
 });
 setInterval(function(){
  console.log(stdout);
 },500);
 
 ls.on('exit', function (code) {
   console.log('Child process exited with exit code '+code);
 });

