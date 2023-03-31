const tasksContainer = document.querySelector('.tasks');
const addBtn = document.querySelector('.enter');
const addText = document.querySelector('#starter');

export default class TaskList {
  constructor() {
    this.tasksInfo = [] || JSON.parse(localStorage.getItem(this.taskKey));
    this.taskKey = 'key';
  }

  add = () => {
    if (addText.value) {
      const taskInfo = {
        description: addText.value,
        completed: false,
        index: this.tasksInfo.length + 1,
      };
      this.tasksInfo.push(taskInfo);
      addText.value = '';
      this.display();
      this.saveTasks();
    }
    addBtn.addEventListener('click', (this.add));
  }

  remove = () => {
    tasksContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash-can')) {
        const index = e.target.classList[1].split('-')[1];
        this.tasksInfo.splice(index, 1);
        this.display();
        this.saveTasks();
      }
    });
  }

   display = () => {
     //  Each item in the tasksInfo array passed through this function and a new array is created
     const task = this.tasksInfo.map(
       (info) => `<div class="taskItems" id="${info.index}">
                <i id="task${info.index}" class="fa-regular fa-square"></i>
                <label id="label${info.index}" class="labels">${info.description}</label>
                <i class="fa-solid fa-trash-can"></i>
                <i class="fa-solid fa-ellipsis fa-rotate-90"></i>
               </div>`,
     );

     // Each item in the array created by task function are joined and put inside the tasksContainer
     tasksContainer.innerHTML = task.join('');
   }

  saveTasks = () => {
    localStorage.setItem(this.taskKey, JSON.stringify(this.tasksInfo));
  }

  render = () => {
    this.add();
    this.remove();
    this.edit();
  }
}
