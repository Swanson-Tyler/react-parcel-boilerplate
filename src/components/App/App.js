import React from 'react';
import { ToastContainer } from 'react-toastify';
import HookTest from 'components/HookTest/HookTest';
import Gallery from '../Gallery/Gallery';
import Styles from './App.scss';
import 'babel-polyfill';

const App = () => {
  return (
    <div className={Styles.app}>
      <ToastContainer className={Styles.toastContainer} position="top-center" />
      <Gallery />
      <HookTest />
    </div>
  );
};

export default App;
