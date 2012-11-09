/*Not ENGLISH Grammer Rules .js */
/* THIS IS NOT ENGLISH GRAMMER SO DONT DETAIN ME FOR IMPROPER GRAMMER */
var parser = require('./parser.js')
module.exports = {

};

function Extract_Subject(){

}

function Extract_Attributes(){

}

function Extract_Predicate(){

}
function Triplet_Extraction(sentence){

	var result =  null; // Failure
    result = {Subject:Extract_Subject(sentence),
    		  Attributes:Extract_Attributes(sentence),
    		  Predicate:Extract_Pridicates(sentence)
    		};

	return result;
}
