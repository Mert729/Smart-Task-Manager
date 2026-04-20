let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setFilter(f) {
    filter = f;
    renderTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (!input.value.trim()) return;

    tasks.push({
        text: input.value,
        priority,
        deadline,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const emptyMsg = document.getElementById("emptyMessage");

    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    emptyMsg.style.display = filteredTasks.length ? "none" : "block";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `${task.priority} ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <div class="task-info">
                <strong>${task.text}</strong>
                <span class="badge">Priority: ${task.priority}</span>
                <span class="badge">Deadline: ${task.deadline || "None"}</span>
            </div>

            <div class="actions">
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

document.getElementById("toggleMode").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

renderTasks();