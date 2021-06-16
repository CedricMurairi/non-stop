import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom'
import reportWebVitals from './reportWebVitals';

function Task(props){
  return (
    <div className={props.task.done ? "done task" : "task"} data-key={props.index}>
        <div className="d-flex tag-script task-tag" data-key={props.index}>
          <input checked={props.task.done ? true : false} data-key={props.index} className="form-check-input" type="checkbox" onChange={props.onChange}></input>
          <div className="task-tile">
            <h5 className={props.task.done ? "line-through" : null}>{props.task.title}</h5>
            <div data-id={props.index} className="task-label">
              {props.task.labels.map((label, index) => {
                return(
                  <Label onClick={props.removeTaskLabel} key={index} id={index} label={props.labels[label]}/>
                )
              })}
            </div>
          </div>
        </div>
        <img width="16px" data-id={props.index} className="options editTask hidden" src="https://img.icons8.com/material/24/000000/edit--v1.png" alt=""/>
        <svg data-id={props.index} onClick={props.deleteTask} className="options deleteTask hidden" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="15" height="15"
        viewBox="0 0 172 172" 
        style={{fill:"#000000"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M71.66667,14.33333l-7.16667,7.16667h-35.83333v14.33333h21.5h71.66667h21.5v-14.33333h-35.83333l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.88333 6.45,14.33333 14.33333,14.33333h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-93.16667z"></path></g></g></svg>
        <p className="description hidden">{props.task.description}</p>
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
              style={{width: ((props.tasks.filter(task => task.done).length * 100) / props.tasks.length) + '%'}}
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <img width="16px" data-id={props.index} className="options editProject hidden" src="https://img.icons8.com/material/24/000000/edit--v1.png" alt=""/>
        <img width="16px" data-id={props.index} className="options deleteProject hidden" src="https://img.icons8.com/material/24/000000/delete--v1.png" alt=""/>
        <p className="description hidden">{props.project.description}</p>
    </div>
  )
}

function Label(props){
  return (
    <div data-id={props.id} className="label" style={{background: props.label.color}}>
        <p className="label_name">{props.label.name}</p>
        <svg onClick={props.onClick} className="delete" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="10" height="10"
        viewBox="0 0 172 172"
        style={{fill:"#000000"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M71.66667,14.33333l-7.16667,7.16667h-35.83333v14.33333h21.5h71.66667h21.5v-14.33333h-35.83333l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.88333 6.45,14.33333 14.33333,14.33333h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-93.16667z"></path></g></g></svg>
    </div>
  )
}

function CreateTaskForm(props){
  if (props.showTaskForm) {
    return (
      <form className="create-task mb-4" onSubmit={props.onSubmit}>
        <input
          required
          className="form-control form-control-sm mb-2"
          type="text"
          placeholder="Title"
          name="title"
        />
        <textarea required placeholder="Description here!" className="form-control form-control-sm mb-2" name="description"></textarea>
        <div className="label-project hidden input-group mb-2">
          <select onChange={props.addLabel} className="add-label form-select form-select-sm" aria-label=".form-select-sm example">
            <option defaultValue disabled>Add Label</option>
            {props.labels.map((label, index) => {
              return(
                <option value={index} className="form-control form-control-sm" key={index}>{label.name}</option>
              )
            })}
          </select>
          <select onChange={props.moveToProject} className="move-to-project form-select form-select-sm" aria-label=".form-select-sm example">
            <option defaultValue disabled>Move to Project</option>
            {props.projects.map((project, index) => {
              return(
                <option value={index} className="form-control form-control-sm" key={index}>{project.name}</option>
              )
            })}
          </select>
          <input className="form-control form-control-sm" type="date"></input>
        </div>
        <button className="btn btn-secondary btn-sm">Create Task</button>
        <button className="edit hidden btn btn-success btn-sm" onClick={props.edit}>Edit</button>
        <button className="cancel hidden btn btn-outline-secondary btn-sm">Cancel</button>
      </form>
    )
  }else{
    return ""
  }
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
      <div className="label-project hidden input-group mb-2">
        <select onChange={props.addLabel} className="add-label form-select form-select-sm" aria-label=".form-select-sm example">
          <option defaultValue disabled>Add Label</option>
          {props.labels.map((label, index) => {
            return(
              <option value={index} className="form-control form-control-sm" key={index}>{label.name}</option>
            )
          })}
        </select>
        <input className="form-control form-control-sm" type="date"></input>
      </div>
      <button className="btn btn-secondary btn-sm">Add Project +</button>
      <button className="editProjectActive hidden btn btn-success btn-sm" onClick={props.edit}>Edit</button>
      <button className="cancel-project-edit hidden btn btn-outline-secondary btn-sm">Cancel</button>
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
        name="label_name"
      />
      <input
        required
        type="color"
        className="form-control form-control-sm form-control-color mb-2"
        name="label_color"
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
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addTaskLabel = this.addTaskLabel.bind(this);
    this.removeTaskLabel = this.removeTaskLabel.bind(this);
    this.moveTaskToProject = this.moveTaskToProject.bind(this)
    this.createProject = this.createProject.bind(this);
    this.editProject = this.editProject.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.deleteLabel = this.deleteLabel.bind(this);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      labels: JSON.parse(localStorage.getItem('labels')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      showTaskForm: true
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
        labels: [],
        project: null,
        done: false
      }]
    }else{
      tasks = [
        {
          title: data.get('title'),
          description: data.get('description'),
          labels: [],
          project: null,
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

  addTaskLabel(e){
    e.preventDefault()
    let target = e.target.parentElement.parentElement
    let task_id = target.dataset.id
    let label_id = e.target.value
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks[task_id].labels.indexOf(label_id) !== -1) return

    if (tasks[task_id].labels){
      tasks[task_id].labels = [...tasks[task_id].labels, label_id]
    }else{
      tasks[task_id].labels = [label_id]
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: tasks})
  }

  removeTaskLabel(e){
    e.preventDefault()
    let label_id = e.target.parentElement.dataset.id
    let task_id = e.target.parentElement.parentElement.dataset.id
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(task_id, label_id)
    if (typeof label_id !== 'undefined' && typeof task_id !== 'undefined'){
      tasks[task_id].labels.splice(label_id, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.setState({tasks: tasks})
    }else{
      console.log('Could not remove label')
    }
  }

  moveTaskToProject(e){
    e.preventDefault()
    let project_id = e.target.value
    let task_id = e.target.parentElement.parentElement.dataset.id
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks[task_id].project = project_id

    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: tasks})
  }

  editTask(e){
    e.preventDefault()
    let target = e.target.parentElement
    const title = target[0].value
    const description = target[1].value

    if (title === "" || description === ""){
      target.reset()
      return
    }else{
      const id = target.dataset.id

      let tasks = JSON.parse(localStorage.getItem("tasks"))
      tasks[id]['title'] = title
      tasks[id]['description'] = description
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.setState({tasks: tasks})

      target.reset()
    }
  }
  
  deleteTask(e){
    e.preventDefault();
    const id = e.target.dataset.id
    if (id){
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks.splice(id, 1)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      this.setState({tasks: tasks})
    }else{
      console.log("Could not delete task")
    }
  }

  createLabel(e){
    e.preventDefault()
    let labels = JSON.parse(localStorage.getItem('labels'))
    if (labels){
      labels = [...labels, {
        name: e.target.label_name.value,
        color: e.target.label_color.value
      }]
    }else{
      labels = [{
        name: e.target.label_name.value,
        color: e.target.label_color.value
      }]
    }

    localStorage.setItem('labels', JSON.stringify(labels))
    this.setState({labels: JSON.parse(localStorage.getItem('labels'))})

    e.target.label_name.value = "" 
    e.target.label_color.value = ""
  }

  deleteLabel(e){
    e.preventDefault();
    const id = e.target.parentElement.dataset.id
    if (id){
      let labels = JSON.parse(localStorage.getItem('labels'))
      labels.splice(id, 1)
      localStorage.setItem("labels", JSON.stringify(labels))
      this.setState({labels: labels})
    }else{
      console.log("Could not delete label")
    }
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

  editProject(e){
    e.preventDefault()
    let target = e.target.parentElement
    let name = target[0].value
    let description = target[1].value
    
    if (name === "" || description === ""){
      target.reset()
      return
    }else{
      const id = target.dataset.id

      let projects = JSON.parse(localStorage.getItem("projects"))
      projects[id]['name'] = name
      projects[id]['description'] = description
      localStorage.setItem('projects', JSON.stringify(projects))
      this.setState({projects: projects})

      target.reset()
    }
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
            <CreateLabelForm onSubmit={this.createLabel} showTaskForm={this.state.showTaskForm}/>
            <div className="label-list">
              {this.state.labels.map((label, index) => {
                return (
                  <Label
                    label={label}
                    key={index}
                    id={index}
                    onClick={this.deleteLabel}
                  />
                )
              })}
            </div>
          </div>
          <div className="main-form">
            <CreateTaskForm moveToProject={this.moveTaskToProject} addLabel={this.addTaskLabel} labels={this.state.labels} projects={this.state.projects} edit={this.editTask} onSubmit={this.createTask} showTaskForm={this.state.showTaskForm}/>
            <div className="tasks-list">
              {this.state.tasks.map((task, index) => {
                return(
                  <Task removeTaskLabel={this.removeTaskLabel} labels={this.state.labels} deleteTask={this.deleteTask} task={task} key={index} index={index} onChange={this.completeTask}/>
                )
              })}
            </div>
            <button
              type="button"
              className="add-task-btn btn btn-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Create Task"
              // onClick={() => this.setState({showTaskForm: !this.state.showTaskForm})}
            >
              +
            </button>
          </div>
          <div className="side-bar right-bar">
            <h6>Projects</h6>
            <hr/>
            <CreateProjectForm edit={this.editProject} labels={this.state.labels} onSubmit={this.createProject}/>
            <div className="projects-list">
              {this.state.projects.map((project, index) => {
                return (
                  <Project
                    project={project}
                    key={index}
                    index={index}
                    tasks={this.state.tasks.filter(task => task.project === index.toString())}
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
