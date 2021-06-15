
window.onload = () => {
    let editForm = document.querySelectorAll(".create-task")

    let tasks = document.querySelectorAll(".task")
    tasks.forEach(task => task.childNodes[0].childNodes[1].childNodes[0].addEventListener('click', () => {
        task.childNodes[3].classList.toggle('hidden');
        task.childNodes[2].classList.toggle('hidden')
        task.childNodes[1].classList.toggle('hidden')
    }))

    let projects = document.querySelectorAll(".project")
    projects.forEach(project => project.addEventListener('click', () => {
        project.childNodes[1].classList.toggle('hidden');
    }))

    let taskOptions = document.querySelectorAll(".editTask")
    taskOptions.forEach(option => option.addEventListener('click', (e) => {
        let target = e.target.parentElement
        editForm[0].childNodes[3].classList.add("hidden")
        editForm[0].childNodes[4].classList.remove("hidden")
        editForm[0].childNodes[5].classList.remove("hidden")
        editForm[0].childNodes[2].classList.remove("hidden")
        editForm[0].dataset.id = e.target.dataset.id
        editForm[0].childNodes[0].value = target.childNodes[0].childNodes[1].childNodes[0].innerText
        editForm[0].childNodes[1].value = target.childNodes[3].innerText
    }))

    let edit = document.querySelector(".edit")
    edit.addEventListener('click', (e) => {
        // e.target.parentElement.reset()
        editForm[0].childNodes[3].classList.remove("hidden")
        editForm[0].childNodes[4].classList.add("hidden")
        editForm[0].childNodes[5].classList.add("hidden")
        editForm[0].childNodes[2].classList.add("hidden")
    })

    let cancel = document.querySelector(".cancel")
    cancel.addEventListener('click', (e) => {
        e.target.parentElement.reset()
        editForm[0].childNodes[3].classList.remove("hidden")
        editForm[0].childNodes[4].classList.add("hidden")
        editForm[0].childNodes[5].classList.add("hidden")
        editForm[0].childNodes[2].classList.add("hidden")
    })
}