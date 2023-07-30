const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: http });

// Store references to the connected game servers
let gameServer1 = null;
let gameServer2 = null;

wss.on('connection', (ws) => {
  console.log('A client connected to the WebSocket server.');

  ws.on('message', (message) => {
    console.log('Received message from client:', message);

    // Determine which game server sent the message
    if (ws === gameServer1) 
    {
      // Forward the message to gameServer2
      if (gameServer2 && gameServer2.readyState === WebSocket.OPEN) 
      {
        gameServer2.send(message);
      }
    } 
    else if (ws === gameServer2) 
    {
      // Forward the message to gameServer1
      if (gameServer1 && gameServer1.readyState === WebSocket.OPEN) 
      {
        gameServer1.send(message);
      }
    } 
    else 
    {
      // This is a new game server connection
      if (!gameServer1) 
      {
        gameServer1 = ws;
        ws.send("You have joined the socketwerkz as Game Server 1.");
      } 
      else if (!gameServer2) 
      {
        gameServer2 = ws;
        ws.send("You have joined the socketwerkz as Game Server 2.");
      } 
      else 
      {
        // Reject additional connections (you can handle this differently if needed)
        ws.send("Connection rejected. Server is full.");
        ws.close();
      }
    }
  });

  ws.on('close', () => {
    console.log('A client disconnected from the WebSocket server.');

    // Clean up references when a game server disconnects
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

// ... Add your other Express routes and middleware here ...

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
