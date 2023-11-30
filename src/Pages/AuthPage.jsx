import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../Context/AuthContex"

export default function AuthPage({}) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const [newUsername, setNewUsername] = useState("")
	const [newName, setNewName] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setCofirmPassword] = useState("")

	const { isAuthed, signup, login, error, dispatch } = useAuth()

	async function handleSignIn() {
		login(username, password)
	}

	async function handleSignUp() {
		const user = {
			name: newName,
			password: newPassword,
			username: newUsername,
			passwordConfirm: confirmPassword,
		}
		signup(newName, newUsername, newPassword, confirmPassword)
	}
	const navigate = useNavigate()

	useEffect(
		function () {
			if (isAuthed) navigate("/main", { replace: true })
		},
		[isAuthed]
	)

	return (
		<div className="h-screen">
			<div className={`${error ? " pt-14" : ""} newmodal`}>
				{error && (
					<div
						className="error absolute top-0 w-full left-0 md:left-1/4 md:top-16 md:w-1/2"
						onClick={() => dispatch({ type: "fail/close" })}>
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
						<button className="btn round-btn text-lg" onClick={handleSignIn}>
							Sign in
						</button>
					</div>
				</div>
				<div className="flex flex-col">
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8431198708688672"
						crossOrigin="anonymous"></script>
					<ins
						className="adsbygoogle"
						style={{ display: "block" }}
						data-ad-client="ca-pub-8431198708688672"
						data-ad-slot="9065996910"
						data-ad-format="auto"
						data-full-width-responsive="true"></ins>
					<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
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
						<button className="btn round-btn text-lg" onClick={handleSignUp}>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
