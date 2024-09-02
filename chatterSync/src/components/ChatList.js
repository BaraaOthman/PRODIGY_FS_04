import React, { useState, useEffect } from 'react';
import RoomService from '../RoomServices';
import UserService from '../UserServices';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const ChatList = ({ onRoomSelect }) => {
    const [rooms, setRooms] = useState([]);
    const [cookies] = useCookies(['username']);
    const username = cookies.username;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await RoomService.getAllRooms();
                setRooms(response.data.rooms || []);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleSubmit = async () => {
        const response = await UserService.logout();
        if (response.status === 200) {
            Cookies.remove('username');
            window.location.href = '/login';
        }
    };


    const handleRoomClick = (room) => {
        localStorage.setItem('roomName', room.name);
        localStorage.setItem('roomId', room.id);
        onRoomSelect(room.name);
    };

    return (
        <div className="chat-list">
            {rooms.map((room, index) => (
                <button key={index} onClick={() => handleRoomClick(room)}>
                    {room.name}
                </button>
            ))}
            <button onClick={handleSubmit} className='logout-btn'>Log Out</button>
        </div>
    );
};

export default ChatList;
