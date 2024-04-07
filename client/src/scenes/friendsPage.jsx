import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./navbar";
import UserWidget from "./widgets/userWidget";
import FriendListWidget from "./widgets/friendsWidget";
import CycleFriendOptions from "./cycleFriendOptions";

const FriendsPage = ({show}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picPath } = useSelector((state) => state.user);

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
          <UserWidget userId={_id} picPath={picPath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CycleFriendOptions />
          <Box m="1rem 0" />
          <FriendListWidget userId={_id} show={show} />
        </Box>
      </Box>
    </Box>
  );
};

export default FriendsPage;