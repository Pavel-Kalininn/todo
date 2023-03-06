import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import AppHeader from '../app-header/app-header.js';
import NewToDo from '../new-todo/new-todo.js';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

function App() {
  const [filter, setFilter] = useState('all');
  const [todoData, setTodoData] = useState([
    {
      label: 'Wake up',
      done: true,
      created: new Date(2022, 12, 4),
      id: uuidv4(),
      timer: 1600,
    },
    {
      label: 'Drink Coffee',
      done: false,
      created: new Date(2023, 1, 5),
      id: uuidv4(),
      timer: 3200,
    },
    {
      label: 'Build App',
      done: false,
      created: new Date(2023, 1, 25),
      id: uuidv4(),
      timer: 300,
    },
  ]);

  const subTime = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newValueTimer = oldItem.timer - 1;
    const newItem = { ...oldItem, timer: newValueTimer };
    const before = todoData.slice(0, idx);
    const after = todoData.slice(idx + 1);
    setTodoData([...before, newItem, ...after]);
  };

  const deleteTodo = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const before = todoData.slice(0, idx);
    const after = todoData.slice(idx + 1);
    setTodoData([...before, ...after]);
  };

  const addTodo = (text, timer) => {
    const newTask = createTodo(text, timer);
    setTodoData([...todoData, newTask]);
  };

  const deleteCompletedTodo = () => {
    setTodoData(todoData.filter((el) => !el.done));
  };

  const completeTodo = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const before = todoData.slice(0, idx);
    const after = todoData.slice(idx + 1);
    setTodoData([...before, newItem, ...after]);
  };

  const editLabelTodo = (id, text) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label: text };
    const before = todoData.slice(0, idx);
    const after = todoData.slice(idx + 1);
    setTodoData([...before, newItem, ...after]);
  };

  const createTodo = (label, timer) => ({
    label,
    done: false,
    created: new Date(),
    id: uuidv4(),
    timer,
  });

  const displayFiltered = (category) => {
    if (category === 'all') {
      return todoData;
    }
    return todoData.filter((el) => el.done.toString() === category);
  };

  const chooseFilter = (category) => {
    setFilter(category);
  };
  const completedTodoCount = todoData.filter((el) => !el.done).length;

  return (
    <div className="todoapp">
      <AppHeader />
      <NewToDo addTodo={addTodo} />
      <section className="main">
        <TodoList
          todos={displayFiltered(filter)}
          onDeleted={deleteTodo}
          completeTodo={completeTodo}
          editLabelTodo={editLabelTodo}
          subTime={subTime}
        />
        <Footer
          done={completedTodoCount}
          chooseFilter={chooseFilter}
          filter={filter}
          deleteCompletedTodo={deleteCompletedTodo}
        />
      </section>
    </div>
  );
}

export default App;
