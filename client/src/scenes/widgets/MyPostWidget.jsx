//Icons
import { EditOutlined,DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined, 
    
} from "@mui/icons-material";
//material
import { Box, Divider, Typography,InputBase,useTheme,Button,IconButton, useMediaQuery} from "@mui/material";
//to put an image
import Dropzone from "react-dropzone";
//components
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
//hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//from the redux store in state folder we created
import { setPosts } from "state";

const MyPostWidget=({picturePath})=>{
    const dispatch=useDispatch();

    //to determine if someone click imageicon to drop the image
    const [isImage,setIsImage]=useState(false);
    const [image,setImage]=useState(null);

    //reprsenting actual post content
    const [post,setPost]=useState("");

    //send to corresponding id who is posting the content
    const {_id}=useSelector(state=>state.user);
    const token=useSelector(state=>state.token);

    const isNonMobileScreens=useMediaQuery("(min-width: 1000px)");

    //colors
    const {palette}=useTheme();
    const mediumMain=palette.neutral.mediumMain;
    const medium=palette.neutral.medium;

    const handlePost=async()=>{
        const formData=new FormData();
        formData.append("userId",_id);
        formData.append("description",post);

        if(image){
            //in server index.js post section grabing the key of picture to take the value
            formData.append("picture",image);
            formData.append("picturePath",image.name);
        }

        //req to backend and send the response
        const response=await fetch("http://localhost:3001/posts",{
            method:"POST",
            headers:{ Authorization: `Bearer ${token}`},
            body: formData,
            
        });
        //convert to json
        const posts=await response.json();
        dispatch(setPosts({posts}));
        //once make an api call we have to reset again
        setImage(null);
        setPost("");

    };

    return (
    <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                {/*to keep the post along with the owner profile at toleft corner*/}
                {console.log(picturePath)}
                <UserImage image={picturePath}/>
                <InputBase 
                    placeholder="What's your dish..."
                    onChange={(event)=>setPost(event.target.value)}
                    value={post}
                    sx={{
                        width:"100%",
                        backgroundColor:palette.neutral.light,
                        borderRadius:"2rem",
                        padding:"1rem 2rem"
                    }}
                />
            </FlexBetween>
            {/*if clicked image*/}
            {isImage&&(
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                setImage(acceptedFiles[0]);
                            }}
>
                            {({ getRootProps, getInputProps }) => (
                                <FlexBetween>
                                    <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            width="100%"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                        </FlexBetween>
                                    )}
                                    </Box>
                                    {/*for removing*/}
                                    {image&&(
                                        <IconButton
                                            onClick={()=>setImage(null)}
                                            sx={{width:"15%"}}
                                        >
                                            <DeleteOutlined/>

                                        </IconButton>

                                    )}
                                </FlexBetween>
                            )}
                    </Dropzone>

                </Box>
            )}

        <Divider sx={{margin:"1.25rem 0"}}/>

        <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={()=>setIsImage(!isImage)}>
                    <ImageOutlined sx={{color:mediumMain}}/>
                    <Typography
                        color={mediumMain}
                        sx={{"&:hover":{cursror:"pointer",color:medium}}}
                    >
                        Image
                    </Typography>
                </FlexBetween>

            {isNonMobileScreens?
                (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>

                    </>
                ):(
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{color:mediumMain}}/>
                    </FlexBetween>
                )}

                {/*Post button*/}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color:palette.background.alt,
                        backgroundColor:palette.primary.main,
                        borderRadius:"3rem"
                    }}
                >
                    POST
                </Button>

        </FlexBetween>

    </WidgetWrapper>
    )



}
export default MyPostWidget



