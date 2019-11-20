import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'utils';
import Styles from './HookTest.scss';

const HookTest = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  console.log(dropdownActive);
  return (
    <div>
      {ReactDOM.createPortal(
        <div className={Styles.modal}>
          <div className={Styles.tintOverlay} />
          <div className={Styles.container}>
            <div className={Styles.inputContainer}>
              <div className={Styles.select}>
                <div
                  className={Styles.trigger}
                  onClick={() => {
                    console.log('click');
                    setDropdownActive(!dropdownActive);
                  }}
                >
                  Select
                  <div className={css(Styles.dropdown, dropdownActive && Styles.active)} />
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('app')
      )}
    </div>
  );
};

export default HookTest;
