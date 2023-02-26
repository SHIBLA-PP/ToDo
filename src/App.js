import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function App() {

  // Task state
  const [toDo,setToDo]=useState([
    {"id":1,"title":"Task1","status":false},
    {"id":2,"title":"task2","status":false},
    {"id":3,"title":"Task3","status":false}
  ])

  // Temp state
  const [newtask,setNewTask]=useState('');
  const [updateData,setUpdateData]=useState('')


  // Add Task
  const addTask=()=>{
    if(newtask){
      let num= toDo.length+1;
      let newEntry= { id:num ,title:newtask ,status:false}
      setToDo([...toDo,newEntry])
      setNewTask('');
    }
  }

  // Delete Task
  const deleteTask=(id)=>{
    let newTasks=toDo.filter(task=> task.id!==id)
    setToDo(newTasks);
  }

  // Mark as Done or Completed a Task
  const markDone=(id)=>{
    let newTask=toDo.map(task =>{
      if(task.id === id){
        return ({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask)
  }

  // Cancel Update
   const cancelUpdate=()=>{
    setUpdateData('');
   }

  // Change Task for Update            It is an Event
  const ChangeTask=(e)=>{
    let newEntry={
      id: updateData.id ,
      title: e.target.value ,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update Task 
  const updateTask=()=>{
    let filterRecords= [...toDo].filter(task=> task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData]
    setToDo(updateObject);
    setUpdateData('');
   }


  return (
    <div className="container App ">

      <br></br>
      <h2>To Do List App</h2>
      <br></br>

      {/* Update Task */}

      {updateData && updateData ? (
        <>
        <div className='row mb-3 mt-3'>

          <div className='col'>
            <input value={updateData && updateData.title}
            onChange={(e)=>ChangeTask(e)}
            className='form-control form-control-lg' />
          </div>

          <div className='col-auto'>
            <button onClick={updateTask} className='btn btn-lg btn-success' >Update</button>
          </div>
          
          <div className='col-auto'>
          <button onClick={cancelUpdate} className='btn btn-lg btn-warning'>Cancel</button>
          </div>

        </div>
        </>
      ) : (
        <>
        {/* Add Tasks */}

           <div className='row mb-3 mt-3'>
              <div className='col'>
                <input
                 value={newtask}
                  onChange={ (e) => setNewTask(e.target.value) }
                    className='form-control form-control-lg'
                     />
              </div>
              <div className='col-auto'>
                <button 
                onClick={addTask}
                className='btn btn-lg btn-success'>Add Task
                </button>
              </div>
          </div>

        </>

      )
      }

  
      {/* Display ToDos */}

      {toDo && toDo.length?'':'No Tasks...'}

      {toDo && toDo.sort((a,b)=>a.id>b.id ? 1 : -1)
      .map((task,index)=>{
        return(
          <React.Fragment key={task.id}>
            
            <div className="col taskBg">
              <div className={task.status ? 'done' : ''}>

              <span className="taskNumber">{index+1}</span>
              <span className="taskText">{task.title}</span>

              </div>
              <div className="iconwrap">
                <span title="completed / not completed" 
                  onClick={ (e)=> markDone(task.id) }>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>

                  {task.status ? null:(
                    <span title="Edit" 
                    onClick={()=> setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false
                      }) } >
                    <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                <span title="Delete"  
                  onClick={()=>deleteTask(task.id)} >
                <FontAwesomeIcon icon={faTrashCan} />
                </span>

              </div>
            </div>

          </React.Fragment>
        )
      })}

    </div>
  );
}

export default App;
