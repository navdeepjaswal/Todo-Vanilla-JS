const input = document.querySelector('.input');
const addBtn = document.querySelector('.fa-plus');
const list = document.querySelector('.list-group');
const cardContainer = document.querySelector('.card'); // Could use better naming
const itemCount = document.querySelector('.todoCount'); // Could use better naming
const inputForm = document.querySelector('.inputForm');
const allBtn = document.querySelector('.all');
const activeBtn = document.querySelector('.active');
const completedBtn = document.querySelector('.completed');
const clearBtn = document.querySelector('.clear');
const filtersContainer = document.querySelector('.filters');
const filterLinks = document.querySelectorAll('.filter-link');

const addTodo = (e) => {
    e.preventDefault();

    if (!input.value) {
        alert(`Blank Todo..?  '-'`);
        return false;
    }

    const li = document.createElement('li');
    li.classList.add('list-group-item');

    const div = document.createElement('div');
    div.classList.add('d-flex', 'list-item-div');

    const div2 = document.createElement('div');
    div2.classList.add('d-flex', 'name-div');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox', 'item-checkbox');
    checkbox.type = 'checkbox';

    const span = document.createElement('label')
    span.classList.add('todoItem')
    span.textContent = input.value;

    const i = document.createElement('i');
    i.classList.add('fa', 'fa-times', 'remove-btn');

    div2.appendChild(checkbox);
    div2.appendChild(span);
    div.appendChild(div2);
    div.appendChild(i);
    li.appendChild(div);
    list.appendChild(li);
    cardContainer.classList.remove('d-none');

    input.value = '';
    input.focus();

    resetFilters();
    updateItemsLeftCount();
}

function removeItem(e) {
    if (!e.target.className.includes('remove-btn')) return false;

    const item = e.target.parentNode;
    const itemContainer = item.parentNode;

    itemContainer.remove();
    hideOrShowContainer();
    updateItemsLeftCount();
}

function hideOrShowContainer() {
    if (!list.children.length) {
        cardContainer.classList.add('d-none');
    } else {
        cardContainer.classList.remove('d-none');
    }
}

const enterKey = (e) => {
    e.preventDefault();
    addTodo(e);
}

function checkboxClicked(e) {
    if (!e.target.className.includes('item-checkbox')) return false;

    const checkbox = e.target;
    const label = e.target.nextSibling;

    if (checkbox.checked) {
        label.classList.add('line-through');
    } else {
        label.classList.remove('line-through');
    }

    updateItemsLeftCount();
}

function filterCompleted() {
    resetFilters();
    const items = Array.from(list.children);

    if (items.length) {
        items.forEach(item => {
            const checkbox = item.querySelector('.checkbox');
            if (checkbox && !checkbox.checked) {
                item.classList.add('d-none');
            }
        });
    }
}

function filterIncomplete() {
    resetFilters();
    const items = Array.from(list.children);

    items.forEach(item => {
        const checkbox = item.querySelector('.checkbox');
        if (checkbox.checked) item.classList.add('d-none');
    });
}

function resetFilters() {
    const items = Array.from(list.children);
    items.forEach(item => item.classList.remove('d-none'));
}

function clearCompleted() {
    const items = Array.from(list.children);

    items.forEach(item => {
        const checkbox = item.querySelector('.checkbox');
        if (checkbox.checked) item.remove();
    });

    hideOrShowContainer();
    updateItemsLeftCount();
}

const updateItemsLeftCount = () => {
    const checkboxElements = document.querySelectorAll('.checkbox');
    let remaining = 0;

    Array.from(checkboxElements).forEach(checkbox => {
        if (!checkbox.checked) remaining++;
    })

    itemCount.textContent = remaining;
}

const setActiveFilter = (e) => {
    filterLinks.forEach(filter => {
        filter.classList.remove('filter-selected');
    });

    e.target.classList.add('filter-selected');
}

addBtn.addEventListener('click', addTodo);
inputForm.addEventListener('submit', enterKey);
list.addEventListener('click', removeItem);
list.addEventListener('input', checkboxClicked);
allBtn.addEventListener('click', resetFilters);
activeBtn.addEventListener('click', filterIncomplete);
completedBtn.addEventListener('click', filterCompleted);
clearBtn.addEventListener('click', clearCompleted);
filtersContainer.addEventListener('click', setActiveFilter);