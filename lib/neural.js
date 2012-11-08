/* Neural Network .js */
var Parser = require('./tagger.js');
//var db = require('./db.js');
var ee = new (require('events').EventEmitter)();


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
			p.parse("Albert Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist who developed the general theory of relativity, effecting a revolution in physics. For this achievement, Einstein is often regarded as the father of modern physics and the most influential physicist of the 20th century. While best known for his mass–energy equivalence formula E = mc2 (which has been dubbed the world's most famous equation), he received the 1921 Nobel Prize in Physics for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect. The latter was pivotal in establishing quantum theory within physics.");
		});
		p.on('parsed',function(data){
			for( var i = 0; sentence = data[i] ; i++){
				if( hasPOS(sentence,'noun') ||  )
			}

			console.log("Total ",i," senetences parsed");
		});
	},

	encode:function(){

	},

	find:function(arr){

	}
};