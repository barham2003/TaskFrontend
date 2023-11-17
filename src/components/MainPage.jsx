import TasksContainer from "./TasksContainer"

export default function MainPage({
	showSidebar,
	states,
	handleOnDelete,
	filteredTasks,
	handleOnChange,
}) {
	return (
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
	)
}
