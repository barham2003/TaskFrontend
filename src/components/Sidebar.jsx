export default function Sidebar({
	distinctCategories,
	activeGroup,
	handleSetGroup,
	showSidebar,
	initTasks,
}) {
	return (
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
	)
}
