import styled from "styled-components";

// THEME
import { Layout } from 'antd';

import {DIMENSIONS} from "Styles/Constants";

export const RightContentWrapper = styled.div`
    width: calc(100% - ${DIMENSIONS.SIDEBAR.FULL}px);
`

export const ContentWrapper = styled.div`
    margin  : ${DIMENSIONS.HEADER}px 0px 0;
    overflow: auto;
    padding : 15px;
    height  : calc(100vh - ${DIMENSIONS.HEADER}px);
`

export const LayoutStyled = styled(Layout)`
    overflow-x : hidden;
`