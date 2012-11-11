var tags = {
	nouns : ['NN','NNP','NNPS','NNS'],
	verbs : ['VB','VBD','VBG','VBN','VBP','VBZ'],
	adjectives:['JJ','JJR','JJS']
};

function _is(word,_class){
	return !!(tags[_class].indexOf(word.name) > -1)
}

function FetchAttributes(attributes){
	return attributes.map(function(attribute){
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

	trees.forEach(function(tree){
    	tree.Subject.forEach(function(Subject){
			obj[Subject.body] = {};
			obj[Subject.body].attributes = FetchAttributes(Subject.attributes);
			if( tree.Predicate ){
				obj[Subject.body][tree.Predicate.body] = {};
				tree.Object.forEach(function(Object){
					console.log(Object);
					if(Object.name == 'PP' || _is(Object,'nouns')){ // TODO: Replace with prepositional classes;
						obj[Subject.body][Object.body] = {};
						obj[Subject.body][Object.body] = FetchAttributes(Object.attributes);
					}else{
						obj[Subject.body][tree.Predicate.body][Object.body] = {};
						obj[Subject.body][tree.Predicate.body][Object.body].attributes = FetchAttributes(Object.attributes);
					}
				});
			}
        });
    });

    return obj;
}

module.exports = Neuralizer;