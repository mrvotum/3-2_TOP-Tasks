const inputField = document.querySelector('[data-input=inputField]');
const allTasks = document.querySelector('[data-task=allTasks]');
const pinnedTasks = document.querySelector('[data-task=pinnedTasks]');
const errorMessage = document.getElementById('error');
const form = document.querySelector('[data-form=form]');
let idCount = 6; // задача по счёту

function remove() {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

form.addEventListener('click', (event) => {
  if (event.toElement.className === "taskCheckbox"){
    const checkbox = document.getElementById(event.toElement.id);
    const divEl = document.createElement('div');
    divEl.className = 'task';

    if(checkbox.checked) {
      divEl.innerHTML = `
        <label class="taskLabel">
          <span class="taskName">${checkbox.previousElementSibling.textContent}</span>
          <input id="${event.toElement.id}" class="taskCheckbox" type="checkbox" checked>
        </label>`;
      pinnedTasks.appendChild(divEl);
    } else {
      divEl.innerHTML = `
        <label class="taskLabel">
          <span class="taskName">${checkbox.previousElementSibling.textContent}</span>
          <input id="${event.toElement.id}" class="taskCheckbox" type="checkbox">
        </label>`;
      allTasks.appendChild(divEl);
    }
    checkbox.parentNode.parentNode.remove(); // удаляет из текущего списка

    if(pinnedTasks.childElementCount === 1){
      const pinnedTitle = document.getElementById('pinnedTitle');
      pinnedTitle.textContent = 'Pinned: No pinned tasks';
    } else {
      pinnedTitle.textContent = 'Pinned:';
    }

    if(document.querySelector('[data-task=allTasks]').childElementCount === 1){
      const allTitle = document.getElementById('allTitle');
      allTitle.textContent = 'All Tasks: No tasks found';
    } else {
      allTitle.textContent = 'All Tasks:';
    }
  }
});


inputField.addEventListener('keypress', function(e) {
  let key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    event.preventDefault();
    if (inputField.value === ''){
      errorMessage.style.display = 'block';
    } else {
      const divEl = document.createElement('div');
      divEl.setAttribute('data-tasksData', 'Task Name ' + idCount);
      divEl.className = 'task';
      divEl.innerHTML = `
      <label class="taskLabel">
        <span class="taskName">${inputField.value}</span>
        <input id="${idCount++}" class="taskCheckbox" type="checkbox">
      </label>`;
      allTasks.appendChild(divEl);
      inputField.value = '';
      allTitle.textContent = 'All Tasks:';
    }

    for (let i = 0; i < allTasks.childElementCount; i++){
      allTasks.children[i].style.display = 'block';
    }
  }
});

errorMessage.addEventListener('click', (event) => {
  errorMessage.style.display = 'none';
});
