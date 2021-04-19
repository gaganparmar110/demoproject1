import React from 'react';
import { useDispatch } from 'react-redux';

import {
    LogoutOutlined,
} from '@ant-design/icons';

// STYLES
import { HeaderWrapper } from "./Header.style";

// REDUX 
import { logOutUser } from "Redux/Auth/Actions";

function Topbar() {
    const dispatch = useDispatch();
    return (
        <HeaderWrapper>
            <div className="placeholder">

            </div>
            <div className="actions">
                <LogoutOutlined className="icon" onClick = {() => {dispatch(logOutUser())}}/>
            </div>
        </HeaderWrapper>
    )
}

export default Topbar;