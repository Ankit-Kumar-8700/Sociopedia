import User from "../models/user.js";

export const getAllUsers=async(req,res)=>{
    try {
        const keyword=req.query.search?{
            $or:[
                {firstName:{$regex:req.query.search, $options:"i"}},
                {lasttName:{$regex:req.query.search, $options:"i"}},
                {email:{$regex:req.query.search, $options:"i"}},
                
            ]
        } :{};
    
        const users=await User.find(keyword).find({
            _id:{$ne:req.user._id}
        });
        res.status(200).send(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserFriends=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);

        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )

        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}



export const addFriend=async(req,res)=>{
    try {
        const {id,friendId}=req.params;
        if(id===friendId){
            return res.status(404).json({message: "Can't send request to self for friend"});
        }
        const user=await User.findById(id);
        const friend=await User.findById(friendId);
        
            user.sentFriendRequests.push(friendId);
            friend.recievedFriendRequests.push(id);
        await user.save();
        await friend.save();

        
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )

        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const acceptFriendRequest=async(req,res)=>{
    try {
        const {id,friendId}=req.params;
        if(id===friendId){
            return res.status(404).json({message: "Can't accept self as a friend"});
        }
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        if(!user.recievedFriendRequests.includes(friendId) || !friend.sentFriendRequests.includes(id)){
            return res.status(404).json({message:"Friend has not sent you an friend request"});
        }
            user.recievedFriendRequests=user.recievedFriendRequests.filter((tempId)=>tempId!=friendId);
            friend.sentFriendRequests=friend.sentFriendRequests.filter((tempId)=>tempId!=id);
            user.friends.push(friendId);
            friend.friends.push(id);
        
        await user.save();
        await friend.save();

        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )

        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const rejectFriendRequest=async(req,res)=>{
    try {
        const {id,friendId}=req.params;
        if(id===friendId){
            return res.status(404).json({message: "Can't reject self as a friend"});
        }
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        if(!user.recievedFriendRequests.includes(friendId) || !friend.sentFriendRequests.includes(id)){
            return res.status(404).json({message:"Friend has not sent you an friend request"});
        }
            user.recievedFriendRequests=user.recievedFriendRequests.filter((tempId)=>tempId!=friendId);
            friend.sentFriendRequests=friend.sentFriendRequests.filter((tempId)=>tempId!=id);
        
        await user.save();
        await friend.save();

        
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )

        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const removeFriend=async(req,res)=>{
    try {
        const {id,friendId}=req.params;
        if(id===friendId){
            return res.status(404).json({message: "Can't remove self from friends"});
        }
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        if(!friend.friends.includes(id) || !user.friends.includes(friendId)){
            return res.status(404).json({message:"You aren't a friend of this person"});
        }
            friend.friends=friend.friends.filter((tempId)=>tempId!=id);
            user.friends=user.friends.filter((tempId)=>tempId!=friendId);
        
        await user.save();
        await friend.save();

        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
            console.log({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq});
        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const revokeFriendRequest=async(req,res)=>{
    try {
        const {id,friendId}=req.params;
        if(id===friendId){
            return res.status(404).json({message: "Can't revoke self friend request"});
        }
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        if(!friend.recievedFriendRequests.includes(id) || !user.sentFriendRequests.includes(friendId)){
            return res.status(404).json({message:"You have not sent a friend request to this person"});
        }
            friend.recievedFriendRequests=friend.recievedFriendRequests.filter((tempId)=>tempId!=id);
            user.sentFriendRequests=user.sentFriendRequests.filter((tempId)=>tempId!=friendId);
        
        await user.save();
        await friend.save();

        
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const recievedFriendReq=await Promise.all(
            user.recievedFriendRequests.map((id)=>User.findById(id))
        );
        const sentFriendReq=await Promise.all(
            user.sentFriendRequests.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedrecievedFriendReq=recievedFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )
        const formattedSentFriendReq=sentFriendReq.map(
            ({_id,firstName,lastName,occupation,location,picPath})=>{
                return {_id,firstName,lastName,occupation,location,picPath};
            }
        )

        res.status(200).json({friends:formattedFriends, recievedFriendRequests:formattedrecievedFriendReq, sentFriendRequests:formattedSentFriendReq})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}



export const updateUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const {
            firstName,
            lastName,
            location,
            occupation,
            linkedIn,
            github
        }=req.body;


        const user=await User.findByIdAndUpdate(id, { $set: { firstName: firstName, lastName: lastName, location: location, occupation: occupation, linkedIn:linkedIn, github:github }});

        await user.save();
        const newUser=await User.findById(id);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }

}