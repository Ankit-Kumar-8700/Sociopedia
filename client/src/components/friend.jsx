import { AddTask, Cancel,  ChatOutlined, PersonAddOutlined, PersonRemoveOutlined, Undo } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setRecievedFriendRequests, setSentFriendRequests } from "../state/state";
import UserImage from "./userImage";


const Friend = ({ friendId, name, subtitle, userPicPath, small, profilePage }) => {

    const serverLink="http://localhost:8000";

    const FlexBetween = styled(Box)({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const {friends, sentFriendRequests, recievedFriendRequests} = useSelector((state) => state.user);

  // let isFriend=undefined;
  // let isSentFriendRequest=undefined;
  // let isRecievedFriendRequest=undefined;

  let isFriend=friends.includes(friendId) || friends.find((friend)=>friend._id===friendId);
  let isSentFriendRequest=sentFriendRequests.includes(friendId) || sentFriendRequests.find((sentFriendRequest)=>sentFriendRequest._id===friendId);
  let isRecievedFriendRequest=recievedFriendRequests.includes(friendId) || recievedFriendRequests.find((recievedFriendRequest)=>recievedFriendRequest._id===friendId);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const patchFriend = async (mode) => {
    const response = await fetch(
      `${serverLink}/users/friend/${mode}/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      );
      const data = await response.json();
      dispatch(setSentFriendRequests({ sentFriendRequests: data.sentFriendRequests }));
      dispatch(setFriends({ friends: data.friends }));
      dispatch(setRecievedFriendRequests({ recievedFriendRequests: data.recievedFriendRequests }));
    };

  return (
    <FlexBetween margin={small?"0.3rem 0":"0"}>
      <FlexBetween gap="1rem">
        <UserImage image={userPicPath} size={small?"30px":"55px"} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            fontSize={small?"0.7rem":"1rem"}
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize={small?"0.6rem":"0.75rem"}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {profilePage && <IconButton onClick={() => navigate(`/chats/${friendId}`)}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
          <ChatOutlined sx={{ color: primaryDark }} />
        </IconButton>}
      {!small && !profilePage && friendId!==_id && <FlexBetween>
        {isFriend && <IconButton
          onClick={() => patchFriend('remove')}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
        </IconButton>}
        {isSentFriendRequest && <IconButton
          onClick={() => patchFriend('revoke')}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <Undo sx={{ color: primaryDark }} />
        </IconButton>}
        {isRecievedFriendRequest && <IconButton
          onClick={() => patchFriend('accept')}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <AddTask sx={{ color: primaryDark }} />
        </IconButton>}
        {isRecievedFriendRequest && <IconButton
          onClick={() => patchFriend('reject')}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <Cancel sx={{ color: primaryDark }} />
        </IconButton>}
        {!isFriend && !isSentFriendRequest && !isRecievedFriendRequest && <IconButton
          onClick={() => patchFriend('add')}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>}
      </FlexBetween>
      }
    </FlexBetween>
  );
};

export default Friend;