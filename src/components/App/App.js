import React from 'react';
import { ToastContainer } from 'react-toastify';
import Gallery from '../Gallery/Gallery';
import Styles from './App.scss';
import 'babel-polyfill';

const App = () => {
  return (
    <div className={Styles.app}>
      <ToastContainer position="top-center" autoClose={false} />
      <Gallery />
    </div>
  );
};

export default App;
