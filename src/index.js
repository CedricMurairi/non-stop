import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

function Task(props){
  return (
    <div className={props.task.done ? "done tasks" : "tasks"}>
        <div className="d-flex tag-script">
          <input checked={props.task.done ? true : false} data-key={props.index} className="form-check-input" type="checkbox" onChange={props.onChange}></input>
          <h5 className={props.task.done ? "line-through" : null}>{props.task.title}</h5>
        </div>
        <p className="description">{props.task.description}</p>
    </div>
  )
}

function Project(props){
  return (
    <div className={props.project.done ? "done project" : "project"}>
        <div className="d-flex tag-script project-tag">
          <h6>{props.project.name}</h6>
          <div className="progress mb-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{width: props.tasks.filter(task => task.done).count / props.tasks.count + '%'}}
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <p className="description">{props.project.description}</p>
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
    <form className="project-form mb-4" onSubmit={props.onSubmit}>
      <input
        required
        type="text"
        className="form-control form-control-sm mb-2"
        placeholder="Project name"
        name="project_name"
      />
      <textarea
        required
        placeholder="Description here!"
        className="form-control form-control-sm mb-2"
        name="project_description">
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
    this.createProject = this.createProject.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      labels: JSON.parse(localStorage.getItem('labels')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || []
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

    e.target.title.value = ""
    e.target.description.value = ""
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
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
  }

  createProject(e){
    e.preventDefault()
    let projects = JSON.parse(localStorage.getItem('projects'))
    if (projects){
      projects = [...projects, {
        name: e.target.project_name.value,
        description: e.target.project_description.value,
        color: "black",
        done: false
      }]
    }else{
      projects = [{
        name: e.target.project_name.value,
        description: e.target.project_description.value,
        color: "black",
        done: false
      }]
    }

    localStorage.setItem('projects', JSON.stringify(projects))
    this.setState({projects: JSON.parse(localStorage.getItem('projects'))})

    e.target.project_name.value = "" 
    e.target.project_description.value = "" 
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
            <div className="projects-list">
              {this.state.projects.map((project, index) => {
                return (
                  <Project
                    project={project}
                    key={index} 
                    tasks={this.state.tasks.filter(task => task.project === project.name)}
                  />
                )
              })}
            </div>
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
