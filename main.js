// import * as Redux from 'redux'
// Nodes
let input = document.querySelector('#input');
let lista = document.querySelector('#lista');
let todos = {};

// Functions
const drawTodos = () => {
  lista.innerHTML = '';

  for (let key in todos) {
    let li = document.createElement('li');
    li.id = key;
    li.innerHTML = `
      <span>${todos[key]}</span>
      <span id="${key}">x</span>
    `;
    lista.appendChild(li);
  }
};

// Listeners
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let text = e.target.value;
    let id = Object.keys(todos).length;
    todos[id] = text;

    drawTodos();
  }
});
