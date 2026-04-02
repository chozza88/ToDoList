// 할일을 등록하면 동적으로 생성됨
const $taskInput = document.querySelector("#task-input");
const $taskAdd = document.querySelector("#task-add");
const $todoState = document.querySelectorAll(".todo-state div");
const $wrnMsgContainer = document.querySelector("#wrnMsgContainer");
const $wrnBtnClose = document.querySelector("#wrnBtnClose");

let filter = "all";
const taskList = [];
// 할일 모달창 닫기 이벤트
$wrnBtnClose.addEventListener("click", function () {
  $wrnMsgContainer.style.display = "none";
});
// filter 이벤트(클릭)
for (let i = 0; i < $todoState.length; i++) {
  $todoState[i].addEventListener("click", function (e) {
    taskState(e);
  });
}
// 필터 정리 함수
function taskState(e) {
  if (e.target.id === "all") {
    filter = "all";
    taskRender();
  } else if (e.target.id === "ongoing") {
    filter = "ongoing";
    taskRender();
  } else if (e.target.id === "done") {
    filter = "done";
    taskRender();
  }
}
// js 랜덤 아이디 만들기(코드 가져옴)
var newID = function () {
  return Math.random().toString(36).substr(2, 16);
};
$taskInput.addEventListener("focus", nullValue);
// task-input에 새로운 값을 입력할 때 값 초기화 함수
function nullValue() {
  $taskInput.value = "";
}
// keydown(Enter) 이벤트 시 할 일 추가
$taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
// 클릭 이벤트 시 할 일 추가
$taskAdd.addEventListener("click", addTask);

// 할일 추가 로직
function addTask() {
  // 빈 일정 추가시 블로킹
  if (!$taskInput.value.trim()) {
    $wrnMsgContainer.style.display = "flex";
    return;
  }
  //task 객체로 관리(아이디의 상태에 따라서 로직 결정)
  let task = {
    id: newID(),
    taskValue: $taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  // $taskInput 값 이벤트 추가 후 빈값 만들기
  $taskInput.value = "";
  taskRender();
}
// 할일 랜더 함수
function taskRender() {
  let list = [];

  if (filter === "all") {
    list = taskList;
  } else if (filter === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        list.push(taskList[i]);
      }
    }
  } else if (filter === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        list.push(taskList[i]);
      }
    }
  }
  let taskResult = "";
  for (let i = 0; i < list.length; i++) {
    taskResult += `
        <div class="task">
              <div class="task-name ${list[i].isComplete ? "complete" : ""}">${list[i].taskValue}</div>
              <div class="state-container">
                <button class="task-toggle box-small-cursor " onClick="toggleTask('${list[i].id}')">✔</button>
                <button class="task-delete box-small-cursor" onClick="deleteTask('${list[i].id}')">X</button>
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
