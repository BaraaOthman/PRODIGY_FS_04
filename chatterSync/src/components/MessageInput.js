import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <form className="message-input-container" onSubmit={handleSubmit}>
            <input 
                type="text"
                className="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button className="send-button" type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
