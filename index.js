var basicInstincts = require('./instincts/basic.js'),
express = require('express'),
app = express(),
http = require('http'),
nn = require('./lib/neural.js'),
,
server = http.createServer(app),
io = require('socket.io'),
organs = {
	reader:require('./organs/reader.js'),
	speaker:require('./organs/speaker.js'),
	db:require('./organs/db.js')
},
methods = organs.db.connect(function(){
	init();
}),
io= io.listen(app);

app.listen(3000);

