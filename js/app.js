const taskInput = document.querySelector("#add-task");
const addButton = document.querySelector(".adding__button");
const incompleteTaskHolder = document.querySelector("#TODO-tasks"); //ul of TODO-tasks
const completedTasksHolder = document.querySelector("#completed-tasks"); //ul of completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {

  const listItem = document.createElement("li");
  listItem.classList.add("todo__task");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox-task");

  const label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task-tittle");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task");

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("button");
  editButton.classList.add("edit");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button");
  deleteButton.classList.add("delete");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("img-delete")
  deleteButtonImg.src = "./assets/remove.svg";
  deleteButtonImg.alt = "remove-ico";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task");
  const label = listItem.querySelector(".task-tittle");
  const editBtn = listItem.querySelector(".edit");

  //If class of the parent is .editMode
  if (listItem.classList.contains("editMode")) {
    //switch to .editMode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editMode on the parent.
  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #TODO-tasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".checkbox-task");
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  // checkBox.addEventListener("change", checkBoxEventHandler);
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}