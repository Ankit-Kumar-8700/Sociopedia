import styled from '@emotion/styled';
import { Diversity3, GroupAdd, SendToMobile } from '@mui/icons-material';
import { Box,  IconButton, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function CycleFriendOptions() {


    const navigate=useNavigate();

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

  return (
    <WidgetWrapper>
    <FlexBetween margin="0.3rem 0" >
        <IconButton sx={{border:"2px solid"}} onClick={()=>{navigate('/friends')}}>
            <Diversity3 />
            <Typography mx="0.4rem">
                Friends
            </Typography>
        </IconButton>
        <IconButton sx={{border:"2px solid"}} onClick={()=>{navigate('/recieved-requests')}}>
            <GroupAdd />
            <Typography mx="0.4rem">
                Recieved Req
            </Typography>
        </IconButton>
        <IconButton sx={{border:"2px solid"}} onClick={()=>{navigate('/sent-requests')}}>
            <SendToMobile />
            <Typography mx="0.4rem">
                Sent Req
            </Typography>
        </IconButton>
    </FlexBetween>
    </WidgetWrapper>
  )
}

export default CycleFriendOptions
