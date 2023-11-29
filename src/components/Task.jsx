import { useTasks } from "../Context/TasksContext"

const states = ["todo", "doing", "done"]

export default function Task({ task }) {
	const { onDelete, onChange, selected } = useTasks()
	const nextState =
		states.at(states.indexOf(task.state) + 1) === undefined
			? states.at(0)
			: states.at(states.indexOf(task.state) + 1)

	return (
		<div className="one-task">
			{selected === "Main" && (
				<small className=" text-gray-600"> {task.group}</small>
			)}
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
