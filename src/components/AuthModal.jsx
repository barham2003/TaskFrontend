import { useState } from "react"
const apiUrl = "https://mytasksapi.onrender.com"

export default function AuthModal({ onLogin }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const [newUsername, setNewUsername] = useState("")
	const [newName, setNewName] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setCofirmPassword] = useState("")
	const [error, setError] = useState(null)

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}

	async function sign() {
		if (!username || !password) return setError("Fill All Fields")
		const user = { username: username, password: password }
		const res = await fetch(`${apiUrl}/auth/login`, {
			...options,
			body: JSON.stringify(user),
		})

		const data = await res.json()
		if (res.ok) {
			onLogin(data)
		}
		if (!res.ok) {
			setError(data.message)
		}
	}

	async function signup() {
		if (!newName || !newPassword || !confirmPassword || !newUsername)
			return setError("Please fill or fields")
		if (newPassword !== confirmPassword)
			return setError("Password and confirm password are not the same")

		const user = {
			name: newName,
			password: newPassword,
			username: newUsername,
			passwordConfirm: confirmPassword,
		}

		const res = await fetch(`${apiUrl}/auth/signup`, {
			...options,
			body: JSON.stringify(user),
		})

		const data = await res.json()

		console.log(res)
		if (res.ok) {
			onLogin(data)
		}

		if (!res.ok) {
			setError(data.message)
		}
	}

	return (
		<div className="h-screen">
			<div className={`${error ? " pt-14" : ""} newmodal`}>
				{error && (
					<div
						className="error absolute top-0 w-full left-0 md:left-1/4 md:top-16 md:w-1/2"
						onClick={() => setError(null)}>
						{error}
					</div>
				)}
				<div className="flex flex-col">
					<h1 htmlFor="sign" className="text-2xl mb-4">
						Sign
					</h1>
					<label htmlFor="username">Username</label>
					<input
						className="input"
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						className="input"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<a className="text-xs my-2 text-gray-400">Forget Password?</a>
					<div className="my-4">
						<button className="btn round-btn text-lg" onClick={() => sign()}>
							Sign in
						</button>
					</div>
				</div>
				<div className="flex flex-col">
					<h1 htmlFor="regester" className="text-2xl mb-4">
						Register
					</h1>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						value={newName}
						onChange={e => setNewName(e.target.value)}
						className="input"
					/>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						value={newUsername}
						onChange={e => setNewUsername(e.target.value)}
						className="input"
					/>
					<label htmlFor="passowrd">Password</label>
					<input
						type="password"
						value={newPassword}
						onChange={e => {
							setNewPassword(e.target.value)
						}}
						className="input"
					/>
					<label htmlFor="confirmPass">Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={e => setCofirmPassword(e.target.value)}
						className="input"
					/>
					<div className="my-4">
						<button className="btn round-btn text-lg" onClick={() => signup()}>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
