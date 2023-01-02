let todo_list = JSON.parse(localStorage.getItem('todo')) || [];

// Add a todo
const add_todo = (todo) => {
  let random_id = Math.floor(Math.random() * 1000);
  todo_list.push({ id: random_id, complete: false, todo: todo });

  return localStorage.setItem('todo', JSON.stringify(todo_list));
}

// Print todos
const print_todo = (print_this) => {

  document.getElementById('todo__container').innerHTML = print_this.map(item => {
    return `<li><button id="complete">Complete</button><span>${item.todo}</span><button id="delete" value="${item.id}">Delete</button></li>`
  }).join('');
}
print_todo(todo_list);

//Delete a todo
const delete_todo = (button) => {
  const index_todo = todo_list.findIndex(index => index.id === parseInt(button.value));

  todo_list.splice(index_todo, 1);
  localStorage.setItem('todo', JSON.stringify(todo_list));
}

document.querySelector('.delete').addEventListener('click', (e) => {
  if (e.target.matches('#delete')) {
    delete_todo(e.target);
    console.log(e.target);
  }
  return print_todo(todo_list);
});

const form = document.getElementById('todo__form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  add_todo(document.getElementById('todo').value);
  print_todo(todo_list);
  form.reset();
});