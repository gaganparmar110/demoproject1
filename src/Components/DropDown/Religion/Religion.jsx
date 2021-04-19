import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button } from "antd";
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
import { Wrapper } from "./Religion.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	perPage: 10,
};

function Religion(props) {
	let [religion, setReligion] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getReligion();
		// eslint-disable-next-line
	}, []);

	async function getReligion(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("religion/list", {
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
			setReligion(response.data.rows);

			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			setLoading(false);
		} catch (error) {
			console.log("error", error);
			setLoading(false);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();

		if (type === MODAL_TYPES.EDIT) {
			let newList = [...religion];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setReligion(newList);
		} else {
			getReligion();
		}
	}

	async function onDelete(id) {
		setLoading(true);
		await new Api().delete("religion/" + id);
		getReligion();
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

		getReligion(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
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
						<DeleteTooltip onConfirm={() => onDelete(record.id)}>
							Delete
						</DeleteTooltip>
					</Space>
				),
			},
		];
	}

	return (
		<Wrapper>
			<Card spacing={24}>
				<div className="title-wrapper flex">
					<PageTitle>Religion</PageTitle>
					<div className="actions">
						<Button
							type="primary"
							onClick={() => {
								toggleDrawer(MODAL_TYPES.ADD);
							}}
						>
							{" "}
							Add{" "}
						</Button>
					</div>
				</div>

				<Table
					loading={loading}
					dataSource={religion}
					rowKey={"id"}
					columns={Columns()}
					onChange={onTableChange}
					pagination={paginationInfo}
				/>

				{drawer.open && (
					<Drawer
						visible
						type={drawer.type}
						data={drawer.data}
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

export default Religion;
