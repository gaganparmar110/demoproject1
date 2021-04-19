import React from "react";
import LazyLoader from "@loadable/component";

import {
	URL_DASHBOARD,
	URL_INTERESTS,
	URL_EDUCATION,
	URL_PACKAGE,
	URL_ETNICITY,
	URL_GENDER,
	URL_RELIGION,
	URL_SEXUAL_PREFERENCE,
	URL_USER,
	URL_PAGES,
	URL_TEMPLATES,
} from "Helpers/Paths";

import {
	BarChartOutlined,
	ShopOutlined,
	AuditOutlined,
	ShoppingOutlined,
	SisternodeOutlined,
	MedicineBoxOutlined,
	PlusCircleOutlined,
	BorderBottomOutlined,
	CloudOutlined,
} from "@ant-design/icons";

export default [
	{
		path: "/",
		exact: true,
		component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
	},
	{
		path: URL_DASHBOARD,
		exact: true,
		component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
		sidebar: {
			name: "Dashboard",
			icon: <BarChartOutlined />,
		},
	},
	// {
	// 	path: URL_TEMPLATES,
	// 	exact: true,
	// 	component: LazyLoader(() => import("Components/Templates/index")),
	// 	sidebar: {
	// 		name: "Templates",
	// 		icon: <BarChartOutlined />,
	// 	},
	// },
	{
		path: URL_TEMPLATES,
		exact: true,
		component: LazyLoader(() => import("Components/Template/Template")),
		sidebar: {
			name: "Template",
			icon: <BarChartOutlined />,
		},
	},
	{
		path: URL_USER,
		exact: true,
		component: LazyLoader(() => import("Components/User/User")),
		sidebar: {
			name: "User",
			icon: <PlusCircleOutlined />,
		},
	},
	{
		path: URL_PACKAGE,
		exact: true,
		component: LazyLoader(() => import("Components/Package/Package")),
		sidebar: {
			name: "Packages",
			icon: <ShoppingOutlined />,
		},
	},
	{
		path: URL_PAGES,
		exact: true,
		component: LazyLoader(() =>
			import("Components/StaticPages/StaticPages")
		),
		sidebar: {
			name: "Static Pages",
			icon: <CloudOutlined />,
			showDivider: true,
		},
	},
	{
		path: "/",
		exact: true,
		component: LazyLoader(() => import("Components/Dashboard/Dashboard")),
		sidebar: {
			name: "DropDown",
			icon: <ShopOutlined />,
			nested: [
				{
					name: "Interests",
					icon: <ShopOutlined />,
					path: URL_INTERESTS,
					exact: true,
					component: LazyLoader(() =>
						import("Components/DropDown/Interests/Interests")
					),
				},
				{
					name: "Education",
					icon: <AuditOutlined />,
					path: URL_EDUCATION,
					exact: true,
					component: LazyLoader(() =>
						import("Components/DropDown/Education/Education")
					),
				},
				{
					name: "Ethnicity",
					icon: <SisternodeOutlined />,
					path: URL_ETNICITY,
					exact: true,
					component: LazyLoader(() =>
						import("Components/DropDown/Ethnicity/Ethnicity")
					),
				},
				{
					name: "Gender",
					icon: <MedicineBoxOutlined />,
					path: URL_GENDER,
					exact: true,
					component: LazyLoader(() =>
						import("Components/DropDown/Gender/Gender")
					),
				},
				{
					name: "Religion",
					icon: <BorderBottomOutlined />,
					path: URL_RELIGION,
					exact: true,
					component: LazyLoader(() =>
						import("Components/DropDown/Religion/Religion")
					),
				},
				{
					name: "Sexual Preference",
					icon: <PlusCircleOutlined />,
					path: URL_SEXUAL_PREFERENCE,
					exact: true,
					component: LazyLoader(() =>
						import(
							"Components/DropDown/SexualPreference/SexualPreference"
						)
					),
				},
			],
		},
	},
];
