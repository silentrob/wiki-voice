// Despite the last commit was about a month ago the development for this is not dead , i personally am working on this 
// but due to work projects and college am being over-loaded.. Work shall go back in gears after December / Jan [middle ]
This module aims to artificially parse out information from wikipedia articles and convert them into efficent trees which are actually javascript objects which can be stored in a key value store as MongoDB or Redis, then when a user asks his question or submits his query this tree can be traversed based on his query in order to deliver content on demand.

The module also encorporates an Out-of-the-Box support for Speech to Text and Text to Speech engines.

The user cases are 
  
  * Blind People can use this to efficiently query wiki and gain knowledge
  * The Speech To Text can be used to allow blind people to help
  * This will wiki more helpful in general


This module was worked up-on during the Wiki DevCamp in Bangalore 2012 

#Working & API

To read more about api read the API-DOC
#Credits

I begin with my credits because i am highly indebt'd to the apache open nlp project people \o/, them is the reason i am getting this done so fast after getting an HDD Crash :'( 

you can find more about the project @
  http://opennlp.apache.org/
it worths playing with !

Oh by the way you will have to visit the nlp site anyways in order to download the 
   en-parser-chunking.bin 
and place it inside the /opennlp/bin folder :D
or it wont ever work.

The module for english is based on the research work presented here : 
http://ailab.ijs.si/delia_rusu/Papers/is_2007.pdf

The penn-tree-bank tags were aqquired from 
http://bulba.sdsu.edu/jeanette/thesis/PennTags.html
and they made our life easier.

Thanks to Zirak for his rare help.
Thanks to Amir for his input 

##How it works ?

The same way our brain does!
It has neurons which parse a whole wikipedia document and get / fetch output from it
its IQ & Responces are equivalent to what a really dumb person will say so far but it will increase.

#SO HOW DOES IT WORKS ?

okay now lets get to code part.

It mantains a neural network . So what ?
A neural network is just as our brain is a collection of neurons , our brain is pretty complex
but its best use is for pattern matching [ where it is really unbeatable ]. So whats the cool thing ? 
This module is supposed to replicate our brain , atleast when it reads. ;D.

For example when it reads

    > Albert einstien was born on dd-mm-yyyy. He has nobel prize for his work in physics.He was a male.

it converts it to
   > 'Albert Eisntien':{
        'born':['dd-mm-yyyy'],
        'nobel prize':{
              'for':'Physics'
         },
        'male':true, // Since its a symbol only
      };


In this way it populates the model for information with each sentence thus making the information base richer and polulated with more information.

Fetchin information is the same way as asking but while fetching the last node is fetched . the tree traversal is somewhat the same.


##Current Contributers
This project as done during a wikipedia hackathon Bangalore 2012
 * Sneha - Language Helper & Dev
 * Imdad - Dev & Algos
 * Abhishek - APS ( Lead Developer )
