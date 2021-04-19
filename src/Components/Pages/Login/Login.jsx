import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Input, Form } from "antd";

// STYLES
import { LoginWrapper, LoginBox, LogoWrapper } from "./Login.style";

// CONST
import { URL_DASHBOARD } from "Helpers/Paths";
import { loginUser } from "Redux/Auth/Actions";

import Api from "Helpers/ApiHandler";

// IMAGES
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LogoImage from "Assets/Images/logo.png";

function Login(props) {
	let [isLoading, setIsLoading] = useState(false);
	const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		checkIfAlreadyLoggedIn();
		// eslint-disable-next-line
	}, []);

	function checkIfAlreadyLoggedIn() {
		if (isLoggedIn) props.history.push(URL_DASHBOARD);
	}

	async function login(values) {
		setIsLoading(true);
		new Api()
			.post("auth/admin/sign-in", {
				data: values,
				returnUnhandledError: true,
			})
			.then(async (response) => {
				dispatch(loginUser({ accessToken: response.data.authToken }));
				props.history.push(URL_DASHBOARD);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	}

	return (
		<LoginWrapper className="flex f-v-center f-h-center">
			<LoginBox className="box">
				<LogoWrapper>
					<img className="img" src={LogoImage} alt="Logo" />
				</LogoWrapper>

				<Form className="form-container" onFinish={login}>
					<Form.Item
						name="email"
						rules={[{ required: true, type: "email" }]}
					>
						<Input size="large" placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please enter your password!",
							},
							{
								min: 6,
								message:
									"Password should be atleast 6 chars long",
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

					<div className="button-container">
						<Button
							className="btn"
							type="primary"
							shape="round"
							size="large"
							htmlType="submit"
							loading={isLoading}
						>
							Login
						</Button>
					</div>
				</Form>
			</LoginBox>
		</LoginWrapper>
	);
}

export default Login;
