// Elements
const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById("list");
const input = document.getElementById('input');
const submit = document.getElementById('submit');

// CSS Elements
const CHECK_ITEM = "fa-check-circle";
const UNCHECK_ITEM = "fa-circle-thin";
const LINE_THROUGH_ITEM = "lineThrough";

let itemList, id;
let itemData = localStorage.getItem("TODO");

// Date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// Clear local storage
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

const clearInputs = () => {
  if(input.value !== ''){
    input.value = '';
  } else {
    return;
  }
};

// Load item list
const loadItemList = (listy) => {
  listy.forEach((items) => {
      addToDo(items.name, items.id, items.completed, items.remove);
  });
};

// Add items to the Todos List
const addToDo = (itemName, id, done, remove) => {

  if(remove){return;}

  const position = "beforeend";
  const DONE = done ? CHECK_ITEM : UNCHECK_ITEM;
  const STRIKE = done ? LINE_THROUGH_ITEM : "";
  const item = 
  `
  <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${STRIKE}">${itemName}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>`;

  list.insertAdjacentHTML(position, item);
  clearInputs();
}
const addTodoItemHandler = () => {
  const itemValue = input.value;
  if (itemValue.trim() === '') {
    return;
  }

  const items = {
    name: itemValue,
    id: id,
    completed: false,
    remove: false
  };
  itemList.push(items);
  addToDo(items.name, items.id, items.completed, items.remove);
  console.log(itemList);

  localStorage.setItem("TODO", JSON.stringify(itemList));
  id++;
};

// Completed Todos Item
const completeToDos = (element) => {
  element.classList.toggle(CHECK_ITEM);
  element.classList.toggle(UNCHECK_ITEM);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH_ITEM);

  itemList[element.id].completed = itemList[element.id].completed ? false : true;
}

// Remove Todos Item
const removeToDos = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  
  itemList[element.id].remove = true;
}

list.addEventListener("click", function(event){
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete
  
  if(elementJob == "complete"){
      completeToDos(element);
  }else if(elementJob == "delete"){
      removeToDos(element);
  }
  localStorage.setItem("TODO", JSON.stringify(itemList));
});

submit.addEventListener('click', addTodoItemHandler);

// check for items in localstorage
if (itemData) {
  itemList = JSON.parse(itemData);
  id = itemList.length;
  loadItemList(itemList);
} else {
  itemList = [];
  id = 0;
}