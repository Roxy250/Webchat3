// import mongoose from "mongoose";

// // Define a schema for the host information
// const roomSchema = new mongoose.Schema({
//     // SocketId: {
//     //     type: String,
//     // },
//     hosting_room_name: {
//         type: String,
//     },
//     hosting_password: {
//         type: String,
//     },
//     // isHost:{
//     //     type:Boolean,
//     // }
// });

// // Create a model for the host information


// export default mongoose.model("Room", roomSchema);

// Define a schema for the host information
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room_id: {
        type: String,
    },
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a TTL index on the createdAt field
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 86400 seconds = 1 day

const Room = mongoose.model("Room", roomSchema);

export default Room;

