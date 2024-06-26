document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const taskForm = document.getElementById('taskForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data === "Login successful") {
                    window.location.href = '../html/dashboard.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Vérifiez que les champs ne sont pas vides
    if (!data.username || !data.password) {
        alert('Username and password are required');
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === "Registration successful") {
            window.location.href = '../html/login.html';
        }
    })
    .catch(error => console.error('Error:', error));  // Log any network errors
});

    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = { task_description: formData.get('taskInput') };

            fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                loadTasks();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

        loadTasks();
    }
});

function loadTasks() {
    fetch('http://localhost:3000/tasks', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        data.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.task_description;
            if (task.is_completed) {
                taskItem.style.textDecoration = 'line-through';
            }
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.dataset.taskId = task.id;
            completeButton.onclick = () => {
                completeTask(task.id);
            };
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.dataset.taskId = task.id;
            deleteButton.onclick = () => {
                deleteTask(task.id);
            };
            taskItem.appendChild(completeButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function completeTask(taskId) {
    fetch('http://localhost:3000/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId }),
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadTasks();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteTask(taskId) {
    fetch('http://localhost:3000/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId }),
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadTasks();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
