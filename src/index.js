import './styles.css';

// Array of the tasks' information
const tasksInfo = [];

const tasksContainer = document.querySelector('.tasks');

// Each item in the tasksInfo array passed through this function and a new array is created
const task = tasksInfo.map(
  (taskInfo) => `<div class="listItems">
                <label for="task${taskInfo.index}">
                    <input id="task${taskInfo.index}" type="checkbox"> ${taskInfo.description}
                </label>
               </div>`,
);

// Each item in the array created by task function are joined and put inside the tasksContainer
tasksContainer.innerHTML = task.join('');
