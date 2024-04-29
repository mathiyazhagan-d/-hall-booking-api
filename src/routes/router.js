const express = require('express');
const roomController = require('../controller/room');

const router = express.Router();

router.get('/rooms', roomController.getAllRooms);
router.post('/room', roomController.createRoom);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoomById);
router.delete('/:id', roomController.deleteRoomById);

module.exports = router;
