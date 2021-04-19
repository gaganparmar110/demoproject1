import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { URL_LOGIN } from "Helpers/Paths";

function ProtectedRoute(props) {
	const { children } = props
	const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
	return (
		<div>
			{
				!isLoggedIn ?
					<Redirect to={URL_LOGIN} />
					: <Fragment>
						{children}
					</Fragment>
			}
		</div>
	)
}

export default ProtectedRoute;