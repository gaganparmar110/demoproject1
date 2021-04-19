import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

// STYLES
import {
	SidebarWrapper,
	MenuStyled,
	MenuItem,
	SubMenu,
	LogoWrapper,
} from "./Sidebar.style";

// IMAGES
import LogoImage from "Assets/Images/logo.png";

// CONST
import Routes from "Routes/RoutesList";
import { DIMENSIONS } from "Styles/Constants";

function Sidebar(props) {
	let [routes, setRoutes] = useState([]);

	useEffect(() => {
		let filtered = Routes.filter((route) => route.sidebar);
		setRoutes(filtered);
	}, []);

	function listItemClick(route) {
		props.history.push(route.path);
	}

	return (
		<SidebarWrapper width={DIMENSIONS.SIDEBAR.FULL}>
			<LogoWrapper className="flex f-v-center f-h-center">
				<img
					className="img"
					src={LogoImage}
					alt="Logo"
					style={{ marginTop: "20px" }}
				/>
			</LogoWrapper>
			<MenuStyled
				mode="inline"
				defaultSelectedKeys={[props.history.location.pathname]}
			>
				{routes.map((route) => {
					return route.sidebar.nested ? (
						<SubMenu
							key={route.path}
							icon={route.sidebar.icon}
							title={route.sidebar.name}
						>
							{route.sidebar.nested.map((child) => (
								<MenuItem
									key={child.path}
									onClick={() => {
										listItemClick(child);
									}}
								>
									{child.name}
								</MenuItem>
							))}
						</SubMenu>
					) : (
						<MenuItem
							key={route.path}
							icon={route.sidebar.icon}
							onClick={() => {
								listItemClick(route);
							}}
						>
							{route.sidebar.name}
						</MenuItem>
					);
				})}
			</MenuStyled>
		</SidebarWrapper>
	);
}

export default withRouter(Sidebar);
