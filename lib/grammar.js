/*Not ENGLISH Grammer Rules .js */
/* THIS IS NOT ENGLISH Syntax SO DONT DETAIN ME FOR IMPROPER Syntax */
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
        var result = deepest_verb(vp_subtree);
        if(result)result.parent = vp_subtree;
        return result;
        //console.log(JSON.stringify(vp_subtree));
        //console.log(result);
			}
		}

	}
	return null;
}

var verb_weights = {
  "VB": 6,
  "VBD":5,
  "VBG":4,
  "VBN":3,
  "VBP":2,
  "VBZ":1,
}

function is_verb(name) {
//  console.log("is verb called on: " + name);
  return verb_weights.hasOwnProperty(name);
}
// Imdad's Code ;D
function deepest_verb(tree){
  var maxI = 0;
  var maxW = -1;
  var value;

  if(is_verb(tree.name)){
//    console.log("found a verb: " + tree.body);
    value = tree.body;
    maxW = verb_weights[tree.name];

    return {
      "weight" : maxW,
      "value" : value
    };
  }

  var sub_verbs = [];
  if(tree.body instanceof Array) {
    var children = tree.body;
    for(var i = 0; i < children.length; ++i) {
      sub_verbs.push(deepest_verb(children[i]));
    }

//    console.log(JSON.stringify(sub_verbs));
    for(var i = 0; i < sub_verbs.length; ++i) {
      var sub_verb = sub_verbs[i];
      
      console.log("next potential " + sub_verb.weight + " " + sub_verb.value);
      
      if(sub_verb.weight > maxW) {
        console.log("next verb " + sub_verb.weight + " " + sub_verb.value);
        maxW = sub_verb.weight;
        maxI = i;
        value = sub_verb.value;
      }
    }
  }

  return {
    "weight" : maxW,
    "value" : value
  };
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
