
window.onload = () => {
    let editForm = document.querySelector(".create-task")
    let projectEditForm = document.querySelector(".project-form")

    let tasks = document.querySelectorAll(".task")
    tasks.forEach(task => task.childNodes[0].childNodes[1].childNodes[0].addEventListener('click', () => {
        task.childNodes[3].classList.toggle('hidden');
        task.childNodes[2].classList.toggle('hidden')
        task.childNodes[1].classList.toggle('hidden')
    }))

    let projects = document.querySelectorAll(".project")
    projects.forEach(project => project.childNodes[0].childNodes[0].addEventListener('click', () => {
        project.childNodes[3].classList.toggle('hidden');
        project.childNodes[2].classList.toggle('hidden');
        project.childNodes[1].classList.toggle('hidden');
    }))

    let projectOptions = document.querySelectorAll(".editProject")
    projectOptions.forEach(option => option.addEventListener('click', (e) => {
        let target = e.target.parentElement
        projectEditForm.childNodes[2].classList.remove("hidden")
        projectEditForm.childNodes[4].classList.remove("hidden")
        projectEditForm.childNodes[5].classList.remove("hidden")
        projectEditForm.childNodes[3].classList.add("hidden")
        projectEditForm.dataset.id = e.target.dataset.id
        console.log(e.target.dataset.id)
        projectEditForm.childNodes[0].value = target.childNodes[0].childNodes[0].innerText
        projectEditForm.childNodes[1].value = target.childNodes[3].innerText
    }))

    let taskOptions = document.querySelectorAll(".editTask")
    taskOptions.forEach(option => option.addEventListener('click', (e) => {
        let target = e.target.parentElement
        editForm.childNodes[3].classList.add("hidden")
        editForm.childNodes[4].classList.remove("hidden")
        editForm.childNodes[5].classList.remove("hidden")
        editForm.childNodes[2].classList.remove("hidden")
        editForm.dataset.id = e.target.dataset.id
        editForm.childNodes[0].value = target.childNodes[0].childNodes[1].childNodes[0].innerText
        editForm.childNodes[1].value = target.childNodes[3].innerText
    }))

    // Task Edit -- Action
    let edit = document.querySelector(".edit")
    edit.addEventListener('click', (e) => {
        // e.target.parentElement.reset()
        editForm.childNodes[3].classList.remove("hidden")
        editForm.childNodes[4].classList.add("hidden")
        editForm.childNodes[5].classList.add("hidden")
        editForm.childNodes[2].classList.add("hidden")
    })

    // Project Edit -- Action
    let editProject = document.querySelector(".editProjectActive")
    editProject.addEventListener('click', (e) => {
        // e.target.parentElement.reset()
        projectEditForm.childNodes[3].classList.remove("hidden")
        projectEditForm.childNodes[4].classList.add("hidden")
        projectEditForm.childNodes[5].classList.add("hidden")
        projectEditForm.childNodes[2].classList.add("hidden")
    })

    let cancel = document.querySelector(".cancel")
    cancel.addEventListener('click', (e) => {
        e.target.parentElement.reset()
        editForm.childNodes[3].classList.remove("hidden")
        editForm.childNodes[4].classList.add("hidden")
        editForm.childNodes[5].classList.add("hidden")
        editForm.childNodes[2].classList.add("hidden")
    })

    let projectCancel = document.querySelector(".cancel-project-edit")
    projectCancel.addEventListener('click', (e) => {
        e.target.parentElement.reset()
        projectEditForm.childNodes[3].classList.remove("hidden")
        projectEditForm.childNodes[4].classList.add("hidden")
        projectEditForm.childNodes[5].classList.add("hidden")
        projectEditForm.childNodes[2].classList.add("hidden")
    })
}