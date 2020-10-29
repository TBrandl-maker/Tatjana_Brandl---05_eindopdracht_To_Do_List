const inputNewTask = document.getElementById("new-task");
const addButton = document.getElementById("add-task");

// als ik op de button 'Add' klik
addButton.addEventListener('click', (e) => {
    // Maak een nieuwe taak aan
    // als de omschrijving van de taak geen empty string is
    // verwijder de spaties aan het begin en eind van de omschrijving
    if (inputNewTask.value.trim() !== "") {
        createTask(inputNewTask.value.trim()).then(task => {
            // refresh de takenlijst
            loadAllTasks();
            // Wis de waarden in het formulier
            inputNewTask.value = "";
        });
    }
})


// laat alle taken zien in ul#incomplete-tasks
const incompleteTaskList = document.getElementById("incomplete-tasks");
// haal alle taken op
const loadAllTasks = () => {
    getTasks().then(taskList => {
        incompleteTaskList.innerHTML = "";
        taskList.forEach(task => {
            // voeg taak toe aan de DOM
            const li = document.createElement('li');
            li.classList.add("task")

            // maak 
            const checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.checked = task.done;
            checkBox.addEventListener("change", e => {
                task.done = e.target.checked;
                updateTask(task._id, task);
            })

            const description = document.createElement("span");
            description.classList.add("description");
            description.innerHTML = task.description;

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "delete";
            deleteButton.classList.add("delete", "material-icons");
            deleteButton.addEventListener("click", () => {
                description.classList.add("removing");
                deleteTask(task._id).then(() => {
                    // reload item list
                    loadAllTasks();
                });
            })
            li.appendChild(checkBox);
            li.appendChild(description);
            li.appendChild(deleteButton);

            incompleteTaskList.appendChild(li);
        });
    });
}

loadAllTasks();
