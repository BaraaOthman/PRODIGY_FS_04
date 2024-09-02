import React from 'react';

const Message = ({ message, username }) => {
    console.log("username:", username);  // Debugging statement
    console.log("message object:", message);  // Debugging statement

    return (
        <div className={`message ${message.user_id === username ? 'my-message' : ''}`}>
            <strong>{username}:</strong> {message.message}
        </div>
    );
};

export default Message;
