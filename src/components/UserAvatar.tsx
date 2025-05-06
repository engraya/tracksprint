import {
    Avatar,
  } from '@mui/material';

function UserAvatar({ currentUser} : any) {
  return (
    <Avatar>
       {currentUser.email?.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar