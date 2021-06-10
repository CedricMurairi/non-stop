
window.onload = () => {
    let tasks = document.querySelectorAll(".task")
    tasks.forEach(task => task.childNodes[0].childNodes[1].addEventListener('click', () => {
        task.childNodes[2].classList.toggle('hidden');
        task.childNodes[1].classList.toggle('hidden')
    }))

    let projects = document.querySelectorAll(".project")
    projects.forEach(project => project.addEventListener('click', () => {
        project.childNodes[1].classList.toggle('hidden');
    }))
}