import React, { useEffect, useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form } from "antd";
import Api from "Helpers/ApiHandler";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import {
	EditorState,
	ContentState,
	convertFromHTML,
	convertToRaw,
} from "draft-js";

export default function EditPage(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false),
		[editorState, setEditorState] = useState(EditorState.createEmpty());

	useEffect(() => {
		setEditorState(
			EditorState.createWithContent(
				ContentState.createFromBlockArray(
					convertFromHTML(`<p>${props.data.content}</p>`)
				)
			)
		);
		// eslint-disable-next-line
	}, []);

	const editorStateChange = (editorState) => {
		setEditorState(editorState);
	};

	async function formSubmit(values) {
		const editorValue = convertToRaw(editorState.getCurrentContent());
		const hashConfig = {
			trigger: "#",
			separator: " ",
		};
		const markup = draftToHtml(editorValue, hashConfig);
		let formValue = { ...values };
		formValue.content = markup;
		const params = new URLSearchParams();
		params.append("title", formValue.title);
		params.append("content", formValue.content);
		try {
			setLoading(true);
			let url = "page",
				config = {
					data: params,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					returnUnhandledError: true,
					returnError: true,
				};
			if (props.data.slug === "about-us")
				await new Api().put(url + `/${props.data.slug}`, config);
			else if (props.data.slug === "privacy-policy")
				await new Api().put(url + `/${props.data.slug}`, config);
			else await new Api().put(url + `/${props.data.slug}`, config);

			setLoading(false);
			props.onSuccess(props.type, {
				...props.data,
				...formValue,
			});
		} catch (error) {
			console.log(
				"TCL ~ file: Drawer.jsx ~ line 25 ~ formSubmit ~ error",
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
			{props.title.includes("Add") || props.title.includes("Edit") ? (
				<Form
					id={props.formId}
					className="form-container"
					form={form}
					onFinish={formSubmit}
					initialValues={props.data}
				>
					<Form.Item
						name="title"
						rules={[
							{
								required: true,
								message: "Please input your title!",
							},
						]}
					>
						<Input size="large" placeholder="Title" />
					</Form.Item>
					<Form.Item
						name="content"
						rules={[
							{
								required: true,
								message: "Please input your title!",
							},
						]}
					>
						<div style={{ border: "1px solid #f1f1f1" }}>
							<Editor
								editorState={editorState}
								wrapperClassName="demo-wrapper"
								editorClassName="demo-editor"
								onEditorStateChange={editorStateChange}
								toolbar={{
									options: ["inline", "blockType"],
									inline: {
										options: [
											"bold",
											"italic",
											"underline",
										],
									},
									blockType: {
										inDropdown: true,
										options: [
											"Normal",
											"H1",
											"H2",
											"H3",
											"H4",
											"H5",
											"H6",
											"Blockquote",
											"Code",
										],
										className: undefined,
										component: undefined,
										dropdownClassName: undefined,
									},
								}}
							/>
						</div>
					</Form.Item>
				</Form>
			) : (
				<div>
					<div>Title: {props.data.title ? props.data.title : ""}</div>
					<div>
						Content:{" "}
						{props.data.content ? (
							<div
								dangerouslySetInnerHTML={{
									__html: props.data.content,
								}}
							/>
						) : (
							""
						)}
					</div>
				</div>
			)}
		</SideDrawer>
	);
}
