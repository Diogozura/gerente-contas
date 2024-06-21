import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotificationType = 'info' | 'success' | 'error' | 'warning';

export const Notification = {
    show: (message: string, type: NotificationType = 'info', options: ToastOptions = {}) => {
        const defaultOptions: ToastOptions = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };

        const finalOptions = { ...defaultOptions, ...options };

        switch (type) {
            case 'success':
                toast.success(message, finalOptions);
                break;
            case 'error':
                toast.error(message, finalOptions);
                break;
            case 'warning':
                toast.warn(message, finalOptions);
                break;
            case 'info':
            default:
                toast.info(message, finalOptions);
                break;
        }
    }
};
