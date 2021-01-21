var inputItem = document.getElementById('todo-add-new')
var list = document.getElementById('todo-items')
var error = document.getElementById('error')

function validate(e) {
  e.preventDefault()
  if (inputItem.value) {
    addToDo(), hideError()
  } else {
    showError()
  }
}

function removeItem(e) {
  var id = e.target.id
  var clickedBtn = e.target
  var dataId = clickedBtn.getAttribute('data-id')
  console.log(id, dataId)
  var liElement = document.getElementById('todo-item-id_' + dataId)
  list.removeChild(liElement)
}

function hideError() {
  error.innerHTML = ''
}

function addToDo() {
  var item = document.createElement('li')
  var id = 'todo-item-id_'
  var generatedId = generateId()
  var checkBoxEl = createCheckboxEl(generatedId)

  var label = createLabelEl(inputItem.value)
  var removeBtn = createRemoveBtnEl(generatedId)

  item.appendChild(checkBoxEl)
  item.appendChild(label)
  item.appendChild(removeBtn)

  item.setAttribute('class', 'todo-item')
  item.setAttribute('id', id + generatedId)

  list.appendChild(item)
  inputItem.value = ''
}

function createCheckboxEl(generatedId) {
  var input = document.createElement('input')
  var idCheckbox = 'idCheckbox_'
  input.setAttribute('type', 'checkbox')
  input.setAttribute('id', idCheckbox + generatedId)
  input.addEventListener('change', event => onCheckboxChange(event, generatedId), false)
  return input
}

function onCheckboxChange(event, generatedId) {
  let item = document.getElementById('todo-item-id_' + generatedId)
  if (event.target.checked == true) {
    item.setAttribute('class', 'todo-item completed')
  } else {
    item.setAttribute('class', 'todo-item')
  }
  console.log(item, event.target.id, event.target.checked, generatedId, 'todo-item-id_' + generatedId)
}

function createRemoveBtnEl(generatedId) {
  var button = document.createElement('button')
  var btnId = 'btnId_'
  var i = document.createElement('i')
  var span = document.createElement('span')
  button.setAttribute('class', 'btn btn--icon')
  button.setAttribute('type', 'button')
  button.onclick = removeItem
  button.setAttribute('id', btnId + generatedId)
  button.setAttribute('data-id', generatedId)
  i.setAttribute('id', btnId + generatedId)
  i.setAttribute('data-id', generatedId)
  i.setAttribute('class', 'icon icon--remove')
  button.appendChild(i)
  span.setAttribute('class', 'todo__remove')
  span.appendChild(button)
  return span
}

function createLabelEl(value) {
  var label = document.createElement('label')
  var span = document.createElement('span')
  span.setAttribute('class', 'labelSpan')
  span.innerHTML = value
  label.appendChild(span)
  return label
}

function showError() {
  error.innerHTML = 'Some value must be inputed !!!'
}

var generateId = function () {
  var charSet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var charSetSize = charSet.length
  var charCount = 8
  var id = ''
  for (var i = 1; i <= charCount; i++) {
    var randPos = Math.floor(Math.random() * charSetSize)
    id += charSet[randPos]
  }
  return id
}

function clearTodos() {
  var list = document.getElementById('todo-items')
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

document.getElementById('btn-submit').addEventListener('click', validate, false)
document.getElementById('clear-todos').addEventListener('click', clearTodos, false)
