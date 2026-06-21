const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                No tasks yet. Add your first task 🚀
            </div>
        `;

        updateStats();
        return;
    }

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})">

                    ${task.completed ? "Undo" : "Done"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}