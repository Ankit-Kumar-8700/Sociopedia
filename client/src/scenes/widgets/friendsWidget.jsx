import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import Friend from "../../components/friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setRecievedFriendRequests, setSentFriendRequests } from "../../state/state";

const FriendListWidget = ({ userId, profilePage=false, show=false }) => {

    const serverLink="http://localhost:8000";

      const WidgetWrapper = styled(Box)(({ theme }) => ({
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
      }));


  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const recievedFriendRequests = useSelector((state) => state.user.recievedFriendRequests);
  const sentFriendRequests = useSelector((state) => state.user.sentFriendRequests);

  const getFriends = async () => {
    const response = await fetch(
      `${serverLink}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data.friends }));
    dispatch(setRecievedFriendRequests({ recievedFriendRequests: data.recievedFriendRequests }));
    dispatch(setSentFriendRequests({ sentFriendRequests: data.sentFriendRequests }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {!show && <>Friend List</>}
        {show==='recievedRequests' && <>Recieved Friend Requests List</>}
        {show==='sentRequests' && <>Sent Friend Requests List</>}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {!show?friends.map((friend,i) => (
          <Friend
            key={`${i}`}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicPath={friend.picPath}
            profilePage={profilePage}
          />
        )):
        show==='recievedRequests'?recievedFriendRequests.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicPath={friend.picPath}
            profilePage={profilePage}
          />
        )):sentFriendRequests.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicPath={friend.picPath}
            profilePage={profilePage}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;