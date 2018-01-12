const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

require('es6');

var domtoimage = require('dom-to-image');
var bodyParser = require('body-parser');

/////////////Tell Socket.io to accept connections
//var allClients = [];
io.on('connection', function(socket){
  //A new user has connected!
  //allClients.push(socket);
  var players = {};
  socket.on("id", function(id, char, char2, x, y, facingRight){
    players[`${id}`] = [char, char2, x, y, facingRight];  
    socket.emit("players", players);
  });
});




///////////////Start the server and post redirect
app.post('/*', (req, res) => {
  res.redirect('/');
});
app.get('/', (req, res) => {
	res.sendFile('/human2.html', { root: __dirname });
});
app.get('/clothes', (req, res) => {
	res.sendFile('/humanClothes.html', { root: __dirname });
});
//just use a different route
app.get("/world", function(req, res, next){
	res.sendFile('/world.html', { root: __dirname });
});

app.use(express.static((__dirname + '/static')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.post("/clothes", function(req, res){
	res.sendFile("/"+req.body.clothing, { root: __dirname });
});
app.post("/world", function(req, res){
	res.sendFile("/"+req.body.world, { root: __dirname });
});

//app listen to port
var port = process.env.PORT || 8081;
//If you're running locally, you can now open localhost:8080 in a web browser and see it running!
http.listen(port, function(){
  console.log('listening on *:8081');
});
