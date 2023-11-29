import { useTasks } from "../Context/TasksContext"
import TasksContainer from "./TasksContainer"
const states = ["todo", "doing", "done"]

export default function MainPage({ showSidebar }) {
	return (
		<div
			className={`main ${
				showSidebar ? "md:col-span-4  md:flex hidden" : "col-span-5 flex"
			}  `}>
			<div className="inner-main">
				{states.map(state => (
					<TasksContainer key={state} state={state} />
				))}
			</div>
		</div>
	)
}
