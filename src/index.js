import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom'
import reportWebVitals from './reportWebVitals';

function Task(props){
  return (
    <div style={new Date(props.task.due).toLocaleDateString() < new Date().toLocaleDateString() && !props.task.done ? {animationPlayState: "running"} : {animationPlayState: "paused"}} className={props.task.done ? "done task" : "task"} data-key={props.index}>
        <div className="d-flex tag-script task-tag" data-key={props.index}>
          <input checked={props.task.done ? true : false} data-key={props.index} className="form-check-input" type="checkbox" onChange={props.onChange}></input>
          <div className="task-tile">
            <h5 className={props.task.done ? "line-through" : null}>{props.task.title}</h5>
            <div data-id={props.index} className="task-label">
              {props.task.labels.map((id) => {
                return(
                  <Label onClick={props.removeTaskLabel} key={id} id={id} label={props.labels[id]}/>
                )
              })}
              <h6 className="due-date">
                {new Date(props.task.due).toLocaleDateString() === new Date().toLocaleDateString() || props.task.due === "" ? "Due: Today":
                new Date(props.task.due).toLocaleDateString() < new Date().toLocaleDateString() && !props.task.done ?
                "Due: Overdue" :
                "Due: " + new Date(props.task.due).toLocaleDateString()
                }
              </h6>
            </div>
          </div>
        </div>
        <img width="16px" data-id={props.index} className="options editTask hidden" src="https://img.icons8.com/material/24/000000/edit--v1.png" alt=""/>
        <img width="16px" data-id={props.index} onClick={props.deleteTask} className="options deleteTask hidden" src="https://img.icons8.com/material/24/000000/delete--v1.png" alt=""/>
        <p className="description hidden">{props.task.description}</p>
    </div>
  )
}

