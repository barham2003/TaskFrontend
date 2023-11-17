import "./index.css"
import { useEffect } from "react"
import { useState } from "react"

function Task({ task, onDelete }) {
	return (
		<div className="one-task">
			<h1 className="one-task-head">{task.title}</h1>
			<p className="task-description">{task.description}</p>
			<div className="flex gap-x-2 text-xs">
				<button className="btn round-btn ">Change</button>
				<button className="btn round-btn " onClick={() => onDelete(task.id)}>
					Delete
				</button>
			</div>
			<span className="time-stamp">{task.date}</span>
		</div>
	)
}

function TasksContainer({ tasks, state, onDelete }) {
	const [stateTasks, setStateTasks] = useState([])
	useEffect(
		function () {
			setStateTasks(tasks.filter(task => task.state === state))
		},
		[tasks]
	)
	return (
		<div className="tasks-container">
			<div className="tasks-head ">{state}</div>
			<div className="tasks-list ">
				{stateTasks?.map(task => (
					<Task key={task.id} task={task} onDelete={onDelete} />
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

function App() {
	const [showSidebar, setShowSidebar] = useState(false)
	const [initTasks, setInitTasks] = useState(tempTasks)
	const [filteredTasks, setFilteredTasks] = useState([...initTasks])
	const [distinctCategories, setDistinctCategories] = useState([])
	// const distinctCategories = [...new Set(tempTasks.map(task => task.category))]
	useEffect(
		function () {
			setDistinctCategories([...new Set(initTasks.map(task => task.category))])
		},
		[initTasks]
	)

	function handleSetCategory(category) {
		setFilteredTasks(initTasks.filter(task => task.category === category))
	}

	function handleMainCategory() {
		setFilteredTasks(initTasks)
	}

	function handleOnDelete(id) {
		setInitTasks([...initTasks.filter(tasks => tasks.id !== id)])
		setFilteredTasks(initTasks.filter(tasks => tasks.id !== id))
	}

	const states = ["todo", "done", "doing"]

	return (
		<>
			<div className="app layout relative">
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
						<button className="btn round-btn">+Add New Task</button>
						<button className="btn round-btn">Sign In</button>
					</div>
				</nav>
				<div
					className={`sidebar ${
						showSidebar ? " md:col-span-1 col-span-5 md:flex" : "hidden"
					}  `}>
					<div className="stats">
						<div className=""> All Boards (8)</div>
					</div>
					<div className="groups">
						<div className="group" onClick={handleMainCategory}>
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
							/>
						))}
					</div>
				</div>
				<button
					className={`  ${
						showSidebar ? "w-24" : "w-16"
					} rounded-r-lg btn absolute top-16`}
					onClick={() => setShowSidebar(value => !value)}>
					{showSidebar ? "Hide" : "Show"}
				</button>
			</div>
		</>
	)
}

export default App
