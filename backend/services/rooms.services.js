const { query } = require("../database/db");


const getRooms = async ()=>{

    try{

        const sql = `SELECT * FROM rooms `;

        const result = await query(sql);

        return result;

    }catch(error){
        throw new Error(error)
    }

}

module.exports = {getRooms}