var tags = {
	nouns : ['NN','NNP','NNPS','NNS'],
	verbs : ['VB','VBD','VBG','VBN','VBP','VBZ'],
	adjectives:['JJ','JJR','JJS'],
	prepositions : ['IN','PP','WHPP']
};

function _is(word,_class){
	return !!(tags[_class].indexOf(word.name) > -1)
}

function FetchAttributes(attributes){
	return attributes.map(function(attribute){
		if(!(attribute.body instanceof String)){
			return (attribute.body);
		}
		if( _is(attribute,'adjectives') || _is(attribute,'nouns')){
			return attribute.body;
		}else{
			return false;
		}
	}).filter(function(word){
		return word;
	});
}
function Neuralizer(trees){
	var obj = {};
	// This has been removed i am writing a C++ module to wrap this and do the stuff blazing fast!
    return obj;
}

module.exports = Neuralizer;