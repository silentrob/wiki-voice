var tags = {
	nouns : ['NN','NNP','NNPS','NNS'],
	verbs : ['VB','VBD','VBG','VBN','VBP','VBZ'],
	adjectives:['JJ','JJR','JJS']
};

function traverse(tree,checker){
	var queue = [],
		next = tree;
		while(next){
			if(next.body){
				for( var k = 0; k < next.body.length ; k++){
					queue.push(next.body[k]);
				}
			}
			if( checker.indexOf(next.name) > -1 ){
				return next;
			}
			next = queue.shift();
	}
	return null;
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

function Extract_Subject(tree){

	if( tree.name == 'S'){
		/* Declarative Sentence */
		var subtree;
		for(var j = 0; subtree = tree.body[j]; j++){
			if( subtree.name == 'NP'){
				//Noun Phrase
				var obj = traverse(subtree,tags.nouns);
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
				result = traverse(subtree,tags.nouns);
			}else if(subtree.name ==='ADJP'){
				result = traverse(subtree,tags.adjectives);
			}

			if( result ){
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
		obj.object = Extract_Object(obj.Predicate)

		result.push(obj);
	}
	return result;
}

module.exports = Triplet_Extraction;