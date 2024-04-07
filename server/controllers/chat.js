import Chat from "../models/chat.js";
import User from "../models/user.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  req.user=await User.findById(req.user.id).select("-password");
  // console.log(req.body);
  
  if (!userId) {
    res.status(406).json({message:"UserId param not sent with request"});
    return;
  }

  var isChat = await Chat.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    
  // isChat = await User.populate(isChat, {
  //   path: "latestMessage.sender",
  //   select: "firstName lastName email",
  // });
    
  if (isChat.length>0) {
    res.status(200).json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroup: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(406).json({message:error.message});
    }
  }
};

export const fetchChats = async (req, res) => {
  req.user=await User.findById(req.user.id).select("-password");
  try {
    console.log("Fetch Chats API : ", req);
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName lastName email",
        });
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(406).json({message:error.message});
  }
};

export const fetchGroups = async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).json({groups:allGroups});
  } catch (error) {
    res.status(406).josn({message:error.message});
  }
};

export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(406).json({ message: "Data is insufficient" });
  }
  req.user=await User.findById(req.user.id).select("-password");

  var users = JSON.parse(req.body.users);
  console.log("chatController/createGroups : ", req);
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const groupExit = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404).json({message:"Chat Not Found"});
    } else {
      res.status(200).json(removed);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addSelfToGroup=async(req,res)=>{
  try {
    const {chatId,userId}=req.body;

    const added=await Chat.findByIdAndUpdate(
        chatId,{
            $push:{users:userId},
        },{
            new:true
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!added){
        res.status(404).json({message:"Chat not found"});
    } else {
        res.status(200).json(added);
    }
      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
}
