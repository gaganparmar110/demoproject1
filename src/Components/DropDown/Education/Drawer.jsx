import React, { useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false);

	async function formSubmit(values) {
		try {
			setLoading(true);
			let url = "education",
				config = {
					data: values,
					returnUnhandledError: true,
					returnError: true,
				};

			if (props.type === MODAL_TYPES.ADD)
				await new Api().post(url, config);
			else await new Api().put(url + `/${props.data.id}`, config);
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...values });
		} catch (error) {
			console.log(
				"TCL ~ file: Drawer.jsx ~ line 24 ~ formSubmit ~ error",
				error
			);
		}
	}

	return (
		<SideDrawer
			loading={loading}
			onConfirm={() => {
				form.submit();
			}}
			{...props}
		>
			<Form
				id={props.formId}
				form={form}
				className="form-container"
				onFinish={formSubmit}
				initialValues={props.data}
			>
				<Form.Item
					name="name"
					label="Name"
					labelCol={{ span: 24 }}
					rules={[
						{ required: true, message: "Please input your name!" },
					]}
				>
					<Input size="large" placeholder="Name" />
				</Form.Item>
			</Form>
		</SideDrawer>
	);
}
