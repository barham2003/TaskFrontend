import React from 'react';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, Update }) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [state, setState] = useState("todo")
    const [group, setGroup] = useState("")
    const [eMessage, setEMessage] = useState(false)
    const [messageBody, setMessageBody] = useState("")

    const handleSubmit = async () => {
        const data = { title, body: content, state, group }
        console.log(data)
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (res.ok) {
            const json = await res.json()

            onClose()
            Update()
            setTitle("")
            setContent("")
            setGroup("")
        }
        if (!res.ok) {
            const json = await res.json()
            setEMessage(true)
            setMessageBody(json.message)
        }

    }




    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-60"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content flex flex-col items-center w-auto h-auto py-4 px-6  relative bg-slate-800 border-4 border-gray-700 gap-y-3">

                    <h1 className="block text-2xl font-bold">Task Information</h1>
                    {eMessage && <div className="w-auto h-auto bg-red-950 font-bold text-sm p-2 px-6 rounded-lg " onClick={() => setEMessage(false)} >
                        {messageBody}
                    </div>}
                    <div className="flex flex-row gap-x-4 py-8">
                        <div className="flex flex-col  gap-y-2" >
                            <label htmlFor="title" className="text-xl font-bold">TITLE </label>
                            <label htmlFor="content" className="text-xl font-bold">CONTENT </label>
                            <label htmlFor="state" className="text-xl font-bold">STATE </label>
                            <label htmlFor="state" className="text-xl font-bold">Group </label>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <input type="text" id="title" value={title} className="rounded-sm font-bold pl-1 text-gray-900" onChange={(e) => { setTitle(e.target.value) }} />
                            <input type="text" id="content" value={content} className="rounded-sm font-bold pl-1 text-gray-900" onChange={(e) => { setContent(e.target.value) }} />
                            <select name="state" id="state" className="rounded-sm font-bold pl-1 text-gray-900">
                                <option value="todo" onClick={() => { setState("todo") }}>Todo </option>
                                <option value="doing" onClick={() => { setState("doing") }}>Doing </option>
                                <option value="done" onClick={() => { setState("done") }}>Done </option>
                            </select>
                            <input type="text" id="groop" value={group} className="rounded-sm font-bold pl-1 text-gray-900" onChange={(e) => { setGroup(e.target.value) }} />


                        </div>
                    </div>
                    <button className="text-sm bg-indigo-700 text-white p-2 rounded-md px-3 font-bold hover:bg-indigo-800 hover:shadow-lg active:bg-white active:text-indigo-700 transition-colors delay-50" onClick={handleSubmit} >Submit</button>



                    <button
                        className="modal-close-btn absolute top-0 right-0 p-3 "
                        onClick={onClose}>

                        <svg
                            className="fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                        >
                            <path
                                d="M6.293 6.293a1 1 0 011.414 0L9 7.586l1.293-1.293a1 1 0 111.414 1.414L10.414 9l1.293 1.293a1 1 0 11-1.414 1.414L9 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 9 6.293 7.707a1 1 0 010-1.414z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
