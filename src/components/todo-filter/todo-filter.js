import React from 'react';
import PropTypes from 'prop-types';
import './todo-filter.css';

export default class TodoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
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
      ],
    };
  }

  render() {
    const { filter, chooseFilter } = this.props;
    const { filters } = this.state;

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
}

TodoFilter.propTypes = {
  chooseFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
