import React, { useState, useEffect } from "react"
import { createGoogleAuthLink } from "./api/createAuthLink"
import { storeTokenDataInDatabase } from "./api/storeTokenData"
import Kanban from "./components/Kanban"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import GoogleIcon from "@mui/icons-material/Google"
import "./App.css"

function App() {
	useEffect(() => {
		handleTokenFromQueryParams()
	}, [])

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const newExpirationDate = () => {
		const expiration = new Date()
		expiration.setHours(expiration.getHours() + 1)
		return expiration
	}
	const handleTokenFromQueryParams = () => {
		const query = new URLSearchParams(window.location.search)
		const accessToken = query.get("accessToken")
		const refreshToken = query.get("refreshToken")
		const expirationDate = newExpirationDate()

		if (accessToken && refreshToken) {
			storeTokenDataInDatabase(accessToken, refreshToken, expirationDate)
			setIsLoggedIn(true)
		}
	}

	const createAuthLink = async () => {
		const url = await createGoogleAuthLink()
		window.location.href = url
	}

	const signOut = () => {
		setIsLoggedIn(false)
		sessionStorage.clear()
	}
	return (
		<div className="App">
			<Container>
				{!isLoggedIn ? (
					<div className="ButtonWrapper">
						<h2>Welcome to Kanban</h2>
						<Button variant="contained" startIcon={<GoogleIcon />} onClick={createAuthLink}>
							Login with Google
						</Button>
					</div>
				) : (
					<>
						<div className="ButtonWrapper">
							<h2>Welcome to Kanban</h2>
							<Kanban />
							<Button variant="contained" onClick={signOut}>
								Sign Out
							</Button>
						</div>
					</>
				)}
			</Container>
		</div>
	)
}

export default App
