const {getRoomsController} = require('../controllers/rooms.controllers');
const express = require('express');

const router = express.Router();

router.get('/rooms',getRoomsController)

module.exports = router;
