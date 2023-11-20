import { useEffect } from "react"
import { useState } from "react"
import Modal from "./Modal"

export default function NewModal({ onAdd, onClose }) {
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [group, setCategory] = useState("")
	const [state, setState] = useState("todo")

	function handleOnSubmit() {
		const newTask = { title, body: desc, group, state }
		if (!title || !desc || !group || !state) return console.log("Error")
		onAdd(newTask)
	}
	return (
		<Modal title="New Task">
			<div className="flex flex-col">
				<label>Title</label>
				<input
					type="text"
					className="input"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<label>Description</label>
				<input
					type="text"
					className="input"
					value={desc}
					onChange={e => setDesc(e.target.value)}
				/>

				<label>Category</label>
				<input
					type="text"
					className="input"
					value={group}
					onChange={e => setCategory(e.target.value)}
				/>

				<label>State</label>
				<select
					name="state"
					className="select-input"
					value={state}
					onChange={e => setState(e.target.value)}>
					<option value="todo">Todo</option>
					<option value="doing">Doing</option>
					<option value="done">Done</option>
				</select>

				<div className="my-4 flex gap-2">
					<button className="btn round-btn text-lg" onClick={handleOnSubmit}>
						+Add
					</button>
					<button
						className="bg-gray-500 btn round-btn text-lg "
						onClick={onClose}>
						+Cancel
					</button>
				</div>
			</div>
		</Modal>
	)
}
