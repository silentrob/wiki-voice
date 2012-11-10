var Parser = require('./parser.js');
var Triplet_Extraction = require('./grammar.js');

console.log("Initializing Module \n Cli takes a while to load");
var n = new Parser();
n.on('ready',function(){
	console.log("\rAnd it loaded , now lets give it a sentence");
	n.on('parsed',function(data){
		console.log(JSON.stringify(Triplet_Extraction(data)));
	});
	n.parse(STR);
});

STR  = "A rare black squirrel has become a regular visitor to a suburban garden";
