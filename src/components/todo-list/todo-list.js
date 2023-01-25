import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, completeTodo, editLabelTodo }) => {
  const elements = todos.map((item) => {
    const { id, label, created, done } = item;
    return (
      <TodoListItem
        key={id}
        id={id}
        label={label}
        created={created}
        done={done}
        onDeleted={() => onDeleted(id)}
        completeTodo={() => completeTodo(id)}
        editLabelTodo={(text) => editLabelTodo(id, text)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      done: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  editLabelTodo: PropTypes.func.isRequired,
};

export default TodoList;
