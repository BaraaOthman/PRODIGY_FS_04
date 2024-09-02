import http from "./http-common";

const getAllMessages = (room_id) => {
    return http.get(`/messages/messages`,{params:{room_id}});
}

const addMessage =(room_id,message,username)=>{
    return http.post('/messages/send',{room_id,message,username})
}

const MessagesService = {
    getAllMessages,
    addMessage
}

export default MessagesService;