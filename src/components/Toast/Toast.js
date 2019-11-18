import React, { useState, useEffect } from 'react';
import { css } from 'utils';
import Styles from './Toast.scss';

const Toast = ({ message, className }) => {
  const [toastActive, setToastActive] = useState(!!message);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('set Active');
      setToastActive(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  console.log('render');
  return (
    <div className={css(Styles.Toast, toastActive && Styles.active, className)}>
      <div className={Styles.toastWrapper}>
        <div className={Styles.toastCopy}>{message}</div>
      </div>
    </div>
  );
};

export default Toast;
