import React from 'react';
import PropTypes from 'prop-types';

import TodoFilter from '../todo-filter/todo-filter';
import './footer.css';

const Footer = ({ done, chooseFilter, deleteCompletedTodo, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TodoFilter chooseFilter={chooseFilter} filter={filter} />
      {console.log(filter)}
      <button type="button" className="clear-completed" onClick={deleteCompletedTodo}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  done: PropTypes.number.isRequired,
  chooseFilter: PropTypes.func.isRequired,
  deleteCompletedTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;
