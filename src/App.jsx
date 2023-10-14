
import MainPage from './components/MainPage'
import './index.css'
import Navbar from './components/navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { CSSTransition } from 'react-transition-group';





function App() {
  // States
  const [groupName, setGroupName] = useState("")
  const [showMainPage, setShowMainPage] = useState(true);

  const [initTasks, setInitTasks] = useState([])
  const [eMessage, setEMessage] = useState(false)
  const [messageBody, setMessageBody] = useState("")
  const [activeGroup, setActiveGroup] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetching Data
  const fetchData = async () => {
    const resGroup = await fetch("/api/groups")
    if (resGroup.ok) {
      const json = await resGroup.json()
      setActiveGroup("main")
      dispatchG({ type: "FETCH", payload: json })
    }

    const resTask = await fetch("/api/tasks")
    if (resTask.ok) {
      const json = await resTask.json()
      // Set the data in UseReducer
      setInitTasks(json)
      dispatch({ type: "FETCH", payload: json })
    }
    setIsLoading(false)
  }


  useEffect(() => {
    fetchData()
  }, [])






  // The Render Function for Tasks 
  const taskReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH':
        setTimeout(() => { setShowMainPage(true) }, 500)

        return { tasks: action.payload };
      case 'REMOVE':
        const removeTask = state.tasks.filter(item => item._id !== action.payload)
        return { tasks: removeTask };
      case 'ADD':
        fetchData()
        return { tasks: [action.payload, ...state.tasks] };
      case 'CHANGE':
        const updatedTasks = state.tasks
          .map(item => {
            if (item._id === action.payload.id) return { ...item, state: action.payload.state }
            return item;
          })
        return { tasks: updatedTasks };

      case 'FILTER':
        setTimeout(() => { setShowMainPage(!showMainPage) }, 500)
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
    setIsLoading(true)
    const groupArray = []
    groups.forEach(e => groupArray.push(e.name))

    if (groupName && !groupArray.includes(groupName)) {
      dispatchG({ type: "ADD", payload: { name: groupName, tasks: [], createdAt: Date.now() } })
    }
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ name: groupName })
    })



    if (res.ok) {
      setActiveGroup(groupName)
      dispatch({ type: 'FETCH', payload: [] })
      setIsLoading(false)
    }

    if (!res.ok) {
      const json = await res.json()
      setEMessage(true)
      setMessageBody(json.message)
      setIsLoading(false)
      return
    }
  }



  //Deleting Group
  const DeleteGroup = async (group) => {
    dispatchG({ type: "REMOVE", payload: group })
    setGroup("main")
    const res = await fetch("/api/groups/" + group.name, {
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
      fetchData()
    }

  }

  //Changing Error Messages
  const changeMessage = () => {
    setEMessage(!eMessage)
  }


  // Setting Group
  const setGroup = (name) => {
    setShowMainPage(!showMainPage)
    if (name === "main") return dispatch({ type: "MAIN" })
    dispatch({ type: "FILTER", payload: name })
  }






  return (

    <div className="layout bg-slate-900 h-screen selection:bg-slate-600 relative">
      <Navbar dispatch={dispatch} eMessage={eMessage} changeMessage={changeMessage} messageBody={messageBody} />

      <section className='sidebar bg-slate-800 shadow-sm text-white border-r border-gray-700 flex flex-col justify-center gap-y-8 items-center'>


        {isLoading ? <div className="flex justify-center items-center animate-spin col-start-2 text-white">
          <svg fill="white" className=" stroke-indigo-800 stroke-2" height="65" viewBox="0 0 20 20" width="65" xmlns="http://www.w3.org/2000/svg"><path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" fill="#212121" /></svg>
        </div> :
          <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === "main" ? "bg-slate-950 border-indigo-800 border-2" : ""}`} onClick={() => setGroup("main")} >
            <h1 className="text-xl" >Main</h1>
          </div>}



        {!isLoading && groupContainer.groups && groupContainer.groups.map(group => {
          return (
            <div className={`w-72 h-20 bg-slate-900 rounded-lg flex justify-center items-center flex-col pt-2 hover:bg-slate-950 active:border-2 active:border-indigo-800 ${activeGroup === group.name ? "bg-slate-950 border-indigo-800 border-2" : ""} `} onClick={() => setGroup(group.name)}>
              <h1 className="text-xl" >{group.name}</h1>
              <small className="text-gray-400">{group.tasks.length === 1 ? "1 Task" : group.tasks.length + " Tasks"}</small>
              <button className="mb-1 text-xs font-semibold" onClick={() => { DeleteGroup(group) }}>Delete</button>
            </div>
          )
        })}

        {!isLoading && <div className="flex flex-col gap-y-2">
          <input type="text" id="title" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="rounded-sm font-bold pl-1 text-gray-900" />
          <button className=" text-xs bg-indigo-700 text-white p-2 rounded-3xl px-3 font-bold hover:bg-indigo-800 hover:shadow-lg active:bg-white  active:text-indigo-700 transition-colors delay-50" onClick={() => { postGroup() }}>+Add New Group</button>
        </div>}


      </section>

      <CSSTransition
        timeout={500}
        classNames="component"
        unmountOnExit
        in={showMainPage}
      >
        <main className="main gap-x-8 p-14 mx-20">
          {isLoading ? <div className="flex justify-center items-center animate-spin col-start-2 text-white">
            <svg fill="white" className=" stroke-indigo-800 stroke-2" height="65" viewBox="0 0 20 20" width="65" xmlns="http://www.w3.org/2000/svg"><path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" fill="#212121" /></svg>
          </div> :
            <MainPage tasks={taskContainer.tasks} dispatch={dispatch} activeGroup={activeGroup} />
          }

        </main>
      </CSSTransition>
    </div >
  )
}

export default App
