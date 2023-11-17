export default function Nav({ setModal, handleLogout, showSidebar, user }) {
	return (
		<nav
			className={`navbar  ${
				showSidebar ? "md:col-span-5 col-span-5" : "md:col-span-5 col-span-5"
			} `}>
			<div className="flex flex-col justify-center items-center text-lg">
				Manage Tasks
			</div>
			<div className="buttons-container">
				<button className="btn round-btn" onClick={setModal}>
					New Task
				</button>
				<span className="person cursor-pointer" onClick={handleLogout}>
					{user?.name}
				</span>
			</div>
		</nav>
	)
}
