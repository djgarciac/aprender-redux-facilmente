// import * as Redux from 'redux'
// Nodes
let input = document.querySelector('#input');
let lista = document.querySelector('#lista');
let todos = {
  0: {
    text: 'Ir al cine',
    done: false
  },
  1: {
    text: 'Cenar',
    done: true
  },
  2: {
    text: 'Grabar',
    done: false
  }
};

// Functions
const drawTodos = () => {
  lista.innerHTML = '';

  for (let key in todos) {
    let li = document.createElement('li');
    // li.id = key;

    const classDone = todos[key].done ? 'done' : ''
    li.innerHTML = `
      <span id="${key}" class="${classDone}">${todos[key].text}</span>
      <span>x</span>
    `;
    setListeners(li);
    lista.appendChild(li);
  }
};

const setListeners = (li) => {
  li.addEventListener('click', (e) => {
    const { id: key } = e.target;
    todos[key].done = !todos[key].done;
    drawTodos();
  });
}

// Listeners
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let text = e.target.value;
    let id = Object.keys(todos).length;
    todos[id] = { text, done: false };
    drawTodos();
    e.target.value = ''
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  drawTodos();
});
