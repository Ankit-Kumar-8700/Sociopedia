import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./navbar";
import FriendListWidget from "./widgets/friendsWidget";
import { useParams } from "react-router-dom";
import ChatWidget from "./widgets/chatWidget";

function ChatPage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const {friendId}=useParams();


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <FriendListWidget userId={_id} profilePage={true} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <UserWidget userId={_id} picPath={picPath} /> */}
          <ChatWidget friendId={friendId} />
          
        </Box>
      </Box>
    </Box>
  )
}

export default ChatPage
