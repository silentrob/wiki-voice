var Parser = require('./parser.js');
var Triplet_Extraction = require('./grammar.js');
var Neuralize = require('./neural.js');
console.log("Initializing Module \n Cli takes a while to load");
var n = new Parser();
n.on('ready',function(){
	console.log("\rAnd it loaded , now lets give it a sentence");
	n.on('parsed',function(data){
    	var triplets  = (Triplet_Extraction(data));
    	var nn = Neuralize(triplets);
    	console.dir(nn);
	});
	n.parse(STR);
});
STR = "Wikipedia is a great website";
//STR = "Abhishek is a programmer";
//STR  = "A rare black squirrel and red cat has become a regular visitor to a suburban garden";
