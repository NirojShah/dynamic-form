import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "", // success | error
  });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  }, []);

  const showSuccess = useCallback(
    (message) => {
      showNotification(message, "success");
    },
    [showNotification],
  );

  const showError = useCallback(
    (message) => {
      showNotification(message, "error");
    },
    [showNotification],
  );

  const hideNotification = useCallback(() => {
    setNotification({
      show: false,
      message: "",
      type: "",
    });
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        showSuccess,
        showError,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
};

const Notifications = {
  NotificationProvider,
  useNotification,
};

export default Notifications;
