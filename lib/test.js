var p = require('./tagger.js');

process.stdout.write("Beginning");

p.on('ready',function(){
	process.stdout.write("Now parsing..\n")
	p.parse("Gucci generated circa € 4.2 billion in revenue worldwide in 2008 according to BusinessWeek magazine and climbed to 41st position in the magazine's annual 2009 \"Top Global 100 Brands\" chart created by Interbrand.");
});

p.on('parsed',function(e){
	console.dir(e);
});


