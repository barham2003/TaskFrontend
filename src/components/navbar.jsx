import { useState } from "react";
import Modal from "./modal";

function Navbar({ Tasks, Update, eMessage, changeMessage, messageBody }) {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const onClose = () => {
        setIsModalOpen(!isModalOpen)
    }


    return (
        <nav className="navbar bg-slate-800 shadow-sm text-white flex justify-between px-6 h-auto items-center border-b border-gray-700 relative">


            <div className="">
                <h1 className="text-2xl"><span className="font-bold">Task</span> Manager</h1>
            </div>
            {eMessage && messageBody && <div className="w-auto h-auto bg-red-950 font-bold text-sm p-2 px-6 rounded-lg " onClick={() => changeMessage()}>
                {messageBody}
            </div>}

            <div>
                <button className="text-sm bg-indigo-700 text-white p-3 rounded-3xl px-6 font-bold hover:bg-indigo-800 hover:shadow-lg active:bg-white  active:text-indigo-700 transition-colors delay-50" onClick={onClose}>+Add New Task</button>
                <Modal isOpen={isModalOpen} onClose={onClose} Tasks={Tasks} Update={Update} />
            </div>
        </nav>
    )
}

export default Navbar