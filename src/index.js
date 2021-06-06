import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

function Task(props){
  return (
    <div className={props.task.done ? "done tasks" : "tasks"}>
        <div className="d-flex">
          <input checked={props.task.done ? true : false} data-key={props.index} className="form-check-input" type="checkbox" onChange={props.onChange}></input>
          <h5 className={props.task.done ? "line-through" : null}>{props.task.title}</h5>
        </div>
        <p className="description">{props.task.description}</p>
    </div>
  )
}

function CreateTaskForm(props){
  return (
    <form className="mb-4" onSubmit={props.onSubmit}>
      <input
        required
        className="form-control form-control-sm mb-2"
        type="text"
        placeholder="Title"
        name="title"
      />
      <textarea required placeholder="Description here!" className="form-control form-control-sm mb-2" name="description"></textarea>
      <button className="btn btn-secondary btn-sm">Create Task</button>
    </form>
  )
}

function CreateProjectForm(props){
  return (
    <form className="project-form mb-4" onSubmit={(e) => props.onSubmit(e)}>
      <input
        required
        type="text"
        className="form-control form-control-sm mb-2"
        placeholder="Project name"
        name="project-name"
      />
      <textarea
        required
        placeholder="Description here!"
        className="form-control form-control-sm mb-2"
        name="project-description">
      </textarea>
      <button className="btn btn-secondary btn-sm">Add Project +</button>
    </form>
  )
}

function CreateLabelForm(props){
  return (
    <form className="label-form mb-4" onSubmit={(e) => props.onSubmit(e)}>
      <input
        required
        type="text"
        className="form-control form-control-sm mb-2"
        placeholder="Label name"
        name="label-name"
      />
      <input
        required
        type="color"
        className="form-control form-control-sm form-control-color mb-2"
        name="label-color"
      />
      <button className="btn btn-secondary btn-sm">Add Label +</button>
    </form>
  )
}

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.createProject = this.createProject(this);
    this.createLabel = this.createLabel(this);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      labels: JSON.parse(localStorage.getItem('labels')) || [],
      projects: []
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

  completeTask(e){
    const taskIndex = e.target.dataset.key
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks[taskIndex].done){tasks[taskIndex].done = false}
    else{tasks[taskIndex].done = true}
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})
  }

  createLabel(e){
    console.log(e.target)
  }

  createProject(e){
    console.log(e.target)
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
            <div className="menu text-muted">
              <button className="btn btn-sm text-muted">General <span>{this.state.tasks.filter(task => !task.done).length}</span></button>
              <button className="btn btn-sm text-muted">Today <span></span></button>
              <button className="btn btn-sm text-muted">Upcoming</button>
            </div>
            <hr/>
            <h6>Labels</h6>
            <hr/>
            <CreateLabelForm onSubmit={this.createLabel}/>
          </div>
          <div className="main-form">
            <CreateTaskForm onSubmit={this.createTask}/>
            <div>
              <div className="tasks-list">
                {this.state.tasks.map((task, index) => {
                  return(
                    <Task task={task} key={index} index={index} onChange={this.completeTask}/>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="side-bar right-bar">
            <h6>Projects</h6>
            <hr/>
            <CreateProjectForm onSubmit={this.createProject}/>
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
