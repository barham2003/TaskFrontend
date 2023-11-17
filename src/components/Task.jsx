const states = ["todo", "doing", "done"]

export default function Task({ task, onDelete, onChange }) {
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
