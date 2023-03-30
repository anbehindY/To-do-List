const tasksContainer = document.querySelector('.tasks');
const addBtn = document.querySelector('.enter');
const addText = document.querySelector('#starter');

export default class TaskList {
  constructor() {
    this.tasksInfo = [];
    this.taskKey = 'key';
  }

  add = () => {
    if (addText.value) {
      const description = addText.value;
      const completed = false;
      const index = 0;
      const taskInfo = {
        description,
        completed,
        index,
      };
      this.tasksInfo.push(taskInfo);
      addText.value = '';
      this.display();
    }
    addBtn.addEventListener('click', this.add);
  }

  remove = () => {
    tasksContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('fa-trash-can')) {
        const index = event.target.classList[1].split('-')[1];
        this.tasksInfo.splice(index, 1);
        this.display();
      }
    });
  }

  display = () => {
    //  Each item in the tasksInfo array passed through this function and a new array is created
    const task = this.tasksInfo.map(
      (info) => `<div class="listItems">
                <label for="task${info.index}">
                <input id="task${info.index}" type="checkbox"> ${info.description}</label>
                <i class="fa-solid fa-trash-can"></i>
                <i class="fa-solid fa-ellipsis fa-rotate-90"></i>
               </div>`,
    );

    // Each item in the array created by task function are joined and put inside the tasksContainer
    tasksContainer.innerHTML = task.join('');
  }

  render = () => {
    this.remove();
    this.add();
  }
}
