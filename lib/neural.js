/* Neural Network .js */
var Parser = require('./tagger.js');
//var db = require('./db.js');
var ee = new (require('events').EventEmitter)();

function getWord( sentence , text){
	for(var j = 0; word = sentence[j] ; j++){
		if( word.text === text){
			return word;
		}
	}
	return null;
}

function normalize_words(words){
	//Forms sets of nouns and pronouns. if conjugation is b/w..
	var word,_last = words.shift();
	var sentence = [_last];
	for(var i = 0; word = words[i];i++){

		if( word.symbol === undefined || _last.symbol.class === word.symbol.class ){
			_last.text +=  ' '+word.text;
		}else{
			sentence.push(word);
			_last = word;
		}
	}
	return sentence;
}

function normalize_sentence(sentence){
	/* Splits a sentence into subject , action , predicate */
	// Since AFAIK wikipedia is written in 3rd person.
	// So lets just use 3rd person.
	var sentence_parts = {
		subject:[],
		predicate:[],
		action:[]
	};
	chunk_grammer(normalize_words(sentence));
}
function getPOS( sentence , POS ){
	var words = [];
	for(var j = 0; word = sentence[j] ; j++){
		if( word.symbol.class === 'POS'){
			return word;
		}
	}
	return words;
}

module.exports = {	
	parser:function(str){
		var p = new Parser();
		p.on('ready',function(){
			console.log("I am ready");
			p.parse("Albert Einstein was a German-born theoretical physicist who developed the general theory of relativity, effecting a revolution in physics. For this achievement, Einstein is often regarded as the father of modern physics and the most influential physicist of the 20th century. While best known for his mass–energy equivalence formula E = mc2 (which has been dubbed the world's most famous equation), he received the 1921 Nobel Prize in Physics for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect. The latter was pivotal in establishing quantum theory within physics.");
		});
		p.on('parsed',function(data){
			var article = {};
			var sentence = [];

			for( var i = 0; sentence = data[i] ; i++){
				sentence = normalize_sentence(sentence);
				if(i == 0)console.dir(sentence);
				var subject = getPOS(sentence,"Noun") || getPOS(sentence,"Pronoun");
				if( subject === null){
					continue;
				}else{
					if( article[subject] == undefined ){
						article[subject] = {};
					}else{
						objective =''; 
					}
				}
			}
			console.log("Total ",i," senetences parsed");
		});
	},

	encode:function(){

	},

	find:function(arr){

	}
};