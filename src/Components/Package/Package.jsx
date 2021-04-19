import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button, Tag, Input } from "antd";
import Drawer from "./Drawer";
import {
	Card,
	PageTitle,
	ActionItem,
	DeleteTooltip,
} from "Components/Commons/Commons";

// UTILS
import { Api, MODAL_TYPES, setPaginationObject } from "Helpers";

// STYLES
import { Wrapper } from "./Package.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	perPage: 10,
};

function Package(props) {
	let [packages, setPackages] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[options, setOptions] = useState(),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getPackages();
		// eslint-disable-next-line
	}, []);

	async function getPackages(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("package/list", {
				data: {
					pageNo: pagination.current,
					perPage: pagination.perPage,
				},
				returnUnhandledError: true,
				returnError: true,
			});
			response.data.rows.forEach((element) => {
				element.nameOther = element.name;
			});
			setPackages(response.data.rows);

			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			response = await new Api().get("general/package-data");
			setOptions(response.data);
			setLoading(false);
		} catch (error) {
			console.log("error", error);
			setLoading(false);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();
		if (type === MODAL_TYPES.EDIT) {
			let newList = [...packages];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setPackages(newList);
		} else {
			getPackages();
		}
	}

	function toggleDrawer(type, data = {}) {
		setDrawer({
			...drawer,
			type,
			data,
			open: !drawer.open,
		});
	}

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getPackages(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
				width: 100,
				fixed: "left",
			},
			{
				title: "Price",
				dataIndex: "price",
				key: "price",
				width: 100,
				fixed: "left",
			},
			{
				title: "RewindPerDay",
				dataIndex: "rewindPerDay",
				key: "rewindPerDay",
				width: 130,
				render: (record, text) => (record == -1 ? "Unlimited" : record),
			},
			{
				title: "LikePerDay",
				dataIndex: "likePerDay",
				key: "likePerDay",
				width: 130,
				render: (record, text) => (record == -1 ? "Unlimited" : record),
			},
			{
				title: "SpeedDatingMinutes",
				dataIndex: "speedDatingMinutes",
				key: "speedDatingMinutes",
				width: 170,
				render: (record, text) => (record == -1 ? "Unlimited" : record),
			},
			{
				title: "BoostMinutes",
				dataIndex: "boostMinutes",
				key: "boostMinutes",
				width: 130,
			},

			{
				title: "SuperLikes",
				dataIndex: "superLikes",
				key: "superLikes",
				width: 100,
			},
			{
				title: "IsAds",
				dataIndex: "isAds",
				key: "isAds",
				width: 100,
				render: (isAds) => <>{isAds ? "Yes" : "No"}</>,
			},
			{
				title: "IsWhoLikesYou",
				dataIndex: "isWhoLikesYou",
				key: "isWhoLikesYou",
				width: 130,
				render: (isWhoLikesYou) => <>{isWhoLikesYou ? "Yes" : "No"}</>,
			},
			{
				title: "RewindTimeLimit",
				dataIndex: "rewindTimeLimit",
				key: "rewindTimeLimit",
				width: 150,
			},
			{
				title: "Action",
				key: "action",
				fixed: "right",
				width: 100,
				render: (text, record) => (
					<Space size="middle">
						<ActionItem
							onClick={() => {
								toggleDrawer(MODAL_TYPES.EDIT, record);
							}}
						>
							Edit
						</ActionItem>
					</Space>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Package</PageTitle>
				</div>

				<Table
					loading={loading}
					dataSource={packages}
					rowKey={"id"}
					columns={Columns()}
					onChange={onTableChange}
					pagination={paginationInfo}
					scroll={{ x: 1300 }}
				/>

				{drawer.open && (
					<Drawer
						visible
						type={drawer.type}
						data={drawer.data}
						options={options}
						title={MODAL_TYPES.ADD === drawer.type ? "Add" : "Edit"}
						submitText={
							MODAL_TYPES.ADD === drawer.type ? "Add" : "Update"
						}
						onClose={toggleDrawer}
						onSuccess={onSuccess}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default Package;
