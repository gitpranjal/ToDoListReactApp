import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import TaskDetail from './TaskDetail'
import Modal from 'react-modal'
import moment  from 'moment'
import axios from 'axios'
import { assertLiteral } from '@babel/types'

const App = () => {


    const [taskList, setTaskList] = useState([])

    const [ isModalOpen, setModalOpen ] = useState(false)
    const [newTaskInfoObject, setNewTaskInfoObject] = useState({
        "taskName": "",
        "taskDeadline": "",
        "author": "",
        "status": "Pending",
        "dateAdded": "",
    })
    
    useEffect(() => {

        
        axios.get(
            "https://hidden-peak-98296.herokuapp.com/",
            //"http://localhost:3001/"
            )
        .then((response) => {
            console.log(response.data)
            setTaskList(response.data)
        })
            
        .catch((error) => console.log(error)); //to catch the errors if any
        
    }, [])
    
   
//     const tasks = [{
//         "taskName": "Task A", "taskDeadline": "Date A", "author": "Sam", "status": "Pending"
//     },
//     {
//         "taskName": "Task B", "taskDeadline": "Date B", "author": "Kim", "status": "Pending"
//     },
//     {
//         "taskName": "Task C", "taskDeadline": "Date C", "author": "Rim", "status": "Complete"
//     },
    
// ]
    const statusChangeCallback = (taskName) => {

        let newTaskList = [].concat(taskList)
        for(var taskObject of newTaskList)
        {
            if(taskObject.taskName == taskName)
            {
                if((taskObject.status).toLowerCase() == "pending")
                    taskObject.status = "Complete"
                else
                    taskObject.status = "Pending"
            }
        }

        setTaskList(newTaskList)
    }

    const deleteTaskCallback = (taskName) => {
        let newTaskList = taskList.filter((taskObjects) => taskObjects.taskName != taskName)
        setTaskList(newTaskList)
    }

    const taskComponentsList = taskList.map((taskObject) => {
        return <TaskDetail 
                key={""+taskObject.taskName}
                taskName={taskObject.taskName} 
                taskDeadline={taskObject.taskDeadline} 
                author={taskObject.author} 
                status={taskObject.status}
                dateAdded={taskObject.dateAdded}
                statusChangeCallback={statusChangeCallback}
                deleteTaskCallback={deleteTaskCallback}
            />
    })
    console.log("######", taskList)
    return (
        
        // <div className="ui container commments">
        //     <TaskDetail taskName="TaskA" taskDeadline="Date A" author="Sam"/>
        //     <TaskDetail taskName="TaskB" taskDeadline="Date B" author="Kim"/>
        //     <TaskDetail taskName="TaskC" taskDeadline="Date C" author="Rim"/>
        // </div>
        <div style={{marginLeft: 20, marginTop: 10}}>

            <button 
            className="ui basic blue button"
            onClick={() => {
                fetch(
                    "https://hidden-peak-98296.herokuapp.com/updateTasks",
                    //"http://localhost:3001/updateTasks",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        newTasksList: taskList,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log("Backend updated")
                      alert("Backend data updated!!")
                    })
                    .catch((error) => console.log(error));
            }}
            >
                <div>Update Backend</div>
            
            </button>

            <button 
            className="ui basic blue button"
            onClick={() => setModalOpen(true)}
            >
                <div>+ Add Task</div>
            
            </button>

            {taskComponentsList}
       
          <Modal isOpen={isModalOpen} ariaHideApp={false}>
              <h2>New Task</h2>
              
              <form className="ui form">
                  <p>New Task Name</p>
                  <input 
                    type="text"
                    value={newTaskInfoObject.taskName}
                    onChange={(event) => {
                        // setNewTaskName(event.target.value)
                        newTaskInfoObject.taskName = event.target.value
                        setNewTaskInfoObject({...newTaskInfoObject})
                    }}
                  ></input>
              </form>

              <form className="ui form">
                  <p>New Task Deadline</p>
                  <input 
                    type="text"
                    value={newTaskInfoObject.taskDeadline}
                    onChange={(event) => {
                        // setNewTaskName(event.target.value)
                        newTaskInfoObject.taskDeadline = event.target.value
                        setNewTaskInfoObject({...newTaskInfoObject})
                    }}
                  ></input>
              </form>

              <form className="ui form">
                  <p>New Task Author</p>
                  <input 
                    type="text"
                    value={newTaskInfoObject.author}
                    onChange={(event) => {
                        // setNewTaskName(event.target.value)
                        newTaskInfoObject.author = event.target.value
                        setNewTaskInfoObject({...newTaskInfoObject})
                    }}
                  ></input>
              </form>


              <button 
                className="ui basic pink button" 
                style={{alignSelf: "flex-end", marginTop: 10}}
                onClick={() => setModalOpen(false)}
                >
                  Cancel
              </button>

              <button 
                className="ui basic green button" 
                style={{alignSelf: "flex-end", marginTop: 10}}
                onClick={() => {
                    let newTaskList = [].concat(taskList)
                    newTaskInfoObject.dateAdded = moment().format("MMM Do YY")
                    newTaskList.push({...newTaskInfoObject})
                    setTaskList(newTaskList)
                    console.log(newTaskList)
                    newTaskInfoObject.taskName = ""
                    newTaskInfoObject.taskDeadline = ""
                    newTaskInfoObject.author = ""
                    
                    setModalOpen(false)
                }}
                >
                 + Add
              </button>
              
          </Modal>

     
        </div>
        
    )
}

ReactDom.render(
    <App/>,
    document.querySelector("#root")
)