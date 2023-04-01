const checkStatus = (tasksInfo, callback) => {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const id = parseInt(checkbox.closest('.taskItems').id.split('-')[1], 10);
      const taskIndex = tasksInfo.findIndex((task) => task.index === id);
      tasksInfo[taskIndex].completed = checkbox.checked;
      const infoTask = checkbox.closest('.taskItems').querySelector('.infoTask');
      if (checkbox.checked) {
        infoTask.style.textDecoration = 'line-through';
      } else {
        infoTask.style.textDecoration = 'none';
      }
      callback();
    });
  });
};

export default checkStatus;