function Project(props){
  return (
    <div style={new Date(props.project.due).toLocaleDateString() < new Date().toLocaleDateString() && !props.project.done ? {animationPlayState: "running"} : {animationPlayState: "paused"}} className={props.project.done ? "done project" : "project"}>
        <div className="d-flex tag-script project-tag">
          <h6>{props.project.name}</h6>
          <div data-id={props.index} className="project-label">
            {props.project.labels.map((id) => {
              return(
                <Label onClick={props.removeProjectLabel} key={id} id={id} label={props.labels[id]}/>
              )
            })}
            <h6 className="due-date">
              {new Date(props.project.due).toLocaleDateString() === new Date().toLocaleDateString() || props.project.due === "" ? "Due: Today" :
              new Date(props.project.due).toLocaleDateString() < new Date().toLocaleDateString() && !props.project.done ?
              "Due: Overdue" :
              "Due: " + new Date(props.project.due).toLocaleDateString()
              }
            </h6>
          </div>
          <div className="progress mb-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{width: ((props.tasks.filter(task => task.done).length * 100) / props.tasks.length) + '%'}}
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <img width="16px" data-id={props.index} className="options editProject hidden" src="https://img.icons8.com/material/24/000000/edit--v1.png" alt=""/>
        <img width="16px" data-id={props.index} onClick={props.deleteProject} className="options deleteProject hidden" src="https://img.icons8.com/material/24/000000/delete--v1.png" alt=""/>
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
        <div className="more-task-edit-options hidden input-group mb-2">
          <select onChange={props.addLabel} className="add-label form-select form-select-sm" aria-label=".form-select-sm example">
            <option defaultValue>Add Label</option>
            {props.labels.map((label) => {
              return(
                <option value={label.id} className="form-control form-control-sm" key={label.id}>{label.name}</option>
              )
            })}
          </select>
          <select onChange={props.moveToProject} className="move-to-project form-select form-select-sm" aria-label=".form-select-sm example">
            <option defaultValue>Move to Project</option>
            <option defaultValue>General</option>
            {props.projects.map((project) => {
              return(
                <option value={project.id} className="form-control form-control-sm" key={project.id}>{project.name}</option>
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
      <div className="more-project-edit-options hidden input-group mb-2">
        <select onChange={props.addProjectLabel} className="add-label form-select form-select-sm" aria-label=".form-select-sm example">
          <option defaultValue>Add Label</option>
          {props.labels.map((label) => {
            return(
              <option value={label.id} className="form-control form-control-sm" key={label.id}>{label.name}</option>
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
    this.addProjectLabel = this.addProjectLabel.bind(this);
    this.removeProjectLabel = this.removeProjectLabel.bind(this);
    this.editProject = this.editProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this)
    this.createLabel = this.createLabel.bind(this);
    this.deleteLabel = this.deleteLabel.bind(this);
    this.initObjects = this.initObjects.bind(this)
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || {},
      labels: JSON.parse(localStorage.getItem('labels')) || {},
      projects: JSON.parse(localStorage.getItem('projects')) || {},
      showTaskForm: true,
      today: true,
      general: false,
      upcoming: false,
      overdue: false
    }
  }

  initObjects(){
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let labels = JSON.parse(localStorage.getItem('labels'))
    let projects = JSON.parse(localStorage.getItem('projects'))

    if(tasks === null){tasks = {}}
    if(labels === null){labels = {}}
    if(projects === null){projects = {}}

    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('labels', JSON.stringify(labels))
    localStorage.setItem('projects', JSON.stringify(projects))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks')), labels: JSON.parse(localStorage.getItem('labels')), projects: JSON.parse(localStorage.getItem('projects'))
  })
  }

  createTask(e){
    e.preventDefault();

    let tsk_id_count = localStorage.getItem('tsk_id_count')
    if (tsk_id_count === null){
      localStorage.setItem('tsk_id_count', 0)
      tsk_id_count = parseInt(localStorage.getItem('tsk_id_count'))
    }else{
      tsk_id_count = parseInt(tsk_id_count)
      tsk_id_count += 1
      localStorage.setItem('tsk_id_count', tsk_id_count)
    }

    this.initObjects()
    const data = new FormData(e.target);
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks !== null){
      tasks[tsk_id_count] = {
        id: tsk_id_count,
        title: data.get('title'),
        description: data.get('description'),
        labels: [],
        project: null,
        due: "",
        done: false
      }
    }else{
      tasks = {}
      tasks[tsk_id_count] = {
        id: tsk_id_count,
        title: data.get('title'),
        description: data.get('description'),
        labels: [],
        project: null,
        due: "",
        done: false
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})

    e.target.title.value = ""
    e.target.description.value = ""
  }

  completeTask(e){
    const taskIndex = e.target.dataset.key
    console.log(taskIndex)
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let projects = JSON.parse(localStorage.getItem('projects'))
    let task = tasks[taskIndex]
    if (task.done){task.done = false;}
    else {task.done = true;}

    if (task.project !== null){
      projects[task.project].tasks.filter(id => tasks[id].done).length === projects[task.project].tasks.length ? projects[task.project].done = true : projects[task.project].done = false
    }
    tasks[taskIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('projects', JSON.stringify(projects))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})
    this.setState({projects: JSON.parse(localStorage.getItem('projects'))})
  }

  addTaskLabel(e){
    e.preventDefault()
    let target = e.target.parentElement.parentElement
    let task_id = target.dataset.id
    let label_id = e.target.value
    let labels = JSON.parse(localStorage.getItem('labels'))
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let task = tasks[task_id]

    if (label_id === "Add Label" || task.labels.indexOf(label_id) !== -1) return
    if (tasks[task_id].labels){
      task.labels = [...task.labels, label_id]
    }else{
      task.labels = [label_id]
    }

    labels[label_id].tasks.push(task_id)
    tasks[task_id] = task
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('labels', JSON.stringify(labels))
    this.setState({tasks: tasks, labels: labels})
  }

  removeTaskLabel(e){
    e.preventDefault()
    let label_id = e.target.parentElement.dataset.id
    let task_id = e.target.parentElement.parentElement.dataset.id
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let task = tasks[task_id]
    if (typeof label_id !== 'undefined' && typeof task_id !== 'undefined'){
      let lbl_indx = task.labels.indexOf(label_id)
      task.labels.splice(lbl_indx, 1)
      tasks[task_id] = task 
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
    let projects = JSON.parse(localStorage.getItem('projects'))
    let task = tasks[task_id]

    if (project_id === "Move to Project") return
    if (task.project !== null){
      projects[task.project].tasks.splice(projects[task.project].tasks.indexOf(task_id), 1)
    }

    if (project_id === "General"){task.project = null}
    else{
      task.project = project_id
      projects[project_id].tasks.push(task_id)
    }
    tasks[task_id] = task
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('projects', JSON.stringify(projects))
    this.setState({tasks: tasks, projects: projects})
  }

  editTask(e){
    e.preventDefault()
    let target = e.target.parentElement
    const title = target[0].value
    const description = target[1].value
    const due_date = target[4].value

    if (title === "" || description === ""){
      target.reset()
      return
    }else{
      const id = target.dataset.id

      let tasks = JSON.parse(localStorage.getItem("tasks"))
      let task = tasks[id]
      if (typeof task === 'undefined'){return}
      task['title'] = title
      task['description'] = description
      if (due_date !== ""){task['due'] = due_date}

      tasks[id] = task
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
      let labels = JSON.parse(localStorage.getItem('labels'))
      let projects = JSON.parse(localStorage.getItem('projects'))
      tasks[id].labels.map(lbl_id => labels[lbl_id].tasks.splice(labels[lbl_id].tasks.indexOf(id), 1))
      if (tasks[id].project !== null){
        projects[tasks[id].project].tasks.splice(projects[tasks[id].project].tasks.indexOf(id), 1)
      }
      delete tasks[id]
      localStorage.setItem("tasks", JSON.stringify(tasks))
      localStorage.setItem("labels", JSON.stringify(labels))
      localStorage.setItem("projects", JSON.stringify(projects))
      this.setState({tasks: tasks, labels: labels, projects: projects})
    }else{
      console.log("Could not delete task")
    }
  }

  createLabel(e){
    e.preventDefault()

    let lbl_id_count = localStorage.getItem('lbl_id_count')
    if (lbl_id_count === null){
      localStorage.setItem('lbl_id_count', 0)
      lbl_id_count = parseInt(localStorage.getItem('lbl_id_count'))
    }else{
      lbl_id_count = parseInt(lbl_id_count)
      lbl_id_count += 1
      localStorage.setItem('lbl_id_count', lbl_id_count)
    }

    this.initObjects()
    let labels = JSON.parse(localStorage.getItem('labels'))
    if (labels !== null){
      labels[lbl_id_count] = {
        id: lbl_id_count,
        name: e.target.label_name.value,
        color: e.target.label_color.value,
        tasks: [],
        projects: []
      }
    }else{
      labels = {}
      labels[lbl_id_count] = {
        id: lbl_id_count,
        name: e.target.label_name.value,
        color: e.target.label_color.value,
        tasks: [],
        projects: []
      }
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
      let projects = JSON.parse(localStorage.getItem('projects'))
      let tasks = JSON.parse(localStorage.getItem('tasks'))


      // eslint-disable-next-line array-callback-return
      labels[id].projects.map(pr_id => {
        if (typeof projects[pr_id] !== 'undefined'){
          projects[pr_id].labels.splice(projects[pr_id].labels.indexOf(id), 1)
        }
      })
      // eslint-disable-next-line array-callback-return
      labels[id].tasks.map(tsk_id => {
        if (typeof tasks[tsk_id] !== 'undefined'){
          tasks[tsk_id].labels.splice(tasks[tsk_id].labels.indexOf(id), 1)
        }
      })
      delete labels[id]
      localStorage.setItem("labels", JSON.stringify(labels))
      localStorage.setItem("projects", JSON.stringify(projects))
      localStorage.setItem("tasks", JSON.stringify(tasks))
      this.setState({labels: labels, tasks: tasks, projects: projects})
    }else{
      console.log("Could not delete label")
    }
  }

  createProject(e){
    e.preventDefault()

    let pr_id_count = localStorage.getItem('pr_id_count')
    if (pr_id_count === null){
      localStorage.setItem('pr_id_count', 0)
      pr_id_count = parseInt(localStorage.getItem('pr_id_count'))
    }else{
      pr_id_count = parseInt(pr_id_count)
      pr_id_count += 1
      localStorage.setItem('pr_id_count', pr_id_count)
    }

    this.initObjects()
    let projects = JSON.parse(localStorage.getItem('projects'))
    if (projects !== null){
      projects[pr_id_count] = {
        id: pr_id_count,
        name: e.target.project_name.value,
        description: e.target.project_description.value,
        color: "black",
        labels: [],
        tasks: [],
        due: "",
        done: false
      }
    }else{
      projects = {}
      projects[pr_id_count] = {
        id: pr_id_count,
        name: e.target.project_name.value,
        description: e.target.project_description.value,
        color: "black",
        labels: [],
        tasks: [],
        due: "",
        done: false
      }
    }

    localStorage.setItem('projects', JSON.stringify(projects))
    this.setState({projects: JSON.parse(localStorage.getItem('projects'))})

    e.target.project_name.value = "" 
    e.target.project_description.value = "" 
  }

  addProjectLabel(e){
    e.preventDefault()
    let target = e.target.parentElement.parentElement
    let project_id = target.dataset.id
    let label_id = e.target.value
    let projects = JSON.parse(localStorage.getItem('projects'))
    let labels = JSON.parse(localStorage.getItem('labels'))
    let project = projects[project_id]

    if (label_id === "Add Label" || project.labels.indexOf(label_id) !== -1) return
    if (projects[project_id].labels){
      project.labels = [...project.labels, label_id]
    }else{
      project.labels = [label_id]
    }

    labels[label_id].projects.push(project_id)
    projects[project_id] = project
    localStorage.setItem('projects', JSON.stringify(projects))
    localStorage.setItem('labels', JSON.stringify(labels))
    this.setState({projects: projects, labels: labels})
  }

  removeProjectLabel(e){
    e.preventDefault()
    let label_id = e.target.parentElement.dataset.id
    let project_id = e.target.parentElement.parentElement.dataset.id
    let projects = JSON.parse(localStorage.getItem('projects'))
    let project = projects[project_id]
    if (typeof label_id !== 'undefined' && typeof project_id !== 'undefined'){
      let lbl_indx = project.labels.indexOf(label_id)
      project.labels.splice(lbl_indx, 1)
      projects[project_id] = project
      localStorage.setItem('projects', JSON.stringify(projects))
      this.setState({projects: projects})
    }else{
      console.log('Could not remove label')
    }
  }

  editProject(e){
    e.preventDefault()
    let target = e.target.parentElement
    let name = target[0].value
    let description = target[1].value
    let due_date = target[3].value
    
    if (name === "" || description === ""){
      target.reset()
      return
    }else{
      const id = target.dataset.id

      let projects = JSON.parse(localStorage.getItem("projects"))
      let project = projects[id]
      if (typeof project === 'undefined'){return}
      project['name'] = name
      project['description'] = description
      if (due_date !== ""){project['due'] = due_date}

      projects[id] = project
      localStorage.setItem('projects', JSON.stringify(projects))
      this.setState({projects: projects})

      target.reset()
    }
  }

  deleteProject(e){
    e.preventDefault();
    const id = e.target.dataset.id
    if (id){
      let projects = JSON.parse(localStorage.getItem('projects'))
      let labels = JSON.parse(localStorage.getItem('labels'))
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      projects[id].labels.map(lbl_id => labels[lbl_id].projects.splice(labels[lbl_id].projects.indexOf(id), 1))
      projects[id].tasks.map(tsk_id => delete tasks[tsk_id])
      delete projects[id]
      localStorage.setItem("projects", JSON.stringify(projects))
      localStorage.setItem("labels", JSON.stringify(labels))
      localStorage.setItem("tasks", JSON.stringify(tasks))
      this.setState({projects: projects, labels: labels, tasks: tasks})
    }else{
      console.log("Could not delete task")
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
              <button onClick={() => this.setState({today: true, general: false, upcoming: false, overdue: false})} className="btn btn-sm text-muted">Today <span className="today">{Object.keys(this.state.tasks).filter(id => (new Date(this.state.tasks[id].due).toLocaleDateString() === new Date().toLocaleDateString() && !this.state.tasks[id].done) || (this.state.tasks[id].due === 
              "" &&!this.state.tasks[id].done)).length}</span></button>
              <button onClick={() => this.setState({overdue: true, today: false, general: false, upcoming: false})} className="btn btn-sm text-muted">Overdue <span className="overdue">{Object.keys(this.state.tasks).filter(id => new Date().toLocaleDateString() > new Date(this.state.tasks[id].due).toLocaleDateString() && !this.state.tasks[id].done).length}</span></button>
              <button onClick={() => this.setState({upcoming: true, today: false, general: false, overdue: false})} className="btn btn-sm text-muted">Upcoming <span className="upcoming">{Object.keys(this.state.tasks).filter(id => new Date().toLocaleDateString() < new Date(this.state.tasks[id].due).toLocaleDateString() && !this.state.tasks[id].done && this.state.tasks[id].due !== "").length}</span></button>
            </div>
            <hr/>
            <h6>Labels</h6>
            <hr/>
            <CreateLabelForm onSubmit={this.createLabel} showTaskForm={this.state.showTaskForm}/>
            <div className="label-list">
              {Object.keys(this.state.labels).map(id => {
                return (
                  <Label
                    label={this.state.labels[id]}
                    key={id}
                    id={id}
                    onClick={this.deleteLabel}
                  />
                )
              })}
            </div>
          </div>
          <div className="main-form">
            <CreateTaskForm moveToProject={this.moveTaskToProject} addLabel={this.addTaskLabel} labels={Object.keys(this.state.labels).map(id => this.state.labels[id])} projects={Object.keys(this.state.projects).map(id => this.state.projects[id])} edit={this.editTask} onSubmit={this.createTask} showTaskForm={this.state.showTaskForm}/>
            <div className="tasks-list">
              {Object.keys(this.state.tasks).filter(id => new Date().toLocaleDateString() > new Date(this.state.tasks[id].due).toLocaleDateString()).map(id => {
                return(
                  <Task removeTaskLabel={this.removeTaskLabel} labels={this.state.labels} deleteTask={this.deleteTask} task={this.state.tasks[id]} key={id} index={id} onChange={this.completeTask}/>
                )
              })}
              {Object.keys(this.state.tasks).filter(id => new Date(this.state.tasks[id].due).toLocaleDateString() === new Date().toLocaleDateString() || this.state.tasks[id].due === "").map(id => {
                return(
                  <Task removeTaskLabel={this.removeTaskLabel} labels={this.state.labels} deleteTask={this.deleteTask} task={this.state.tasks[id]} key={id} index={id} onChange={this.completeTask}/>
                )
              })}
              {Object.keys(this.state.tasks).filter(id => new Date().toLocaleDateString() < new Date(this.state.tasks[id].due).toLocaleDateString() && this.state.tasks[id].due !== "").map(id => {
                return(
                  <Task removeTaskLabel={this.removeTaskLabel} labels={this.state.labels} deleteTask={this.deleteTask} task={this.state.tasks[id]} key={id} index={id} onChange={this.completeTask}/>
                )
              })}
            </div>
          </div>
          <div className="side-bar right-bar">
            <h6>Projects</h6>
            <hr/>
            <CreateProjectForm addProjectLabel={this.addProjectLabel} edit={this.editProject} labels={Object.keys(this.state.labels).map(id => this.state.labels[id])} onSubmit={this.createProject}/>
            <div className="projects-list">
              {Object.keys(this.state.projects).map(id => {
                return (
                  <Project
                    project={this.state.projects[id]}
                    key={id}
                    index={id}
                    removeProjectLabel={this.removeProjectLabel}
                    deleteProject={this.deleteProject}
                    labels={this.state.labels}
                    tasks={Object.keys(this.state.tasks).map(id => this.state.tasks[id]).filter(task => task.project === id.toString())}
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
