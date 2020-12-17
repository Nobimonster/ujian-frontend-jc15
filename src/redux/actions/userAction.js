import Axios from "axios"
import { api_url } from "../../helpers/api_url"

//LOGIN
export const loginAction = (data) => {
	return {
		type: "LOGIN",
		payload: data,
	}
}

//STAY LOGIN
export const keepLogin = (id) => {
	return (dispatch) => {
		Axios.get(`${api_url}/users/${id}`)
			.then((res) => {
				dispatch({
					type: "LOGIN",
					payload: res.data,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

//LOGOUT
export const logoutAction = () => {
	return {
		type: "LOGOUT",
	}
}
