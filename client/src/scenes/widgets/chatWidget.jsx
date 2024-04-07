import {
    Chat,
    Send,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme, IconButton, InputBase } from "@mui/material";
  import { styled } from "@mui/system";
  import UserImage from "../../components/userImage";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import Message from "../../components/message";

function ChatWidget({friendId}) {

    const serverLink="http://localhost:8000"

    const FlexBetween = styled(Box)({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      });

      const WidgetWrapper = styled(Box)(({ theme }) => ({
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
      }));

      const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const [chat,setChat]=useState(null);
    const [messages,setMessages]=useState([]);

    const sendMessage= async () =>{
      const desc=document.getElementById(friendId+"SendMessage");
      try {
        await fetch(`${serverLink}/message/${chat._id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,
          "Content-Type": "application/json", },
          body:JSON.stringify({ content: desc.value }),
        });
        getMessages(chat._id);
        desc.value="";
      } catch (error) {
        console.log(error.message);
        alert("Can't send messages right now.");
        // setUser({});
        // navigate("/chats/landing")
      }
    }
  
    const getMessages = async (chatId) => {
      try {
        const response = await fetch(`${serverLink}/message/${chatId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log(error.message);
        alert("Can't read the chat's messages.");
        setUser({});
        navigate("/chats/landing")
      }
  };
    const getChat = async () => {
      try {
        const response = await fetch(`${serverLink}/chat/`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", },
          body:JSON.stringify({ userId: friendId })
        });
        const data = await response.json();
        setChat(data);
        getMessages(data._id);
      } catch (error) {
        console.log(error.message);
        alert("Can't read this chat.");
        setUser({});
        navigate("/chats/landing")
      }
  };
    const getUser = async () => {
        if(friendId !== 'landing'){
      try {
        const response = await fetch(`${serverLink}/users/${friendId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        getChat();
      } catch (error) {
        console.log(error.message);
        alert("Can't read this user.");
        setUser({});
        navigate("/chats/landing")
      }
    } else {
        setUser({});
    }
    };

    useEffect(()=>{
      const chatBox=document.getElementById("chatBoxArea");
      if(chatBox){
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    },[messages,dark])
  
    useEffect(() => {
        // if(friendId!=='landing'){
            getUser();
        // }
    }, [friendId]);

    if (!user) {
        return null;
      }
    
      const {
        picPath,
        firstName,
        lastName,
        location,
        occupation
      } = user;

  return (
    <WidgetWrapper height="77vh">
        {friendId==='landing' && <div style={{
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        height:"70vh",
        flexDirection:"column"}}>
        <Typography
                variant="h4"
                color={dark}
                textAlign="center"
                fontWeight="500"
                fontSize="5rem"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                  },
                }}
              >
                <Chat fontSize="5rem" />
              </Typography>
        <Typography
                variant="h4"
                color={dark}
                textAlign="center"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                  },
                }}
              >
                Chat To Your Friends
              </Typography>
        </div>}
        {friendId!=='landing' && <div style={{
        display: "flex",
        width:"100%",
        height:"100%",
        flexDirection:"column"}}>
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${friendId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picPath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{location} | {occupation}</Typography>
            </Box>
          </FlexBetween>
          {/* <ManageAccountsOutlined /> */}
        </FlexBetween>
        <Divider />
        <Box style={{flex: "2",
          overflowY: "scroll",
          scrollbarWidth: "none",
           padding:"10px 0"}} 
           id="chatBoxArea">
            {messages.map((message, i) => (
                <Message
                  key={`${i}`}
                  createdAt={message.createdAt}
                  message={message.message}
                  sender={message.sender}
                />
            ))}
        </Box>
        <FlexBetween flex="0.1">
        <InputBase
            placeholder="Write a Comment"
            id={friendId+"SendMessage"}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <IconButton onClick={sendMessage} >
            <Send/>
          </IconButton>
        </FlexBetween>
        </div>}
    </WidgetWrapper>
  )
}

export default ChatWidget
