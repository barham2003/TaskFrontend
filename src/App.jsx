import "./index.css"
import { useEffect } from "react"
import { useState } from "react"
import AuthModal from "./components/AuthModal"
import NewModal from "./components/NewModal"
import Nav from "./components/Nav"
import Sidebar from "./components/Sidebar"
import MainPage from "./components/MainPage"
const states = ["todo", "doing", "done"]

function App() {
	const [showSidebar, setShowSidebar] = useState(false)
	const [initTasks, setInitTasks] = useState([])
	const [filteredTasks, setFilteredTasks] = useState([...initTasks])
	const [distinctCategories, setDistinctCategories] = useState([])
	const [activeGroup, setGroup] = useState("Main")
	const [isAuth, setIsAuth] = useState(false)
	const [isNewOpen, setIsNewOpen] = useState(false)
	const [authData, setAuthData] = useState(null)
	const token = authData?.token
	const user = authData?.user
	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	})

	// Use Effect for Distinguishing Groups
	useEffect(() => {
		setDistinctCategories([...new Set(initTasks.map(task => task.group))])
		if (activeGroup === "Main") return setFilteredTasks([...initTasks])
		setFilteredTasks(initTasks.filter(task => task.group === activeGroup))
	}, [initTasks, activeGroup])

	function handleSetGroup(group) {
		setGroup(group)
	}

	// Use Effect for getting data form storage or APi
	useEffect(() => {
		const initData = JSON.parse(localStorage?.getItem("data"))

		const fetchData = async () => {
			const res = await fetch("https://mytasksapi.onrender.com/tasks", {
				method: "GET",
				headers,
			})
			const data = await res.json()
			setInitTasks(data.data)
		}

		if (initData) setAuthData(initData)
		if (token) fetchData()
	}, [token])

	/////////////////////// Task Functions, CRUD /////////////////////////
	async function handleOnDelete(id) {
		await fetch(`https://mytasksapi.onrender.com/tasks/${id}`, {
			method: "DELETE",
			headers,
		})
		setInitTasks([...initTasks.filter(tasks => tasks.id !== id)])
	}

	async function handleOnChange(id, state) {
		setInitTasks([
			...initTasks.map(task => (task.id === id ? { ...task, state } : task)),
		])
		await fetch(`https://mytasksapi.onrender.com/tasks/${id}`, {
			method: "PATCH",
			headers,
			body: JSON.stringify({ state }),
		})
	}

	async function handleOnAdd(newTask) {
		const res = await fetch("https://mytasksapi.onrender.com/tasks", {
			method: "POST",
			headers,
			body: JSON.stringify(newTask),
		})
		const { data } = await res.json()
		if (res.ok) {
			setInitTasks([data, ...initTasks])
		}
		setIsNewOpen(value => !value)
	}

	function setModal() {
		setIsNewOpen(value => !value)
	}
	/////////////////////// Task Functions, CRUD /////////////////////////

	// ----------------- Auth Functions -----------------------

	function handleLogin(data) {
		setIsAuth(true)
		setAuthData(data)
		localStorage.setItem("data", JSON.stringify(data))
	}

	function handleLogout() {
		setAuthData(null)
		localStorage.clear("data")
	}

	if (!token) {
		return (
			<div className=" app layout bg-slate-700">
				<AuthModal onLogin={handleLogin} />
			</div>
		)
	}
	// ----------------- Auth Functions -----------------------

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

	return (
		<>
			<div className="app layout relative ">
				{!token && <AuthModal />}
				{isNewOpen && <NewModal onAdd={handleOnAdd} onClose={setModal} />}

				<SidebarButton
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
				/>
				<Nav
					showSidebar={showSidebar}
					setModal={setModal}
					handleLogout={handleLogout}
					user={user}
				/>

				<Sidebar
					handleSetGroup={handleSetGroup}
					initTasks={initTasks}
					distinctCategories={distinctCategories}
					showSidebar={showSidebar}
					activeGroup={activeGroup}
				/>

				<MainPage
					showSidebar={showSidebar}
					states={states}
					handleOnDelete={handleOnDelete}
					handleOnChange={handleOnChange}
					filteredTasks={filteredTasks}
				/>
			</div>
		</>
	)
}

export default App
