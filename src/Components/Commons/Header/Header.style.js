import styled from "styled-components";

// THEME
import { Layout } from 'antd';

// CONST
import { DIMENSIONS } from "Styles/Constants";

const { Header } = Layout;

export const HeaderWrapper = styled(Header)`
    background  : #fff;
    box-shadow  : 6px 0px 10px #ccc;
	display     : flex;
    position    : fixed;
	justify-content : space-between;
    width       : calc(100% - ${DIMENSIONS.SIDEBAR.FULL}px);
    z-index     : 1;

    .actions {
        .icon {
            cursor      : pointer;
            font-size   : 18px;
        }
    }
`