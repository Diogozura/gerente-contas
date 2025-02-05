import React from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastNotificationProps {
  title: string; // Título da notificação
  status: "success" | "error" | "info" | "warning"; // Tipo de notificação
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"; // Posição na tela (opcional, padrão: top-right)
}

// Função para exibir o toast
export const showToast = ({ title, status, position = "top-right" }: ToastNotificationProps) => {
  const toastConfig: ToastOptions = { position, autoClose: 5000 }// Tempo em milissegundos (5 segundos) };

  // Exibe o toast baseado no status
  switch (status) {
    case "success":
      toast.success(title, toastConfig);
      break;
    case "error":
      toast.error(title, toastConfig);
      break;
    case "info":
      toast.info(title, toastConfig);
      break;
    case "warning":
      toast.warn(title, toastConfig);
      break;
    default:
      break;
  }
};

// Apenas o ToastContainer que será adicionado no layout principal
export const ToastNotificationContainer: React.FC = () => {
  return <ToastContainer />;
};
