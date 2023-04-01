class TaskList {
  constructor() {
    this.tasksContainer = document.querySelector('.tasks');
    this.addBtn = document.querySelector('.enter');
    this.addText = document.querySelector('#starter');
    this.form = document.querySelector('form');
    this.taskKey = 'key';
    const storedTasks = JSON.parse(localStorage.getItem(this.taskKey));
    this.tasksInfo = storedTasks || [];
  }

  display = () => {
    const task = this.tasksInfo.map(
      (info) => `<div class="taskItems" id="div-${info.index}">
      <input type="checkbox" class="checkbox" ${info.completed ? 'checked' : ''} />
      <input class='infoTask ${info.completed ? 'true' : ''}' type="text" id="infoTask" data-index="${info.index}" name="description" value="${info.description}" />
      <i class="fa-solid fa-trash-can" data-index="${info.index}"></i>
      <i class="fa-solid fa-ellipsis fa-rotate-90"></i>
    </div>`,
    );
    this.tasksContainer.innerHTML = task.join('');
  };

  saveTasks() {
    localStorage.setItem(this.taskKey, JSON.stringify(this.tasksInfo));
  }

  add() {
    if (this.addText.value) {
      const taskInfo = {
        description: this.addText.value,
        completed: false,
        index: 0,
      };
      this.tasksInfo.push(taskInfo);
      this.addText.value = '';
      taskInfo.index += this.tasksInfo.length;
      this.display();
      this.checkStatus();
      this.saveTasks();
    }
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.add();
    });
    this.addBtn.addEventListener('click', this.add.bind(this));
  }

  remove() {
    this.tasksContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash-can')) {
        const id = parseInt(e.target.getAttribute('data-index'), 10);
        for (let i = 0; i < this.tasksInfo.length; i += 1) {
          if (this.tasksInfo[i].index === id) {
            this.tasksInfo.splice(i, 1);
            this.display();
            this.checkStatus();
            this.saveTasks();
          }
        }
      }
    });
  }

  edit() {
    this.tasksContainer.addEventListener('click', (e) => {
      const taskItem = e.target.closest('.taskItems');
      if (taskItem) {
        const descriptionElement = taskItem.querySelector('.infoTask');
        descriptionElement.addEventListener('blur', () => {
          const newDescription = descriptionElement.value.trim();
          if (newDescription) {
            const id = parseInt(descriptionElement.dataset.index, 10);
            const taskIndex = this.tasksInfo.findIndex((task) => task.index === id);
            this.tasksInfo[taskIndex].description = newDescription;
          }
          this.display();
          this.checkStatus();
          this.saveTasks();
        });
      }
    });
  }

  checkStatus = () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const id = parseInt(checkbox.closest('.taskItems').id.split('-')[1], 10);
        const taskIndex = this.tasksInfo.findIndex((task) => task.index === id);
        this.tasksInfo[taskIndex].completed = checkbox.checked;
        const infoTask = checkbox.closest('.taskItems').querySelector('.infoTask');
        if (checkbox.checked) {
          infoTask.style.textDecoration = 'line-through';
        } else {
          infoTask.style.textDecoration = 'none';
        }
        this.saveTasks();
      });
    });
  }

  deleteCompletedTasks() {
    this.tasksInfo = this.tasksInfo.filter((task) => !task.completed);
    this.display();
    this.checkStatus();
    this.saveTasks();
    const deleteCompletedBtn = document.querySelector('.clear');
    deleteCompletedBtn.addEventListener('click', () => {
      this.deleteCompletedTasks();
    });
  }

  render() {
    this.add();
    this.remove();
    this.display();
    this.edit();
    this.checkStatus();
  }
}

export default TaskList;
