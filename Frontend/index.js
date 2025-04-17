let draggedTask = null;

function displayTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.ondragstart = (event) => {
        draggedTask = taskElement;
        event.dataTransfer.setData('text/plain', task.title);
        event.dataTransfer.setData('task-id', task.id);
    };

    // Create title, description, and priority elements
    const titleElement = document.createElement('div');
    titleElement.className = 'task-title';
    titleElement.innerText = task.title;

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'task-description';
    descriptionElement.innerText = task.description;

    const priorityElement = document.createElement('div');
    priorityElement.className = 'task-priority';
    priorityElement.innerText = `Priority: ${task.priority}`;
    // Add specific class based on priority
    priorityElement.classList.add(task.priority);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-task-btn';
    deleteButton.onclick = (event) => {
        event.stopPropagation(); // Prevent triggering drag events
        deleteTask(task.id, taskElement);
    };

    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(priorityElement);
    taskElement.appendChild(deleteButton);

    const statusColumnId = task.status.toLowerCase().replace(' ', '-'); // Convert status to match column ID
    document.getElementById(statusColumnId).appendChild(taskElement);
}

const getAllTasks = async (sort_by = "title", sort_order = "asc") => {
    try {
        const tasksList = await fetch(`http://localhost:8000/api/tasks?sort_by=${sort_by}&sort_order=${sort_order}`);
        const jsonData = await tasksList.json();
        return jsonData.data;
    } catch (error) {
        console.log("Some error occurred" + error);
        return [];
    }
}

// Create a new task and append it to the appropriate column
async function createTask(title, description, priority, status) {
    try {
        const postData = await fetch('http://localhost:8000/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, priority, status }),
        });

        const jsonData = await postData.json();
        const task = jsonData.data;
        displayTask(task);
    } catch (error) {
        console.log("Some error occurred" + error);
    }
}

// Function to delete a task
async function deleteTask(taskId, taskElement) {
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            // Remove the task element from the DOM
            taskElement.remove();
            console.log(`Task with ID "${taskId}" has been deleted.`);
        } else {
            console.error('Error deleting task:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Update task status in the API
async function updateTaskStatus(taskId, newStatus) {
    const allTasksList = await getAllTasks(
        document.getElementById('sortBySelect').value,
        document.getElementById('sortOrderSelect').value
    );
    const updatedTask = allTasksList.find(task => +task.id === +taskId);
    if (!updatedTask) {
        alert("Task not found");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...updatedTask, status: newStatus }), // Only update the status
        });
        const data = await response.json();
        console.log(`Task with ID "${taskId}" moved to ${newStatus}`);
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

// Function to reload tasks with current sort settings
async function reloadTasks() {
    // Clear all current tasks
    document.querySelectorAll('.tasks').forEach(column => {
        column.innerHTML = '';
    });

    // Get sort parameters
    const sortBy = document.getElementById('sortBySelect').value;
    const sortOrder = document.getElementById('sortOrderSelect').value;

    // Fetch and display tasks with current sort settings
    const allTasksList = await getAllTasks(sortBy, sortOrder);
    if (!!allTasksList) {
        allTasksList.forEach(task => {
            displayTask(task);
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.getElementById('closeModal');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskPriorityInput = document.getElementById('taskPriority');
    const sortBySelect = document.getElementById('sortBySelect');
    const sortOrderSelect = document.getElementById('sortOrderSelect');
    let currentStatus = '';

    // Initial load of tasks with default sorting
    const allTasksList = await getAllTasks();
    if (!!allTasksList) {
        allTasksList.forEach(task => {
            displayTask(task);
        });
    }

    // Add event listeners for sort dropdowns
    sortBySelect.addEventListener('change', reloadTasks);
    sortOrderSelect.addEventListener('change', reloadTasks);

    // Open modal to add a task
    document.querySelectorAll('.addTaskBtn').forEach(button => {
        button.onclick = () => {
            currentStatus = button.getAttribute('data-status');
            taskModal.style.display = 'block';
        };
    });

    // Close modal
    closeModal.onclick = () => {
        taskModal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    };

    // Save task and call API
    saveTaskBtn.onclick = () => {
        const taskTitle = taskTitleInput.value;
        const taskDescription = taskDescriptionInput.value;
        const taskPriority = taskPriorityInput.value;
        if (taskTitle && currentStatus) {
            createTask(taskTitle, taskDescription, taskPriority, currentStatus);
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
            taskPriorityInput.value = 'Low';
            taskModal.style.display = 'none';
        }
    };

    window.allowDrop = (event) => {
        event.preventDefault();
    };

    // Handle dropping tasks into a new column
    window.drop = (event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('task-id');
        if (draggedTask) {
            const newStatus = event.target.id; // Get the new status from the column ID
            event.target.appendChild(draggedTask);
            updateTaskStatus(taskId, newStatus);
        }
    };
});