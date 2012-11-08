var cp = require('child_process');


var tags = {
	"CC" : {exp:"Coordinating conjunction",
			class:"conjunction"},
	"CD" : {exp:"Cardinal number",
			class:"number"},
	"DT" : {exp:"Determiner",
			class:"Determiner"},
	"EX" : {exp:"Existential there",
			class:'there'},
	"FW" : {exp:"Foreign word",
			class:'Foriegn'},
	"IN" : {exp:"Preposition or subordinating conjunction",
			class:["Preposition","conjunction"]},
	"JJ" : {exp:"Adjective",
			class:"Adjective"},
	"JJR" : {exp:"Adjective, comparative",
			class:"Adjective"},
	"JJS" : {exp:"Adjective, superlative",
			class:"Adjective"},
	"LS" : { exp:"List item marker",
			class:["item","foriegn"]},
	"MD" : { exp:"Modal",
			class:"verb"},
	"NN" : {exp:"Noun, singular or mass",
			class:"Noun"},
	"NNS" : {exp:"Noun, plural",
			class:"Noun"},
	"NNP" : {exp:"Proper noun, singular",
			class:"Noun"},
	"NNPS" : {exp:"Proper noun, plural",
			class:"Noun"},
	"PDT" : {exp:"Predeterminer",
			class:"Determiner"},
	"POS" : {exp:"Possessive ending",
			class:"End"},
	"PRP" : {exp:"Personal pronoun",
			class:'Pronoun'},
	"PRP$" :{exp:"Possessive pronoun (prolog version PRP-S)",
			class:'Pronoun'},
	"RB" : {exp:"Adverb",
			class:'Adverb'},
	"RBR" : {exp:"Adverb, comparative",
			class:"Adverb"},
	"RBS" : {exp:"Adverb, superlative",
			class:"Adverb"},
	"RP" : {exp:"Particle",
			class:"Foriegn"},
	"SYM" : {exp:"Symbol",
			class:'Foriegn'},
	"TO" : {exp:"to",
			class:"To"},
	"UH" : {exp:"Interjection",
			class:"Interjection"},
	"VB" : {exp:"Verb, base form",
			class:'Verb'},
	"VBD" : {exp:"Verb, past tense",
			class:'Verb'},
	"VBG" : {exp:"Verb, gerund or present participle",
			class:'Verb'},
	"VBN" : {exp:"Verb, past participle",
			class:'Verb'},
	"VBP" : {exp:"Verb, non-3rd person singular present",
			class:'Verb'},
	"VBZ" : {exp:"Verb, 3rd person singular present",
			class:'Verb'},
	"WDT" : {exp:"Wh-determiner",
			class:["Determiner","Questioner"]},
	"WP" : {exp:"Wh-pronoun",
			class:["Pronoun","Questioner"]},
	"WP$" : {exp:"Possessive wh-pronoun (prolog version WP-S)",
			class:["Pronoun","Questioner"]},
	"WRB" : {exp:"Wh-adverb",
			class:["Adverb","Questioner"]},
};

function Tuple(str){
	var pair = str.split("_");
	return ({
		word:pair[0],
		symbol:tags[pair[1]]
	});
}

function Parser(){
	var ee = new (require('events').EventEmitter)();
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
	
	this.on = function(key,fn){
		ee.on(key,fn);
	}
	
	this.parse = function(str){
		str = str.replace(/\./gi,' .');
		child.stdin.write(str +'\n');
	};
}

module.exports = Parser;