import Message from '../models/message_schema.js';

export const getMessageByRoomId = async (req, res) => {
    try {
        const { room_id } = req.body;
      
        // Find messages by room_id
        const messages = await Message.find({ room_id });

        // Check if any messages were found
        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for the specified room_id' });
        }

        // Return the messages
        res.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
