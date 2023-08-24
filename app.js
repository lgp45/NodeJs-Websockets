const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: http });

//prep for integrating into the Docker-compose for spin-up, spin-down, and migrations 

//  --this changeover will be very slow as Senior Proj, PID REDUX and other time reqs supersede.

//store references to the connected game servers
let gameServer1 = null;
let gameServer2 = null;

wss.on('connection', (ws) => {
  console.log('A Game-Server connected to the WebSocket server.');

  ws.on('message', (message) => {
    console.log('Received message from client:', message);

    //determine which game server sent the message
    if (ws === gameServer1) 
    {
      //forward the message to gameServer2
      if (gameServer2 && gameServer2.readyState === WebSocket.OPEN) 
      {
        gameServer2.send(message);
      }
    } 
    else if (ws === gameServer2) 
    {
      //forward the message to gameServer1
      if (gameServer1 && gameServer1.readyState === WebSocket.OPEN) 
      {
        gameServer1.send(message);
      }
    } 
    else 
    { 
      //this is a new game server connection
      if (!gameServer1) 
      {
        gameServer1 = ws;
        console.log("Game Server 1 has been cached." + gameServer1.url)
        ws.send("You have joined the WebSocket Relay on Game Server 1!");
      } 
      else if (!gameServer2) 
      {
        gameServer2 = ws;
        console.log("Game Server 2 has been cached." + gameServer2.url)
        ws.send("You have joined the WebSocket Relay on Game Server 2.");
      } 
      else 
      {
        //reject additional connections (you can handle this differently if needed)
        ws.send("Connection rejected. Server is full.");
        ws.close();
      }
    }
  });

  ws.on('close', () => {
    console.log('A client disconnected from the WebSocket server.');

    //clean up references when a game server disconnects
    if (ws === gameServer1) 
    {
      gameServer1 = null;
    } 
    else if (ws === gameServer2) 
    {
      gameServer2 = null;
    }
  });
});


const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
