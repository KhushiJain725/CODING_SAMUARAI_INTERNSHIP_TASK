let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function addTask() {
    const taskInput = document.getElementById('new-task');
    const priorityInput = document.getElementById('priority');
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority
        };
        tasks.push(task);
        taskInput.value = '';
        priorityInput.value = 'low';
        saveTasks();
        renderTasks();
    }
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const newTaskText = prompt("Edit your task:");
    if (newTaskText) {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newTaskText } : task);
        saveTasks();
        renderTasks();
    }
}

function filterTasks(status) {
    filter = status;
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.text} (${task.priority})</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
        
    });
}