#API - DOC and explanation of possibility of a multilingual parser

This document is draft specification and it is subject to change in implementation.

##API-DOC
There is no self explanation in code so far since I thought it'd be better to write it here
at once so that it makes more sense as a whole..

The parser takes human language sentences like
 > Albert Einstien was  German Born American Scientist who is known for his contribution for
 Physics and Quantum Mechanics. He got the Nobel Prize in Physics for the PhotoElectric Theory  which later acted as a base to Quantum Mechanics.

The parser takes the Above Paragraph and marks it as per PENN TAGS telling each word and phrases location as well as usage in a sentence.The it makes a Json out of it as per the
Audibi research work// [ Read it for more i dont wanna really explain these basics]

Then is when the actual parsing begins we take this JSON and with the SPO triplet we extract a tree out of the Article such as 

'NOTE THAT THE REL object member specifies the relation of parent with member
in the default its taken as 'is' 



The parse tree is grammer free hence we can just translate it in 1 go
just replace the linguistics and relate the grammatical helper ( the rel object)
as in the other language ;-) Using english is quite helpful for Eng -> * transformation  as
english is known to have the most derived syntax ever and hence the language itself is too feeble all complex language can derive words from english .. we re just inventing a multilingual translator , nothing big ;-).

###Todo
    * Add a sleep mode that parses and check inter-dependent trees and does exhaustive processing of existing trees to make the connections very prominent
    * Add Support for Database using Redis Volatile Objects.
    * Add an API 

##Example Parse 
<code>

    'Albert Einstien' : { 
        'Scientist':{ 
        },
	
	   'German Born':{
	   },
        'American':{
        },

        'Known':{
 	  	'Contribution':{
 			'Physics': {
 				rel:'in'
 			},
 			'Quantum Mechanics':{
 				rel:'in'
 			},
 			rel:'for'
    	}
	},
    'Nobel Prize':{
    	'for':{
    		// Should not do , this just should have PE T , and the PET article gets the baseTo QuantumMechanics.
    		'PhotoElectric Theory':{
    				'Quantum Mechanics':{
    					rel:'base to'

    				}
     		}
    	}
    },
}
</code>

This model helps when traversing the article.
you can basically query for Eienstien like

What are albert einstien known for ?

it converts the question t 

 Albert Einstein : {
   'Known':{
   		/* Fetch All here*/
	}
 }
So it then traverses tree like

AE -> Known -> 'Contributions!'

so it forms relation as 

Contributions in[Fetched] Quantum Physics and[Auto Generated] PhotoElectric theory
