//icons
import { ManageAccountsOutlined,EditOutlined,LocationOnOutlined,WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";

//base components
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

//hooks
import { useSelector } from "react-redux"; // select and retrieve specific pieces of data from the store
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget=({userId,picturePath})=>{
    const [user, setUser]=useState(null);
    const { palette }=useTheme();
    const navigate=useNavigate();
    const token=useSelector(state=>state.token);
    //accessing color
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;

    //to get info about that particular user
    const getUser=async()=>{
        //call to the middleware of auth.js which contains Authorization as the header
        const response=await fetch(`http://localhost:3001/users/${userId}`,
            {
                method:'GET',
                headers:{ Authorization: `Bearer ${token}`}

            }
        );
            const data=await response.json();
            setUser(data);// when the user data is successfully fetched, it will be stored in the user state variable.
    };

    useEffect(()=>{
        getUser();//asynchronous function responsible for making an API request to fetch user data.

    },[])//eslint-disable-line react-hooks/exhaustive-deps

    //([]), it means that the effect will only run once, immediately after the component is mounted

    if(!user){
        return null;
    }

    //destructuring the info of user if it exists
    const{
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    }=user;

    return (
        <WidgetWrapper>
            {/*First Row*/}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={()=>navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover":{
                                    color:palette.primary.light,
                                    cursor:"pointer"
                                }
                            }}
                        >
                             {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length}</Typography>
                    </Box>
                    
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider/>

                {/*SECOND ROW*/}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color:main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color:main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>

                </Box>
            
            <Divider/>
            
                {/*THIRD ROW*/}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography>Who viewed your Profile</Typography>
                        <Typography color={main} fontWeight="500">
                            {viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography>Who viewed your Dish</Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>

            
        </WidgetWrapper>
    )
       
}
export default UserWidget;




 
