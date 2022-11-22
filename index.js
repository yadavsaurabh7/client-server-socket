const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const Client = require('./client');
const serverConnection = require('./server');
const port = 3000;


serverConnection(io);

server.listen(port,()=>{
    console.log(`I am here at ${port}`);
})
var client1 = new Client(port);
var client2 = new Client(port);

client1.connect().then((data)=>{
    console.log(data);
});

client2.connect().then((data)=>{
    console.log(data);
});

client1.eventEmit('Subscribe').then(data=>{
});
client1.eventHandle('Subscribe').then(data=>{
    console.log(data);
});

client2.eventEmit('Subscribe').then((data)=>{
});
client2.eventEmit('Unsubscribe').then(data=>{
});

client2.eventHandle('Subscribe').then(data=>{
    console.log(data);
});
client2.eventHandle('Unsubscribe').then(data=>{
    console.log(data);
});

client2.eventEmit('CountSubscribers').then(data=>{
});
client2.eventHandle('CountSubscribers').then(data=>{
    console.log(data);
});

client2.heartBeat((data)=>{
    console.log(data)
});

