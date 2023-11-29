import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../Context/AuthContex"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import MainPage from "../components/MainPage"
import NewModal from "../components/NewModal"
import Modal from "../components/Modal"
import UserModal from "../components/UserModal"

function SidebarButton({ showSidebar, setShowSidebar }) {
	return (
		<button
			className={`  ${
				showSidebar ? "w-24" : "w-16"
			} rounded-r-lg btn absolute top-16`}
			onClick={() => setShowSidebar(value => !value)}>
			{showSidebar ? "Hide" : "Show"}
		</button>
	)
}

export default function TasksPage() {
	const navigate = useNavigate()
	function setModal() {
		setIsNewOpen(value => !value)
	}
	const [isNewOpen, setIsNewOpen] = useState(false)
	const { isAuthed } = useAuth()
	const [showSidebar, setShowSidebar] = useState(false)
	const [AuthModal, setAuthModal] = useState(false)

	useEffect(
		function () {
			if (!isAuthed) return navigate("/auth", { replace: true })
		},
		[isAuthed]
	)

	return (
		<>
			<div className="app layout relative">
				{isNewOpen && <NewModal onClose={setModal} />}
				{AuthModal && <UserModal setAuthModal={setAuthModal} />}
				<SidebarButton
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
				/>
				<Nav
					showSidebar={showSidebar}
					setModal={setModal}
					setAuthModal={setAuthModal}
				/>

				<Sidebar showSidebar={showSidebar} />

				<MainPage showSidebar={showSidebar} />
			</div>
		</>
	)
}
