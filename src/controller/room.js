

 const findIndex = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].room_id == id) {
        return i;
      }
    }
    return -1;
  }

const Rooms = [
  {
    room_id: 1,
    room_name: "First_Class_with_AC",
    booked_status: true,
    price_for_1_hours: 8000,
  },
  {
    room_id: 2,
    room_name: "First_Class_With_Non_AC",
    booked_status: true,
    price_for_1_hours: 6000,
  },
  {
    room_id: 3,
    room_name: "Second_Class_with_AC",
    booked_status: true,
    price_for_1_hours: 4000,
  },
  {
    room_id: 4,
    room_name: "Second_Class_with_Non_AC",
    booked_status: false,
    price_for_1_hours: 2000,
  }
];

const Customer = [
  {
    room_id: 1,
    customer_id: 1,
    name: "Santhosh Srinivasan",
    date: "23/01/2024",
    start_time: "08:00:00 am",
    end_time: "11:20:12 pm",
  },
  {
    room_id: 2,
    customer_id: 2,
    name: "Surya Gunasekaran",
    date: "23/01/2024",
    start_time: "06:40:09 am",
    end_time: "09:35:46 pm",
  },
  {
    room_id: 3,
    customer_id: 3,
    name: "Shiyam Saravanan",
    date: "23/01/2024",
    start_time: "07:30:23 pm",
    end_time: "06:30:09 am",
  },
];

const roomController = {
  getAllRooms: (req, res) => {
    try {
      // Logic to fetch and return all rooms
      res.status(200).send(Rooms);
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  createRoom: (req, res) => {
    try {
      const id = Rooms.length ? Rooms[Rooms.length - 1].room_id + 1 : 1;
      req.body.room_id = id;
      req.body.room_name = `room-${id}`;
      req.body.booked_status = false;

      Rooms.push(req.body);
      console.log(req.body);
      res.status(200).send({
        message: "Room Added Successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  getRoomById: (req, res) => {
    try {
      const roomId = req.params.id;
      const room = Rooms.find(room => room.room_id === parseInt(roomId));
      if (room) {
        res.status(200).send(room);
      } else {
        res.status(404).send({
          message: "Room not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  updateRoomById: (req, res) => {
    try {
      const roomId = req.params.id;
      const index = Rooms.findIndex(room => room.room_id === parseInt(roomId));
      if (index !== -1) {
        Rooms[index] = { ...Rooms[index], ...req.body };
        res.status(200).send({
          message: "Room updated successfully",
        });
      } else {
        res.status(404).send({
          message: "Room not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  deleteRoomById: (req, res) => {
    try {
      const roomId = req.params.id;
      const index = Rooms.findIndex(room => room.room_id === parseInt(roomId));
      if (index !== -1) {
        Rooms.splice(index, 1);
        res.status(200).send({
          message: "Room deleted successfully",
        });
      } else {
        res.status(404).send({
          message: "Room not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  bookRoom: (req, res) => {
    try {
      const roomId = req.params.id;
      const roomIndex = findIndex(Rooms, roomId);
      if (roomIndex !== -1 && !Rooms[roomIndex].booked_status) {
        Rooms[roomIndex].booked_status = true;

        // Generate random customer name and date
        const name = "Customer " + Math.floor(Math.random() * 1000);
        const date = new Date().toLocaleDateString();

        // Add new customer
        const newCustomer = {
          room_id: parseInt(roomId),
          customer_id: Customer.length + 1,
          name,
          date,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
        };

        Customer.push(newCustomer);

        res.status(200).send({
          message: "Room booked successfully",
        });
      } else {
        res.status(400).send({
          message: "Room is already booked or invalid room ID",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = roomController;

