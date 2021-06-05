import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this)
    this.complete = this.complete.bind(this)
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      labels: JSON.parse(localStorage.getItem('labels')) || []
    }
  }

  createTask(e){
    e.preventDefault();
    const data = new FormData(e.target);
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks){
      tasks = [...tasks, {
        title: data.get('title'),
        description: data.get('description'),
        done: false
      }]
    }else{
      tasks = [
        {
          title: data.get('title'),
          description: data.get('description'),
          done: false
        }
      ]
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})

    e.target.title = ""
    e.target.description = ""
  }

  complete(e){
    const taskIndex = e.target.dataset.key
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks[taskIndex].done){tasks[taskIndex].done = false}
    else{tasks[taskIndex].done = true}
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})
  }

  render() {
    return (
      <div>
        <div className="mgin-40">
          <h1>HackDay</h1>
          <hr/>
        </div>
        <div className="span-across">
          <div className="side-bar left-bar">
            <form className="label-form mb-4">
              <input
                required
                type="text"
                className="form-control mb-2"
                placeholder="Label name"
                name="label-name"
              />
              <input
                required
                type="color"
                className="form-control mb-2"
                name="label-color"
              />
              <button className="btn btn-secondary">Create Label</button>
            </form>
            {/* <h3>Labels</h3> */}
            {/* <hr/> */}
          </div>
          <div className="main-form">
            <form className="mb-4" onSubmit={this.createTask}>
              <input
                required
                className="form-control mb-2"
                type="text"
                placeholder="Title"
                name="title"
              />
              <textarea required placeholder="Description here!" className="form-control mb-2" name="description"></textarea>
              <button className="btn btn-secondary">Create Task</button>
            </form>
          </div>
          <div className="side-bar right-bar">
            <form className="project-form mb-4">
              <input
                required
                type="text"
                className="form-control mb-2"
                placeholder="Project name"
                name="project-name"
              />
              <textarea required placeholder="Description here!" className="form-control mb-2" name="project-description"></textarea>
              <button className="btn btn-secondary">Create Project</button>
            </form>
            {/* <h3>Projects</h3> */}
            {/* <hr/> */}
          </div>
        </div>
        <div className="mgin-40">
          {/* <h3>Tasks</h3> */}
          {/* <hr/> */}
          <div className="tasks-list">
            {this.state.tasks.map((task, index) => {
              return(
                <div key={index} className={task.done ? "done tasks" : "tasks"}>
                    <div className="d-flex">
                      <input checked={task.done ? true : false} data-key={index} className="form-check-input" type="checkbox" onChange={this.complete}></input>
                      <h5 className={task.done ? "line-through" : null}>{task.title}</h5>
                    </div>
                    <p className="description">{task.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);

reportWebVitals();
