//to keep track of aplication data in organized way(state management)
import { createSlice } from "@reduxjs/toolkit";

//this is state which is stored in global
const initialState={
    mode:"light",
    user: null,
    token: null,
    posts: [],

};

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        //to set light or dark mode
        setMode:(state)=>{
            state.mode=state.mode === "light"?"dark":"light";
        },
        //login setup
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;

        },
        //logout
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        //friend list in our local state
        setFriends:(state,action)=>{
            //if user keep untill as friends untill removal
            if(state.user){
                state.user.friends=action.payload.friends;
            }
            else{
                console.error("user friends non-existen")
            }
        },
        //posts
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        },
        //set the post
        setPost:(state,action)=>{
            //grab the post map each one
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id) return action.payload.post;
                return post;
            
            });
            state.posts=updatedPosts;
        }

    }
})

//destructuring
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost}=authSlice.actions;

export default authSlice.reducer;

