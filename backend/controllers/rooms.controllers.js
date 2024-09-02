const {getRooms} = require('../services/rooms.services');


const getRoomsController = async (req, res) => {
    try {
        const rooms = await getRooms();

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No rooms found .'
            });
        }

        res.status(200).json({
            success: true,rooms
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};


module.exports = {getRoomsController}