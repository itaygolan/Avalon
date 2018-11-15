import express from 'express';
import { Server } from 'colyseus';
import WebSocket from 'ws';
import * as Colyseus from 'colyseus.js'
import { createServer } from 'http'

import { AvalonRoom } from './room';

const globalAny = global; // This way we don't get an error in TypeScript saying WebSocket is not a defined property on global
globalAny.WebSocket = WebSocket;

const app = express();
const gameServer = new Server({
    server: createServer()
});
gameServer.register('avalon', AvalonRoom)
let client = new Colyseus.Client("ws://localhost:2657");
const room = client.join('avalon');
room.onJoin.add(() => console.log("joined successfully!"));

const PORT = process.env.PORT || 5000;
app.set("PORT", PORT);

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(app.get("PORT"), () => console.log(`Listening on port ${PORT}`));

gameServer.attach({ server: app })
