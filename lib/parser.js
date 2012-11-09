var cp = require('child_process');
var EventEmitter = require('events').EventEmitter;
var penn = require("./penn.js");
var tokenize = require('./tokenizer.js');



function Parser(){
	if( !(this instanceof Parser) ){
		return new Parser();		
	}
	var self = this;
	var events = new EventEmitter();
	var child =  cp.exec('./../opennlp/bin/opennlp Parser ./../opennlp/bin/en-parser-chunking.bin');
	child.on('exit',function(Error){
		console.log("Child Parser Exit with code",Error);
		events.emit("Error",Error);
	});

	child.stdin.write("This is a Testing String \n");
	child.stdout.once('data',function(data){
		//console.log("Ready to process",data.toString('ascii'));
		child.stdout.on('data',function(data){
			var str = data.toString('utf8');
			events.emit('parsed',tokenize(str));
		});
		events.emit('ready');
	});
	
	this.on = function(key,fn){
		events.on(key,fn);
	}

	this.parse = function(str){
			str = str.replace(/\./gi,' .');
			child.stdin.write(str+'\n');
	}
}

module.exports = Parser;