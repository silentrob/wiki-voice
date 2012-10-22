 var http = require('http'), // Required to make http requests;
 url = require('url'),
 
 options = url.parse('http://en.wikipedia.org/w/api.php?format=json&action=mobileview&page=nile');
 options.headers = {'User-Agent':"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1"};
 var data ='';
 httpR = http.get(options,function(res){
  console.log("Got Responce");
  res.on('data',function(chunk){
    data += chunk.toString('utf8');
  });
  res.on('end',function(chunk){
    if( chunk )
    data+= chunk.toString('utf8');
    data=  JSON.parse(data);
    console.dir(data); 
  });
 });

 httpR.on('error',function(e){
 console.dir(e);
 });
