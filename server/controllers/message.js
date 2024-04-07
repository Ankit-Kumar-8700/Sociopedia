import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstName lastName email")
      // .populate("reciever","firstName lastName email")
      console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(406).json({message:error.message});
  }
};

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const {chatId}=req.params;
  req.user=await User.findById(req.user.id).select("-password");

  if (!content || !chatId) {
    res.status(406).json({message:"Invalid data passed into request"});
    return ;
  }

  var newMessage = {
    sender: req.user._id,
    message: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    console.log(message);
    // message = await message.populate("sender", "firstName lastName email");
    // message = await message.populate("chat");
    // message = await message.populate("reciever");
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "firstName lastName email",
    // });

    // await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.status(200).json(message);
  } catch (error) {
    res.status(406).json({message:error.message});
  }
};

