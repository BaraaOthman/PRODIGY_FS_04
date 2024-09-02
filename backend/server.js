const WebSocket = require('ws');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const roomsRoutes = require('./routes/rooms.routes')
const messagesRoutes = require('./routes/messages.routes')

const wss = new WebSocket.Server({ port: 8080 });


const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/users', userRoutes);
app.use('/rooms',roomsRoutes)
app.use('/messages',messagesRoutes)


wss.on('connection', (ws, req) => {
    const room = req.url.substring(1);

    ws.on('message', (message) => {
        console.log(`recieved message`, message)
        const parsedMessage = JSON.parse(message);

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));
            }
        });
    });
    ws.send(JSON.stringify({ sender: 'Server', text: `Welcome to ${room}!` }));
});


const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('WebSocket server running on port 3000');
