document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('taskInput');
    const addButton = document.querySelector('.to_do_list button');
    let list = document.createElement('ul');
    list.className = 'task-list';
    // Insert the list right after the input/button inside .to_do_list
    const toDoListDiv = document.querySelector('.to_do_list');
    toDoListDiv.parentNode.insertBefore(list, toDoListDiv.nextSibling);

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskObj => createTaskElement(taskObj.name));
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(list.children).map(li => {
            // li.childNodes[1] is the text node (after checkbox label)
            return { name: li.childNodes[1].textContent };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(value) {
        const li = document.createElement('li');
        // Create custom checkbox label
        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'custom-checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'dummy';
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(checkmark);

        // Create task text node
        const textNode = document.createTextNode(value);

        // Create time input
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.style.marginLeft = '10px';
        timeInput.style.marginRight = '10px';
        timeInput.className = 'task-time-input';

        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = function () {
            // Remove any color or style from the li before removing
            li.style.backgroundColor = '';
            li.style.color = '';
            list.removeChild(li);
            saveTasks();
        };

        // Append checkbox, text, time input, and remove button to li
        li.appendChild(checkboxLabel);
        li.appendChild(textNode);
        li.appendChild(timeInput);
        li.appendChild(removeBtn);
        list.appendChild(li);
    }

    function addTask() {
        const value = input.value.trim();
        if (!value) return;
        createTaskElement(value);
        saveTasks();
        input.value = '';
    }

    addButton.addEventListener('click', addTask);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addTask();
    });

    loadTasks();
});
