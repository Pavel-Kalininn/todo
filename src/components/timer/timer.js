import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './timer.css';
import useInterval from '../../hooks/useInterval/useInterval';

function Timer({ done, timer, subTime, id }) {
  const [isActive, setIsActive] = useState(false);

  const timeToString = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timer <= 0 || done) {
      stopTimer();
    }
  }, [timer]);

  const startTimer = () => {
    if (!isActive && timer > 0) {
      setIsActive(true);
    }
  };

  useInterval(
    () => {
      subTime(id);
    },
    isActive ? 1000 : null
  );

  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <span className="timer">
      <button className="timer-start" type="button" disabled={done || timer === 0} onClick={startTimer} name="true" />
      <button className="timer-stop" type="button" disabled={done || timer === 0} onClick={stopTimer} name="false" />
      {timeToString()}
    </span>
  );
}

export default Timer;

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
};
