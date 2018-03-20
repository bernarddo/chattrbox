var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = "";

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");
  socket.send("*** Topic is '" + topic + "'");

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    var x = data.split(" ");

    if (x[0] == "/topic") {
      var top = x.slice(1);
      topic = top.toString().replace(/,/g, " ");
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });
    } else {
      console.log("Message received: " + data);
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
