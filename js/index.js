const addItems = document.querySelector('.add-item');
const itemsList = document.querySelector('.items');
const items = JSON.parse(localStorage.getItem('items')) || [];

const checkAll = document.querySelector('#checkall');
const uncheckAll = document.querySelector('#uncheckall');
const clearList = document.querySelector('#clearlist');

const viewAll = document.querySelector('#viewall');
const onlyChecked = document.querySelector('#onlychecked');
const onlyUnchecked = document.querySelector('#onlyunchecked');

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  this.reset();
}

function populateList(items = {}, itemsList) {
  itemsList.innerHTML = items.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item-${i}" ${(item.done) ? 'checked' : ''} />
        <label for="item-${i}">${item.text}</label>
      </li>
    `
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function handleCheckAll() {
	items.map(item => item.done = true);
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function handleUncheckAll() {
	items.map(item => item.done = false);
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function handleClearList() {
	items.splice(0,items.length);
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function filterViewAll() {
	populateList(items, itemsList);
}

function filterOnlyChecked() {
	const filteredItems = items.filter(item => item.done);
	populateList(filteredItems, itemsList);
}

function filterOnlyUnchecked() {
	const filteredItems = items.filter(item => !item.done);
	populateList(filteredItems, itemsList);
}
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

checkAll.addEventListener('click', handleCheckAll);
uncheckAll.addEventListener('click', handleUncheckAll);
clearList.addEventListener('click', handleClearList);

viewAll.addEventListener('click', filterViewAll);
onlyChecked.addEventListener('click', filterOnlyChecked);
onlyUnchecked.addEventListener('click', filterOnlyUnchecked);

populateList(items, itemsList)
