import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './todo-filter.css';

function TodoFilter({ filter, chooseFilter }) {
  const [filters] = useState([
    {
      key: 'all',
      name: 'All',
    },
    {
      key: 'false',
      name: 'Active',
    },
    {
      key: 'true',
      name: 'Completed',
    },
  ]);
  return (
    <ul className="filters">
      {filters.map((el) => (
        <li key={el.key}>
          <button
            type="button"
            className={el.key === filter ? 'filter selected' : 'filter'}
            onClick={() => chooseFilter(el.key)}
          >
            {el.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoFilter;

TodoFilter.propTypes = {
  chooseFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
