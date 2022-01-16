import React from 'react'

const TaskDetail = (props) => {
    return (
        <div className="ui card" style={{marginTop: 30,}}>
            <div>
                <img  src="https://www.dropbox.com/s/9wes624sz0cnpq1/636161.png?raw=1" width="50" height="60"/>
            </div>
            
                <div className="content">
                    <div className="author" style={{marginTop: 5}}>
                        Task Added by <h5 style={{color: "blue"}}>{props.author}</h5>
                    </div>
                    <div className="author" style={{marginTop: 5}}>
                        Task Added On <h5 style={{color: "blue"}}>{props.dateAdded}</h5>
                    </div>
                    <div className="metadata" style={{marginTop: 5}}>
                        <div className="date">Deadline <h5 style={{color: "blue"}}>{props.taskDeadline}</h5></div>
                    </div>
                    <div className="text" style={{marginTop: 5}}>Task name <h5 style={{color: "blue"}}>{props.taskName}</h5></div>
                </div>

                <div style={{alignSelf: "center", fontSize: 20, marginBottom: 5, 
                color: `${(props.status).toLowerCase() == "pending"? "red": "green"}` }}
            
                >
                    {props.status}
                </div>
           
            
            <div className="ui two buttons" >
                {(() => {
                    if(props.status == "Pending")
                        return (<button 
                            className="ui basic green button"
                            onClick={() => {
                                console.log("Haha")
                                props.statusChangeCallback(props.taskName)
                            }}
                            >
                                Mark Complete
                            </button>)

                    return (<button 
                        className="ui basic red button"
                        onClick={()=> {
                            console.log("hihi")
                            props.statusChangeCallback(props.taskName)
                        }}
                        >
                            Mark Pending
                            </button>)
                })()}
                
                <button 
                    className="ui basic blue button"
                    onClick={() => {
                        console.log("Haha")
                        props.deleteTaskCallback(props.taskName)
                    }}
                    >
                       X Delete Task
                </button>  
            </div>
            
           
        </div>
    )
}

export default TaskDetail