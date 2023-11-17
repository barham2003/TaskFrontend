import Task from "./Task"
import { useEffect } from "react"
import { useState } from "react"
export default function TasksContainer({ tasks, state, onDelete, onChange }) {
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
