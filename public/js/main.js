const todo_list = JSON.parse(localStorage.getItem('todo')) || [];

const date = new Date();

const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const title = document.querySelector('.header__date')
title.textContent = currentDate;

const heightAppointContainer = document.getElementById('add-appointment-container').offsetHeight;
const todoContainer = document.getElementById('todo__container');

todoContainer.style.height = `calc(100vh - ${heightAppointContainer + 10}px)`;

// Add a todo
const add_todo = (todo) => {
  const todo_id = crypto.randomUUID()

  todo_list.push({ ...todo, id: todo_id, state: false })
  localStorage.setItem('todo', JSON.stringify(todo_list))
}

// Print todos
const print_todo = () => {
  todoContainer.innerHTML = todo_list
    .map((cita) => {
      const { id, appointment, dateAppointment, timeAppointment } = cita;
      
      return `
      <li>
        <div>
          <div><strong>Fecha:</strong> ${!dateAppointment ? 'Sin establecer' : dateAppointment}</div></span>
          <div><strong>Hora:</strong> ${!timeAppointment ? 'Sin establecer' : timeAppointment }</div>
        </div>
        
        <div class="todo__desc">
          <p id="${id}">${appointment}</p>
        </div>
        <div class="buttons-container">
          <button type="button" class="edit-btn" data-id="${id}"></button>
          <button type="button" id="delete" value="${id}"></button>
        </div>
      </li>
      `
    })
    .join('')
}
print_todo()

// Delete a Appointment
const deleteAppointment = (delete_this) => {
  const index_todo = todo_list.findIndex(
    (index) => index.id === delete_this.value,
  )

  todo_list.splice(index_todo, 1)
  localStorage.setItem('todo', JSON.stringify(todo_list))
}

document.querySelector('.delete').addEventListener('click', (e) => {
  if (e.target.matches('#delete')) {
    const confirmDeleleting = confirm('¿Deseas eliminar esta Cita?');

    if(!confirmDeleleting) return;
    
    deleteAppointment(e.target)
  }
  return print_todo(todo_list)
})

// Edit Appointment
const editConatiner = document.querySelector('.todo__container');
editConatiner.addEventListener('click', ({ target }) => {
  
  if(!target.matches('.edit-btn')) return;
  const newDataAppointment = prompt('hello');

  if(newDataAppointment === null || !newDataAppointment) return;
  
  const indexAppointment = todo_list.find(appointment => appointment.id === target.dataset.id);
  indexAppointment.appointment = newDataAppointment;
  
  localStorage.setItem('todo', JSON.stringify(todo_list))
  return print_todo(todo_list)
})


// Call functions
const form = document.getElementById('todo__form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const appointment = new FormData(form).get('appointment')
  const dateAppointment = new FormData(form).get('date-appointment');
  const timeAppointment = new FormData(form).get('time-appointment');

  add_todo({
    appointment,
    dateAppointment,
    timeAppointment
  })
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
