import React from "react";
import PropTypes from "prop-types";

import { Button, Drawer, Popconfirm } from "antd";
import {
	CardWrapper,
	PageTitleWrapper,
	ActionItemWrapper,
	DrawerFooterWrapper,
} from "./Commons.style";

export function Card(props) {
	return <CardWrapper {...props} />;
}

export function PageTitle(props) {
	return <PageTitleWrapper>{props.children}</PageTitleWrapper>;
}

export function ActionItem(props) {
	return <ActionItemWrapper {...props}>{props.children}</ActionItemWrapper>;
}

function DeleteTooltip(props) {
	return (
		<Popconfirm
			title="Are you sure delete this?"
			onConfirm={props.onConfirm}
			onCancel={props.onCancel}
			okText="Yes"
			cancelText="No"
		>
			<ActionItem>{props.children}</ActionItem>
		</Popconfirm>
	);
}

DeleteTooltip.propTypes = {
	onConfirm: PropTypes.func.isRequired,
};

/* DRAWER */
function SideDrawer(props) {
	let { onConfirm, onSuccess, loading, submitText, ...rest } = props;
	return (
		<Drawer
			placement={"right"}
			width={props.width ? props.width : 450}
			footer={<DrawerFooter {...props} />}
			{...rest}
		></Drawer>
	);
}

function DrawerFooter(props) {
	return (
		<DrawerFooterWrapper>
			{props.onConfirm && props.submitText !== "View" && (
				<Button
					type="primary"
					loading={props.loading}
					form={props.formId}
					htmlType="submit"
					onClick={props.onConfirm}
				>
					{" "}
					{props.submitText || "Submit"}{" "}
				</Button>
			)}
			<Button onClick={props.onClose}>Close</Button>
		</DrawerFooterWrapper>
	);
}

SideDrawer.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	submitText: PropTypes.string,
};

export { DeleteTooltip, SideDrawer };
