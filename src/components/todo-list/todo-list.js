import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, completeTodo, editLabelTodo, subTime }) => {
  if (todos.length) {
    const elements = todos.map((item) => {
      const { id, label, created, done, timer } = item;
      return (
        <TodoListItem
          key={id}
          id={id}
          label={label}
          created={created}
          timer={timer}
          done={done}
          onDeleted={() => onDeleted(id)}
          completeTodo={() => completeTodo(id)}
          editLabelTodo={(text) => editLabelTodo(id, text)}
          subTime={subTime}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  } else return <h3>No todo(s) yet, Use the form to create new todos</h3>;
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      done: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
      id: PropTypes.string.isRequired,
      timer: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  editLabelTodo: PropTypes.func.isRequired,
  subTime: PropTypes.func.isRequired,
};

export default TodoList;
