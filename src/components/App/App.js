import React from 'react';
import Gallery from '../Gallery/Gallery';
import Styles from './App.scss';
import 'babel-polyfill';

const App = () => {
  return (
    <div className={Styles.app}>
      <Gallery />
    </div>
  );
};

export default App;
