/* db.js */
var mongo =require('mongodb'),
Db = mongo.Db,
Connection = mongo.Connection,
Server = mongo.Server,
host = '127.0.0.1',
port = Connection.DEFAULT_PORT;

module.exports = function init(callback){
	console.log("Attempting to connect to database server \n");

	var db = new Db("wiki-voice",new Server(host,port,{}),{
		native_parser:true
	});
	var collections = {};
	db.open(function(err,db){
		db.collection('articles',function(err,collection){
			console.log("Connection to server has been created");
			collections.articles = collection;
		});
	});

};