import React from 'react'
import { useSelector } from 'react-redux';
import './message.css';

function Message({createdAt,message,sender}) {
    const loggedInUserId = useSelector((state) => state.user._id);
  return (
    <div className={sender._id===loggedInUserId?'msgSelf':'msgOther'}>
      {/* <p className={"con-icon messageIcon" + (lightTheme?"":" dark3")}>{msg.name[0]}</p> */}
      <div className={"msgDetails"}>
        {/* {msg && msg.type==='group' && <p className="msgName">{msg.name}:</p>} */}
        <p className='msg'>{message}</p>
        <p className='timeStamp'>{createdAt.slice(0,10)+", "+createdAt.slice(11,16)}</p>
      </div>
    </div>
  )
}

export default Message
