import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-todo.css';

function NewToDo({ addTodo }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const submitTodo = (evt) => {
    evt.preventDefault();
    const timer = min * 60 + parseInt(sec, 10);
    if (label && label.trim()) {
      addTodo(label, timer);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form onSubmit={submitTodo} className="new-todo">
      <input
        type="text"
        className="new-todo__label"
        placeholder="What needs to be done?"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        name="label"
        required="required"
      />
      <input
        type="number"
        min="0"
        className="new-todo__timer"
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
        value={min}
        name="min"
        required="required"
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo__timer"
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        name="sec"
        required="required"
      />
      <input type="submit" hidden="hidden" />
    </form>
  );
}

export default NewToDo;

NewToDo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
