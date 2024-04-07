import express from "express";
import  {
  accessChat,
  fetchChats,
  createGroupChat,
  fetchGroups,
  groupExit,
  addSelfToGroup
}
from "../controllers/chat.js";
import  { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, fetchChats);
router.route("/createGroup").post(verifyToken, createGroupChat);
router.route("/fetchGroups").get(verifyToken, fetchGroups);
router.route("/groupExit").put(verifyToken, groupExit);
router.route("/joinGroup").put(verifyToken,addSelfToGroup);

export default router;