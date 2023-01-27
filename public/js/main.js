// Storage todos
const todo_list = JSON.parse(localStorage.getItem('todo')) || []

// Add a todo
const add_todo = (todo) => {
  // const todo_id = Math.floor(Math.random() * 10000);
  const todo_id = crypto.randomUUID()

  todo_list.push({ id: todo_id, todo: todo, state: false })
  localStorage.setItem('todo', JSON.stringify(todo_list))
}

// Print todos
const print_todo = () => {
  document.getElementById('todo__container').innerHTML = todo_list
    .map((item) => {
      return `
      <li><span>${item.todo}</span><button id="delete" value="${item.id}">Delete</button></li>
      `
    })
    .join('')
}
print_todo() //

// Delete a todo
const delete_todo = (delete_this) => {
  const index_todo = todo_list.findIndex(
    (index) => index.id === delete_this.value,
  )
  console.log(index_todo)

  todo_list.splice(index_todo, 1)
  localStorage.setItem('todo', JSON.stringify(todo_list))
}

document.querySelector('.delete').addEventListener('click', (e) => {
  if (e.target.matches('#delete')) {
    delete_todo(e.target)
    console.log(e.target);
  }
  return print_todo(todo_list)
})

// Call functions
const form = document.getElementById('todo__form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  add_todo(document.getElementById('todo').value)
  print_todo()
  form.reset()
})

const body = document.querySelector('.body')
const button = document.getElementById('button')

button.addEventListener('click', () => {
  const mode = localStorage.getItem('mode')

  body.classList.toggle('body__dark')
  button.classList.toggle('button-mode__dark')

  if (JSON.parse(mode)) {
    localStorage.setItem('mode', false)
  } else {
    localStorage.setItem('mode', true)
  }
})


const mode = localStorage.getItem('mode')
if (JSON.parse(mode)) {
  body.classList.add('body__dark')
  button.classList.add('button-mode__dark')
}
