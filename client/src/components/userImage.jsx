import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    const serverLink="http://localhost:8000";
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${serverLink}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;