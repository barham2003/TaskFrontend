import { useTasks } from "../Context/TasksContext"

export default function Sidebar({ showSidebar }) {
	const {
		tasks,
		categories,
		selected: activeGroup,
		handleFilter,
		dispatch,
	} = useTasks()

	return (
		<div
			className={`sidebar ${
				showSidebar ? " md:col-span-1 col-span-5 md:flex" : "hidden"
			}  `}>
			<div className="stats">
				<div className="nums">
					Tasks Num: {tasks.length} {"\n"}
					Categories Num: {categories.length}
				</div>
			</div>
			<div className="groups">
				<div
					className={`group ${activeGroup === "Main" && "select-group"}`}
					onClick={() => dispatch({ type: "main" })}>
					Main
				</div>
				{categories.map(group => {
					return (
						<div
							key={group}
							onClick={() => handleFilter(group)}
							className={`group ${group === activeGroup && "select-group"}`}>
							{group}
						</div>
					)
				})}
			</div>
		</div>
	)
}
