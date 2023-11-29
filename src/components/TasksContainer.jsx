import Task from "./Task"
import { useEffect } from "react"
import { useState } from "react"
import { useTasks } from "../Context/TasksContext"
export default function TasksContainer({ state }) {
	const [stateTasks, setStateTasks] = useState([])
	const { tasks, selected, filteredTasks } = useTasks()

	useEffect(
		function () {
			if (selected === "Main") {
				setStateTasks(tasks.filter(task => task.state === state))
				return
			}
			if (selected !== "Main")
				setStateTasks(filteredTasks.filter(task => task.state === state))
		},
		[state, tasks, selected, filteredTasks]
	)

	return (
		<div className="tasks-container">
			<div
				className={`tasks-head ${
					stateTasks.length < 1 && " hidden md:block"
				}  `}>
				{state}
			</div>
			<div className="tasks-list ">
				{stateTasks?.map(task => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}
