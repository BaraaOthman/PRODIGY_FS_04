
import http from "./http-common";

const getAllRooms = () => {
    return http.get(`/rooms/rooms`);
}

const RoomService = {
    getAllRooms
}

export default RoomService;