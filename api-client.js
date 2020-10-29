const apiUrl = 'https://jsonbox.io/box_429ab3cf59489b1a974d';

/**
 * Get all the tasks
 * 
 * Task:
 * {
 *   "_id": uuid",
 *   "description": string,
 *   "done": boolean, 
 *   "_createdOn": ISO datetime
 * }
 * 
 * @return array with tasks
 */
async function getTasks() {
    try {
        let res = await fetch(`${apiUrl}`, { method: "GET" });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Delete task from task list
 * 
 * @param string recordID 
 * 
 * @return {"message":"Record removed."}
 */
async function deleteTask(recordID) {
    const url = `${apiUrl}/${recordID}`;
    try {
        let res = await fetch(`${url}`, { method: "DELETE" });
        console.log(`Task ${recordID} successfully deleted`);
    } catch (error) {
        console.log(error);
    }
};

// getTasks().then(taskList => {
//     taskList.forEach(task => deleteTask(task._id))
// });

/**
 * Update task from task list
 * 
 * @param string recordID 
 * 
 * @return {
 *   "_id": string,
 *   "description": string,
 *   "done": boolean, 
 *   "_createdOn": ISO datetime
 * }
 */
async function updateTask(recordID, data) {
    const url = `${apiUrl}/${recordID}`;
    try {
        let res = await fetch(`${url}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(`Task ${recordID} successfully updated`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Creat a new Task from with title 
 * Set task initially as not done
 * 
 * @param data Task Data 
 * 
 * @return {
 *   "_id": string,
 *   "description": string,
 *   "done": boolean, 
 *   "_createdOn": ISO datetime
 * }
 */
async function createTask(taskDescription) {
    const data = {
        description: taskDescription,
        done: false
    };
    try {
        let res = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const newTask = await res.json();
        console.log(`Task ${newTask._id} successfully created`);
        return newTask;
    } catch (error) {
        console.log(error);
    }
};




