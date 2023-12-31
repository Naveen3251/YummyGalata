import {useState} from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//for the formlib
import { Formik,Form } from "formik";
//validation library
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

//react redux to store info
import {  useDispatch } from "react-redux";
import { setLogin } from "state"

//uploads 
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

//defining schema using yupvalidation

//Registration
const registerSchema=yup.object().shape({
    firstName : yup.string().required("required"),
    lastName : yup.string().required("required"),
    email : yup.string().email("invalid email").required("required"),
    password : yup.string().required("required"),
    location : yup.string().required("required"),
    occupation : yup.string().required("required"),
    picture : yup.string().required("required")
});

//Login
const loginSchema=yup.object().shape({
    email : yup.string().email("invalid email").required("required"),
    password : yup.string().required("required"),
});

//setting up initial value for the above schema
const initialValuesRegister={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",

};

const initialValuesLogin={
    email:"",
    password:"",
};

//Form component
const LRForm=()=>{
    //display diff form using this state (registerpage or login page)
    const [pageType,setPageType]=useState("login");
    const {palette}=useTheme();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isNonMobile=useMediaQuery("(min-width:600px)");

    //stores simply to indicate app is in which state
    const isLogin=pageType==="login";
    const isRegister=pageType==="register";


    //logic for the whole form(login register)
    const register=async(values,onSubmitProps)=>{
        //this allows us to send form info with image
        const formData=new FormData();
        for(let value in values){
            formData.append(value,values[value])

        };
        formData.append('picturePath',values.picture.name)
        //sendding data to backend
        const savedUserResponse=await fetch(
            "http://localhost:3001/auth/register",
            {
                method:"POST",
                body:formData,
            }
        );
        //response in json format
        const savedUser=await savedUserResponse.json();
        onSubmitProps.resetForm();

        //change the page type for navigation
        if (savedUser){
            setPageType("login");
        }
    };

    const login=async(values,onSubmitProps)=>{
        const loggedInResponse=await fetch(
            "http://localhost:3001/auth/login",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
            }
        );
        const loggedIn=await loggedInResponse.json();
        onSubmitProps.resetForm();

        if(loggedIn){
            {/*coming from redux state*/}
            dispatch(
                setLogin({
                    user:loggedIn.user,
                    token:loggedIn.token,

                })
            );
            navigate("/home");
        }


    };

    const handleFormSubmit=async (values,onSubmitProps)=>{
        if(isLogin) await login(values,onSubmitProps);
        if(isRegister) await register(values,onSubmitProps);
    };

    //using formik for returning  forms(login or register)
    return(
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin? initialValuesLogin:initialValuesRegister}
            validationSchema={isLogin?loginSchema:registerSchema}
        >
            {(
                {
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }
            )=>(
                <Form inSubmit={handleSubmit}>
                    {/*only register*/}
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx={
                            {
                                "& > div":{ gridColumn: isNonMobile?undefined:"span4"}
                            }
                        }
                    >
                        {isRegister&&(
                            <>
                                <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} 
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                                />
                                 <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} 
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                                />
                                 <TextField label="Location" onBlur={handleBlur} onChange={handleChange} value={values.location} 
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                                />
                                 <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation} 
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                                />
                                {/*for image*/}
                            <Box gridColumn="span4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        setFieldValue("picture", acceptedFiles[0]);
                                    }}
>
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <p>Add picture Here</p>
                                        ) : (
                                        <FlexBetween>
                                            <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                            </Box>
    )}
</Dropzone>



                                </Box>
                                

                            </>
                        )}
                    {/*both for login and register*/}
                    <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} 
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                    />
                    <TextField label="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} 
                                        name="password"
                                        type="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: isNonMobile ? "span4" : "span2" }}
                    />
                    </Box>

                    {/*Buttons*/}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m:"2rem 0",
                                p:"1rem",
                                backgroundColor:palette.primary.main,
                                color:palette.background.alt,
                                "&:hover":{color:palette.primary.main}
                            }}>
                                {isLogin?"LOGIN":"REGISTER"}
                            </Button>
                            <Typography
                                onClick={()=>{
                                    setPageType(isLogin?"register":"login")
                                    resetForm();
                                }}
                                sx={{
                                    textDecoration:"underline",
                                    color:palette.primary.main,
                                    "&:hover":{
                                        cursor:"pointer",
                                        color:palette.primary.light,
                                    },
                                }}
                            >
                                {isLogin?"Don't have account?SignUp here":"Already have an account?Login here."}
                            </Typography>
                    </Box>
                </Form>
            )}

        </Formik>
    )

}

export default LRForm;
