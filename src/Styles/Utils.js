import { createGlobalStyle } from 'styled-components'
import { FONTS, responsive } from "./Constants";

export const UtilityStyles = createGlobalStyle`
    * {
        box-sizing  : border-box;
        outline     : none;
    }
    html,
    body{
        margin: 0;
        padding: 0;
    }
    body{
        background-color    : #f0f2f5;
        font-family         : ${FONTS.PRIMARY};
        line-height         : 1.2;
        min-height          : 100vh;
        position            : relative;
    }
    #root {
        display: flex;
    }
    .full-height{
        height: 100%;
    }
    .full-width {
        width: 100%;
    }

    .flex {
        display: flex;
    }
    .f-v-center{
        align-items: center;
    }
    .f-h-center{
        justify-content: center;
    }

    .text-center{
        text-align: center;
    }

    .visible-md{
        display: none;
        ${responsive.TABLET`display:block`}
    }
    .hidden-md{
        ${responsive.TABLET`display:none`}
    }
    .plain-notification{
        background-color: #fff;
    }

    .elipsis {
        overflow        : hidden;
        text-overflow   : ellipsis;
        white-space     : nowrap;
    }
    
    .no-data-text {
        color       : #707070;
        font-size   : 15px;
        text-align  : center;
        width       : 100%;
    }

    .ant-table-body { 
        overflow-x: auto !important
    } 
    .ant-btn {
        min-width       : 100px;
    }
`;
