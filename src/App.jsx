
import MainPage from './components/MainPage'
import './index.css'
import Navbar from './components/navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';




function App() {
  // States
  const [groupName, setGroupName] = useState("")
  const [initTasks, setInitTasks] = useState([])
  const [eMessage, setEMessage] = useState(false)
  const [messageBody, setMessageBody] = useState("")
  const [activeGroup, setActiveGroup] = useState("")

  // Fetching Data
  const fetchData = async () => {
    // const fetchData = async () => {
    const resGroup = await fetch("https://mytasksapi.onrender.com/groups")
    if (resGroup.ok) {
      const json = await resGroup.json()
      setActiveGroup("main")
      dispatchG({ type: "FETCH", payload: json })
    }

    const resTask = await fetch("https://mytasksapi.onrender.com/tasks")
    if (resTask.ok) {
      const json = await resTask.json()
      // Set the data in UseReducer
      setInitTasks(json)
      dispatch({ type: "FETCH", payload: json })
    }

  }



  useEffect(() => {
    fetchData()
  }, [])






  // The Render Function for Tasks 
  const taskReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH':
        return { tasks: action.payload };
      case 'REMOVE':
        const removeTask = state.tasks.filter(item => item._id !== action.payload)
        return { tasks: removeTask };
      case 'ADD':
        fetchData()
        return { tasks: [...state.tasks, action.payload] };
      case 'CHANGE':
        const updatedTasks = state.tasks
          .map(item => {
            if (item._id === action.payload.id) return { ...item, state: action.payload.state }
            return item;
          })
        return { tasks: updatedTasks };

      case 'FILTER':
        const filteredTasks = [...initTasks].filter(item => item.group.name === action.payload)
        setActiveGroup(action.payload)
        return { tasks: filteredTasks }
      case 'MAIN':
        fetchData()
        setActiveGroup("main")
        return { tasks: [...initTasks] }
      default:
        return state;
    }
  };

  //The UseReducer Creator for Tasks
  const [taskContainer, dispatch] = useReducer(taskReducer, { tasks: [] });

  // Render Before Everything




  // The useReducer Function for Groups
  const groupReducer = (state, action) => {
    switch (action.type) {
      case "FETCH":
        return { groups: action.payload }

      case "ADD":
        return { groups: [...state.groups, action.payload] }

      case "REMOVE":
        console.log("FROM REDUCER: ", action.payload)
        if (action.payload.tasks.length > 0) return state
        const removeGroup = state.groups.filter(item => item._id !== action.payload._id)
        return { groups: removeGroup }

      default:
        return state
    }
  }

  // The useReducer Creator for Groups
  const [groupContainer, dispatchG] = useReducer(groupReducer, { groups: [] })
  const groups = groupContainer.groups


  // Creating Group
  const postGroup = async () => {
    dispatchG({ type: "ADD", payload: { name: groupName, tasks: [], createdAt: Date.now() } })
    const res = await fetch("https://mytasksapi.onrender.com/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ name: groupName })
    })


    if (res.ok) {
      fetchData()
    }

    if (!res.ok) {
      const json = await res.json()
      setEMessage(true)
      setMessageBody(json.message)
      return
    }
  }



  //Deleting Group
  const DeleteGroup = async (group) => {
    dispatchG({ type: "REMOVE", payload: group })
    const res = await fetch("https://mytasksapi.onrender.com/groups/" + group._id, {
      method: "DELETE",
    })

    if (!res.ok) {
      const json = await res.json()
      setEMessage(true)
      setMessageBody(json.message)
      return
    }

    if (res.ok) {
      setEMessage(false)
    }

  }

  //Changing Error Messages
  const changeMessage = () => {
    setEMessage(!eMessage)
  }


  // Setting Group
  const setGroup = (name) => {
    if (name === "main") return dispatch({ type: "MAIN" })
    dispatch({ type: "FILTER", payload: name })
  }






  return (
    <div className="layout bg-slate-900 h-screen selection:bg-slate-600 relative">
      <Navbar dispatch={dispatch} eMessage={eMessage} changeMessage={changeMessage} messageBody={messageBody} />

      <section className='sidebar bg-slate-800 shadow-sm text-white border-r border-gray-700 flex flex-col justify-center gap-y-8 items-center'>

        <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === "main" ? "bg-slate-950 border-indigo-800 border-2" : ""}`} onClick={() => setGroup("main")} >
          <h1 className="text-xl" >Main</h1>

        </div>
        {groups && groups.map(group => {
          return (
            <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === group.name ? "bg-slate-950 border-indigo-800 border-2" : ""} `} onClick={() => setGroup(group.name)}>
              <h1 className="text-xl" >{group.name}</h1>
              <small className="text-gray-400">{group.tasks.length === 1 ? "1 Task" : group.tasks.length + " Tasks"}</small>
              <button className="mb-1 text-xs font-semibold" onClick={() => { DeleteGroup(group) }}>Delete</button>
            </div>
          )
        })}
        <div className="flex flex-col gap-y-2">
          <input type="text" id="title" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="rounded-sm font-bold pl-1 text-gray-900" />
          <button className=" text-xs bg-indigo-700 text-white p-2 rounded-3xl px-3 font-bold hover:bg-indigo-800 hover:shadow-lg active:bg-white  active:text-indigo-700 transition-colors delay-50" onClick={() => { postGroup() }}>+Add New Group</button>
        </div>

      </section>


      <main className="main gap-x-8 p-14 mx-20">
        <MainPage tasks={taskContainer.tasks} dispatch={dispatch} activeGroup={activeGroup} />
      </main>
    </div>
  )
}

export default App
