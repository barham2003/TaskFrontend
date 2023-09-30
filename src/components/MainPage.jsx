import React from 'react';

function MainPage({ Tasks, Update, activeGroup }) {

    const deleteTask = async (id) => {
        const res = await fetch("https://mytasksapi.onrender.com/tasks/" + id, {
            method: "DELETE"
        })
        Update()
    }

    const changeTask = async (id, state) => {
        const res = await fetch(`https://mytasksapi.onrender.com/tasks/${id}/${state}`,
            { method: "PATCH" }
        )
        Update()
    }

    return (
        <>
            <div className="todo flex flex-col  p-3  ">
                <div className='flex h-6 items-center gap-x-2'>
                    <div className="w-4 h-4 bg-sky-500 rounded-full "></div>
                    <span className=" text-gray-500">TODO</span>
                </div>
                <div className="flex flex-col gap-y-4 mt-4 h-100 overflow-scroll">
                    {Tasks && Tasks.filter(task => task.state === "todo").map(task => {
                        return (
                            <div className="hover:drop-shadow-2xl  w-auto h-auto bg-slate-800 rounded-lg p-6 text-white  inline hover:border-indigo-600 border-slate-600 border-2" key={task._id}>
                                <h1 className="text-xl inline">{task.title}</h1>
                                {activeGroup === "main" &&
                                    <h2 className='inline ml-2 text-xs text-gray-600'>{task.group.name}</h2>
                                }
                                <p className="text-sm py-4"> {task.body}</p>
                                {activeGroup === "main" &&
                                    <>
                                        <button className='inline text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-red-800 active:text-white transition-colors delay-50 mr-2'
                                            onClick={() => deleteTask(task._id)}>Delete
                                        </button>
                                        <button className='inline text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-blue-800 active:text-white transition-colors delay-50'
                                            onClick={() => changeTask(task._id, "doing")}
                                        >Change
                                        </button>
                                    </>

                                }
                            </div>)
                    })}

                </div>
            </div>
            <div className="todo flex flex-col  p-3">
                <div className='flex h-6 items-center gap-x-2'>
                    <div className="w-4 h-4 bg-violet-700 rounded-full "></div>
                    <span className=" text-gray-500">DOING</span>
                </div>
                <div className="flex flex-col gap-y-4 mt-4 h-100 overflow-scroll">
                    {Tasks && Tasks.filter(task => task.state === "doing").map(task => {
                        return (
                            <div className="hover:drop-shadow-2xl  w-auto h-auto bg-slate-800 rounded-lg p-6 text-white  inline hover:border-indigo-600 border-slate-600 border-2" key={task._id}>
                                <h1 className="text-xl inline">{task.title}</h1>
                                {activeGroup === "main" &&
                                    <h2 className='inline ml-2 text-xs text-gray-600'>{task.group.name}</h2>
                                }


                                <p className="text-sm py-4">
                                    {task.body}
                                </p>

                                {activeGroup === "main" &&
                                    <>
                                        <button className='inline text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-red-800 active:text-white transition-colors delay-50 mr-2'
                                            onClick={() => deleteTask(task._id)}>Delete
                                        </button>
                                        <button className='inline text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-blue-800 active:text-white transition-colors delay-50'
                                            onClick={() => changeTask(task._id, "done")}
                                        >Change
                                        </button>
                                    </>
                                }
                            </div>
                        )
                    })}



                </div>
            </div>
            <div className="todo flex flex-col  p-3">
                <div className='flex h-6 items-center gap-x-2'>
                    <div className="w-4 h-4 bg-green-500 rounded-full "></div>
                    <span className=" text-gray-500">DONE</span>
                </div>
                <div className="flex flex-col gap-y-4 mt-4 h-100 overflow-scroll">
                    {Tasks && Tasks.filter(task => task.state === "done").map(task => {
                        return (
                            <div className="hover:drop-shadow-2xl  w-auto h-auto bg-slate-800 rounded-lg p-6 text-white  inline hover:border-indigo-600 border-slate-600 border-2 " key={task._id}>
                                <h1 className="text-xl inline">{task.title}</h1>
                                {activeGroup === "main" &&
                                    <h2 className='inline ml-2 text-xs text-gray-600'>{task.group.name}</h2>
                                }
                                <p className="text-sm py-4">{task.body} </p>
                                {activeGroup === "main" &&
                                    <>
                                        <button className='mr-2 text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-red-800  active:text-white transition-colors delay-50 inline-block ' onClick={() => deleteTask(task._id)}>Delete</button>
                                        <button className='inline text-sm bg-indigo-700 p-1 px-2 rounded-2xl hover:bg-indigo-800 hover:shadow-lg active:bg-blue-800 active:text-white transition-colors delay-50'
                                            onClick={() => changeTask(task._id, "todo")}
                                        >Change
                                        </button>
                                    </>

                                }
                            </div>)
                    })}


                </div>
            </div>
        </>
    )
}

export default MainPage