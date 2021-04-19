import React, { useEffect, useState, useRef } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form, Tag } from "antd";
import { MODAL_TYPES } from "Helpers";
import { TEMPLATE_TYPES } from "Helpers/Constants";
import Api from "Helpers/ApiHandler";
import EmailEditor from "react-email-editor";

const { TextArea } = Input;

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false),
		[dataFields, setDataFields] = useState({
			title: props.data.title,
			content: props.data.content,
		});

	let { templateType } = props.data;
	const myEditor = useRef(null);

	async function formSubmit() {
		setLoading(true);
		let { templateType } = props.data;
		let value = {};
		if (templateType.toUpperCase() === TEMPLATE_TYPES.EMAIL) {
			await myEditor.current.editor.saveDesign();
			await myEditor.current.editor.exportHtml((tempData) => {
				const { design, html } = tempData;
				value.content = html;
				value.json = JSON.stringify(design);
				editTemplate(value);
			});
		} else {
			editTemplate();
		}
	}
	async function editTemplate(values) {
		let dataValues = {};
		let { templateType, slug } = props.data;
		if (templateType === "SMS" || templateType === "NOTIFICATION") {
			dataValues = {
				title: dataFields.title,
				content: dataFields.content,
			};
		} else {
			dataValues = { ...values };
			dataValues.title = dataFields.title;
		}
		try {
			// API CALLED FOR EDIT
			await new Api().put(`template/${slug}`, {
				data: dataValues,
				returnError: true,
				returnUnhandledError: true,
			});
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...dataValues });
		} catch (error) {
			setLoading(false);
			console.error("editTemplate -> error", error);
		}
	}
	function onEditorLoad() {
		let { json } = props.data;
		if (!myEditor.current)
			setTimeout(
				() => myEditor.current.editor.loadDesign(JSON.parse(json)),
				3000
			);
		else myEditor.current.editor.loadDesign(JSON.parse(json));
	}
	function handleChange(e) {
		const { name, value } = e.target;
		setDataFields({ ...dataFields, [name]: value });
	}

	return (
		<SideDrawer
			width={
				templateType === "SMS" || templateType === "NOTIFICATION"
					? 450
					: 980
			}
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
				<Tag color="red">
					Note: Please do not change any word which is enclosed in
					braces {"{ }"}
				</Tag>
				<Form className="form-container" initialValues={props.data}>
					<Form.Item
						name="title"
						label="Title"
						rules={[
							{
								required: true,
								message: "Please input your title!",
							},
						]}
					>
						<Input
							name="title"
							size="large"
							placeholder="Title"
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item
						name="content"
						label="Content"
						rules={[
							{
								required: true,
								message: "Please input your content!",
							},
						]}
					>
						{templateType.toUpperCase() === TEMPLATE_TYPES.EMAIL ? (
							<EmailEditor
								ref={(editor) => (myEditor.current = editor)}
								onLoad={onEditorLoad}
							/>
						) : (
							<TextArea
								name="content"
								rows={4}
								placeholder="content"
								onChange={handleChange}
							/>
						)}
					</Form.Item>
				</Form>{" "}
			</Form>
		</SideDrawer>
	);
}
