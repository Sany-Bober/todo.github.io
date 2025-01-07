document.getElementById('mainButton').addEventListener('click', function() {
    const taskName = document.getElementById('task_name').value;
    const taskBody = document.getElementById('task_body').value;

    if (taskName && taskBody) {
        const task = {
            name: taskName,
            body: taskBody,
            completed: false
        };

        // Получаем текущие задачи из localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Добавляем новую задачу
        tasks.push(task);

        // Сохраняем обновленный список задач в localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Очищаем поля ввода
        document.getElementById('task_name').value = '';
        document.getElementById('task_body').value = '';

        // Обновляем отображение задач
        displayTasks();

        alert('Задача добавлена!');
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const sectionTwo = document.getElementById('two');
    sectionTwo.innerHTML = ''; // Очищаем содержимое секции

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'sec_task';

        const spanName = document.createElement('span');
        spanName.className = 'spanDownOrange';
        spanName.textContent = task.name;

        const spanBody = document.createElement('span');
        spanBody.className = 'SpanDown';
        spanBody.textContent = task.body;

        if (task.completed) {
            spanName.classList.add('completed');
            spanBody.classList.add('completed');
        } else {
            spanName.classList.remove('completed');
            spanBody.classList.remove('completed');
        }

        const leftSec = document.createElement('div');
        leftSec.className = 'left_two_sec';
        leftSec.appendChild(spanName);
        leftSec.appendChild(spanBody);

        const completeButton = document.createElement('button');
        completeButton.id = `complete_${index}`;
        completeButton.className = 'white-button';
        completeButton.textContent = 'Выполненно';

        const deleteButton = document.createElement('button');
        deleteButton.id = `delete_${index}`;
        deleteButton.className = 'white-button';
        deleteButton.textContent = 'Удалить';

        const rightSec = document.createElement('div');
        rightSec.className = 'right_two_sec';
        rightSec.appendChild(completeButton);
        rightSec.appendChild(deleteButton);

        taskElement.appendChild(leftSec);
        taskElement.appendChild(rightSec);

        sectionTwo.appendChild(taskElement);

        // Добавляем обработчики событий для кнопок
        completeButton.addEventListener('click', function() {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        });

        deleteButton.addEventListener('click', function() {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        });
    });
}

// Инициализация отображения задач при загрузке страницы
displayTasks();