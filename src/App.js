import React from 'react';
import './App.css';

import AppHeader from './components/app-header/app-header';
import NewToDo from './components/new-todo/new-todo';
import TodoList from './components/todo-list/todo-list';
import Footer from './components/footer/footer';

export default class App extends React.Component {
  MaxId = 100;
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      todoData: [
        {
          label: 'Wake up',
          done: true,
          created: new Date(2022, 12, 4),
          id: 1,
        },
        {
          label: 'Drink Coffee',
          done: false,
          created: new Date(2023, 1, 5),
          id: 2,
        },
        {
          label: 'Build App',
          done: false,
          created: new Date(2023, 1, 25),
          id: 3,
        },
      ],
    };
    this.chooseFilter = this.chooseFilter.bind(this);
  }

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

  addTodo = (text) => {
    const newTask = this.createTodo(text);

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

  createTodo(label) {
    return {
      label,
      done: false,
      created: new Date(),
      id: this.MaxId++,
    };
  }

  displayFiltered(category) {
    const { todoData } = this.state;
    if (category === 'all') {
      return todoData;
    }

    return todoData.filter((el) => el.done.toString() === category);
  }

  chooseFilter(category) {
    this.setState({
      filter: category,
    });
  }

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

// function App() {
//   const todoData = [
//     { label: "Completed Task", done: true, created: new Date(2023, 1, 1), id: 1 },
//     { label: "Build App", done: false, created: new Date(2022, 1, 1), id: 2 },
//     { label: "Active Task", done: false, created: new Date(2021, 1, 4), id: 3 }
//   ]

//   return (
//     <div className="App">
//       <AppHeader />
//       <NewToDo />
//       <TodoList todos={todoData} />
//       <Footer />
//     </div>
//   );
// }

// export default App;
