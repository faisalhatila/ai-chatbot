import { toast, ToastContainer as Container, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customToast = (message: string, options = {}) => {
  return toast(message, {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    transition: Bounce,
    ...options,
  });
};

export { customToast, Container };
