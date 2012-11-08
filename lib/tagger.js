var cp = require('child_process');

var ee = new (require('events').EventEmitter)();

var tags = {
	"CC" : "Coordinating conjunction",
	"CD" : "Cardinal number",
	"DT" : "Determiner",
	"EX" : "Existential there",
	"FW" : "Foreign word",
	"IN" : "Preposition or subordinating conjunction",
	"JJ" : "Adjective",
	"JJR" : "Adjective, comparative",
	"JJS" : "Adjective, superlative",
	"LS" : "List item marker",
	"MD" : "Modal",
	"NN" : "Noun, singular or mass",
	"NNS" : "Noun, plural",
	"NNP" : "Proper noun, singular",
	"NNPS" : "Proper noun, plural",
	"PDT" : "Predeterminer",
	"POS" : "Possessive ending",
	"PRP" : "Personal pronoun",
	"PRP$" : "Possessive pronoun (prolog version PRP-S)",
	"RB" : "Adverb",
	"RBR" : "Adverb, comparative",
	"RBS" : "Adverb, superlative",
	"RP" : "Particle",
	"SYM" : "Symbol",
	"TO" : "to",
	"UH" : "Interjection",
	"VB" : "Verb, base form",
	"VBD" : "Verb, past tense",
	"VBG" : "Verb, gerund or present participle",
	"VBN" : "Verb, past participle",
	"VBP" : "Verb, non-3rd person singular present",
	"VBZ" : "Verb, 3rd person singular present",
	"WDT" : "Wh-determiner",
	"WP" : "Wh-pronoun",
	"WP$" : "Possessive wh-pronoun (prolog version WP-S)",
	"WRB" : "Wh-adverb",
};

function Tuple(str){
	var pair = str.split("_");
	return ({
		word:pair[0],
		symbol:tags[pair[1]]
	});
}

var child = cp.exec('./../opennlp/bin/opennlp POSTagger ./../opennlp/bin/en-pos-perceptron.bin');
child.stdin.write('Testing Message \n');
child.stdout.once('data',function(){
	child.stdout.on('data',function(str){
		str = str.toString('utf8');
		var sentences = str.split('._.'),
		assoc = [];
		sentences = sentences.filter(function(value){
			return (value != '\n' && value !='' && value != ' ');
		});
		if( sentences.length < 1){
			return;
		}
		for( var j = 0; j < sentences.length ; j++ ){
			words = sentences[j].split(' ');
			words = words.filter(function(value){
				return (value != '\n' && value !='' && value != ' ');
			});
			assoc[j]= [];
			for( var i = 0 ; i < words.length ; i++ ){
			assoc[j].push(new Tuple(words[i]));
			}
		}
		ee.emit('parsed',assoc);
	});
	ee.emit('ready');
});
child.on('exit',function(str){
	console.log("Exit:",str);
});

ee.parse = function(str){
	str = str.replace(/\./gi,' .');
	console.log(child.stdin.write(str +'\n'));
};
// The lambda model for 1st class objects ^^
module.exports = ee;