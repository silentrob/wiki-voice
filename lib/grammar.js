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
}

// deepest node
function traverse_depth(tree,checker){
	return null;
	var queue = [],
		next = tree,
		elements = [];

		while(next){

			if(next.body){
				for( var k = 0; k < next.body.length ; k++){
					queue.push(next.body[k]);
				}
			}

			if( checker.indexOf(next.name) > -1 ){
				elements.push({ 
					node:next,
					level:lvl 
				});
			}

			next = queue.shift();
		}

		for( var i = 0 ; i < elements.length ; i++ ){

		}	
}

function Extract_Subject(tree){

	if( tree.name == 'S'){
		/* Declarative Sentence */
		var subtree;
		for(var j = 0; subtree = tree.body[j]; j++){
			if( subtree.name == 'NP'){
				//Noun Phrase
				var obj = traverse(subtree,tags.nouns);
					obj.parent = subtree;
				return obj;
			}
		}
	}
	return null;
}
function Extract_Attributes(tree){
	if( tree.name == 'S' || tree.name == 'SQ' ){
		var subtree;
		for(var j =0;subtree = tree.body[j]; j++){
			if(subtree.name == 'VP'){
				var obj = traverse_depth(subtree,tags.verbs);
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
          deepest_verb.parent = vp_subtree;
          delete deepest_verb.weight;
        }
        return deepest_verb;
			}
		}

	}
	return null;
}

function Deepest_Verb(tree){
  var this_nodes_weight = tags.verbs.length - tags.verbs.indexOf(tree.name);
  if(this_nodes_weight < tags.verbs.length){
    return {
      weight: this_nodes_weight,
      name: tree.name,
      body: tree.body
    };
  }

  if(tree.body instanceof Array) {
    return tree.body.map(Deepest_Verb).reduce(function(previous_verb, current_verb, index, array) {
      return current_verb != null && previous_verb !=null && current_verb.weight > previous_verb.weight ? current_verb : previous_verb;
    });
  }

  return null;
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

    	result.push({
    				Subject:Extract_Subject(sentence),
					Attributes:Extract_Attributes(sentence),
					Predicate:Extract_Predicate(sentence)
    	});
    }
	return result;
}

module.exports = Triplet_Extraction;