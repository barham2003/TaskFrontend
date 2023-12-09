import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useReducer } from "react"
import { createContext } from "react"
import { useAuth } from "./AuthContex"
const apiUrl = "https://tame-ruby-springbok-tam.cyclic.app/"

const TaskContext = createContext()
const intialState = {
	selected: null,
	filteredTasks: [],
	tasks: [],
}

function reducer(state, action) {
	console.log(action)
	switch (action.type) {
		case "fetch":
			return { ...state, selected: "Main", tasks: action.payload }

		case "main":
			return {
				...state,
				selected: "Main",
				// tasks: [...state.tasks],
				// filteredTasks: [...state.tasks],
			}

		case "filter":
			return {
				...state,
				selected: action.payload,
				filteredTasks: [
					...state.tasks.filter(task => task.group === action.payload),
				],
			}

		case "delete":
			return {
				...state,
				selected: state.filteredTasks.length > 1 ? state.selected : "Main",
				tasks: [...state.tasks.filter(task => task.id !== action.payload)],
				filteredTasks: [
					...state.filteredTasks.filter(task => task.id !== action.payload),
				],
			}

		case "change":
			return {
				...state,
				tasks: [
					...state.tasks.map(task =>
						task.id === action.payload.id
							? { ...task, state: action.payload.state }
							: task
					),
				],
				filteredTasks: [
					...state.filteredTasks.map(task =>
						task.id === action.payload.id
							? { ...task, state: action.payload.state }
							: task
					),
				],
			}

		case "add":
			return {
				...state,
				tasks: [action.payload, ...state.tasks],
				filteredTasks: [
					action.payload.group === state.selected && action.payload,
					...state.filteredTasks,
				],
			}

		case "main":
			return { ...state, filteredTasks: state.tasks }
	}
}

function TaskProvider({ children }) {
	const [{ tasks, filteredTasks, selected }, dispatch] = useReducer(
		reducer,
		intialState
	)
	const [categories, setDistinctCategories] = useState([])
	const { token, isAuthed } = useAuth()
	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	})

	useEffect(
		function () {
			async function fetchTasks() {
				const res = await fetch(`${apiUrl}/tasks`, { method: "GET", headers })
				const json = await res.json()
				dispatch({ type: "fetch", payload: json.data })
			}
			if (isAuthed) fetchTasks()
		},
		[isAuthed]
	)

	useEffect(
		function () {
			if (tasks && tasks.length >= 0)
				setDistinctCategories([...new Set(tasks?.map(task => task.group))])
		},
		[tasks]
	)

	async function onDelete(id) {
		dispatch({ type: "delete", payload: id })
		await fetch(`${apiUrl}/tasks/${id}`, {
			method: "DELETE",
			headers,
		})
	}

	async function onChange(id, state) {
		dispatch({ type: "change", payload: { id, state } })
		await fetch(`${apiUrl}/tasks/${id}`, {
			method: "PATCH",
			headers,
			body: JSON.stringify({ state }),
		})
	}

	function handleFilter(group) {
		dispatch({ type: "filter", payload: group })
	}

	async function onAdd(newTask) {
		const res = await fetch(`${apiUrl}/tasks`, {
			method: "POST",
			headers,
			body: JSON.stringify(newTask),
		})
		const { data } = await res.json()
		dispatch({ type: "add", payload: data })
	}

	return (
		<TaskContext.Provider
			value={{
				tasks,
				filteredTasks,
				selected,
				categories,
				handleFilter,
				onDelete,
				onChange,
				onAdd,
				dispatch,
			}}>
			{children}
		</TaskContext.Provider>
	)
}

function useTasks() {
	const context = useContext(TaskContext)
	if (context === undefined) throw new Error("SOmething Bad")
	return context
}

export { useTasks, TaskProvider }
