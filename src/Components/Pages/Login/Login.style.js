import styled from "styled-components";

export const LoginWrapper = styled.div`
    height  : calc(100vh - 30px);
    width   : 100%;
`

export const LoginBox = styled.div`
    background      : #fff;
    border-radius   : 5px;
    box-shadow      : 0px 0px 20px rgba(92,111,139,0.12);
    padding         : 30px;
    width           : 500px;

    .form-container {
        margin  : 20px auto 30px;
        width   : 90%;
    }
    .button-container {
        text-align : center;
        
        .btn {
            text-transform  : uppercase;
            min-width   : 125px;
            min-height  : 45px;
        }
    }
`

export const LogoWrapper = styled.div`
    text-align  : center;
    width       : 100%;

    .img {
        max-height : 75px;
    }
`