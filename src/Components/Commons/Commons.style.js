import styled from "styled-components";

export const CardWrapper = styled.div`
    background      : #fff;
    box-shadow      : 0 0 15px #dbdbdb;
    border-radius   : 5px;  
    padding         : ${(props) => props.spacing || "10"}px;

    .ant-table table {
        margin-top : 10px;
    }
`

export const PageTitleWrapper = styled.h1`
    color: rgb(120, 129, 149);
`
export const ActionItemWrapper = styled.span`
    color: #008dff;
    cursor : pointer;
`

/*  DRAWER CONTENT */
export const DrawerContent = styled.div`
    
`
export const DrawerFooterWrapper = styled.div`
    .ant-btn {
        margin-right    : 10px;
        min-width       : 100px;
        height          : 40px;
    }
`