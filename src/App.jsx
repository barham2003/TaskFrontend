
import MainPage from './components/MainPage'
import './index.css'
import Navbar from './components/navbar';
import { useEffect } from 'react';
import { useState } from 'react';




function App() {
  // States
  const [groupName, setGroupName] = useState("")
  const [tasks, setTasks] = useState([])
  const [groups, setGroups] = useState([])
  const [eMessage, setEMessage] = useState(false)
  const [messageBody, setMessageBody] = useState("")
  const [activeGroup, setActiveGroup] = useState("")

  // Fetching Data
  const fetchData = async () => {
    const resGroup = await fetch("https://mytasksapi.onrender.com/groups")
    if (resGroup.ok) {
      const json = await resGroup.json()
      setGroups(json)

      setActiveGroup("main")

    }

    const resTask = await fetch("https://mytasksapi.onrender.com/tasks")
    if (resTask.ok) {
      const json = await resTask.json()
      setTasks(json)
    }

  }

  useEffect(() => {
    fetchData("main")
  }, [])

  // Creating Group
  const postGroup = async () => {
    const res = await fetch("https://mytasksapi.onrender.com/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ name: groupName })
    })

    if (!res.ok) {
      const json = await res.json()
      setEMessage(true)
      setMessageBody(json.message)
    }
    fetchData()
  }


  //Deleting Group
  const DeleteGroup = async (id) => {
    const res = await fetch("https://mytasksapi.onrender.com/groups/" + id, {
      method: "DELETE",
    })

    if (!res.ok) {
      const json = await res.json()
      setEMessage(true)
      setMessageBody(json.message)
    }

    if (res.ok) {
      setEMessage(false)
    }
    fetchData()

  }

  //Changing Error Messages
  const changeMessage = () => {
    setEMessage(!eMessage)
  }


  // Setting Group
  const setGroup = (tasks, name) => {
    setTasks(tasks)
    setActiveGroup(name)
  }




  return (
    <div className="layout bg-slate-900 h-screen selection:bg-slate-600 relative">
      <Navbar Update={fetchData} eMessage={eMessage} changeMessage={changeMessage} messageBody={messageBody} />

      <section className='sidebar bg-slate-800 shadow-sm text-white border-r border-gray-700 flex flex-col justify-center gap-y-8 items-center'>

        <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === "main" ? "bg-slate-950 border-indigo-800 border-2" : ""}`} onClick={() => fetchData("main")} >
          <h1 className="text-xl" >Main</h1>

        </div>
        {groups && groups.map(group => {
          return (
            <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === group.name ? "bg-slate-950 border-indigo-800 border-2" : ""} `} onClick={() => setGroup(group.tasks, group.name)}>
              <h1 className="text-xl" >{group.name}</h1>
              <small className="text-gray-400">{group.tasks.length === 1 ? "1 Task" : group.tasks.length + " Tasks"}</small>
              <button className="mb-1 text-xs font-semibold" onClick={() => { DeleteGroup(group._id) }}>Delete</button>
            </div>
          )
        })}
        <div className="flex flex-col gap-y-2">
          <input type="text" id="title" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="rounded-sm font-bold pl-1 text-gray-900" />
          <button className=" text-xs bg-indigo-700 text-white p-2 rounded-3xl px-3 font-bold hover:bg-indigo-800 hover:shadow-lg active:bg-white  active:text-indigo-700 transition-colors delay-50" onClick={() => { postGroup() }}>+Add New Group</button>
        </div>

      </section>


      <main className="main gap-x-8 p-14 mx-20">
        <MainPage Tasks={tasks} Update={fetchData} activeGroup={activeGroup} />
      </main>
    </div>
  )
}

export default App
