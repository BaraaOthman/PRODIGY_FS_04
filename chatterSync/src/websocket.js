export const connectWebSocket = (room, setMessages) => {
    const socket = new WebSocket(`ws://localhost:8080/${room}`);

    // In websocket.js or the relevant file
    socket.onmessage = async (event) => {
        let message;

        if (event.data instanceof Blob) {
            const text = await event.data.text();
            message = JSON.parse(text);
        } else {
            message = JSON.parse(event.data);
        }

        // Assuming setMessages is a state updater for the messages array
        setMessages((prevMessages) => [...prevMessages, message]);
    };



    return socket;
};
