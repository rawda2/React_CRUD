import { useState, useEffect ,useRef} from "react";
import "./App.css";
import Task from "./components/task/Task";

function App() {

  
  let [allTasks, setAllTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("allTasks") || "[]");
  });

  let [completedTasks, setCompletedTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("Completed_Tasks") || "[]");
  });

  let [task, setTask] = useState({ title: "", desc: "", done: false });
  let [viewCompleted, setViewCompleted] = useState(false);

  // Save all tasks to local storage
  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }, [allTasks]);

  // Save completed tasks to local storage
  useEffect(() => {
    localStorage.setItem("Completed_Tasks", JSON.stringify(completedTasks));
  }, [completedTasks]);


  const descInputRef = useRef(null);

  // Search value state
  let [search, setSearch] = useState("");

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Function to filter tasks based on search term
  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.desc.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCompletedTasks = completedTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Function to add a new task
  let AddNew = () => {
    if (task.title && task.desc) {
      let newTask = {
        title: task.title,
        desc: task.desc,
        done: false, // Keep the initial done status false
      };

      // Update the list of tasks
      setAllTasks([...allTasks, newTask]);

      // Clear the input fields after adding the task
      setTask({ title: "", desc: "" });
    } else {
      alert("Please fill out both fields.");
    }
  };

  // Delete task from list
  let deleteTask = (i) => {
    let UpdatedList = [...allTasks];
    UpdatedList.splice(i, 1);
    setAllTasks(UpdatedList);
  };

  // Handler to update the task state on input change
  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Set task as completed
  let Setdone = (i) => {

   let now=new Date();
   let dd=now.getDate()
   let mm=now.getMonth()+ 1;
   let yy=now.getFullYear()
   let h=now.getHours()
   let mn=now.getMinutes()

   console.log(clock)
   

   var clock=`${dd}/${mm}/${yy} at ${h}:${mn}`


    let taskToComplete = allTasks[i];
    let updatedTask = { ...taskToComplete, done: true,clock:clock };

    // Update the completed tasks state
    setCompletedTasks([...completedTasks, updatedTask]);

    // Remove the task from allTasks and update the state
    let updatedTasksList = allTasks.filter((_, index) => index !== i);
    setAllTasks(updatedTasksList);
  };

  const edit = (i) => {
    let Utitle = prompt("Enter the new title " ,allTasks[i].title);
    let Udesc = prompt("Enter the new description",allTasks[i].desc);
    let updatedTasks = [...allTasks];
    if (Utitle !== "") {
      allTasks[i].title = Utitle;
    }
    if (Udesc !== "") {
      allTasks[i].desc = Udesc;
    }

    setAllTasks(updatedTasks);
  };

  function clearStorage() {
    localStorage.clear();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if(e.target.name==="title"){
        descInputRef.current.focus()
      }
      else{
        AddNew();

      }
    }
  };

  return (
    <>
      <main className="d-flex flex-column py-5 align-items-center">
        <h1>
          <i className="fa-solid fa-list-check text-success"></i> My TODO List
        </h1>
        <div className="body mt-5 py-5 px-2 d-flex flex-column">
          <div className="header d-flex gap-3 w-100 justify-content-center px-md-3 p-2 position-relative">
            <div className="input d-flex flex-column">
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                className="w-100 p-1"
                name="title"
                value={task.title}
                onChange={handleInputChange}

                placeholder="What's the task title?"
              />
            </div>
            <div className="input d-flex flex-column">
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                className="w-100 p-1"
                name="desc"
                value={task.desc}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} 
                placeholder="What's the task description?"
              />
            </div>
            <div className="mt-4 add">
              <button className="px-3 py-2" type="button" onClick={AddNew}>
                Add
              </button>
            </div>
          </div>

          <nav className="navbar mt-5 d-flex align-items-center justify-content-center">
            <div className="container-fluid d-block">
              <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown} 
                  ref={descInputRef}
                  aria-label="Search"
                />
              </form>
            </div>
          </nav>

          <div className="list mt-5 p-md-4 p-3">
            <div className="type">
              {/* ToDo Button */}
              <button
                className={`btn1 ${!viewCompleted ? "active" : ""}`}
                onClick={() => setViewCompleted(false)}
              >
                ToDo
              </button>

              {/* Completed Button */}
              <button
                className={`btn2 ${viewCompleted ? "active" : ""}`}
                onClick={() => setViewCompleted(true)}
              >
                Completed
              </button>
            </div>

            {/* Conditionally render tasks based on viewCompleted */}
            {!viewCompleted ? (
              <>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((t, index) => (
                    <Task
                      key={index}
                      newtask={t.title}
                      des={t.desc}
                      delTask={() => deleteTask(index)}
                      complete={() => Setdone(index)}
                      isCompleted={false}
                      update={() => edit(index)}
                    />
                  ))
                ) : (
                  <p className="mt-3 text-danger">No Tasks </p>
                )}
              </>
            ) : (
              <>



                {completedTasks.length > 0  && filteredCompletedTasks.length>0? (

                 filteredCompletedTasks.map((t, index) => (
                    <Task
                      key={index}
                      newtask={t.title}
                      des={t.desc}
                      delTask={() => {
                        setCompletedTasks(
                          completedTasks.filter((_, i) => i !== index)
                        );
                      }}
                      complete={() => { }} // No complete function needed for completed tasks
                      isCompleted={true}
                      time={t.clock}
                      
                    />
                  ))
                ) : (
                  <p className="mt-3 text-danger">No completed tasks</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
