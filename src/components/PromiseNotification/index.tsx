import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PromiseNotificationProps {
    promise: Promise<any>;
    pendingMessage: string;
    successMessage: string;
    errorMessage: string;
    successCallback?: () => void;
    errorCallback?: (error: any) => void;
}

export const PromiseNotification = ({
    promise,
    pendingMessage,
    successMessage,
    errorMessage,
    successCallback,
    errorCallback
}: PromiseNotificationProps) => {

    toast.promise(
        promise,
        {
            pending: pendingMessage,
            success: {
                render() {
                    if (successCallback) successCallback();
                    return successMessage;
                }
            },
            error: {
                render({ data }) {
                    if (errorCallback) errorCallback(data);
                    const errorDetail = data?.response?.data?.message || data?.message || errorMessage;
                    return errorDetail;
                }
            }
        }
    );
}
