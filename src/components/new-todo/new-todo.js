import React from 'react';
import PropTypes from 'prop-types';

import './new-todo.css';

export default class NewToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  submitTodo = (evt) => {
    const { label } = this.state;
    const { addTodo } = this.props;
    evt.preventDefault();
    if (label) {
      addTodo(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.submitTodo}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
      </form>
    );
  }
}

NewToDo.propTypes = {
  addTask: PropTypes.func.isRequired,
};
