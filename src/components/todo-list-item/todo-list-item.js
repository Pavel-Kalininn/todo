import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';
import './todo-list-item.css';

function TodoListItem({ id, label, created, timer, done, onDeleted, completeTodo, editLabelTodo, subTime }) {
  const [labelState, setLabelState] = useState(label);
  const [editing, setEditing] = useState(false);

  const onLabelChange = (evt) => {
    setLabelState(evt.target.value);
  };

  const submitTodo = (evt) => {
    evt.preventDefault();
    if (labelState && labelState.trim()) {
      editLabelTodo(labelState);
      setEditing(false);
    }
  };

  const classTodo = () => {
    let classTask = 'task';
    if (editing) classTask += ' editing';
    if (done) classTask += ' done';
    return classTask;
  };

  const editTodo = () => {
    setEditing(true);
  };

  const timeDistance = formatDistanceToNow(created);

  return (
    <li className={classTodo()}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={completeTodo} checked={done} />
        <label htmlFor={id}>
          <span tabIndex="-1" role="button" className="description">
            {label}
          </span>
          <Timer created={created} timer={timer} done={done} subTime={subTime} id={id} />
          <span className="created">{timeDistance}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editTodo} aria-label="Edit task" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete task" />
      </div>
      <form onSubmit={submitTodo}>
        <input type="text" className="edit" value={labelState} onChange={onLabelChange} />
      </form>
    </li>
  );
}

export default TodoListItem;

TodoListItem.defaultProps = {
  created: new Date(),
  done: false,
};

TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  done: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  editLabelTodo: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  subTime: PropTypes.func.isRequired,
};
