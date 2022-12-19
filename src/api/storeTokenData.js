import axios from "axios"

export const storeTokenDataInDatabase = async (accessToken, refreshToken, expirationDate) => {
	try {
		const response = await axios.post("http://localhost:8080/storeTokenData", {
			accessToken,
			refreshToken,
			expirationDate,
		})
		console.log("storeTokenDataInDatabase | data", response.data)
	} catch (error) {
		console.error("storeTokenDataInDatabase | error", error)
		// Add some code here to handle the error
	}
}
