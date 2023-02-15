import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import AppHeader from '../app-header/app-header.js';
import NewToDo from '../new-todo/new-todo.js';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      todoData: [
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
      ],
    };
  }

  subTime = (id, newTimer) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newValueTimer = newTimer;
      const newItem = { ...oldItem, timer: newValueTimer };
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, newItem, ...after];
      return {
        todoData: newArray,
      };
    });
  };

  deleteTodo = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];
      return {
        todoData: newArray,
      };
    });
  };

  addTodo = (text, timer) => {
    const newTask = this.createTodo(text, timer);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }));
  };

  deleteCompletedTodo = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.done),
    }));
  };

  completeTodo = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, newItem, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  editLabelTodo = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: text };
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, newItem, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  createTodo(label, timer) {
    return {
      label,
      done: false,
      created: new Date(),
      id: uuidv4(),
      timer,
    };
  }

  displayFiltered(category) {
    const { todoData } = this.state;
    if (category === 'all') {
      return todoData;
    }
    console.log(category);
    return todoData.filter((el) => el.done.toString() === category);
  }

  chooseFilter = (category) => {
    this.setState({
      filter: category,
    });
  };

  render() {
    const { filter, todoData } = this.state;
    const completedTodoCount = todoData.filter((el) => !el.done).length;

    return (
      <div className="todoapp">
        <AppHeader />
        <NewToDo addTodo={this.addTodo} />
        <section className="main">
          <TodoList
            todos={this.displayFiltered(filter)}
            onDeleted={this.deleteTodo}
            completeTodo={this.completeTodo}
            editLabelTodo={this.editLabelTodo}
            subTime={this.subTime}
            onClickTimer={this.onClickTimer}
          />
          <Footer
            done={completedTodoCount}
            chooseFilter={this.chooseFilter}
            filter={filter}
            deleteCompletedTodo={this.deleteCompletedTodo}
          />
        </section>
      </div>
    );
  }
}
