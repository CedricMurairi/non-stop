import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this)
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      labels: JSON.parse(localStorage.getItem('labels')) || []
    }
  }

  createTask(e){
    e.preventDefault();
    const data = new FormData(e.target);
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks = [...tasks, {
      title: data.get('title'),
      description: data.get('description'),
      done: false
    }]

    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.setState({tasks: JSON.parse(localStorage.getItem('tasks'))})
  }

  render() {
    return (
      <div>
        <h1>ToDO App | Hack your Day</h1>
        <hr/>
        <div>
          <form className="mb-4" onSubmit={this.createTask}>
            <input
              required
              className="form-control mb-2"
              type="text"
              placeholder="Title"
              name="title"
            />
            <textarea required placeholder="Description here!" className="form-control mb-2" name="description"></textarea>
            <button className="btn btn-primary">Create Task</button>
          </form>
        </div>
        <h3>Tasks</h3>
        <hr/>
        <div className="tasks-list">
          {this.state.tasks.map((task, index) => {
            return(
              <div key={index} className="taks">
                  <input className="form-check-input" type="checkbox" value=""></input>
                  <h4 className={task.done ? "line-through" : null}>{task.title}</h4>
                  <p>{task.description}</p>
              </div>
            )
          })}
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
