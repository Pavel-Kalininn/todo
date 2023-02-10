import React from 'react';
import PropTypes from 'prop-types';
import './timer.css';

export default class Timer extends React.Component {
  timeToString = () => {
    const { timer } = this.props;
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  componentDidUpdate(prevProps) {
    const { stopTimer, done } = this.props;
    if (done !== prevProps.done) {
      stopTimer();
    }
  }

  render() {
    const { startTimer, stopTimer, done, timer } = this.props;

    return (
      <span className="timer">
        <button className="timer-start" type="button" disabled={done || timer === 0} onClick={startTimer} name="true" />
        <button className="timer-stop" type="button" disabled={done || timer === 0} onClick={stopTimer} name="false" />
        {this.timeToString()}
      </span>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};
