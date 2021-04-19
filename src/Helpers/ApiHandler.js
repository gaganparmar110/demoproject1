import axios from "axios";
import { message } from "antd";

import CODES from "./StatusCodes";
import { store } from "Redux/Store";
import { logOutUser } from "Redux/Auth/Actions";

import { isIEBrowser } from "Helpers/Utils";

const METHOD = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

const BASEURL = process.env.REACT_APP_API_URL;

// CHECK BELOW FOR SAMPLE DATA TO BE PASSED
class Api {
	constructor() {
		this.baseURL = BASEURL;
		this.getAuthenticationInfo();
	}

	getAuthenticationInfo() {
		if (localStorage.getItem("isLoggedIn")) {
			this.isLoggedIn = true;
			this.accessToken = localStorage.getItem("accessToken");
		}
	}

	// URL FOR API
	// REFER SAMPLE JSON AT BOTTOM FOR DATA VALUES
	get(url, data) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.GET, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.POST, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	put(url, data) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.PUT, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	delete(url, data) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.DELETE, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	api(method, url, data) {
		return new Promise((resolve, reject) => {
			let axiosConfig = {};
			axiosConfig.method = method;

			axiosConfig.url = this.baseURL + url;

			axiosConfig.headers = this.setHeaders(data);
			if (data) {
				if (data.params) axiosConfig.params = data.params;

				if (data.data) axiosConfig.data = data.data;
			}

			if (isIEBrowser()) {
				if (!axiosConfig.params) axiosConfig.params = {};
				axiosConfig.params.time = new Date().getTime();
			}

			axios(axiosConfig)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					if (error && error.response) {
						if (error.response.status === CODES.UNAUTHORIZED) {
							store.dispatch(logOutUser());
						} else if (
							error.response.status === CODES.SERVER_ERROR
						) {
							if (data && !data.skipToast)
								message.error("Internal server error");
							if (data && data.skipErrorHandling)
								reject(error.response);
						} else {
							if (data && data.skipErrorHandling)
								resolve(error.response);
							else {
								message.error(
									error.response?.data?.message ||
										"Internal Server Error"
								);
								if (data?.returnUnhandledError) reject(error);
							}
						}

						if (data?.returnError) reject(error);
					}

					console.log("ERROR", error, error.response);
				});
		});
	}

	setHeaders(data) {
		let headers = {};
		headers["accept-language"] = "en";
		headers["Content-Type"] = "application/json";

		if (data) {
			if (data.isMultipart) {
				headers["Content-Type"] = "multipart/form-data";
			}

			if (data.headers) {
				for (var key in data.headers) {
					if (data.headers.hasOwnProperty(key)) {
						headers[key] = data.headers[key];
					}
				}
			}
		}

		if (
			(this.isLoggedIn && this.isLoggedIn !== false) ||
			!(data && data.skipAuth)
		) {
			headers["Authorization"] = this.accessToken;
			headers["userType"] = "ADMIN";
		}

		return headers;
	}
}

// SAMPLE DATA JSON
/* let sample_data = {

    // ADDITIONAL HEADERS IF REQUIRED
    headers :{
        'Content-type'  : 'xx-urlencode',
    },

    // IF USER ID AND TOKEN SHOULDN'T BE PASSED IN HEADERS (USER FOR AFTER LOGIN API)
    // DEFAULT : FALSE;
    skipAuth    : false,

    // IF Default error handling needs to be overridden
    // DEFAULT : FALSE;
    skipErrorHandling    : false,

    // FOR SENDING FILES OR FORM DATA REQUEST
    isMultipart : true,

    // `PARAMS` ARE THE URL PARAMETERS TO BE SENT WITH THE REQUEST
    params : {
        user_id     : 10,
        name        : "lorem",
        page        : 3,
        sort_by     : 'name'
    },

    // POST DATA
    data : {
        firstName   : 'Lorem',
        lastName    : 'Ipsum'
    },
} */

export default Api;
