import {
    ChatBubbleOutlineOutlined,
    DeleteOutline,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    Link,
    OpenInNew,
    Send,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
  import { styled } from "@mui/system";
  import Friend from "../../components/friend";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state/state";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../../state/state";
import copy from "copy-to-clipboard";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picPath,
    userPicPath,
    likes,
    comments,
  }) => {

    
    const serverLink="http://localhost:8000";
    
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

    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    // const loggedInUserId="1234";
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const navigate=useNavigate();
  
    const patchLike = async () => {
      const response = await fetch(`${serverLink}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };


    const handleComment = async () => {
      const desc=document.getElementById(postId+"Comment");
      if(desc.value.length===0){
        alert("Type something to comment");
        return;
      }
  
      const response = await fetch(`${serverLink}/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: desc.value }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      desc.value="";
    };

    const handleDeletePost=async() => {
      if(loggedInUserId!==postUserId){
        alert("Can't delete Other's Post!!");
        return;
      }
      const response = await fetch(`${serverLink}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      navigate(`/profile/${loggedInUserId}`)
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicPath={userPicPath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picPath!==undefined && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${serverLink}/assets/${picPath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          <FlexBetween>
            <IconButton  onClick={()=>{copy(`localhost:3000/${postUserId}/post/${postId}`)}}>
              <Link />
            </IconButton>
            <IconButton  onClick={()=>{navigate(`/${postUserId}/post/${postId}`)}}>
              <OpenInNew />
            </IconButton>
            {loggedInUserId===postUserId && <IconButton onClick={handleDeletePost}>
              <DeleteOutline />
            </IconButton>}
          </FlexBetween>
        </FlexBetween>
        <FlexBetween>
        <InputBase
            placeholder="Write a Comment"
            id={postId+"Comment"}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <IconButton onClick={handleComment}>
            <Send />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${i}`}>
                <Divider />
                <Friend
                  friendId={comment.user._id}
                  name={comment.user.firstName+" "+comment.user.lastName}
                  subtitle={comment.user.email}
                  userPicPath={comment.user.picPath}
                  small={true}
                />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment.comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;