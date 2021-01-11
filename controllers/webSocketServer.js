const { workerData, parentPort, isMainThread } = require('worker_threads');

const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const PubSubManager = require('./pubSubManager');

const app = express();
const pubSubManager = new PubSubManager();
const socketServer = new WebSocket.Server({ port: 3030 });

socketServer.on('connection', (socketClient) => {
  console.log('Client Subscribed');
  console.log('client Set length: ', socketServer.clients.size);

  socketClient.on('message', (data) => {    
    const json = JSON.parse(data);
    const request = json.event;
    const interval = json.interval;
    const channel = json.symbol;
    const message = null;

    switch (request) {
      case 'publish':
        pubSubManager.publish(channel, message);
        break;
      case 'subscribe':
          pubSubManager.subscribe(socketClient, channel);
        break;
    }
  });

  socketClient.on('close', (socketClient) => {
    console.log('Client Disconnected');
    console.log('Number of clients: ', socketServer.clients.size);
  });

  socketServer.on('request', app);
});

if (!isMainThread) {
  parentPort.on('message', (data) => {
    let stockBarDataArray = JSON.parse(data);
    stockBarDataArray.forEach((value) => {
        pubSubManager.publish(value[0], JSON.stringify(value[1]));
    })
   pubSubManager.broker();
  });
}






