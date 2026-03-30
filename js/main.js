// 할일을 등록하면 동적으로 생성됨
const $taskInput = document.querySelector("#task-input");
const $taskAdd = document.querySelector("#task-add");
const taskList = [];

// js 랜덤 아이디 만들기(코드 가져옴)
var newID = function () {
  return Math.random().toString(36).substr(2, 16);
};
$taskInput.addEventListener("focus", nullValue);
// task-input에 새로운 값을 입력할 때 값 초기화 함수
function nullValue() {
  $taskInput.value = "";
}
$taskAdd.addEventListener("click", addTask);

// 할일 추가 로직
function addTask() {
  //task 객체로 관리(아이디의 상태에 따라서 로직 결정)
  let task = {
    id: newID(),
    taskValue: $taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskRender();
}
// 할일 랜더 함수
function taskRender() {
  let taskResult = "";
  for (let i = 0; i < taskList.length; i++) {
    taskResult += `
        <div class="task">
              <div class="task-name ${taskList[i].isComplete ? "complete" : ""}">${taskList[i].taskValue}</div>
              <div class="state-container">
                <button class="task-toggle box-small-cursor " onClick="toggleTask('${taskList[i].id}')">✔</button>
                <button class="task-delete box-small-cursor" onClick="deleteTask('${taskList[i].id}')">X</button>
              </div>
            </div>`;
  }

  document.querySelector("#taskDashBoard").innerHTML = taskResult;
}
// 할일 토글 변경 함수
function toggleTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }
  taskRender();
}
// 할일 토글 삭제 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }
  taskRender();
}
