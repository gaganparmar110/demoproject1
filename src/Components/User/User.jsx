import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table, Button, Input } from "antd";
import Drawer from "./Drawer";
import ReactRoundedImage from "react-rounded-image";
import {
	Card,
	PageTitle,
	ActionItem,
	DeleteTooltip,
} from "Components/Commons/Commons";

// UTILS
import {
	Api,
	MODAL_TYPES,
	setPaginationObject,
	getColumnSearchProps,
} from "Helpers";

// STYLES
import { Wrapper } from "./User.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	sort: {
		field: "firstName",
		order: "asc",
	},
	showSizeChanger: false,
};

function User(props) {
	let [User, setUser] = useState([]),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[loading, setLoading] = useState(false),
		[dropDownOptions, setDropDownOptions] = useState({
			education: [],
			ethnicity: [],
			gender: [],
			interests: [],
			packages: [],
			religion: [],
			sexualPreference: [],
		}),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.VIEW,
			data: {},
		});

	useEffect(() => {
		getUser();
		getDropdownOption();
		// eslint-disable-next-line
	}, []);

	async function getUser(pagination = paginationInfo) {
		try {
			setLoading(true);
			let response = await new Api().post("user/list", {
				data: {
					pageNo: pagination.current,
					sort: pagination.sort,
					perPage: 10,
				},
				returnUnhandledError: true,
				returnError: true,
			});
			response.data.rows.forEach((element) => {
				element.nameOther = element.firstName;
			});
			setUser(response.data.rows);

			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	async function getDropdownOption() {
		setLoading(true);
		try {
			let response = await new Api().get("general/drop-down/"),
				packageResponse = await new Api().post("package/list");
			setDropDownOptions({
				...dropDownOptions,
				education: response.data.educations,
				ethnicity: response.data.ethicizes,
				gender: response.data.genders,
				interests: response.data.interests,
				religion: response.data.religions,
				sexualPreference: response.data.sexualPreferences,
				packages: packageResponse.data.rows,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("error:", error);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();
		getUser();
	}

	async function onDelete(id) {
		setLoading(true);
		await new Api().delete("user/detail/" + id);
		getUser();
	}

	async function toggleDrawer(type, data = {}) {
		if (type === "EDIT" && data) {
			let response = await new Api().get(`user/detail/${data}`);
			data = response.data;
		} else if (type === "VIEW" && data) {
			let config = {
				data: {
					toUser: data,
				},
			};
			let response = await new Api().post("report/list", config);
			data = response.data;
		}
		setDrawer({
			...drawer,
			type,
			data,
			open: !drawer.open,
		});
	}

	function onTableChange(...rest) {
		let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);

		getUser(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Profile Picture",
				dataIndex: "image",
				key: "image",
				sorter: true,
				width: 100,
				render: (text, record) => (
					<ReactRoundedImage
						image={record.image ? record.image : ""}
						roundedSize="0"
						imageWidth="50"
						imageHeight="50"
					/>
				),
			},
			{
				title: "First Name",
				dataIndex: "firstName",
				key: "firstName",
				sorter: true,
				width: 100,
				...getColumnSearchProps("firstName"),
			},
			{
				title: "Last Name",
				dataIndex: "lastName",
				key: "lastName",
				sorter: true,
				width: 100,
				...getColumnSearchProps("lastName"),
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				sorter: true,
				width: 250,
				...getColumnSearchProps("email"),
			},
			{
				title: "Phone",
				dataIndex: "phone",
				key: "phone",
				width: 100,
				sorter: true,
				...getColumnSearchProps("phone"),
			},

			{
				title: "Report Count",
				dataIndex: "reportCount",
				key: "reportCount",
				width: 100,
			},

			{
				title: "Action",
				key: "action",
				fixed: "right",
				width: 160,
				render: (text, record) => (
					<Space size="middle">
						<ActionItem
							onClick={() => {
								toggleDrawer(MODAL_TYPES.VIEW, record.id);
							}}
						>
							View Report
						</ActionItem>
						<ActionItem
							onClick={() => {
								toggleDrawer(MODAL_TYPES.EDIT, record.id);
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
					<PageTitle>User</PageTitle>
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
					dataSource={User}
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
						dropdownoptions={dropDownOptions}
						data={drawer.data}
						title={
							MODAL_TYPES.ADD === drawer.type
								? "Add"
								: MODAL_TYPES.EDIT === drawer.type
								? "Edit"
								: "View"
						}
						submitText={
							MODAL_TYPES.ADD === drawer.type
								? "Add"
								: MODAL_TYPES.EDIT === drawer.type
								? "Edit"
								: "View"
						} // OPTIONAL
						onClose={toggleDrawer}
						onSuccess={onSuccess}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default User;
