import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';
import './todo-list-item.css';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelState: props.label,
      editing: false,
      timerId: null,
    };
  }

  onLabelChange = (evt) => {
    this.setState({
      labelState: evt.target.value,
    });
  };

  submitTodo = (evt) => {
    const { labelState } = this.state;
    const { editLabelTodo } = this.props;
    evt.preventDefault();
    if (labelState && labelState.trim()) {
      editLabelTodo(labelState);
      this.setState({
        editing: false,
      });
    }
  };

  classTodo = () => {
    const { editing } = this.state;
    const { done } = this.props;
    let classTask = 'task';
    if (editing) classTask += ' editing';
    if (done) classTask += ' done';
    return classTask;
  };

  editTodo = () => {
    this.setState({
      editing: true,
    });
  };

  render() {
    const { label, done, created, id, onDeleted, completeTodo, timer, subTime } = this.props;
    const { labelState } = this.state;
    const timeDistance = formatDistanceToNow(created);

    return (
      <li className={this.classTodo()}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={completeTodo} checked={done} />
          <label htmlFor={id}>
            <span tabIndex="-1" role="button" className="description">
              {label}
            </span>
            <Timer created={created} timer={timer} done={done} subTime={subTime} id={id} />
            <span className="created">{timeDistance}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.editTodo} aria-label="Edit task" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete task" />
        </div>
        <form onSubmit={this.submitTodo}>
          <input type="text" className="edit" value={labelState} onChange={this.onLabelChange} />
        </form>
      </li>
    );
  }
}

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
