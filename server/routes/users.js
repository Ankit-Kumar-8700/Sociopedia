import express from "express";
import {
    getUser,
    getUserFriends,
    addFriend,
    removeFriend,
    revokeFriendRequest,
    rejectFriendRequest,
    acceptFriendRequest,
    updateUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

router.patch("/friend/add/:id/:friendId",verifyToken,addFriend);
router.patch("/friend/remove/:id/:friendId",verifyToken,removeFriend);
router.patch("/friend/revoke/:id/:friendId",verifyToken,revokeFriendRequest);
router.patch("/friend/reject/:id/:friendId",verifyToken,rejectFriendRequest);
router.patch("/friend/accept/:id/:friendId",verifyToken,acceptFriendRequest);
router.patch("/:id/update",verifyToken,updateUser);

export default router;