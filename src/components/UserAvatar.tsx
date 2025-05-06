import { Avatar } from '@mui/material';

function UserAvatar({ currentUser }: any) {
  if (!currentUser || !currentUser.email) {
    return <Avatar />;
  }

  return (
    <Avatar>
      {currentUser.email.charAt(0).toUpperCase()}
    </Avatar>
  );
}

export default UserAvatar;
