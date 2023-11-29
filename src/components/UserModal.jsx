import React from "react"
import { useAuth } from "../Context/AuthContex"
import Modal from "./Modal"

export default function UserModal({ setAuthModal }) {
	const { user, dispatch } = useAuth()
	if (!user) return
	return (
		<Modal title="User Information">
			<div className="flex flex-col">
				<ul className=" px-24 gap-y-3 flex flex-col py-9 text-base">
					<li>Name: {user.name}</li>
					<li>Username: {user.username}</li>
					<li>Joined at: {new Date(user.createdAt).toLocaleDateString()}</li>
				</ul>
				<div className="flex text-sm gap-x-2">
					<button
						className="btn round-btn "
						onClick={() => setAuthModal(false)}>
						Close
					</button>
					<button
						className="btn round-btn"
						onClick={() => dispatch({ type: "logout" })}>
						Sign Out
					</button>
				</div>
			</div>
		</Modal>
	)
}
