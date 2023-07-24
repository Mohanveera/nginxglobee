import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessToast = ({ message }) => {
  const notify = () => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  React.useEffect(() => {
    notify();
  }, []);

  return null;
};

export default SuccessToast;
