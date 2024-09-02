import React from 'react';
import ChatRoom from './ChatRoom';

const PrivateChat = ({ username }) => {
    return (
        <div className="private-chat">
            <ChatRoom room={`private-${username}`} />
        </div>
    );
};

export default PrivateChat;
