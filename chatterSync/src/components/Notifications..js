import React, { useEffect } from 'react';

const Notifications = ({ messages }) => {
    useEffect(() => {
        if (messages.length > 0) {
            new Notification("New Message", {
                body: messages[messages.length - 1].text,
            });
        }
    }, [messages]);

    return null;
};

export default Notifications;
