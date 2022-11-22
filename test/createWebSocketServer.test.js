const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
var moment = require('moment');
const port = 3000;
const Client = require('../client');
const serverConnection = require('../server');

describe("Client Subscribe Event & Count Subscriber Event", () => {
    let server;
    let io = {};
    let client = {};
    beforeAll(async () => {
        server = http.createServer(app);
        server.listen(port, () => { });
        io = new Server(server);
        serverConnection(io);
        client = new Client(port);
        client.connect();

    });

    afterAll(() => {
        client.clientClose();
        server.close();
    });

    test("Server echoes the message it receives from client", async () => {
        // Create test client
        const testMessage = {
            "type": 'Subscribe',
            "status": "Subscribe",
            "updatedAt": moment().format('YYYY-MM-DD H:m:s')
            };

        // Send client message
        client.eventEmit('Subscribe');

        let responseMessage = await client.eventHandle('Subscribe')
        // Perform assertions on the response
        expect(responseMessage).toEqual(testMessage);
    });

    test("Server echoes the message it receives from client", async () => {
        // Create test client
        const testMessage = {
            "type": 'CountSubscribers',
            "count": 1,
            "updatedAt": moment().format('YYYY-MM-DD H:m:s')
            };

        // Send client message
        client.eventEmit('CountSubscribers');

        let responseMessage = await client.eventHandle('CountSubscribers')
        
        // Perform assertions on the response
        expect(responseMessage).toEqual(testMessage);
    });
});

describe("Client Unsubscribe Event  & Count Subscriber Event", () => {
    let server;
    let io = {};
    let client = {};

    beforeAll(async () => {
        server = http.createServer(app);
        server.listen(port, () => { });
        io = new Server(server);
        serverConnection(io);
        client = new Client(port);
        client.connect()
    });

    afterAll(() => {
        client.clientClose();
        server.close();

    });

    test("Server echoes the message it receives from client", async () => {
        const testMessage = {
            "type": 'Unsubscribe',
            "status": "Unsubscribe",
            "updatedAt": moment().format('YYYY-MM-DD H:m:s')
            };
        // Send client message
        client.eventEmit('Unsubscribe');

        let responseMessage = await client.eventHandle('Unsubscribe')
        // Perform assertions on the response
        expect(responseMessage).toEqual(testMessage);
    });

    test("Server echoes the message it receives from client", async () => {
        // Create test client
        const testMessage = {
            "type": 'CountSubscribers',
            "count": 0,
            "updatedAt": moment().format('YYYY-MM-DD H:m:s')
            };

        // Send client message
        client.eventEmit('CountSubscribers');

        let responseMessage = await client.eventHandle('CountSubscribers')
        
        // Perform assertions on the response
        expect(responseMessage).toEqual(testMessage);
    });
});