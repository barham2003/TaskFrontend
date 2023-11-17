import "./index.css"
import { useEffect } from "react"
import { useState } from "react"
const states = ["todo", "doing", "done"]

function Task({ task, onDelete, onChange }) {
	const nextState =
		states.at(states.indexOf(task.state) + 1) === undefined
			? states.at(0)
			: states.at(states.indexOf(task.state) + 1)

	return (
		<div className="one-task">
			<h1 className="one-task-head">{task.title}</h1>
			<p className="task-description">{task.body}</p>
			<div className="flex gap-x-2 text-xs">
				<button
					className="btn round-btn "
					onClick={() => onChange(task.id, nextState)}>
					Change
				</button>
				<button className="btn round-btn " onClick={() => onDelete(task.id)}>
					Delete
				</button>
			</div>
			<span className="time-stamp">
				{new Date(task.createdAt).toLocaleDateString()}
			</span>
		</div>
	)
}

function TasksContainer({ tasks, state, onDelete, onChange }) {
	const [stateTasks, setStateTasks] = useState([])

	useEffect(
		function () {
			setStateTasks(tasks.filter(task => task.state === state))
		},
		[state, tasks]
	)

	return (
		<div className="tasks-container">
			<div className="tasks-head ">{state}</div>
			<div className="tasks-list ">
				{stateTasks?.map(task => (
					<Task
						key={task.id}
						task={task}
						onDelete={onDelete}
						onChange={onChange}
					/>
				))}
			</div>
		</div>
	)
}

function NewModal({ onAdd, onClose }) {
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [group, setCategory] = useState("")
	const [state, setState] = useState("todo")

	function handleOnSubmit() {
		const newTask = { title, body: desc, group, state }
		if (!title || !desc || !group || !state) return console.log("Error")
		onAdd(newTask)
	}
	return (
		<div className="absolute inset-0 bg-new ">
			<div className="modal">
				<div className="flex flex-col">
					<h1 className="text-2xl mb-4">New Task</h1>
					<label>Title</label>
					<input
						type="text"
						className="input"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>

					<label>Description</label>
					<input
						type="text"
						className="input"
						value={desc}
						onChange={e => setDesc(e.target.value)}
					/>

					<label>Category</label>
					<input
						type="text"
						className="input"
						value={group}
						onChange={e => setCategory(e.target.value)}
					/>

					<label>State</label>
					<select
						name="state"
						className="select-input"
						value={state}
						onChange={e => setState(e.target.value)}>
						<option value="todo">Todo</option>
						<option value="doing">Doing</option>
						<option value="done">Done</option>
					</select>

					<div className="my-4 flex gap-2">
						<button className="btn round-btn text-lg" onClick={handleOnSubmit}>
							+Add
						</button>
						<button
							className="bg-gray-500 btn round-btn text-lg "
							onClick={onClose}>
							+Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function AuthModal({ onLogin }) {
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
		const res = await fetch("/api/auth/login", {
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

		const res = await fetch("/api/auth/signup", {
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

	return (
		<div className="absolute inset-0 bg-new ">
			<div className="newmodal">
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
						{error && (
							<div
								className="error absolute top-0 left-0"
								onClick={() => setError(null)}>
								{error}
							</div>
						)}
					</div>
				</div>
				<div className="md:w-14"></div>
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

	useEffect(
		function () {
			setDistinctCategories([...new Set(initTasks.map(task => task.group))])
			if (activeGroup === "Main") return setFilteredTasks([...initTasks])
			setFilteredTasks(initTasks.filter(task => task.group === activeGroup))
		},
		[initTasks, activeGroup]
	)

	function handleSetGroup(group) {
		setGroup(group)
	}

	async function handleOnDelete(id) {
		await fetch(`/api/tasks/${id}`, { method: "DELETE", headers })
		setInitTasks([...initTasks.filter(tasks => tasks.id !== id)])
	}

	async function handleOnChange(id, state) {
		setInitTasks([
			...initTasks.map(task => (task.id === id ? { ...task, state } : task)),
		])
		await fetch(`/api/tasks/${id}`, {
			method: "PATCH",
			headers,
			body: JSON.stringify({ state }),
		})
	}

	function setModal() {
		setIsNewOpen(value => !value)
	}

	async function handleOnAdd(newTask) {
		const res = await fetch("/api/tasks", {
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
	useEffect(() => {
		const initData = JSON.parse(localStorage?.getItem("data"))

		const fetchData = async () => {
			const res = await fetch("/api/tasks", { method: "GET", headers })
			const data = await res.json()
			setInitTasks(data.data)
		}

		if (initData) setAuthData(initData)
		if (token) fetchData()
	}, [token])

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

	return (
		<>
			<div className="app layout relative ">
				{!token && <AuthModal />}
				{isNewOpen && <NewModal onAdd={handleOnAdd} onClose={setModal} />}
				<button
					className={`  ${
						showSidebar ? "w-24" : "w-16"
					} rounded-r-lg btn absolute top-16`}
					onClick={() => setShowSidebar(value => !value)}>
					{showSidebar ? "Hide" : "Show"}
				</button>
				<nav
					className={`navbar  ${
						showSidebar
							? "md:col-span-5 col-span-5"
							: "md:col-span-5 col-span-5"
					} `}>
					<div className="flex flex-col justify-center items-center text-2xl">
						Your Tasks
					</div>
					<div className="buttons-container">
						<button className="btn round-btn" onClick={setModal}>
							+Add New Task
						</button>
						<span className="person cursor-pointer" onClick={handleLogout}>
							{user?.name}
						</span>
					</div>
				</nav>
				{/* ANOTHER SECTION */}
				<div
					className={`sidebar ${
						showSidebar ? " md:col-span-1 col-span-5 md:flex" : "hidden"
					}  `}>
					<div className="stats">
						<div className="nums">
							Tasks Num: {initTasks.length} {"\n"}
							Categories Num: {distinctCategories.length}
						</div>
					</div>
					<div className="groups">
						<div
							className={`group ${activeGroup === "Main" && "select-group"}`}
							onClick={() => handleSetGroup("Main")}>
							Main
						</div>
						{distinctCategories.map(group => {
							return (
								<div
									key={group}
									className={`group ${group === activeGroup && "select-group"}`}
									onClick={() => handleSetGroup(group)}>
									{group}
								</div>
							)
						})}
					</div>
				</div>

				{/* ANOTHER SECTION */}
				<div
					className={`main ${
						showSidebar ? "md:col-span-4  md:flex hidden" : "col-span-5 flex"
					}  `}>
					<div className="inner-main">
						{states.map(state => (
							<TasksContainer
								key={state}
								tasks={filteredTasks}
								onDelete={handleOnDelete}
								state={state}
								onChange={handleOnChange}
							/>
						))}
					</div>
				</div>
				{/* ANOTHER SECTION */}
			</div>
		</>
	)
}

export default App
