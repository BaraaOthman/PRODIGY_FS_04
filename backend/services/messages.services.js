const { query } = require("../database/db");

const  getMessages = async(room_id )=>{
    try {
        const sql = `SELECT message , username FROM messages WHERE room_id = ?`; 
        const result = await query(sql,[room_id]);
        return result; 
    } catch (error) {
        throw new Error(error);
    }
    }

const postMessage = async(room_id,message,username)=>{
    try {

        const sql = `INSERT INTO messages (room_id , message, username) VALUES (?, ?, ?)`;

        const result = await query(sql, [room_id, message, username]);

        return result;
    } catch (error) {
        throw new Error(`Error posting message: ${error.message}`);
    }

}

module.exports = {getMessages,postMessage}