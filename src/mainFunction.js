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
      this.display();
    }
  }

  display = () => {
    //  Each item in the tasksInfo array passed through this function and a new array is created
    const task = this.tasksInfo.map(
      (info) => `<div class="listItems">
                <label for="task${info.index}">
                    <input id="task${info.index}" type="checkbox"> ${info.description}
                </label>
               </div>`,
    );

    // Each item in the array created by task function are joined and put inside the tasksContainer
    tasksContainer.innerHTML = task.join('');
  }

  render = () => {
    addBtn.addEventListener('click', this.add);
  }
}
