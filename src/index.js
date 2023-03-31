import './styles.css';
import TaskList from './mainFunction.js';

const taskList = new TaskList();
taskList.render();

const EditFunction = () => {
  const formsElements = document.querySelectorAll('.formel');

  formsElements.forEach((formel, index) => {
    formel.addEventListener('input', (e) => {
      e.preventDefault();
      editTask(todoArray, index, e.target.value);
    });
  });
};