// variables 
const input = document.querySelector('.input');
const addBtn = document.querySelector('.fa-plus');
const list = document.querySelector('.list-group');
const cardDiv = document.querySelector('.card'); // Could use better naming
const todoCountSpan = document.querySelector('.todoCount'); // Could use better naming
const inputForm = document.querySelector('.inputForm');
const allBtn = document.querySelector('.all');
const activeBtn = document.querySelector('.active');
const completedBtn = document.querySelector('.completed');
const clearBtn = document.querySelector('.clear');

// functions
// Kind of misleading, expect it to return a boolean. Maybe come up with a different name
const isEmpty = () => {
    if (itemArray.length > 0) {
        cardDiv.classList.remove('d-none');
    } else {
        cardDiv.classList.add('d-none');
    }
}

// Not necessary since it's just a one liner
const clearInput = () => {
    input.value = '';
}

// Not necessary since it's just a one liner
const setFocus = () => {
    input.focus();
}

// updateItemsLeftCount
const updateItemsLeftCount = () => {
    const itemsLeft = itemArray.filter(item => !item.checked)
    todoCountSpan.textContent = itemsLeft.length;
}

const addTodo = (e) => {
    e.preventDefault();

    if (!input.value) {
        alert(`Blank Todo..?  '-'`);
        return false;
    }

    idCounter++;
    let obj = {
        'id': idCounter,
        'name': input.value,
        'checked': false
    }
    itemArray.push(obj);

    updateView(itemArray);
}

const enterKey = (e) => {
    e.preventDefault();
    addTodo(e);
}

let idCounter = 0;
let itemArray = [];

// local storage
if (localStorage.getItem('idCounter')) {
    idCounter = localStorage.getItem('idCounter');
}

if (localStorage.getItem('itemsList')) {
    itemArray = JSON.parse(localStorage.getItem('itemsList'));
    updateView(itemArray);
}

function addItem(itemName) {

}

function removeItem(e) {
    if (!e.target.className.includes('remove-btn')) return false;

    let btn = document.getElementById(e.target.id);
    let itemID = btn.getAttribute('data-itemID');
    itemArray = itemArray.filter(item => item.id != itemID)
    updateView(itemArray);
}

function updateView(itemArray) {
    list.innerHTML = '';

    itemArray.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');

        const div = document.createElement('div');
        div.classList.add('d-flex', 'list-item-div');

        const div2 = document.createElement('div');
        div2.classList.add('d-flex', 'name-div');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox', 'item-checkbox');

        checkbox.id = `item_checkbox_${item.id}`;
        checkbox.setAttribute('data-itemID', item.id);
        checkbox.checked = item.checked;

        const span = document.createElement('label')
        span.classList.add('todoItem')
        span.textContent = item.name;
        span.htmlFor = checkbox.id;

        if (item.checked) span.classList.add('line-through');
        else span.classList.remove('line-through');

        const i = document.createElement('i');
        i.classList.add('fa', 'fa-times', 'remove-btn');
        i.id = `item_remove_${item.id}`;
        i.setAttribute('data-itemID', item.id);

        div2.appendChild(checkbox);
        div2.appendChild(span);
        div.appendChild(div2);
        div.appendChild(i);
        li.appendChild(div);
        list.appendChild(li);
    })

    updateItemsLeftCount();
    clearInput();
    isEmpty();
    setFocus();

    localStorage.setItem('itemsList', JSON.stringify(itemArray));
    localStorage.setItem('idCounter', idCounter);
}

function checkboxClicked(e) {
    if (!e.target.className.includes('item-checkbox')) return false;

    let checkbox = document.getElementById(e.target.id);
    let itemID = checkbox.getAttribute('data-itemID');
    itemArray.forEach(item => {
        if (item.id == itemID) {
            item.checked = checkbox.checked
        }
    })
    updateView(itemArray);
}

function filterCompleted() {
    let filteredList = itemArray.filter(item => item.checked);
    updateView(filteredList);
    allBtn.classList.remove('filter-selected');
    activeBtn.classList.remove('filter-selected');
    completedBtn.classList.add('filter-selected');
}

function filterIncomplete() {
    let filteredList = itemArray.filter(item => !item.checked);
    updateView(filteredList);
    allBtn.classList.remove('filter-selected');
    activeBtn.classList.add('filter-selected');
    completedBtn.classList.remove('filter-selected');
}

function resetFilters() {
    allBtn.classList.add('filter-selected');
    activeBtn.classList.remove('filter-selected');
    completedBtn.classList.remove('filter-selected');
    updateView(itemArray);
}

function clearCompleted() {
    itemArray = itemArray.filter(item => !item.checked);
    updateView(itemArray);
}

//event listeners
addBtn.addEventListener('click', addTodo);
inputForm.addEventListener('submit', enterKey);
list.addEventListener('click', removeItem);
list.addEventListener('input', checkboxClicked);
allBtn.addEventListener('click', resetFilters);
activeBtn.addEventListener('click', filterIncomplete);
completedBtn.addEventListener('click', filterCompleted);
clearBtn.addEventListener('click', clearCompleted);