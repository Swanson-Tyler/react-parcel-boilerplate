import { cssTransition } from 'react-toastify';
import Styles from './Toast.scss';

const toastTransition = cssTransition({
  enter: Styles.toastOnEnter,
  exit: Styles.toastOnExit,
  duration: [750, 750]
  //   autoClose: 2000
});

const defaultToast = {
  className: Styles.toast,
  bodyClassName: Styles.toastBody,
  progressClassName: Styles.toastProgressBar,
  transition: toastTransition,
  closeButton: false,
  closeOnClick: true,
  autoClose: 8000,
  hideProgressBar: true
};

export default defaultToast;
