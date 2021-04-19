import React, { useEffect, useState } from "react";

// COMPONENTS
import { Space, Table } from "antd";
import Drawer from "./Drawer";
import { Card, PageTitle, ActionItem } from "Components/Commons/Commons";
import { PAGINATION, TEMPLATE_TYPES } from "Helpers/Constants";

// UTILS
import { Api, MODAL_TYPES, setPaginationObject } from "Helpers";

// STYLES
import { Wrapper } from "./Template.style";

let initPaginationInfo = {
	total: 0,
	current: 1,
	perPage: 10,
};

function Template(props) {
	let [templateList, setTemplateList] = useState([]),
		[loading, setLoading] = useState(false),
		[perPage, setPerPage] = useState(PAGINATION.PER_PAGE),
		[paginationInfo, setPaginationInfo] = useState(initPaginationInfo),
		[drawer, setDrawer] = useState({
			open: false,
			type: MODAL_TYPES.GIVE,
			data: {},
		}),
		[tempType, setTempType] = useState("SMS"),
		[editModal, setEditModal] = useState({
			data: null,
		});

	useEffect(() => {
		let type = tempType;
		if (
			type.toUpperCase() === TEMPLATE_TYPES.SMS ||
			type.toUpperCase() === TEMPLATE_TYPES.EMAIL
		) {
			type = tempType;
		} else {
			type = TEMPLATE_TYPES.EMAIL;
		}
		// GET TEMPLATE LIST
		getTemplates();
		// eslint-disable-next-line
	}, []);

	async function getTemplates(pagination = paginationInfo) {
		setLoading(true);

		try {
			const response = await new Api().post("template/list", {
				data: {
					perPage: pagination.perPage,
					pageNo: pagination.current,
					returnError: true,
					returnUnhandledError: true,
				},
			});

			response.data.rows.map((template) => {
				template.key = template.id;
				return template;
			});
			setTemplateList(response.data.rows);

			setPaginationInfo({
				...pagination,
				total: response.data.count,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}

	function onSuccess(type, data) {
		toggleDrawer();

		if (type === MODAL_TYPES.EDIT) {
			let newList = [...templateList];

			newList.forEach((item, index) => {
				if (item.id === data.id) newList[index] = { ...data };
			});
			setTemplateList(newList);
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

		getTemplates(newPaginationInfo);
		setPaginationInfo(newPaginationInfo);
	}

	function Columns() {
		return [
			{
				title: "Type",
				key: "templateType",
				dataIndex: "templateType",
				width: 250,
				render: (value) => {
					return value
						.replace(/_/g, " ")
						.replace(/\w+/g, function (w) {
							return (
								w[0].toUpperCase() + w.slice(1).toLowerCase()
							);
						});
				},
			},
			{
				title: "Subject",
				dataIndex: "title",
				key: "title",
				render: (value) => {
					return (
						<div dangerouslySetInnerHTML={{ __html: value }}></div>
					);
				},
				ellipsis: true,
			},
			{
				title: "Action",
				key: "action",
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
					<PageTitle>Template</PageTitle>
				</div>

				<Table
					loading={loading}
					dataSource={templateList}
					rowKey={"id"}
					onChange={onTableChange}
					pagination={paginationInfo}
					columns={Columns()}
				/>

				{drawer.open && (
					<Drawer
						visible
						type={drawer.type}
						data={drawer.data}
						title={
							MODAL_TYPES.VIEW === drawer.type ? "View" : "Edit"
						}
						submitText={
							MODAL_TYPES.VIEW === drawer.type ? "View" : "Update"
						} // OPTIONAL
						onClose={toggleDrawer}
						onSuccess={onSuccess}
					/>
				)}
			</Card>
		</Wrapper>
	);
}

export default Template;
