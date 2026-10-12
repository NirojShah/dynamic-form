import React from "react";
import Notifications from "./notification.context";
const GlobalMessage = () => {
  const { notification, hideNotification } = Notifications.useNotification();

  if (!notification.show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "500px",
        padding: "14px 20px",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: "500",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor:
          notification.type === "success" ? "#16a34a" : "#dc2626",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span>{notification.message}</span>
        <button
          onClick={hideNotification}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default GlobalMessage;
