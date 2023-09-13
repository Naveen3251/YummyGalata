//for mypost and friendlist widget we use this component
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend=({friendId, name, subtitle, userPicturePath})=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {_id}=useSelector(state=>state.user);
    const token=useSelector(state=>state.token);
    const friends=useSelector(state=>state.user.friends);

    const { palette }=useTheme();
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;

    //to check already they are mutual friend
    const isFriend=friends.find((friend)=>friend._id===friendId);
     
    //API call for whether to add friend or to remove friend
    const patchFriend = async () => {
        try {
          const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
      
          if (!response.ok) {
            // Handle non-successful response (e.g., show an error message)
            throw new Error('Failed to patch friend');
          }
      
          const data = await response.json();
          dispatch(setFriends({ friends: data }));
        } catch (error) {
          console.error('Error patching friend:', error);
          // Handle the error, e.g., display an error message to the user
        }
      };
      

   

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px"/>

                <Box
                    onClick={()=>{
                        navigate(`/profile/${friendId}`);
                        navigate(0);//to renrender the component refreshing it
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color:palette.primary.light,
                                cursor:"pointer"
                            }
                        }}
                    >
                        {name}

                    </Typography>

                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            <IconButton
                onClick={()=>patchFriend()}
                sx={{backgroundColor:primaryLight, p:"0.6rem"}}
            >
                {isFriend?(
                    <PersonRemoveOutlined sx={{color:primaryDark}}/>
                ):(
                    <PersonAddOutlined sx={{color:primaryDark}}/>

                )}
            </IconButton>

        </FlexBetween>
    )


}
export default Friend;