/* Penn tree .js */

module.exports = {
	// The word classes that helps the parser
	
	WordTags:{
	"CC" : {exp:"Coordinating conjunction",
			class:"conjunction"},
	"CD" : {exp:"Cardinal number",
			class:"number"},
	"DT" : {exp:"Determiner",
			class:"Determiner"},
	"EX" : {exp:"Existential there",
			class:"There"},
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
	},

	Phrase:{
		"ADJP" : {exp:"Adjective Phrase",
				 class:"Adjective"},

		"ADVP" : {exp:"Adverb Phrase.",
				 class:"Adjective"},

		"CONJP" :{exp:"Conjunction Phrase.",
				 class:"Conjunction"},
		
		"FRAG" : {exp:"Fragment.",
				 class:"Foriegn"},

		"INTJ" : {exp:"Interjection. Corresponds approximately to the part-of-speech tag UH.",
				 class:"Interjection"},

		"LST" : {exp:"List marker. Includes surrounding punctuation.",
				 class:"Punctuation"},
		"NAC" : {exp:"Not a Constituent; used to show the scope of certain prenominal modifiers within an NP.",
				class:"Foriegn"},
		"NP" : {exp:"Noun Phrase.",
				class:"Noun"},
		"NX" : {exp:"Used within certain complex NPs to mark the head of the NP. Corresponds very roughly to N-bar level but used quite differently.",
				class:"Noun"},
	
		"PP" : {exp:"Prepositional Phrase",
				class:"Preposition"},

		"PRN" : {exp:"Parenthetical",
				class:"Foriegn"},

		"PRT" : {exp:"Particle. Category for words that should be tagged RP.",
				class:"Foriegn"},

		"QP" : {exp:"Quantifier Phrase (i.e. complex measure/amount phrase); used within NP.",
				class:"Number"},
	
		"RRC" : {exp:"Reduced Relative Clause.",
				class:"Foriegn"},
	
		"UCP" : {exp:"Unlike Coordinated Phrase",
				class:"Foriegn"}, 
	
		"VP" : { exp:"Verb Phrase.",
				class:"Verb"},

		"WHADJP" : {exp:"Wh-adjective Phrase. Adjectival phrase containing a wh-adverb, as in how hot.",
				class:["Questioner","Adjective"]},

		"WHAVP" : {exp:"Wh-adverb Phrase. Introduces a clause with an NP gap. May be null (containing the 0 complementizer) or lexical, containing a wh-adverb such as how or why.",
				 class:["Questioner","adverb"]},

		"WHNP" : {exp:"Wh-noun Phrase. Introduces a clause with an NP gap. May be null (containing the 0 complementizer) or lexical, containing some wh-word, e.g. who, which book, whose daughter, none of which, or how many leopards.",
				class:["Noun","Questioner"]},

		"WHPP" : {exp:"Wh-prepositional Phrase. Prepositional phrase containing a wh-noun phrase (such as of which or by whose authority) that either introduces a PP gap or is contained by a WHNP.",
				class:["Questioner","Preposition"]},

		"X" : {exp:"Unknown, uncertain, or unbracketable. X is often used for bracketing typos and in bracketing the...the-constructions.",
				class:"Foriegn"}
	},
	Clause:{
		"S" : {exp:"simple declarative clause, i.e. one that is not introduced by a (possible empty) subordinating conjunction or a wh-word and that does not exhibit subject-verb inversion.",
			   class:"Sentence"},
		"SBAR" : {exp:"Clause introduced by a (possibly empty) subordinating conjunction.",
			   class:"Possiblity"},
		"SBARQ" : {exp:"Direct question introduced by a wh-word or a wh-phrase. Indirect questions and relative clauses should be bracketed as SBAR, not SBARQ.",
			   class:"Questioner"},
		"SINV" : {exp:"Inverted declarative sentence, i.e. one in which the subject follows the tensed verb or modal",
			   class:["Inverted","Sentence"]},
		"SQ" : {exp:"Inverted yes/no question, or main clause of a wh-question, following the wh-phrase in SBARQ.",
			   class:["Inverted","Quetion"]}
	}	
};