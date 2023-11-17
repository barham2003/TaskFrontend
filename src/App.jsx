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
			<p className="task-description">{task.description}</p>
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
			<span className="time-stamp">{task.date}</span>
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

const tempTasks = [
	{
		id: 1,
		title: "Task 1",
		description: "Complete the project proposal",
		date: "2023-11-17",
		state: "todo",
		category: "Work",
	},
	{
		id: 2,
		title: "Task 2",
		description: "Research and gather information for the report",
		date: "2023-11-18",
		state: "doing",
		category: "Study",
	},
	{
		id: 3,
		title: "Task 3",
		description: "Review and revise the code",
		date: "2023-11-19",
		state: "doing",
		category: "Work",
	},
	{
		id: 4,
		title: "Task 4",
		description: "Prepare presentation slides",
		date: "2023-11-20",
		state: "done",
		category: "Work",
	},
	{
		id: 5,
		title: "Task 5",
		description: "Submit final deliverables",
		date: "2023-11-21",
		state: "done",
		category: "Personal",
	},
]

function NewModal({ onAdd, onClose }) {
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [category, setCategory] = useState("")
	const [state, setState] = useState("todo")

	function handleOnSubmit() {
		const newTask = { title, desc, category, state, id: +Date.now() }
		if (!title || !desc || !category || !state) return console.log("Error")
		onAdd(newTask)
	}
	return (
		<div className="absolute inset-0 bg-new ">
			<div className="modal md:h-2/3 md:w-2/3 ">
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
						value={category}
						onChange={e => setCategory(e.target.value)}
					/>

					<label>State</label>
					<select
						name="state"
						className="bg-slate-700"
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
	const [error, setError] = useState(null)
	async function sign() {
		if (!username || !password) return setError("Fill All Fields")
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: username, password: password }),
		})

		const data = await res.json()
		if (res.ok) {
			onLogin(data)
			localStorage.setItem("data", JSON.stringify(data))
		}
		if (!res.ok) {
			setError(data.message)
			// console.log(data.message)
		}
		// console.log(res, " --- ", data)
	}

	return (
		<div className="absolute inset-0 bg-new ">
			<div className="modal">
				<div className="flex flex-col">
					<h1 htmlFor="sign" className="text-2xl mb-4">
						Sign
					</h1>
					{error && <div className="error">{error}</div>}
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
				<span>OR</span>
				<div className="flex flex-col">
					<h1 htmlFor="regester" className="text-2xl mb-4">
						Register
					</h1>
					<label htmlFor="username">Username</label>
					<input type="text" className="input" />
					<label htmlFor="passowrd">Password</label>
					<input type="password" className="input" />
					<label htmlFor="confirmPass">Confirm Password</label>
					<input type="passowrd" className="input" />
					<div className="my-4">
						<button className="btn round-btn text-lg">Register</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function App() {
	const [showSidebar, setShowSidebar] = useState(false)
	const [initTasks, setInitTasks] = useState(tempTasks)
	const [filteredTasks, setFilteredTasks] = useState([...initTasks])
	const [distinctCategories, setDistinctCategories] = useState([])
	const [activeCategory, setCategory] = useState("Main")
	const [isAuth, setIsAuth] = useState(false)
	const [isNewOpen, setIsNewOpen] = useState(false)
	// const [user, setUser] = useState(null)
	// const [token, setToken] = useState(null)
	const [authData, setAuthData] = useState(null)

	const token = authData?.token
	const user = authData?.user

	useEffect(
		function () {
			setDistinctCategories([...new Set(initTasks.map(task => task.category))])
			if (activeCategory === "Main") return setFilteredTasks([...initTasks])
			setFilteredTasks(
				initTasks.filter(task => task.category === activeCategory)
			)
		},
		[initTasks, activeCategory]
	)

	function handleSetCategory(category) {
		setCategory(category)
	}

	function handleOnDelete(id) {
		setInitTasks([...initTasks.filter(tasks => tasks.id !== id)])
	}

	function handleOnChange(id, state) {
		setInitTasks([
			...initTasks.map(task => (task.id === id ? { ...task, state } : task)),
		])
	}

	function setModal() {
		setIsNewOpen(value => !value)
	}

	function handleOnAdd(newTask) {
		setInitTasks([newTask, ...initTasks])
		setIsNewOpen(value => !value)
	}
	useEffect(() => {
		const initData = JSON.parse(localStorage.getItem("data"))

		const fetchData = async () => {
			const headers = new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			})

			const requestOptions = {
				method: "GET",
				headers,
			}

			const res = await fetch("/api/tasks", requestOptions)
			const data = await res.json()
			console.log(data)
		}

		if (initData) {
			setAuthData(initData)
		}
		if (token) fetchData()
	}, [token])

	function handleLogin(data) {
		// setUser(data.user)
		// setToken(data.token)
		setIsAuth(true)
		setAuthData(data)
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
						<span className="person" onClick={handleLogout}>
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
						<div className=""> All Boards (8)</div>
					</div>
					<div className="groups">
						<div className="group" onClick={() => handleSetCategory("Main")}>
							Main
						</div>
						{distinctCategories.map(category => {
							return (
								<div
									key={category}
									className="group"
									onClick={() => handleSetCategory(category)}>
									{category}
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
