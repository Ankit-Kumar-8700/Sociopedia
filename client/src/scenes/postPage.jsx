import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import PostsWidget from "./widgets/postsWidget";
import UserWidget from "./widgets/userWidget";

const PostPage = () => {

    const serverLink="http://localhost:8000"

  const [user, setUser] = useState(null);
  const { userId, postId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${serverLink}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) return null;

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} mt={"2rem"} >
          <UserWidget userId={userId} picPath={user.picPath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
        >
          <PostsWidget userId={userId} isProfile postId={postId} isPost />
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;