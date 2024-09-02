import React, { useState, useEffect } from 'react';
import MessagesService from '../MessagesServices';
import { useCookies } from 'react-cookie';
import MessageInput from '../components/MessageInput'

const ChatRoom = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [cookies] = useCookies(['username']);
    const username = cookies.username;
    const room_id = localStorage.getItem('roomId');

    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        // Fetch messages whenever room changes
        const fetchMessages = async () => {
            try {
                console.log(`room_id ${room_id}`)
                const response = await MessagesService.getAllMessages(room_id); 
                console.log('Response from API:', response);
                setMessages(response.data.messages || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (room) {
            setWelcomeMessage(`ChatterSync: Welcome to ${room}!`);
            fetchMessages();
        }
    }, [room]);


    const handleSendMessage = async (message) => {
        try {
            if (!room_id || !username) {
                console.error('Room ID or username is missing');
                return;
            }

            await MessagesService.addMessage(room_id, message, username);

            const response = await MessagesService.getAllMessages(room_id);
            setMessages(response.data.messages || []);
            
            console.log('Message sent successfully');

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="chat-room">
            {welcomeMessage && (
                <div className="welcome-message">
                    {welcomeMessage}
                </div>
            )}
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${(msg.username === username) ? 'my-message' : ''}`}>
                        <strong>{msg.username}</strong>: {msg.message || 'No message content'}
                    </div>
                ))}
            </div>
            <div className="message-input-container">
            <MessageInput  sendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatRoom;
