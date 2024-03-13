import { Server } from 'socket.io';
import room_schema from './models/room_schema.js';
import user_schema from './models/user_schema.mjs';
import messageModel from './models/message_schema.js';

const websocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', async(socket) => {
        console.log('User connected', socket.id);

        socket.on('hostRoom',async({room_id,password,user_id})=>{
            console.log(room_id,password,user_id)
            const room = await room_schema.findOne({room_id:room_id});
            
            if(room){   
                io.to(socket.id).emit('room_status',{message:'Room aready exist'})
                console.log('Room aready exist')
            }else{
                await new room_schema({room_id:room_id,password:password}).save();
                await user_schema.updateOne({ _id: user_id }, { $set: { room_id: room_id } });
                    socket.join(room_id);
                    io.to(socket.id).emit('room_status', {message:'Room created successfully',room_id});
                    console.log('Room created successfully');
            }
        })

        socket.on('joinRoom',async({room_id,password,user_id})=>{
            console.log(room_id,password,user_id)
            const room = await room_schema.findOne({room_id:room_id});
            if(!room){
                    io.to(socket.id).emit('room_status',{message:'Invalid room id or password'});
                    console.log('Invalid room id or password1')
            }else{
                if(room.password !== password){
                        io.to(socket.id).emit('room_status',{message:'Invalid room id or password'});
                        console.log('Invalid room id or password2')
                }else{
                    await user_schema.updateOne({ _id: user_id }, { $set: { room_id: room_id } });
                    const user = await user_schema.findById({_id:user_id});
                    console.log(user.username);
                        socket.join(room_id);
                        // io.to(room_id).emit('room_status',{message:`${user.username} joined the room`,});
                        // io.to(socket.id).except(socket.id).emit('self_status',{message:`you have joined the room ${room_id}`,room_id});
                        io.to(room_id).emit('room_status', {
                            joined:{
                            self_message: `You have joined the room ${room_id}`,
                            message: `${user.username} joined the room`,
                            user_id,
                            },room_id
                        });
                        console.log('joined')
                } 
            } 
        })
        socket.on('Join',(room_id,user_name)=>{
            socket.join(room_id);
            console.log(`${user_name} Joined ${room_id} `);
            io.to(room_id).emit('welcome',`welcome to room ${room_id}`);
        })

// Inside your socket.io server code
socket.on('send_message', (text, userId, roomId) => {
  // Create a new Message document
  const newMessage = new messageModel({
    sender: userId,
    room_id: roomId,
    message: text
  });

  // Save the message to the database
  newMessage.save()
    .then(savedMessage => {
      console.log('Message saved to database:', savedMessage);
      // Handle success if needed
    })
    .catch(error => {
      console.error('Error saving message to database:', error);
      // Handle error if needed
    });
    io.to(roomId).emit('receive_message',newMessage.message);
});

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};

export default websocket;