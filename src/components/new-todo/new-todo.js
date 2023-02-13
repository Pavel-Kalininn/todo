import React from 'react';
import PropTypes from 'prop-types';

import './new-todo.css';

export default class NewToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }
  onLabelChange = (evt) => {
    const { name } = evt.target;
    const { value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  submitTodo = (evt) => {
    const { label, min, sec } = this.state;
    const { addTodo } = this.props;
    console.log('submitted');
    evt.preventDefault();
    const timer = min * 60 + parseInt(sec, 10);
    if (label && label.trim()) {
      addTodo(label, timer);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form onSubmit={this.submitTodo} className="new-todo">
        <input
          type="text"
          className="new-todo__label"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
          name="label"
          required="required"
        />
        <input
          type="number"
          min="0"
          className="new-todo__timer"
          placeholder="Min"
          onChange={this.onLabelChange}
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
          onChange={this.onLabelChange}
          value={sec}
          name="sec"
          required="required"
        />
        <input type="submit" hidden="hidden" />
      </form>
    );
  }
}

NewToDo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
