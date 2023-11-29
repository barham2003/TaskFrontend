import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthPage from "./Pages/AuthPage"
import TasksPage from "./Pages/TasksPage"
import { useAuth } from "./Context/AuthContex"
import { TaskProvider } from "./Context/TasksContext"

function App() {
	const { isAuthed } = useAuth()
	return (
		<>
			<TaskProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<TasksPage />} />
						<Route path="/main" element={<TasksPage />} />
						<Route path="/auth" element={<AuthPage />} />
					</Routes>
				</BrowserRouter>
			</TaskProvider>
		</>
	)
}

export default App
