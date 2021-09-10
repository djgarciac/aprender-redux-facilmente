import { createStore, combineReducers } from 'redux';

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

  // Actualizar los todos antes de dibujar
  todos = store.getState().todos;

  for (let key in todos) {
    let li = document.createElement('li');
    // li.id = key;

    const classDone = todos[key].done ? 'done' : ''
    li.innerHTML = `
      <span id="${key}" class="${classDone}">${todos[key].text}</span>
      <span data-id="${key}" data-action="delete">x</span>
    `;
    setListeners(li);
    lista.appendChild(li);
  }
};

const setListeners = (li) => {
  li.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-action') === 'delete') {
      let key = e.target.getAttribute('data-id');
      store.dispatch({
        type: 'DELETE_TODO',
        id: key
      });
      return;
    }

    const { id: key } = e.target;
    todos[key].done = !todos[key].done;
    store.dispatch({
      type: 'UPDATE_TODO',
      todo: todos[key]
    });
  });
}

// Listeners
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let text = e.target.value;
    let todo = { text, done: false }
    store.dispatch({
      type: 'ADD_TODO',
      todo
    })
    e.target.value = ''
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  drawTodos();
});

// REDUX

// Segundo reducer para correos
const emailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MAIL':
      return [
        ...state,
        action.email
      ]
    case 'DELETE_MAIL':
      return [...state.filter(mail => mail !== action.email)]
    default:
      return state;
  }
};

// Reducer
const todosReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      action.todo['id'] = Object.keys(state).length;
      return {
        ...state,
        [Object.keys(state).length]: action.todo
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        [action.todo.id]: action.todo
      };
    case 'DELETE_TODO':
      // delete state[action.todo.id]
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
};

// Combinar los reducers
let rootReducer = combineReducers({
  todos: todosReducer,
  emails: emailsReducer
})

// Store
const store = createStore(rootReducer, {
  todos: {
    0: {
      text: 'Crear store',
      done: true,
      id: 0
    }
  },
  emails: [
    'bliss@gmail.com'
  ]
});

// ¿Qué hacer cuando hay cambios?
store.subscribe(drawTodos)
