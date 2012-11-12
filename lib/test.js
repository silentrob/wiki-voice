var Parser = require('./parser.js');
var Triplet_Extraction = require('./grammar.js');
var Neuralize = require('./neural.js');
console.log("Initializing Module \n Cli takes a while to load .. \n ANY JAVA-PERSON HALP WOULD BE NAICE!! \n We give cookies to who make RPC services");

var n = new Parser();

n.on('ready',function(){
	console.log("\rAnd it loaded , now lets give it a sentence");
	n.on('parsed',function(data){
    	var triplets  = (Triplet_Extraction(data));
    	var nn = Neuralize(triplets);
    	console.log(JSON.stringify(nn));
	});
	n.parse(STR);
});
//STR = "cute abhishek and hot imdad are coders";
//STR = "Wikipedia is a great website";
//STR = "Abhishek is current lead developer of W/iki-Voice";
//STR = "Tomasz works for wikipedia"
STR  = "A rare black squirrel and red cat has become a regular visitor to a suburban garden";
//STR = "";
//STR = "Anup is a civil engineer";