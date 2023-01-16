// Storage todos
const todo_list = JSON.parse(localStorage.getItem('todo')) || [];

// Add a todo
const add_todo = (todo) => {
  const todo_id = Math.floor(Math.random() * 1000);

  todo_list.push({id: todo_id, todo: todo, state: false});
  return localStorage.setItem('todo', JSON.stringify(todo_list));
}
console.log(todo_list);

// Print todos
const print_todo = () => {
  document.getElementById('todo__container').innerHTML = todo_list.map(item => {
    return `
      <li><span>${item.todo}</span><button id="delete" value="${item.id}">Delete</button></li>
    `
  }).join('');
}
print_todo();

// Delete a todo
const delete_todo = (delete_this) => {
  const index_todo = todo_list.findIndex(index => index.id === parseInt(delete_this.value));
  console.log(index_todo);

  todo_list.splice(index_todo, 1)
  return localStorage.setItem('todo', JSON.stringify(todo_list))
}

document.querySelector('.delete').addEventListener('click', (e) => {

  if(e.target.matches('#delete')) {
    delete_todo(e.target)
    // console.log(e.target);
  }
  return print_todo(todo_list);
})


// Call functions
const form = document.getElementById('todo__form');
form.addEventListener('submit', (e) => {
  e.preventDefault()

  add_todo(document.getElementById('todo').value);
  print_todo();
  form.reset()
})