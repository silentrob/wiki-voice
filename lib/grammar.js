var Orphanize = require('./tokenizer.js').Orphanizer;

var tags = {
	nouns : ['NN','NNP','NNPS','NNS'],
	verbs : ['VB','VBD','VBG','VBN','VBP','VBZ'],
	adjectives:['JJ','JJR','JJS']
};

function _is(word,_class){
	return !!(tags[_class].indexOf(word.name) > -1)
}

function traverse(tree,checker){
	var queue = [],
		next = tree,
		result = [];
		while(next){
			if(next.body){
				for( var k = 0; k < next.body.length ; k++){
					queue.push(next.body[k]);
				}
			}
			if( checker.indexOf(next.name) > -1 ){
				result.push(next);
			}
			next = queue.shift();
	}
	return result;
}

function Deepest_Verb(tree){

	var this_nodes_weight = tags.verbs.length - tags.verbs.indexOf(tree.name);
	if(this_nodes_weight < tags.verbs.length){
		return {
			weight : this_nodes_weight,
			name : tree.name,
			body : tree.body,
			parent : tree.parent
		}
	}

	if(tree.body instanceof Array) {

		return (tree.body.map(Deepest_Verb)).
		reduce(
			function(previous_verb, current_verb, index, array) {
				return current_verb != null && previous_verb !=null && current_verb.weight > previous_verb.weight ? current_verb : previous_verb;
			}
		);

	}
	return null;
}

function Extract_Attributes(words){
	if(!(words instanceof Array)) {
		words = [words];
	}
	words.map(function(word){
		var parent = word.parent;
		word.attributes = [];
		if( _is(word,'adjectives') ){
			for( var i = 0; i <  parent.body.length ; i++ ){
				if( parent.body[i].name === 'RB'){
					word.attributes.push(parent.body[i]);
				}
			}
		}else if( _is(word,'nouns') ) {
			for( var i = 0 ; i < parent.body.length ; i++ ){
				var nattrs = ['DT', 'PRP$', 'POS', 'JJ', 
	'CD', 'ADJP', 'QP', 'NP'];
				if( nattrs.indexOf(parent.body[i].name) > -1 ){
					word.attributes.push(parent.body[i]);
				}
			}
		}else if( _is(word,'verbs') ){
			for( var i = 0; i <  parent.body.length ; i++ ){
				if( parent.body[i].name ==='ADVP'){
					word.attributes.push(parent.body[i]);
				}
			}
		}
		var parent = word.parent;
		uncles = parent.parent.body;

		if( _is(word,'nouns') || _is(word,'adjectives') ){
			for( var i = 0 ; i < uncles.length ; i++){
				if( uncles[i] != parent){ // Well thats just sounding wrong x_x To begin with!
					var uncle = uncles[i];
					if( uncle.name == 'PP'){
						word.attributes.push(uncle);
					}
				}
			}
		}else if( _is(word,'verbs') ){
			for( var i = 0; i < uncles.length ; i ++){
				if( uncles[i] != parent){
					if( _is(uncles[i],'verbs') ){
						word.attributes.push(uncles[i]);
					}
				}
			}
		}
	});
}

function Extract_Subject(tree){

	if( tree.name == 'S'){
		/* Declarative Sentence */
		var subtree;
		for(var j = 0; subtree = tree.body[j]; j++){
			if( subtree.name == 'NP'){
				//Noun Phrase
				var obj = traverse(subtree,tags.nouns);
				Extract_Attributes(obj);
				return obj;
			}
		}
	}
	return null;
}


function Extract_Predicate(tree){
	if( tree.name == 'S' || tree.name == 'SQ' ){
		var subtree; 
		var vp_subtree;
		for(var j =0;subtree = tree.body[j]; j++){
			if(subtree.name == 'VP'){
				var vp_subtree = subtree;
				var deepest_verb = Deepest_Verb(vp_subtree);
				if(deepest_verb){
					Extract_Attributes(deepest_verb);
					delete deepest_verb.weight;
				}
				return deepest_verb;
			}
		}

	}
	return null;
}

function Extract_Object(tree){
	var result = null;
	var vp_subtree = tree;
	while( !tree || tree.name != 'VP' ){
		tree = tree.parent;
	}
	var siblings = [];

	for( var j = 0; j < tree.body.length ; j++ ){
		if( tree.body[j].name == 'PP' || tree.body[j].name == 'ADJP' || tree.body[j].name == 'NP' ){
			var subtree = tree.body[j];
			if( subtree.name === 'NP' || subtree.name === 'PP'){
				// All Nouns
				result = traverse(subtree,tags.nouns);
			}else if(subtree.name ==='ADJP'){
				// All Adjectives
				result = traverse(subtree,tags.adjectives);
			}

			if( result ){
				Extract_Attributes(result);
				return result;
			}

		}
	}

	return result;
}

function Triplet_Extraction(tree){

	var result =  []; // Failure

	if( tree.name == 'TOP'){
		sentences = tree.body;
	}else{
		return result;
	}

	var sentence;
	
	for(var i = 0; sentence = sentences[i] ; i++){
		var obj = {
					Subject:Extract_Subject(sentence),
					Predicate:Extract_Predicate(sentence),
		};
		obj.Object = Extract_Object(obj.Predicate)
		Orphanize(obj.Subject);
		Orphanize(obj.Predicate);
		Orphanize(obj.Object);
		result.push(obj);
	}
	return result;
}

module.exports = Triplet_Extraction;