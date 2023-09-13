//writing the css code in the mui so it can be used in multiple parts of project just by importing
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const FlexBetween= styled(Box)({

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
   
})
export default FlexBetween;