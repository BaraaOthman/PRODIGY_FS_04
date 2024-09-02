const {getMessages,postMessage} = require('../services/messages.services');


const getMessagesController = async(req,res)=>{
    try {
        console.log('controller 1');
        const room_id = req.query.room_id;
        console.log(`room-id from controller ${room_id}`)
        const messages = await getMessages(room_id);

        console.log('controller messages:', messages); // Log the actual messages

        if (!messages || messages.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No messages found.'
            });
        }

        console.log('controller 2');

        res.status(200).json({
            success: true,
            messages 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }

}


const postMessageController = async (req, res) => {
    const { room_id, message, username } = req.body;

    try {

        const result = await postMessage(room_id, message, username);

        res.status(200).json({
            success: true,
            message: 'Message posted successfully',
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};




module.exports = {getMessagesController,postMessageController}