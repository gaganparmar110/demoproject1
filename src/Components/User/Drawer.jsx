import React, { useEffect, useState } from "react";
import { SideDrawer } from "Components/Commons/Commons";
import {
	Input,
	Form,
	Upload,
	Button,
	DatePicker,
	Select,
	Checkbox,
} from "antd";
import { MODAL_TYPES } from "Helpers";
import Api from "Helpers/ApiHandler";
import { UploadOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ReactRoundedImage from "react-rounded-image";
import moment from "moment";
import { WrapperImg } from "./User.style";

export default function Drawer(props) {
	let [form] = Form.useForm(),
		[loading, setLoading] = useState(false),
		[dateOfBirth, setDateOfBirth] = useState(),
		[oldPhotos, setOldPhotos] = useState([]),
		[state, setState] = React.useState({
			wantKids: props.data.wantKids,
			haveKids: props.data.haveKids,
			isDrink: props.data.isDrink,
			isSmoke: props.data.isSmoke,
			isActive: props.data.isActive,
		});

	const dateFormat = "YYYY/MM/DD";
	const createdDateFormat = "MM-dd-yyyy : hh:mm aa";
	const { Option } = Select;
	const newProps = {
		defaultFileList: [
			{
				uid: "1",
				name: props.data.image ? props.data.image : "",
				status: "done",
				url: props.data.image,
			},
		],
	};
	let multiplePhotos;

	props.data.userImages
		? (multiplePhotos = {
				onChange({ file, fileList }) {
					if (file.status === "removed") {
						setOldPhotos((oldPhotos) => [...oldPhotos, file.name]);
					}
				},
				defaultFileList: props.data.userImages.map((item, index) => {
					const container = {};
					container.uid = index;
					container.name = item.name ? item.name : "";
					container.status = "done";
					container.url = item.name;
					return container;
				}),
		  })
		: (multiplePhotos = {
				defaultFileList: [
					{
						uid: "1",
						name: "",
						status: "done",
						url: "",
					},
				],
		  });

	function checkboxHandle(e) {
		const { name, checked } = e.target;
		setState({ ...state, [name]: checked });
	}
	useEffect(() => {
		if (props.data) {
			setDateOfBirth(props.data.birthDate);
		}

		// eslint-disable-next-line
	}, []);

	function handleDatePickerChange(date, dateString) {
		setDateOfBirth(dateString);
	}

	async function formSubmit(values) {
		let formData = new FormData();
		let dataValues = { ...values };
		if (props.type === "EDIT") {
			dataValues.birthDate = dateOfBirth;
		}

		if (oldPhotos.length) {
			oldPhotos.forEach((photos) => {
				formData.append("oldPhotos[]", photos);
			});
		}
		Object.entries(dataValues).forEach(([key, value]) => {
			if (key === "interests") {
				value.forEach((interestId) => {
					formData.append("interests[]", interestId);
				});
			}
			if (key === "image") {
				if ((value && value.file && value.file.status) || !value) {
					formData.append(key, "");
				} else if (value.file) {
					formData.append(key, value.file);
					formData.append("oldImage", props.data.image);
				} else {
					formData.delete(key);
				}
			}
			if (key === "photos") {
				let mFiles = [];

				if (!value) {
					formData.append(key, "");
				} else if (value.fileList) {
					for (let i = 0; i < value.fileList.length; i++) {
						if (value.fileList[i].originFileObj) {
							mFiles[i] = value.fileList[i].originFileObj;
							formData.append(key, mFiles[i]);
						} else if (value.fileList[i].name) {
							// mFiles[i] = JSON.stringify(value.fileList[i]);
							// formData.append(key, mFiles[i]);
						} else {
							formData.append(key, "");
						}
					}
				} else {
					formData.delete(key);
				}
			} else {
				if (key !== "interests" && key !== "image")
					formData.append(key, value);
			}
		});

		try {
			setLoading(true);
			let config = {
					data: formData,
					returnUnhandledError: true,
					returnError: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
				url = "user/detail";
			if (props.type === MODAL_TYPES.ADD)
				await new Api().post(url, config);
			else await new Api().put(url + `/${props.data.id}`, config);
			setLoading(false);
			props.onSuccess(props.type, { ...props.data, ...dataValues });
		} catch (error) {
			setLoading(false);
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
			{props.type === "ADD" || props.type === "EDIT" ? (
				<Form
					id={props.formId}
					form={form}
					className="form-container"
					onFinish={formSubmit}
					initialValues={{
						address: props.data.address ? props.data.address : "",
						bio: props.data.bio ? props.data.bio : "",
						birthDate: props.data.birthDate
							? props.data.birthDate
							: "",
						country: props.data.country ? props.data.country : "",
						firstName: props.data.firstName
							? props.data.firstName
							: "",
						haveKids: props.data.haveKids
							? props.data.haveKids
							: "",
						height: props.data.height ? props.data.height : "",
						homeTown: props.data.homeTown
							? props.data.homeTown
							: "",
						image: props.data.image ? props.data.image : "",
						isDrink: props.data.isDrink ? props.data.isDrink : "",
						isSmoke: props.data.isSmoke ? props.data.isSmoke : "",
						isActive: props.data.isActive
							? props.data.isActive
							: "",
						lastName: props.data.lastName
							? props.data.lastName
							: "",
						latitude: props.data.latitude
							? props.data.latitude
							: "",
						locality: props.data.locality
							? props.data.locality
							: "",
						longitude: props.data.longitude
							? props.data.longitude
							: "",
						postalCode: props.data.postalCode
							? props.data.postalCode
							: "",
						state: props.data.state ? props.data.state : "",
						subLocality: props.data.subLocality
							? props.data.subLocality
							: "",
						wantKids: props.data.wantKids
							? props.data.wantKids
							: "",
						sexualPreferenceId: props.data.sexualPreferences
							? props.data.sexualPreferences.id
							: "",
						educationId: props.data.education
							? props.data.education.id
							: "",
						ethinicityId: props.data.ethnicity
							? props.data.ethnicity.id
							: "",
						genderId: props.data.gender ? props.data.gender.id : "",
						interestedInId: props.data.interestedIn ? props.data.interestedIn.id : "",
						religionId: props.data.religion
							? props.data.religion.id
							: "",
						packageId: props.data.package
							? props.data.package.id
							: "",
						interests: props.data.interests
							? props.data.interests.map((item) => item.id)
							: "",
						photos: props.data.userImages
							? props.data.userImages.map((item) => item.name)
							: "",
					}}
					// initialValues={props.data}
				>
					<Form.Item
						name="firstName"
						label="First Name"
						labelCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: "Please input your firstName!",
							},
						]}
					>
						<Input size="large" placeholder="First Name" />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Last Name"
						labelCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: "Please input your lastName!",
							},
						]}
					>
						<Input size="large" placeholder="Last Name" />
					</Form.Item>
					{props.type === MODAL_TYPES.ADD ? (
						<>
							<Form.Item
								name="email"
								label="Email"
								labelCol={{ span: 24 }}
								rules={[
									{
										type: "email",
										message: "Please enter valid email!",
									},
									{
										required: true,
										message: "Please input your email!",
									},
								]}
							>
								<Input size="large" placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="phone"
								label="Phone"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please input your phone number!",
									},
									{
										min: 8,
										message:
											"Phone must be minimum 8 digits.",
									},
									{
										max: 12,
										message:
											"Phone must be less than 12 digits.",
									},
								]}
							>
								<Input
									type="number"
									size="large"
									placeholder="Phone"
								/>
							</Form.Item>
							<Form.Item
								name="countryCode"
								label="Country Code"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please input your Country Code!",
									},
								]}
							>
								<Input
									size="large"
									placeholder="Country Code"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
									{
										min: 6,
										message:
											"Password must be minimum 6 characters.",
									},
								]}
							>
								<Input.Password
									placeholder="Password"
									size="large"
									iconRender={(visible) =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
							<Form.Item
								name="confirm"
								dependencies={["password"]}
								rules={[
									{
										required: true,
										message:
											"Please confirm your password!",
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (
												!value ||
												getFieldValue("password") ===
													value
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												"Confirm Password do not match with password!"
											);
										},
									}),
								]}
							>
								<Input.Password
									placeholder="Confirm Password"
									size="large"
									iconRender={(visible) =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
						</>
					) : (
						<>
							<Form.Item
								name="bio"
								label="Bio"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="Bio" />
							</Form.Item>
							{"BirthDate"}<br />
							<DatePicker
							style={{marginTop:"10px"}}
								name="birthDate"
								defaultValue={moment(
									props.data.birthDate
										? props.data.birthDate
										: "2015/01/01",
									dateFormat
								)}
								format={dateFormat}
								onChange={(date, dateString) =>
									handleDatePickerChange(date, dateString)
								}
							/>
							<Form.Item
								name="height"
								label="Height"
								labelCol={{ span: 24 }}
							>
								<Input
									type="number"
									size="large"
									placeholder="height"
								/>
							</Form.Item>
							<Form.Item
								name="latitude"
								label="Latitude"
								labelCol={{ span: 24 }}
							>
								<Input
									type="number"
									size="large"
									placeholder="Latitude"
								/>
							</Form.Item>
							<Form.Item
								name="longitude"
								label="Longitude"
								labelCol={{ span: 24 }}
							>
								<Input
									type="number"
									size="large"
									placeholder="Longitude"
								/>
							</Form.Item>
							<Form.Item
								name="postalCode"
								label="Postal Code"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="PostalCode" />
							</Form.Item>
							<Form.Item
								name="country"
								label="Country"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="Country" />
							</Form.Item>
							<Form.Item
								name="state"
								label="State"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="State" />
							</Form.Item>
							<Form.Item
								name="locality"
								label="Locality"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="Locality" />
							</Form.Item>
							<Form.Item
								name="subLocality"
								label="SubLocality"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="SubLocality" />
							</Form.Item>
							<Form.Item
								name="address"
								label="Address"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="Address" />
							</Form.Item>
							<Form.Item
								name="homeTown"
								label="HomeTown"
								labelCol={{ span: 24 }}
							>
								<Input size="large" placeholder="HomeTown" />
							</Form.Item>
							<Form.Item
								name="wantKids"
								label="WantKids"
								labelCol={{ span: 24 }}
								valuePropName="checked"
							>
								<Checkbox
									name="wantKids"
									defaultChecked={
										props.data.wantKids
											? props.data.wantKids
											: false
									}
									onChange={checkboxHandle}
								/>
							</Form.Item>
							<Form.Item
								name="haveKids"
								label="HaveKids"
								labelCol={{ span: 24 }}
								valuePropName="checked"
							>
								<Checkbox
									name="haveKids"
									defaultChecked={
										props.data.haveKids
											? props.data.haveKids
											: false
									}
									onChange={checkboxHandle}
								/>
							</Form.Item>
							<Form.Item
								name="isDrink"
								label="IsDrink"
								labelCol={{ span: 24 }}
								valuePropName="checked"
							>
								<Checkbox
									name="isDrink"
									defaultChecked={
										props.data.isDrink
											? props.data.isDrink
											: false
									}
									onChange={checkboxHandle}
								/>
							</Form.Item>
							<Form.Item
								name="isSmoke"
								label="IsSmoke"
								labelCol={{ span: 24 }}
								valuePropName="checked"
							>
								<Checkbox
									name="isSmoke"
									defaultChecked={
										props.data.isSmoke
											? props.data.isSmoke
											: false
									}
									onChange={checkboxHandle}
								/>
							</Form.Item>

							<Form.Item
								name="isActive"
								label="IsActive"
								labelCol={{ span: 24 }}
								valuePropName="checked"
							>
								<Checkbox
									name="isActive"
									defaultChecked={
										props.data.isActive
											? props.data.isActive
											: false
									}
									onChange={checkboxHandle}
								/>
							</Form.Item>

							<Form.Item
								name="educationId"
								label="Education"
								labelCol={{ span: 24 }}
									rules={[
									{
										required: true,
										message:
											"Please select your education!",
									},
								]}
							>
								<Select
									showSearch
									placeholder="Select a education"
									optionFilterProp="children"
								>
									{props.dropdownoptions.education.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="ethinicityId"
								label="Ethnicity"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please select your ethinicity!",
									},
								]}
							>
								<Select
									showSearch
									placeholder="Select a ethnicity"
									optionFilterProp="children"
								>
									{props.dropdownoptions.ethnicity.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="genderId"
								label="Gender"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please select your gender!",
									},
								]}
							>
								<Select
									showSearch
									placeholder="Select a gender"
									optionFilterProp="children"
								>
									{props.dropdownoptions.gender.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="interestedInId"
								label="InterestedIn"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please select your inerestedIn!",
									},
								]}
							>
								<Select
									showSearch
									placeholder="Select a InterestedIn"
									optionFilterProp="children"
								>
									{props.dropdownoptions.gender.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="religionId"
								label="Religion"
								labelCol={{ span: 24 }}
							>
								<Select
									showSearch
									placeholder="Select a religion"
									optionFilterProp="children"
								>
									{props.dropdownoptions.religion.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="sexualPreferenceId"
								label="SexualPreference"
								labelCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message:
											"Please select your sexual preference!",
									},
								]}
							>
								<Select
									showSearch
									placeholder="Select a SexualPreference"
									optionFilterProp="children"
								>
									{props.dropdownoptions.sexualPreference.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="packageId"
								label="Package"
								labelCol={{ span: 24 }}
							>
								<Select
									showSearch
									placeholder="Select a Package"
									optionFilterProp="children"
								>
									{props.dropdownoptions.packages.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="interests"
								label="Interests"
								labelCol={{ span: 24 }}
							>
								<Select
									mode="multiple"
									allowClear
									style={{ width: "100%" }}
									placeholder="Please select"
								>
									{props.dropdownoptions.interests.map(
										(item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										)
									)}
								</Select>
							</Form.Item>
							<Form.Item
								name="photos"
								label="User Images"
								labelCol={{ span: 24 }}
							>
								<Upload
									{...multiplePhotos}
									name="logo"
									beforeUpload={() => false}
									listType="picture"
								>
									<Button icon={<UploadOutlined />}>
										Upload
									</Button>
								</Upload>
							</Form.Item>
						</>
					)}

					<Form.Item
						name="image"
						label="Profile Image"
						labelCol={{ span: 24 }}
						valuePropName="list"
					>
						{props.data.image ? (
							<Upload
								{...newProps}
								name="logo"
								beforeUpload={() => false}
								listType="picture"
								maxCount={1}
							>
								<Button icon={<UploadOutlined />}>
									Click to Upload
								</Button>
							</Upload>
						) : (
							<Upload
								name="logo"
								beforeUpload={() => false}
								listType="picture"
								maxCount={1}
							>
								<Button icon={<UploadOutlined />}>
									Click to Upload
								</Button>
							</Upload>
						)}
					</Form.Item>
				</Form>
			) : (
				props.data.rows.map((item, index) => (
					<>
						<div>
							<WrapperImg key={item.id}>
								<div className="img-section">
									<ReactRoundedImage
										image={
											item.fromUserDetail.image
												? item.fromUserDetail.image
												: ""
										}
										roundedSize="0"
										imageWidth="70"
										imageHeight="70"
									/>
								</div>
								<div className="data-section">
									<div>
										<b>Name:</b>{" "}
										{item.fromUserDetail.firstName
											? item.fromUserDetail.firstName +
											  " " +
											  item.fromUserDetail.lastName
											: ""}
									</div>
									<div>
										<b>Date of report :</b>{" "}
										{item.createdAt
											? moment(item.createdAt).format(
													"MM-DD-yyyy : hh:mm a"
											  )
											: ""}
									</div>
									<div>
										<b>Description:</b>{" "}
										{item.description
											? item.description
											: ""}
									</div>
								</div>
							</WrapperImg>
						</div>
					</>
				))
			)}
		</SideDrawer>
	);
}
