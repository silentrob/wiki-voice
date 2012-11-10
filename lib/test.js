var Parser = require('./parser.js');
var Triplet_Extraction = require('./grammar.js');

console.log("Initializing Module \n Cli takes a while to load");
var n = new Parser();
n.on('ready',function(){
	console.log("\rAnd it loaded , now lets give it a sentence");
	n.on('parsed',function(data){
		console.dir(Triplet_Extraction(data));
	});
	n.parse(STR);
});

STR  = "";