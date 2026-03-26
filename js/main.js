// 할일을 등록하면 동적으로 생성됨
const $taskInput = document.querySelector("#task-input");
const $taskAdd = document.querySelector("#task-add");
const taskList = [];

$taskAdd.addEventListener("click", addTask);

function addTask() {
  let task = $taskInput.value;
  taskList.push(task);
  console.log(taskList);
  taskRender();
}

function taskRender() {
  let taskResult = "";
  for (let i = 0; i < taskList.length; i++) {
    taskResult = `
        <div class="task">
              <div class="task-name">${taskList[i]}</div>
              <div class="state-container">
                <button class="task-toggle box-small-cursor">✔</button>
                <button class="task-delete box-small-cursor">X</button>
              </div>
            </div>`;
  }

  document.querySelector("#taskDashBoard").innerHTML += taskResult;
}
