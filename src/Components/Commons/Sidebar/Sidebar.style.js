import styled from "styled-components";

// THEME
import { Layout } from "antd";
import { Menu } from "antd";

// CONST
import { DIMENSIONS } from "Styles/Constants";
const { Sider } = Layout;

export const SidebarWrapper = styled(Sider)`
	background: #0c1427;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100vh;
`;

export const LogoWrapper = styled.div`
	height: ${DIMENSIONS.HEADER}px;

	.img {
		height: 90%;
	}
	.title {
		color: #fff;
	}
`;

export const MenuStyled = styled(Menu)`
	border: 0;
`;

const MenuStyle = `
    font-size : 16px;
    transition  : .3s;

    .anticon {
        font-size: 16px;
    }
    &::after {
        right : 1px;
    }

    .ant-menu-sub.ant-menu-inline {
        background-color    : #000;
    }
    
    .ant-menu:not(.ant-menu-horizontal) &.ant-menu-item-selected,
    .ant-menu:not(.ant-menu-horizontal) &.ant-menu-item:active,
    .ant-menu:not(.ant-menu-horizontal) &.ant-menu-submenu-active,
    .ant-menu-submenu-title:active {
        background-color    : #14203c;
    }
`;
export const MenuItem = styled(Menu.Item)`
	${MenuStyle}
`;

export const SubMenu = styled(Menu.SubMenu)`
	${MenuStyle}
`;
