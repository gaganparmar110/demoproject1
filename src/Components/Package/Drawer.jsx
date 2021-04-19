import React, { useEffect, useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import { Input, Form, Checkbox, Select, Tooltip } from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false),
		[isWhoLikesYou, setIsWhoLikesYou] = useState(false),
		[rewindPerDay, setRewindPerDay] = useState(false),
		[likePerDay, setLikePerDay] = useState(false),
		[speedDatingMinutes, setSpeedDatingMinutes] = useState(false),
		[isAds, setIsAds] = useState(false);

	const { Option } = Select;
	const disableMessage = "This field is disabled!!";

	useEffect(() => {
		if (props.data) {
			setIsAds(props.data.isAds);
			setIsWhoLikesYou(props.data.isWhoLikesYou);
			if (props.data.rewindPerDay == -1) {
				setRewindPerDay(true);
			}
			if (props.data.likePerDay == -1) {
				setLikePerDay(true);
			}
			if (props.data.speedDatingMinutes == -1) {
				setSpeedDatingMinutes(true);
			}
		}
		// eslint-disable-next-line
	}, []);

	async function formSubmit(values) {
		let dataValues = { ...values };
		dataValues.isAds = isAds;
		dataValues.isWhoLikesYou = isWhoLikesYou;
		if (rewindPerDay) {
			dataValues.rewindPerDay = "-1";
		}
		if (likePerDay) {
			dataValues.likePerDay = "-1";
		}
		if (speedDatingMinutes) {
			dataValues.speedDatingMinutes = "-1";
		}
		try {
			setLoading(true);
			let url = "package",
				config = {
					data: dataValues,
					returnUnhandledError: true,
					returnError: true,
				};
			if (props.type === MODAL_TYPES.ADD)
				await new Api().post(url, config);
			else await new Api().put(url + `/${props.data.id}`, config);
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...dataValues });
		} catch (error) {
			console.log(
				"TCL ~ file: Drawer.jsx ~ line 24 ~ formSubmit ~ error",
				error
			);
		}
	}
	function checkboxHandle(e) {
		if (e.target.name === "rewindPerDay") {
			setRewindPerDay(e.target.checked);
		} else if (e.target.name === "isWhoLikesYou") {
			setIsWhoLikesYou(e.target.checked);
		} else if (e.target.name === "isAds") {
			setIsAds(e.target.checked);
		} else if (e.target.name === "likePerDay") {
			setLikePerDay(e.target.checked);
		} else if (e.target.name === "speedDatingMinutes") {
			setSpeedDatingMinutes(e.target.checked);
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
				initialValues={{
					name: props.data.name ? props.data.name : "",
					price: props.data.price ? props.data.price : "",
					description: props.data.description
						? props.data.description
						: "",
					boostMinutes: props.data.boostMinutes,
					filters: props.data.filters ? props.data.filters : "",
					features: props.data.features ? props.data.features : "",
					superLikes: props.data.superLikes,
					rewindTimeLimit: props.data.rewindTimeLimit,
					isAds: props.data.isAds,
					isWhoLikesYou: props.data.isWhoLikesYou,
					rewindPerDay:
						props.data.rewindPerDay == "-1"
							? "1"
							: props.data.rewindPerDay,
					likePerDay:
						props.data.likePerDay == "-1"
							? "1"
							: props.data.likePerDay,
					speedDatingMinutes:
						props.data.speedDatingMinutes == "-1"
							? "1"
							: props.data.speedDatingMinutes,
				}}
			>
				<Form.Item name="name" label="Name" labelCol={{ span: 24 }}>
					<Tooltip title={disableMessage}>
						<div
							style={{
								border: "2px solid #f1f1f1",
								borderRadius: "5px",
								padding: "6px",
							}}
						>
							{props.data.name ? props.data.name : "Name"}
						</div>
					</Tooltip>
				</Form.Item>
				<Form.Item name="price" label="Price" labelCol={{ span: 24 }}>
					<Tooltip title={disableMessage}>
						<div
							style={{
								border: "2px solid #f1f1f1",
								borderRadius: "5px",
								padding: "6px",
							}}
						>
							{props.data.price ? props.data.price : "Price"}
						</div>
					</Tooltip>
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					labelCol={{ span: 24 }}
				>
					<Tooltip title={disableMessage}>
						<div
							style={{
								border: "2px solid #f1f1f1",
								borderRadius: "5px",
								padding: "6px",
							}}
						>
							{props.data.description ? (
								<div
									dangerouslySetInnerHTML={{
										__html: props.data.description.replace(
											/(?:\r\n|\r|\n)/g,
											"<br />"
										),
									}}
								/>
							) : (
								"Description"
							)}
						</div>
					</Tooltip>
				</Form.Item>

				<Form.Item
					name="boostMinutes"
					label="BoostMinutes"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your boost minutes!",
						},
					]}
				>
					<Input
						type="number"
						size="large"
						placeholder="boost minutes"
					/>
				</Form.Item>
				<Form.Item
					name="filters"
					label="Filters"
					labelCol={{ span: 24 }}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="Please select"
					>
						{props.options.filters &&
							props.options.filters.map((item, index) => (
								<Option value={item} key={item.value}>
									{item}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="features"
					label="Features"
					labelCol={{ span: 24 }}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="Please select"
					>
						{props.options.features &&
							props.options.features.map((item, index) => (
								<Option value={item} key={item.value}>
									{item}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="superLikes"
					label="SuperLikes"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your superLikes!",
						},
					]}
				>
					<Input
						type="number"
						size="large"
						placeholder="SuperLikes"
					/>
				</Form.Item>
				<Form.Item
					name="isAds"
					label="IsAds"
					labelCol={{ span: 24 }}
					valuePropName="checked"
				>
					<Checkbox
						name="isAds"
						defaultChecked={
							props.data.isAds ? props.data.isAds : false
						}
						onChange={checkboxHandle}
					/>
				</Form.Item>
				<Form.Item
					name="isWhoLikesYou"
					label="IsWhoLikesYou"
					labelCol={{ span: 24 }}
					valuePropName="checked"
				>
					<Checkbox
						name="isWhoLikesYou"
						defaultChecked={
							props.data.isWhoLikesYou
								? props.data.isWhoLikesYou
								: false
						}
						onChange={checkboxHandle}
					/>
				</Form.Item>
				<Form.Item
					name="rewindTimeLimit"
					label="RewindTimeLimit"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your rewindTimeLimit!",
						},
					]}
				>
					<Input size="large" placeholder="RewindTimeLimit" />
				</Form.Item>

				<Form.Item
					name="rewindPerDay"
					label="RewindPerDay"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your rewindPerDay!",
						},
					]}
				>
					{"Unlimited: "}
					{""}
					<Checkbox
						name="rewindPerDay"
						defaultChecked={
							props.data.rewindPerDay == -1 ? true : false
						}
						onChange={checkboxHandle}
					/>

					{rewindPerDay ? (
						""
					) : (
						<Form.Item
							name="rewindPerDay"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your rewindPerDay!",
								},
							]}
							style={{ marginTop: "20px" }}
						>
							<Input
								type="number"
								size="large"
								placeholder="RewindPerDay"
							/>
						</Form.Item>
					)}
				</Form.Item>

				<Form.Item
					name="likePerDay"
					label="LikePerDay"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your likePerDay!",
						},
					]}
				>
					{"Unlimited: "}
					<Checkbox
						name="likePerDay"
						defaultChecked={
							props.data.likePerDay == -1 ? true : false
						}
						onChange={checkboxHandle}
					/>
					{likePerDay ? (
						""
					) : (
						<Form.Item
							name="likePerDay"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: "Please input your likePerDay!",
								},
							]}
							style={{ marginTop: "20px" }}
						>
							<Input
								type="number"
								size="large"
								placeholder="LikePerDay"
							/>
						</Form.Item>
					)}
				</Form.Item>

				<Form.Item
					name="speedDatingMinutes"
					label="SpeedDatingMinutes"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "Please input your speed dating minutes!",
						},
					]}
				>
					{"Unlimited: "}
					<Checkbox
						name="speedDatingMinutes"
						defaultChecked={
							props.data.speedDatingMinutes == -1 ? true : false
						}
						onChange={checkboxHandle}
					/>
					{speedDatingMinutes ? (
						""
					) : (
						<Form.Item
							name="speedDatingMinutes"
							labelCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message:
										"Please input your speed dating minutes!",
								},
							]}
							style={{ marginTop: "20px" }}
						>
							<Input
								type="number"
								size="large"
								placeholder="speed dating minutes"
							/>
						</Form.Item>
					)}
				</Form.Item>
			</Form>
		</SideDrawer>
	);
}
