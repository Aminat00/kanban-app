import axios from "axios"

export const createGoogleAuthLink = async () => {
	try {
		const response = await axios.post("http://localhost:8080/createAuthLink")
		return response.data.url
	} catch (error) {
		console.log("createGoogleAuthLink | error", error)
		// Add some code here to handle the error
	}
}
